const mongoose = require('mongoose');

<<<<<<< HEAD
=======
// 3. Finish the account schema
>>>>>>> fd52b477a525e76101ad4d05035f1269ae80b659
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

    firstName: {
        type: String,
        required: true,
<<<<<<< HEAD
    },
    lastName: {
        type: String,
        required: true,
    },
    balance: {
        type: Number,
        required: true,
=======
>>>>>>> fd52b477a525e76101ad4d05035f1269ae80b659
    }
});

const model = mongoose.model('Account', AccountSchema);

module.exports = model;