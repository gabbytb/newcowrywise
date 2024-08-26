const db = require("../models");
const ROLES = require("../constants/constants");
const User = db.users;
const Role = db.roles;
const bcrypt = require("bcrypt");
// const crypto = require('crypto');



// // FOR CRYPTO: Replace with a secure, secret key.
// const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-32-character-secret-key-here'; // 32 bytes for AES-256
// const IV_LENGTH = 16; // AES block size in bytes
// // Encrypt function
// const encrypt = (textToBeEncrypted) => {
//     const iv = crypto.randomBytes(IV_LENGTH); // Generate a random initialization vector
//     const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(ENCRYPTION_KEY, 'utf8'), iv); // Create cipher
//     let encrypted = cipher.update(textToBeEncrypted, 'utf8', 'hex'); // Encrypt text
//     // let encrypted = cipher.update(String(textToBeEncrypted), 'utf8', 'hex'); // Encrypt text
//     encrypted += cipher.final('hex'); // Finalize encryption
//     return iv.toString('hex') + ':' + encrypted; // Return IV + encrypted text
// };
// // Decrypt function
// const decrypt = (encryptedText) => {
//     const textParts = encryptedText.split(':'); // Split the IV and encrypted text
//     const iv = Buffer.from(textParts.shift(), 'hex'); // Extract the IV
//     const encryptedTextBuffer = Buffer.from(textParts.join(':'), 'hex'); // Extract the encrypted text
//     const decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(ENCRYPTION_KEY, 'utf8'), iv); // Create decipher
//     let decrypted = decipher.update(encryptedTextBuffer, 'hex', 'utf8'); // Decrypt text
//     decrypted += decipher.final('utf8'); // Finalize decryption
//     return decrypted;
// };
// // FOR CRYPTO: Replace with a secure, secret key.



// *****************************************************************
// Middlewares
// *****************************************************************
const encryptPassword = require("../middlewares/EncryptPassword");
const assignOneDayToken = require("../middlewares/AssignOneDayToken");   // For Sign In
// const assignTwoDaysToken = require("../middlewares/AssignTwoDaysToken");
const assignThreeDaysToken = require("../middlewares/AssignThreeDaysToken");    // For Sign Up
const verifyToken = require("../middlewares/VerifyToken");
const mailSender = require("../middlewares/MailSender");
// *****************************************************************
// *****************************************************************









     


// Our CREATE ACCOUNT Logic starts here
exports.signUp = async (req, res) => {

    try {

        // Gets a unique number based on the current time
        const uniqueId = Date.now();

        // Payload
        const { id=23401, firstName, lastName, email, password, approvesTandC } = req.body;

        // FORM VALIDATION:  "Compulsory Payload"
        if (!(firstName && lastName && email && password)) {
            const responseData = {
                success: false,
                message: "Fill all the required inputs"
            };
            console.log("*************************************",
                "\n*********  SIGNUP  ATTEMPT  *********",
                "\n*************************************",
                "\nSignup Error: ", responseData.message + "\n\n");
            return res.status(200).json(responseData);
        };

        const emailExists = await User.findOne({ email: email.toLowerCase() });
        if (emailExists) {
            const responseData = {
                success: false,
                message: "E-mail exists. Sign In"
            };
            console.log("**************************\n***   SIGN-UP FAILED   ***\n**************************\nID: ", emailExists._id,"\nE-mail: ", emailExists.email, " exists\n\n");
            return res.status(200).json(responseData);
        };
        
        // const usernameExists = await User.findOne({ userName: username.toLowerCase() });
        // if (usernameExists) {
        //     const responseData = {
        //         success: false,
        //         message: "Username exists. Sign In"
        //     };
        //     // console.log("Username Exists: ", usernameExists);
        //     console.log("Username Exists: ", responseData);
        //     return res.status(200).json(responseData);
        // }
        

        // ***************************************************************//
        // Hash/Encrypt Password
        // ***************************************************************//
        const encryptedPassword = await encryptPassword(password);
       
    
        // ***************************************************************//
        // PICK A SINGLE ROLE
        // ***************************************************************//
        // const roleAdmin = await Role.findOne({ role: "ROLE_ADMIN" });
        // const roleEditor = await Role.findOne({ role: "ROLE_EDITOR" });
        const roleStaff = await Role.findOne({ role: "ROLE_STAFF" });
        // const roleUsers = await Role.findOne({ role: "ROLE_USERS" });
        // ***************************************************************//
        // PICK ALL ROLES
        // ***************************************************************//
        // const roleAdmin = await Role.findOne({ role: "ROLE_ADMIN" }), 
        // roleEditor = await Role.findOne({ role: "ROLE_EDITOR" }), 
        // roleStaff = await Role.findOne({ role: "ROLE_STAFF" }), 
        // roleUsers = await Role.findOne({ role: "ROLE_USERS" });        
        // ***************************************************************//
        // ***************************************************************//


        // ************************************ //
        // ***  FE: CREATE "USER" INSTANCE  *** //
        // ************************************ //      
        const user = new User({
            _id: uniqueId % id,
            // userName: username.toLowerCase(),           // sanitize: convert email to lowercase. NOTE: You must sanitize your data before forwarding to backend.
            firstName,
            lastName,
            email: email.toLowerCase(),
            password: encryptedPassword,
            approvesTandC,
            status: 'pending',
            // expirationInMs: encrypt(expiresIn),        // Encode: token lifespan
            roles: [{ ...roleStaff }]
        });
        // ******************************************************************************************************//
        // ***  FE: USE MIDDLEWARE: (JWT) TO ASSIGN "TOKEN" TO USER FOR AUTHENTICATION AND AUTHORIZATION  ***//
        // ******************************************************************************************************//
        const token = await assignThreeDaysToken(user._id);
        // ****************************************************
        // ***  FE: USE MIDDLEWARE: (JWT) TO VERIFY "TOKEN"
        // ****************************************************
        const tokenDecoded = await verifyToken(token);
        
        // RESULT:-  Token Details:  { id: 31825360, iat: 1722812853, exp: 1722816453 }
        // NOTE:-
        //      1) Token id (id): This is a custom payload claim, likely representing the user's unique identifier (e.g., user ID in the database).
        //      2) Issued At (iat): This is a standard JWT claim representing the time at which the token was issued. It's typically expressed as a Unix timestamp, which counts the number of seconds since January 1, 1970 (UTC).
        //      3) Expiration Time (exp): This is another standard JWT claim, indicating the time at which the token will expire. It's also expressed as a Unix timestamp.
        // Format using: new Date(tokenDecoded.exp * 1000) 
        // To Get Current Date Setting for Token Expiration Time to start counting from!
        const tokenExpiryDate = new Date(tokenDecoded.exp * 1000);
        user.tokenExpires = tokenExpiryDate;
        // **************************************** //
        // ***    FE: SAVE USER INFORMATION     *** //
        // **************************************** //
        const newUser = await user.save();
        // **************************************** //




        // // **************************************** //
        // // ***    BE: SAVE USER INFORMATION     *** //
        // // **************************************** //
        // const user = new User({ 
        //     _id: 123,
        //     userName: "gabby",
        //     firstName: "Guru", 
        //     lastName: "Gabby", 
        //     email: "test@email.com",
        //     // password: await encryptPassword("London123"),
        //     password: encryptedPassword,
        //     isVerified: false, 
        //     approvesTandC: false,  
        //     status: "rejected",
        //     roles: [
        //         {
        //             _id: roleAdmin._id, 
        //             role: roleAdmin.role, 
        //             createdAt: roleAdmin.createdAt, 
        //             updatedAt: roleAdmin.updatedAt,
        //         },
        //     ]
        // });
        // // ******************************************************************************************************//
        // // ***  BE: USE MIDDLEWARE: (JWT) TO CREATE "ACCESS-TOKEN" FOR USER AUTHENTICATION AND AUTHORIZATION  ***//
        // // ******************************************************************************************************//
        // const token = await createJWT(user._id);
        // // ****************************************************
        // // ***  BE: USE MIDDLEWARE: (JWT) TO VERIFY "TOKEN"
        // // ****************************************************
        // const decodedData = await jwt.verify(token, secretKey);
        // // console.log("Token Details: ", decodedData);
        // // RESULT:-  Token Details:  { id: 31825360, iat: 1722812853, exp: 1722816453 }
        // // NOTE:-
        // //     1) Token id (id): This is a custom payload claim, likely representing the user's unique identifier (e.g., user ID in the database).
        // //     2) Issued At (iat): This is a standard JWT claim representing the time at which the token was issued. It's typically expressed as a Unix timestamp, which counts the number of seconds since January 1, 1970 (UTC).
        // //     3) Expiration Time (exp): This is another standard JWT claim, indicating the time at which the token will expire. It's also expressed as a Unix timestamp.
        // // ******************************************************************************************************//
        // // ***  Add Generated TOKEN & TIME OF EXPIRY, to New User before Saving to DB ***//
        // // ******************************************************************************************************//
        // user.accessToken = token;
        // user.expirationInMs = decodedData.exp;
        // // **************************************** //
        // // ***    BE: SAVE USER INFORMATION     *** //
        // // **************************************** //
        // const newUser = await user.save();
        // // **************************************** //


        // ***************************************************************//
        // E-mail Service Config
        // ***************************************************************//
        await mailSender(token, newUser);

        // let valueOfEncodedText = decrypt(newUser.expirationInMs);
        // console.log("Encrypted token lifespan: ", valueOfEncodedText);


        console.log("\n*********************************************************",
            "\n*****        TOKEN GENERATED FOR NEW USER           *****",
            `\n*********************************************************`,
            `\nToken: ${token}`,
            // "\nToken Details: ", tokenDecoded,
            "\n\n*********************************************************",
            "\n*****          NEW USER ACCOUNT DETAILS             *****",
            "\n*********************************************************",
            `\nRegistration Status: ${newUser}`,
            "\n******************************************************************************************\n");
                
        const responseData = {
            success: true,
            // data: {
            //     userId: newUser,
            //     accessToken: token,
            // },
            data: newUser,
            message: "Successful",
        };
        return res.status(201).json(responseData);
    } catch (error) {
        // return res.status(409).json({ message: error.message});
        const responseData = { 
            success: false, 
            message: "Internal Server Error",
        };
        console.error("Unexpected error during account verification: ", error);
        return res.status(500).json(responseData);  
    }
};  // THOROUGHLY Tested === Working

// Our ACCOUNT Re-ACTIVATION Logic starts here
exports.reSignUp = async (req, res) => {

    const { email } = req.query;

    try {
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
            const responseData = {
                success: false,
                message: "No match found",
            }
            return res.status(404).json(responseData);
        }

        if (existingUser.isVerified) {
            const responseData = {
                success: false,
                message: "User is already verified",
            }
            return res.status(200).json(responseData);
        }


        // *************************************************************************************************//
        // ***  USE MIDDLEWARE: (JWT) TO CREATE "ACCESS-TOKEN" FOR USER AUTHENTICATION AND AUTHORIZATION  ***//
        // *************************************************************************************************//
        const token = await createJWT(existingUser._id);
        

        // ***************************************************************//
        // E-mail Service Config
        // ***************************************************************//
        await mailSender(token, existingUser);


        console.log("\n*********************************************************",
                    "\n*****    NEW TOKEN GENERATED FOR EXISTING USER      *****",
                    `\n*********************************************************
                    \nNew Access Token: ${token}`,
                    "\n\n*********************************************************",
                    "\n*****        EXISTING USER ACCOUNT DETAILS          *****",
                    `\n*********************************************************
                    \nExisting Account | Registration Status: ${existingUser}`,
                    "\n\n******************************************************************************************\n");
        const responseData = {
            success: true,
            data: existingUser,
            message: "Re-sent activation e-mail",
        };
        return res.status(200).json(responseData);
        
    } catch (error) {
        const responseData = { 
            success: false, 
            message: "Internal Server Error" 
        };
        console.error("Database error during account re-verification: ", error);
        return res.status(500).json(responseData); 
    }
};  // THOROUGHLY Tested === Working

// Our ACCOUNT VERIFICATION Logic starts here
exports.verifySignUp = async (req, res) => {

    try {
        const AuthHeader = req.headers.authorization;
        if (!AuthHeader || !AuthHeader.startsWith('Bearer ')) {
            const responseData = { 
                success: false, 
                message: "Unauthorized",
            };
            console.log("Token was not authorized by a User: ", responseData);
            return res.status(401).json(responseData);
        };
        
        const token = AuthHeader.split(" ")[1];
        const verifiedToken = await verifyToken(token);
        const _id = verifiedToken.id;

        const userExists = await User.findById(_id);
        if (!userExists) {
            // console.error('Token verification failed:', error.message);
            const responseData = { 
                success: false, 
                message: "User not found",
            };
            console.log("Invalid user: ", responseData);
            return res.status(500).json(responseData);
        }

        // Step 6: If user exists, find User by Email 
        // const email = userExists.email;   
        // Change Existing User status to "approved".
        // Assign the generated token to Existing User, as their accessToken..
        // Set isVerified as True for Existing User
        const dataToUpdate = {
            status: "approved",
            accessToken: token,
            isVerified: true,
        };
        // const updatedUser = await User.findOneAndUpdate({ email }, dataToUpdate, { new: true });               
        
        
        // Step 6: If user exists, find User by Email
        const updatedUser = await User.findOneAndUpdate({ email: userExists.email }, dataToUpdate, { new: true });               
    
        const responseData = {
            success: true,
            data: updatedUser,
            message: "Successful"
        };
        console.log("*********************************************************",
            "\n*****           NEW ACCOUNT VERIFICATION             ****",
            "\n*********************************************************",
            "\nVerification Status: ", responseData,
            "\n*********************************************************\n\n");
        res.status(200).json(responseData); // Send a success response
    
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            // console.error("Token has expired");
            const responseData = { 
                success: false, 
                message: "Token has expired",
            };
            console.log("Token verification status: ", responseData);
            return res.status(403).json(responseData);
        } else if (error.name === 'JsonWebTokenError') {
            // console.error("Token does not exist");
            const responseData = { 
                success: false, 
                message: "Token does not exist",
            };
            console.log("Token verification status: ", responseData);
            return res.status(401).json(responseData);
        } else if (error.name === 'MongoServerError') {
            // console.error("Mulitple user entry");
            const responseData = { 
                success: false, 
                message: "Mulitple user entry",
            };
            console.log("Mulitple user entry: ", responseData);
            return res.status(401).json(responseData);
        } else {
            const responseData = { 
                success: false, 
                message: "Internal Server Error",
            };
            console.error("Internal Server Error during account verification: ", error.message);
            return res.status(500).json(responseData);
        };
    };
};  // THOROUGHLY Tested === Working

// Our USER LOGIN Logic starts here
exports.logIn = async (req, res) => {

    try {

        // 0) Required Payload
        const { email, password } = req.body;

        // 1) Use E-mail to find User
        const existingUser = await User.findOne({ email });
        // 2) CHECK IF USER EXISTS
        if (!existingUser) {

            const responseData = { 
                success: false, 
                error: "Login Failed: Account with this details does not exist",
            };
            return res.status(404).json(responseData);
        };

        // 3) Use Middleware: 'bCrypt' to compare Password provided, with User's Password.
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        // 4) CHECK IF USER CORRECT
        if (!isPasswordCorrect) {      

            for (var i = 0; i < existingUser.roles.length; i++) {
                if (i < existingUser.roles.length) {
                    console.log("***************************************",
                        "\n*****      LOG-IN ATTEMPT BY      *****",
                        "\n***************************************",
                        // "\nUser ID: ", existingUser._id,
                        "\nUser Name: ", existingUser.firstName + " " + existingUser.lastName,
                        "\nUser E-mail: ", existingUser.email,
                        "\nUser Password is CORRECT: ", isPasswordCorrect,
                        "\n***************************************",
                        "\n***   ADDITIONAL USER INFORMATION  ***",
                        "\n***************************************",
                        "\nUser isVerified: ", existingUser.isVerified,
                        "\nUser Status: ", existingUser.status.toUpperCase(),
                        "\nUser ROLE(S): ", existingUser.roles[i].role,
                        "\nPrevious User AccessToken: ", existingUser.accessToken,
                        "\n***************************************",
                        "\n\n");
                };
            };

            const responseData = { 
                success: false, 
                error: "Incorrect email or password",
            };
            return res.status(401).json(responseData);
        };        

        // 5) Check if User Has Verified their Account Registration
        if (!existingUser.isVerified) {
            // ***********************************************************************************//
            // *************         UNVERIFIED USER ATTEMPTING TO LOG-IN           **************//
            // ***********************************************************************************//
    
            for (var i = 0; i < existingUser.roles.length; i++) {
                if (i < existingUser.roles.length) {
                    console.log("*******************************************************",
                        "\n*****      LOG-IN ATTEMPT BY UNVERIFIED USER      *****",
                        "\n*******************************************************",
                        // "\nUser ID: ", existingUser._id,
                        "\nUser Name: ", existingUser.firstName + " " + existingUser.lastName,
                        "\nUser E-mail: ", existingUser.email,
                        "\nUser Password is CORRECT: ", isPasswordCorrect,
                        "\n***************************************",
                        "\n***   ADDITIONAL USER INFORMATION  ***",
                        "\n***************************************",
                        "\nUser isVerified: ", existingUser.isVerified,
                        "\nUser Status: ", existingUser.status.toUpperCase(),
                        "\nUser ROLE(S): ", existingUser.roles[i].role,
                        "\nPrevious User AccessToken: ", existingUser.accessToken,
                        "\n***************************************",
                        "\n\n");
                };
            };

            // ***********************************************************************************//
            // NOTE:- Use the USER 'accessToken' for Authentication & Authorization
            // ***********************************************************************************//  
            const responseData = {
                success: false,
                message: `Login Failed: Kindly verify your account`
            };
            return res.status(401).json(responseData);
        };

        
        console.log("***********************************************",
            "\n******       🔐   ACTIVE USER  🔑        ******",
            "\n***********************************************",
            // "\nUser ID: ", existingUser._id,
            "\nUser Name: ", existingUser.firstName + " " + existingUser.lastName,
            "\nUser E-mail: ", existingUser.email,
            "\n**********************************************",
            "\n****      ADDITIONAL USER INFORMATION      ****",
            "\n***********************************************",
            "\nPrev. AccessToken: ", existingUser.accessToken,
            "\nPrev. AccessToken [TIME TO EXPIRE]: ", existingUser.tokenExpires,
            "\n***********************************************",
            "\n\n");
 
        // 6) Create Token for User logging-in.  (NOTE:-  Token will have a Life-span once created.)
        const token = await assignOneDayToken(existingUser._id);    // console.log("Generated Token Data: ", token);
        
        // 7) Verify token to get Lifespan of Token
        const verifiedToken = await verifyToken(token);   // console.log("Verified or Decoded Token Data: ", verifiedToken);
        const tokenExpiryDate = new Date(verifiedToken.exp * 1000);
        existingUser.tokenExpires = tokenExpiryDate;
        
        existingUser.accessToken = token;
        const loggedInUser = await existingUser.save();
      
        for (var n = 0; n < loggedInUser.roles.length; n++) {
            if (n < loggedInUser.roles.length) {
                // ***********************************************************************************//
                // *************                CURRENT LOGGED-IN USER                  **************//
                // ***********************************************************************************//
                console.log("***********************************************",
                    "\n******      🔐  LOGIN SUCCESSFUL 🔑      ******",
                    "\n***********************************************",
                    // "\nUser ID: ", loggedInUser._id,
                    "\nUser Name: ", loggedInUser.firstName + " " + loggedInUser.lastName,
                    "\nUser E-mail: ", loggedInUser.email,
                    "\n***********************************************",
                    "\n****      ADDITIONAL USER INFORMATION      ****",
                    "\n***********************************************",
                    "\nUser ROLE(S): ", loggedInUser.roles[n].role,
                    // "\nUser isVerified: ", loggedInUser.isVerified,
                    "\nUser Status: ", loggedInUser.status.toUpperCase(),
                    "\nUser AccessToken: ", loggedInUser.accessToken,
                    "\nSESSION WILL EXPIRE: ", loggedInUser.tokenExpires,
                    "\n***********************************************",
                    "\n=====>       CURRENT LOGGED-IN USER      <=====",
                    "\n***********************************************",
                    "\n\n");
            };
        };
        
        // ***********************************************************************************//
        // NOTE:- By assigning Token to Logged-in User,
        //        Now you can use User's "accessToken" 
        //        for Headers Authentication & Authorization
        // ***********************************************************************************//  
        const responseData = {
            success: true,
            data: loggedInUser,
            // data: {
            //     userId: existingUser._id,
            //     accessToken: existingUser.accessToken,
            // },
            message: "Successful",
        };       
        return res.status(200).json(responseData);

    } catch (error) {
        const responseData = { 
            success: false, 
            message: "Internal Server Error",
        };
        console.error("Unexpected error during Login: ", error);
        return res.status(500).json(responseData);  
    }

}  // THOROUGHLY Tested === Working

// Our FIND All ADMINS Logic starts here
exports.findAllAdmins = async (req, res) => {
    
    try {
        // const { page = parseInt(1), limit = parseInt(10), status } = req.query; // Destructure query parameters  
        
        const status = req.query.status || "";
        // Get Pagination Parameters from the request query
        const page = parseInt(req.query.page, 10) || 1;
        const limit = parseInt(req.query.limit, 10) || 10;
        const skip = (page - 1) * limit;
            
        const query = {
            'roles.role': ROLES.ADMIN,
        };

        // Add "status" filter
        if (status) {
            query.status = status;
        };

        // Query User Status & Pagination logic
        const staffsList = await User.find(query)
                                .skip(skip)
                                .limit(limit);
        console.log("STAFFS LIST: ", staffsList);       


        const totalAdminUsers = await User.countDocuments(query); // Total number of users with the given status
        const totalPages = Math.ceil(totalAdminUsers / limit); // Calculate total pages
        const pagination = {
            staffsRecord: totalAdminUsers,
            page,
            limit,
            lastPage: totalPages,
        };
        console.log("PAGINATION: ", pagination);
        
        const responseData = {
            success: true,
            data: {
                staffsList,
                pagination
            },
            message: "Items retrieved successfully",
        }
        return res.status(200).json(responseData);

    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).send(`Internal Server Error: ${error.message}`);
    };
};  // THOROUGHLY Tested === Working

// Our FIND All USERS Logic starts here
exports.findAllUsers = async (req, res) => { 

    const { page = 1, limit = 10, status } = req.query; // Destructure query parameters   
    
    try {
        let query = {
            'roles.role': ROLES.USERS,
        };

        if (status) {
            query.status = status;
        };
 
        // Pagination logic
        const usersList = await User.find(query)
                                .skip((page - 1) * limit)
                                .limit(parseInt(limit));
        // console.log("USERS LIST: ", usersList);

        const totalUsers = await User.countDocuments(query); // Total number of users with the given status
        const totalPages = Math.ceil(totalUsers / limit); // Calculate total pages


        const pagination = {
            usersRecord: totalUsers,
            page,
            limit,
            lastPage: totalPages,
        };

        const responseData = {
            success: true,
            data: {
                usersList,
                pagination
            },
            message: "Items retrieved successfully",
        }
        res.status(200).json(responseData);

    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).send(`Internal Server Error: ${error.message}`);
    };
};  // THOROUGHLY Tested === Working

// Our FIND SINGLE USER by ID Logic starts here
exports.findUserById = async (req, res) => {
    
    try {
        const _id = req.params.id;
        const user = await User.findById(_id);
        // const decodedExpiresIn = decrypt(user.expirationInMs); // Decode here
        // console.log("Decoded Token Expiration Time: ", decodedExpiresIn);

        // if (!(user)) {
        //     const responseData = {
        //         success: false,
        //         message: "User not found",
        //     };
        //     console.log("Find User by ID: ", responseData);
        //     return res.status(404).json(responseData);
        // }
        
        const responseData = {
                success: true,
                data: user,
                message: "Successful",
        };
        console.log("Find User by ID: ", responseData);
        return res.status(200).json(responseData);

    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
    };
};  // THOROUGHLY Tested === Working

// Finding All isActivated Users
exports.findAllActive = async (req, res) => {
    //  res.setHeader('Content-Type', 'application/json');
    //  NOTE:  To filter a search results, specify a search condition using a "key-value" pair within curly braces, within the find method!
    //  For example, User.find({ username: 'john' }) would find all users with the username 'john'.     i.e  username = "john"
    //  In this case, We are searching for records where the isActive property is equal to true.        i.e  isActive = true
    try {

        const allActiveUsers = await User.find({ isActive: true });
        if (!allActiveUsers) {
            const responseData = {
                success: false,
                message: "RETRIEVE ALL USERS: Failed"
            };
            return res.status(404).json(responseData);
        }

        const responseData = {
            success: true,
            data: allActiveUsers,
            message: "RETRIEVE ALL ACTIVE USERS: Successful"
        };
        return res.status(200).json(responseData);

    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
        // return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Update User Information
exports.updateUserById = async (req, res) => {
    try {
        // const _id = req.params.id;
        const { userName, email, phone, address, address2, city, state, country, zipCode, isVerified } = req.body;

        // To Add New Roles to Existing User's Account
        // const roleAdmin = await Role.findOne({ role: "ROLE_ADMIN" });
        // const roleEditor = await Role.findOne({ role: "ROLE_EDITOR" });
        // const roleStaff = await Role.findOne({ role: "ROLE_STAFF" });
        // const roleUsers = await Role.findOne({ role: "ROLE_USERS" });
        
        const dataToUpdate = {
            userName: userName.toLowerCase(),
            phone,
            address,
            address2,
            city,
            state,
            country,
            zipCode,
            isVerified,
            //    roles: [
            //         { 
            //             _id: roleAdmin._id, 
            //             role: roleAdmin.role, 
            //             createdAt: roleAdmin.createdAt, 
            //             updatedAt: roleAdmin.updatedAt 
            //         },
            //         { 
            //             _id: roleEditor._id, 
            //             role: roleEditor.role, 
            //             createdAt: roleEditor.createdAt, 
            //             updatedAt: roleEditor.updatedAt 
            //         },
            //         { 
            //             _id: roleStaff._id, 
            //             role: roleStaff.role, 
            //             createdAt: roleStaff.createdAt, 
            //             updatedAt: roleStaff.updatedAt 
            //         },
            //         { 
            //             _id: roleUsers._id, 
            //             role: roleUsers.role, 
            //             createdAt: roleUsers.createdAt, 
            //             updatedAt: roleUsers.updatedAt 
            //         },
            //     ]
        };

        // Use $or to find the user by username or email and update it
        const updatedUser = await User.findOneAndUpdate({ email }, dataToUpdate, { new: true });
        if (!updatedUser) {
            const responseData = {
                success: false,
                message: "No match found"
            };
            return res.status(404).json(responseData);
        }

        const token = createJWT(updatedUser._id);
        updatedUser.accessToken = token;

        // User updated successfully
        const responseData = {
            success: true,
            data: updatedUser,
            message: 'User updated successfully',
        };
        console.log("EXISTING USER DATA: ", updatedUser.email + " was updated!", "\nUPDATED USER DATA: ", responseData.data);
        return res.status(200).json(responseData);

    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
        // return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

// Deleta a User with the Specified id in the request
exports.deleteUser = async (req, res) => {
    try {

        const { _id } = req.params.id;
        const userId = User.findByIdAndRemove(_id, { useFindAndModify: false });
        if (!(userId)) {
            const responseData = {
                success: false,
                message: `Cannot delete User with ID = ${userId}. User was not found!`
            };
            return res.status(404).json(responseData);
        } else {
            const responseData = {
                success: true,
                data: userId,
                message: "User deleted successfully!",
            };
            return res.status(200).json(responseData);
        }
    } catch (error) {
        return res.status(500).send(`Internal Server Error ${error}`);
        // return res.status(500).json({ message: `Could not delete User with ID = ${id}`, err });
    }
};

// Deleta all Users from the Database
exports.deleteAllUsers = (req, res) => {
    //  res.setHeader('Content-Type', 'application/json');
    try {
        const users = User.deleteMany({});
        if (!users) {
            return res.status(404).json({ message: "Failed to execute action!" });
        } else {
            return res.status(200).json({ message: `${users.deletedCount} Users was deleted successfully!` });
        }
    } catch (error) {
        return res.status(500).send(`Internal Server Error ${error}`);
        // return res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};
















// FOR ENCYRPTION  !!!
// Why Use Buffer.from?
// Buffer.from is used to ensure that the encryption key and IV are in the correct format:

// Encryption Key: AES-256 requires a 32-byte key. Buffer.from converts the key from a string into a buffer of bytes.
// IV: The IV needs to be in a specific byte format. Buffer.from converts the hexadecimal string representation of the IV back into bytes for the cipher functions.
// Using Buffer.from ensures that the data is correctly formatted for encryption and decryption.





// var hasNext, 
        //     hasPrev,
        //     next, 
        //     previous;
        
        
        // if () {
        //     hasNext = true
        //     hasPrev = false
        //     next = parseInt(page) + 1
        //     previous = parseInt(page) - 1
        // } else  if () {
        //     hasNext = true
        //     hasPrev = true
        //     next = parseInt(page) + 1
        //     previous = parseInt(page) - 1
        // } else {
        //     hasNext = false
        //     hasPrev = true
        //     next = null
        //     previous = parseInt(page) - 1
        // };
        

        // const pagination = {
        //     currentPage: parseInt(page),
        //     hasNext: hasNext,
        //     next: next,
        //     hasPrev: hasPrev,
        //     previous: previous,
        //     lastPage: totalPages,                       
        //     numberPerPage: parseInt(limit),
        // }
        





// *** NOTE: ***
// We don’t need to write CRUD functions, Mongoose Model supports all of them:
// create a new Tutorial: object.save()
// find a Tutorial by id: findById(id)
// retrieve all Tutorials: find()
// update a Tutorial by id: findByIdAndUpdate(id, data)
// remove a Tutorial: findByIdAndRemove(id)
// remove all Tutorials: deleteMany()
// find all Tutorials by title: find({ title: { $regex: new RegExp(title), $options: “i” } })
//
// These functions will be used in Our Controller.



// const verificationLink = `<button style="background:limegreen;border:0;padding:15px 20px;border-radius:3px;"><a style="color:white;font-weight:500;text-decoration:none;" href="${verifyActivationLink}" alt="account verification">Verify your email address</a></button>`;
// :visited {background: green}
// :hover {background: yellow}
// :visited:hover {background: purple}
// // Message object
//    let message = {
//     from: 'your_email@gmail.com',
//     to: 'recipient@example.com',
//     subject: 'Subject of your email',
//     text: 'This is the body of your email'
// }