const serverConfig = {
    SERVER_URL: "https://uwclassmate.com",
    GETCOMMENT: "/api/retrieveComment",
    GETCOURSERATING: "/api/retrieveRating",
    FILLCOMMENT: "/api/fillcomment",
    GETRECOMMENDED: "/api/getRecommended",
    GETPOPULAR: "/api/getPopular",
    UPDATELIKE: "/api/like",
    GETLIKE: "/api/getLike",
    GETAD: "/api/ad"
};

if (window.location.hostname === "localhost") {
    serverConfig.SERVER_URL = "http://localhost:9000";
}

export default serverConfig;
