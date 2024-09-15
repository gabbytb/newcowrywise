const express = require("express");
const cors = require('cors');
const DB_Connection = require("./config/dbConfig");
require("dotenv").config();
const { port } = process.env;
const { OAuth2Client } = require('google-auth-library');


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 1. SERVER INSTANCE
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const app = express();


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 2. DATABASE:-  Connection
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// const USERNAME = process.env.DB_USERNAME;
// const PASSWORD = process.env.DB_PASSWORD;
DB_Connection();


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 3. GOOGLE AUTH: Configure OAuth2 client
////////////////////////////////////////////////////////////////////////////////////////////////////////////
const oauth2Client = new OAuth2Client('1014327754286-emt2refui7rqci9tfrnc5ssi8id3m95a.apps.googleusercontent.com');
// const oauth2Client = new OAuth2Client();                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   th2Client()


////////////////////////////////////////////////////////////////////////////////////////////////////////////
// =======================================================================================================//
// 4. MIDDLEWARES ===========================================================================================//
// =======================================================================================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Enable: CORS (CROSS ORIGIN RESOURCE SHARING) for all routes
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(cors());
const corsOptions = {        
    origin: ["http://localhost:3000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
};
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.use(express.urlencoded({ limit: '50mb', extended: false }));
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// express.json():-  Will add a body property to the request or req object. 
// - This includes the request body's parsed JSON data. 
// NOTE:- req.body in your route handler function will allow you to access this data.
app.use(express.json({ limit: '50mb' , extended: true }));
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Serve uploaded files statically
// app.use('/uploads', express.static('uploads'));
//
// app.use(express.static("public"))
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// =======================================================================================================//
// END OF MIDDLEWARES ====================================================================================//
// =======================================================================================================//
////////////////////////////////////////////////////////////////////////////////////////////////////////////




////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 5. ROUTES:-  Home Page
////////////////////////////////////////////////////////////////////////////////////////////////////////////
app.get('/', (req, res) => {
    const responseData = {
        success: true,
        data: null,
        message: "App | Samuel Akinola Foundation"
    };
    return res.json(responseData);
});
////////////////////////////////////////////////////////////////////////////////////////////////////////////
// 1. Call the Google SDK from the frontend using whatever frontend
//2. Extract the code or access token and send to your backend for verification.
//3. Use your backend Google api to verify the code or token.
//4. If verified, sign them in the backend and then send a response to frontend
// app.post('/auth', async (req, res) => {
    
//     // Route to verify Google token
//     try {
    
//         // get the code from frontend
//         const code = req.headers.authorization;
//         console.log('Authorization Code:', code);
        
//         // Exchange the authorization code for an access token
//         const response = await axios.post('https://oauth2.googleapis.com/token', {
//                 code,
//                 client_id: '1014327754286-emt2refui7rqci9tfrnc5ssi8id3m95a.apps.googleusercontent.com',
//                 client_secret: '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',
//                 redirect_uri: 'postmessage',
//                 grant_type: 'authorization_code'
//         });
//         const accessToken = response.data.access_token;
//         console.log('Access Token:', accessToken);


//         // Fetch user details using the access token
//         const userResponse = await axios.get('https://www.googleapis.com/oauth2/v3/userinfo', {
//                                             headers: {
//                                                 Authorization: `Bearer ${accessToken}`
//                                             },
//                                         });
//         const userDetails = userResponse.data;
//         console.log('User Details:', userDetails);

//         // Process user details and perform necessary actions
//         res.status(200).json({ message: 'Authentication successful' });
//     } catch (error) {
//         console.error('Error saving code:', error);
//         res.status(500).json({ message: 'Failed to save code' });
//     };

// });




////////////////////////////////////////////////////////////////////////////////////////////////////////////
//  IMPORT:-  ROUTES
////////////////////////////////////////////////////////////////////////////////////////////////////////////
require("./routes/user.routes")(app);
require("./routes/role.routes")(app);
require("./routes/image.routes")(app);
require("./routes/product.routes")(app);
////////////////////////////////////////////////////////////////////////////////////////////////////////////




///////////////////////////////////////////////////////////////////////////////////////////////////////////
// SERVER:-  Port
////////////////////////////////////////////////////////////////////////////////////////////////////////////
let server = app.listen(port, process.env.IP, () => {
    let port = server.address().port;
    let family = server.address().family;
    
    // port = server.close();
    
    console.log("***********************************************",
                "\n*********      SERVER CONNECTION      *********",
                `\n***********************************************`,
                `\n\nSERVER URL(:PORT): http://127.0.0.1:${port}`,
                `\nINTERNET PROTOCOL: ${family}`);
                
});
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