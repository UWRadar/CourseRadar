const http = require('http');
const Search = require('../service/search');
const dbPassword = require("../dbconn.json");
const AccountServiceManager = require("../service/AccountServiceManager");
const mysql = require('mysql');
const User = require("../service/User");
const Advertisement = require('../service/Advertisement');
const Cookies = require("cookies");
const util = require('util');
const urlParser = require('url');
const firebaseKey = require("../firebase-key.json");
const firebase = require("firebase-admin");
const CourseCommentManager = require("../service/CourseCommentManager");
const NewsFeedServiceManager = require('../service/NewsFeedServiceManager');
class Server {
    constructor() {
        this.url = dbPassword.server_url;
        this.dbname = dbPassword.database_name;
        this.username = dbPassword.username;
        this.passwd = dbPassword.password;
        this.port = dbPassword.port;

        this.pool = mysql.createPool({
            connectionLimit: 10,
            host: this.url,
            user: this.username,
            password: this.passwd,
            database: this.dbname
        });
        this.headers = {
            "Access-Control-Allow-Credentials": "true",
            // "Access-Control-Allow-Origin": "http://localhost:3000"
            "Access-Control-Allow-Origin": " http://192.168.102.161:3000"
        };

        this.accountServiceManager = new AccountServiceManager(this.pool);
        this.search = new Search(this.pool);
        this.ad = new Advertisement(this.pool);
        this.courseCommentManager = new CourseCommentManager(this.pool);
        this.newsfeedServiceManager = new NewsFeedServiceManager(this.pool);
    }

    /*
        Authenticate request from client using the token stored in cookies

        @param req The HTTP request from client
        @param rsp The HTTP response to client
    */
    authenticateRequest(req, rsp) {
        const cookies = new Cookies(req, rsp);
        const token = cookies.get("token");
        const tokenType = cookies.get("token-type");
        if (!token || !tokenType) {
            return false;
        }
        if (tokenType === "firebase") {
            return this.authenticateRequestFirebase(token);
        } else if (tokenType === "ohcm") {
            const query = util.promisify(this.pool.query).bind(this.pool);
            return this.authenticateRequestSQL(token, query);
        } else {
            return false;
        }
    }

    // Authentication method for firebase/google logins
    async authenticateRequestFirebase(token) {
        if (!token)
            return false;

        if (firebase.apps.length == 0) {
            firebase.initializeApp({
                credential: firebase.credential.cert(firebaseKey)
            });
        } else {
            firebase.app();
        }

        const result = await firebase
            .auth()
            .verifyIdToken(token)
            .then((decodedUser) => { return true; })
            .catch((error) => {
                return false;
            })
        return result;
    }

    // Authentication method for normal logins
    async authenticateRequestSQL(token, query) {
        const result = await query("SELECT 1 From Sessions As S Where S.token = ?", token);
        return (result.length == 1);
    }

    doAction(path, query, out, req) {
        switch (path) {
            case '/api/changeprofile':
                /**
                 * @method POST
                 * @param password - the MD5 encoded new password
                 * @param username - new username
                 * The token cookie will be used.
                */
                this.getPostData(req, (postData) => {
                    const user = new User(out, req);
                    user.changeProfile(postData);
                })
                break;
            case '/api/retrieveRating':
                this.courseCommentManager.getCourseRatingByCourseName(query['courseName'], out);
                break;
            case '/api/getPast':
                //this.accountServiceManager.getCommentsFromUserId(query["userId"], out);
                out.end(JSON.stringify({ "error": "Unimplemented" }));
                break;

            case '/api/search':
                var self = this;
                this.search.search(query["courseName"], query["credit"], query["level"], query["creditType"], function (result) {
                    if (result == null) {
                        out.writeHead(204, self.headers)
                        out.end(JSON.stringify({ "result": "results not found", "success": 0 }));
                    } else {
                        out.writeHead(200, self.headers)
                        out.end(JSON.stringify({ "result": result, "success": 1 }));
                    }
                });
                break;
            case '/api/retrieveComment':
                this.courseCommentManager.getCommentsByCourseName(query['name'], out);
                break;
            case '/api/like':
                this.authenticateRequest(req, out)
                    .then((res) => {
                        if (res)
                            this.getPostData(req, (postData) => {
                                const like = new Like(out);
                                like.update(postData.courseName, postData.userName, postData.commentID);
                            });
                        else
                            this.authFailed(out);
                    })
                break;

            case '/api/login':
                /**
                 * @method POST
                 * @param email
                 * @param password - the MD5 encoded password
                */

                this.getPostData(req, (postData) => {
                    const user = new User(out, req);
                    user.login(postData.email, postData.password);
                });
                break;

            case '/api/loginfirebase':
                /**
                 * @method POST
                 * @param idToken
                */

                this.getPostData(req, (postData) => {
                    const user = new User(out, req);
                    if (postData.idToken == undefined || !postData.idToken) {
                        out.writeHead(400, this.header);
                        out.end(JSON.stringify({
                            error: "Invalid request to log in",
                            success: false
                        }));
                    }
                    user.loginFirebase(postData.idToken);
                });
                break;

            case '/api/logout':
                /**
                 * @method POST
                 * No @param. The token cookie will be used.
                 * @returns 204 if succeed; 500 if failed.
                 */

                if (req.method == "POST") {
                    const user = new User(out, req);
                    user.logOut();
                } else {
                    out.writeHead(405); // Method Not Allowed
                    out.end();
                }
                break;
            case '/api/fillcomment':
                /**
                 * @method POST
                 * @param comment - course comment
                 * @param year - course year Ex.2021
                 * @param quarter - course Quarter Ex Winter
                 * @param professorName - professor for the quarter
                 * @param gpa - GPA
                 */

                this.getPostData(req, (postData) => {
                    const comment = postData.comment;
                    const year = postData.year;
                    const quarter = postData.quarter;
                    const name = postData.courseName;
                    const professorName = postData.instructor;
                    const gpa = postData.GPA;
                    const language = postData.language;
                    const workload = postData.workload;
                    const grading = postData.grading;
                    this.courseCommentManager.fillcomment(comment, year, quarter,
                        name, professorName, gpa, grading, language, workload, out);
                });
                break;

            case '/api/signup':
                /**
                 * @method POST
                 * @param email
                 * @param password - the MD5 encoded password
                 *
                 * Optional:
                 * @param username
                 */

                this.getPostData(req, (postData) => {
                    const user = new User(out, req);
                    user.signup(postData);
                });
                break;

            case '/api/userinfo':
                /**
                 * @method GET
                 * No @param. The token cookie will be used.
                 */

                const user = new User(out, req);
                user.getUserInfo().then(info => {
                    user.getFavCourses(info.id).then(favCourses => {
                        info.favCourses = favCourses;
                        delete info.id;
                        out.end(JSON.stringify(info));
                    })
                });
                break;

            case '/api/verifyemail':
                /**
                 * @method POST
                 * @param email
                 * @param code - the verification code the user received in the email
                 */

                this.getPostData(req, (postData) => {
                    const user = new User(out, req);
                    user.verifyEmail(postData.email, postData.code);
                });
                break;

            case '/api/ad':
                this.ad.get(out);
                break;
            case '/api/getRecommended':
                this.newsfeedServiceManager.getRecommened(out);
                break;
            case '/api/getPopular':
                this.newsfeedServiceManager.getPopularCourse(out);
                break;
            default:
                out.writeHead(404);
                out.end("404 Not Found");
        }
    }

    authFailed(out) {
        out.writeHead(403, this.headers);
        out.end(JSON.stringify({
            error: "Invalid token",
            success: false
        }))
    }




    getPostData(req, callback) {
        /*
            To test a POST request:
            1. Open http://localhost:9000/ in Chrome
            2. Press F12 to open DevTools
            3. Modify the following example code and run it in Console

            fetch("/api/verifyemail", {
                body: JSON.stringify({
                    email: "example@uw.edu",
                    code: 123456
                }),
                method: "POST"
            })
        */

        let data = "";
        req.on("data", chunk => {
            data += chunk;
        });
        req.on("end", () => {
            if (callback) {
                if (req.headers["content-type"] == "application/x-www-form-urlencoded") {
                    const json = {}
                    if (data) {
                        const parameters = data.split("&")
                        for (let i = 0; i < parameters.length; i++) {
                            const split = parameters[i].split("=")
                            json[split[0]] = decodeURIComponent(split[1])
                        }
                    }
                    callback(json)
                } else {
                    try {
                        callback(JSON.parse(data));
                    } catch {
                        callback({});
                    }
                }
            }
        });
    }

    run() {
        //do not delete, this is for the callback function to refer back to the current object
        var self = this;
        const running = http.createServer(function (req, res) {
            res.setHeader("Content-Type", "application/json");
            if (req.headers.referer) {
                const referrer = new URL(req.headers.referer);
                switch (referrer.host) {
                    case "localhost:3000":
                    case "test.uwclassmate.com":
                    case "uwclassmate.com":
                        res.setHeader("Access-Control-Allow-Origin", referrer.protocol + "//" + referrer.host);
                        res.setHeader("Access-Control-Allow-Credentials", "true");
                }
            }
            // const reqSummary = new URL(req.url, "https://" + req.headers.host);
            const reqSummary = urlParser.parse(req.url, true);
            console.log(reqSummary.pathname);
            console.log(reqSummary.query)
            self.doAction(reqSummary.pathname, reqSummary.query, res, req);
        });
        console.log("Server running...");
        running.listen(9000);
    }
}

module.exports = Server;