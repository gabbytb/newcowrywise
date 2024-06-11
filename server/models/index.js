const dbConfig = require("../config/dbConfig");
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;


const db = {};
db.mongoose = mongoose;
db.url = dbConfig.url;

db.users = require("./user.model.js")(mongoose);
db.roles = require("./role.model.js")(mongoose);
db.products = require("./product.model.js")(mongoose);
db.images = require("./image.model.js")(mongoose);

module.exports = db;