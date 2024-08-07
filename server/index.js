const express = require("express");
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// SERVER INSTANCE
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const app = express();
const cors = require("cors");
const DB_Connection = require("./config/dbConfig");
require("dotenv").config();
const { port } = process.env;



////////////////////////////////////////////////////////////////////////////////////////////////////////////
// DATABASE:-  Connection
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const USERNAME = process.env.DB_USERNAME;
// const PASSWORD = process.env.DB_PASSWORD;
DB_Connection();



///////////////////////////////////////////////////////////////////////////////////////////////////////////
// SERVER:-  Port
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.listen(port, () => {
    console.log("***********************************************",
                "\n*********      SERVER CONNECTION      *********",
                `\n***********************************************`,
                `\n\nRUNNING ON PORT: ${port} 😂`);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ===========================================================================================================================//
// MIDDLEWARES =========================================================================================================>
// ===========================================================================================================================//
// The express.json() will add a body property to the request or req object. 
// This includes the request body's parsed JSON data. 
// req.body in your route handler function will allow you to access this data.
app.use(express.json({ limit: '50mb' , extended: true }));
app.use(express.urlencoded({ limit: '50mb', extended: false }));
// Serve uploaded files statically
// app.use('/uploads', express.static('uploads'));
//
// app.use(express.static("public"))
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// CORS (CROSS ORIGIN RESOURCE SHARING)
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(cors());
// ===========================================================================================================================//
// END OF MIDDLEWARES ========================================================================================================//
// ===========================================================================================================================//





////////////////////////////////////////////////////////////////////////////////////////////////////////////
// ROUTES:-  Home Page
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
    const responseData = {
        success: true,
        data: null,
        message: "App | Samuel Akinola Foundation"
    }
    return res.json(responseData);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  IMPORT:-  ROUTES
////////////////////////////////////////////////////////////////////////////////////////////////////////////
require("./routes/user.routes")(app);
require("./routes/role.routes")(app);
require("./routes/image.routes")(app);
require("./routes/product.routes")(app);
////////////////////////////////////////////////////////////////////////////////////////////////////////////

























// ************************************************** //
// 2) This is CORS-enabled for a Single Route!
// ************************************************** //
// app.get("/products/:id", cors(), function (req, res, next) {
//     res.json({ msg: 'This is CORS-enabled for a Single Route!' });
// });
// ***************************************************//
// ************************************************** //

// ************************************************** //
// 3) This is CORS-enabled for a particular origin!
// ************************************************** //
// var corsOptions = {
//     origin: 'http://127.0.0.1:5000',
// }
// app.use(cors(corsOptions));  
// app.get("/products/:id", cors(corsOptions), function (req, res, next) {
//     res.json({ msg: 'This is CORS-enabled for a Single Route!' });
// });
// var corsOptionz = {
//     origin: "http://127.0.0.1:8000",
// }
// app.use(cors(corsOptionz));
// ***************************************************//
// ************************************************** //


// const db = require("./models");
// db.mongoose.connect(db.url)
// .then(() => {
//     console.log(`ACTIVE DB: ${DB_URI}`);
// })
// .catch((err) => {
//     console.log("************ ERROR WITH DATABASE CONNECTION ************")
//     console.log(`Cannot connect to the database: ${err}`);
//     process.exit();
// });


// let server = app.listen(PORT, () => {
//     const port = server.address().port;
//     console.log(`Listening on: ${port}`);
// });