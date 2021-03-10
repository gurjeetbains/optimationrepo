/**
 * This is the module where all the errors checks are executed
 */
const validator = require('validator');
let data 
/**
 * Function to validate that whether field is email or not
 * @param {String} email 
 */
function validateEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}
/**
 * Recursive function to check closed tags
 */
function extractTags() {
    let startIndex = data.indexOf('<')
    if (startIndex!==-1) {
        let endIndex = data.indexOf('>')
        let tagName = data.substring(startIndex + 1, endIndex)
        if (data.includes('</' + tagName + '>')) {
            data = data.replace('<' + tagName + '>', "")
            data = data.replace('</' + tagName + '>', "")
        } else if (validateEmail(tagName)) {
            data = data.replace('<' + tagName + '>', "")
        } else {
            return 1
        }
        extractTags()
    }
}
/**
 * Function to do error validation
 * @param {RequestBody} req 
 */
const reqChecker = (req)=>{
    data = validator.trim(req.body.data?req.body.data:'');
    let errors = {};
    if(validator.isEmpty(data)){
        errors.noBody="Data cannot be empty";
    }
    if(!data.includes('<total>')){
        errors.totalTagError="Message rejected because of missing total"
    }else{
        if(extractTags()){
            errors.closeTagError="Close Tag is missing"
        }
    }
    return errors;
}
module.exports= reqChecker;