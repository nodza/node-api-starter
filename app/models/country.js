var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var CountrySchema = new Schema({
    name: String,
    capital: String,
    currency: String,
    flag: String
});

module.exports = mongoose.model('Country', CountrySchema);