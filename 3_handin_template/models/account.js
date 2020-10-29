const mongoose = require('mongoose');
// 3. Finish the account schema
const AccountSchema = new mongoose.Schema({
    /**
     * the schema follows this structure:
     * <fieldName>: {
     *  type: <type>,
     *  required: <bool>
     * },
     * <anotherFieldName>: {
     *  type: <type>,
     *  required: <bool>
     * }, and so on. 
     */
        firstname :{
            type: String,
            unique : false,
            required : true
        },
        lastname :{
            type: String,
            unique: false,
            required: true
        },
        balance : {
            type: Number,
            unique : false,
            required : true
        },
    
        branch : {
            type: String,
            unique: false,
            required: false,
        },
        accountType : {
            type: String,
            unique: false,
            required: false,
        }
    }, {
        timestamps: true
    });
    
    
const account = mongoose.model('Account', AccountSchema);
module.exports = account;