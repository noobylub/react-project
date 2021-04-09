class HTTPERROR extends Error{
    
    constructor(message, code){
        super(message);
        this.code = code; //add a property with the this keyword
    } 
}
module.exports = HTTPERROR;