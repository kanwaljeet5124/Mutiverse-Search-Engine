export const isRequiredSpecialChar = (val, field="", message=true) => {
    if(val && val.trim() != ""){
        if (/^[a-zA-Z\s_]+$/.test(val)) {
            return true;
        } else if (message) {
            errorMessage(`${field} Only alphabets, underscores and whitespaces allowed .`);
        }
    }else if(message){
        errorMessage(`${field} should not be empty`)
    }
    return false;
}