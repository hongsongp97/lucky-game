const HOST = "http://13.250.9.56:8081"
const API_URL_BASE = "http://13.250.9.56:8081/api"

const HEADER = {
    headers: {
        "Content-Type": "application/json",
        "secretkey": "391090",
        "Access-Control-Allow-Origin": "*"
    }
}

const URL_GOOGLE_FORM_DATA = API_URL_BASE + "/googleForm/getData";
const URL_EXPORT_DATA = API_URL_BASE + "/googleForm/getData/createUser";

const URL_ALL_USER = API_URL_BASE + "/user/getAllUser";
const URL_ALL_LUCKY_USER = API_URL_BASE + "/user/getAllLuckyUser";
const URL_RANDOM_USER = API_URL_BASE + "/user/getRandomUser";


module.exports = {
    HOST,
    API_URL_BASE,
    HEADER,
    URL_GOOGLE_FORM_DATA,
    URL_EXPORT_DATA,
    URL_ALL_USER,
    URL_ALL_LUCKY_USER,
    URL_RANDOM_USER
}