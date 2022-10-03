const isValid = function (value) {
    if (typeof value === "undefined" || value === null) return false;
    if (typeof value === "string" && value.trim().length === 0) return false;
    if (typeof value === "object" && Object.keys(value).length === 0) return false;
    return true;
};



const emptyBody = function (value) {
    return Object.keys(value).length > 0;
};


const idMatch = function (value){
    let user = /^[0-9a-fA-F]{24}$/.test(value)
    return user
}

const validateEmail = function (mail) {
    if (/^\w+([\.-]?\w+)@\w+([\.-]?\w+)(\.\w{2,3})+$/.test(mail)) {
        return true;
    }
}

const onlyNumbers = function (value){
    let user = /^[0-9]+$/.test(value)
    return user
}

const isValidMobileNum = function (value) {
    let user = /^(?:(?:\+|0{0,2})91(\s*[\-]\s*)?|[0]?)?[6789]\d{9}$/.test(value)
    return user
};

let isValidDateFormat = function (date) {
    let dateFormatRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])$/

    return dateFormatRegex.test(date)
}

module.exports = {isValid, emptyBody, idMatch, validateEmail, onlyNumbers, isValidMobileNum, isValidDateFormat}