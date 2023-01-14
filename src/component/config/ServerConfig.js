const serverConfig = {
	SERVER_URL: "https://api.uwclassmate.com",
	GETCOMMENT: "/api/retrieveComment",
	GETCOURSERATING: "/api/retrieveRating",
	FILLCOMMENT: "/api/fillcomment",
	GETRECOMMENDED: "/api/getRecommended",
	GETPOPULAR: "/api/getPopular",
	UPDATELIKE: "/api/like",
	GETLIKE: "/api/getLike",
	GETAD: "/api/ad"
};

switch (window.location.hostname) {
	case "localhost":
		serverConfig.SERVER_URL = "http://localhost:9000";
		break;
	case "test.uwclassmate.com":
		serverConfig.SERVER_URL = "https://test-api.uwclassmate.com";
		break;
	default:
		break;
}

export default serverConfig;
