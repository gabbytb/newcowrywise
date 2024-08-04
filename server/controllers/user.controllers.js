const db = require("../models");
const User = db.users;
const Role = db.roles;
const bcrypt = require("bcrypt");
const crypto = require('crypto');
const jwt = require("jsonwebtoken");



// FOR JWT: Replace with a secure, secret key.
const secretKey = process.env.secretKey || 'your-32-character-secret-key-here'; // 32 bytes for AES-256;
const expiresIn = process.env.expiresIn || 'your-32-character-secret-key-here'; // 32 bytes for AES-256;



// FOR CRYPTO: Replace with a secure, secret key.
const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || 'your-32-character-secret-key-here'; // 32 bytes for AES-256
const IV_LENGTH = 16; // AES block size in bytes
// Encrypt function
const encrypt = (textToBeEncrypted) => {
    const iv = crypto.randomBytes(IV_LENGTH); // Generate a random initialization vector
    const cipher = crypto.createCipheriv('aes-256-ctr', Buffer.from(ENCRYPTION_KEY, 'utf8'), iv); // Create cipher
    let encrypted = cipher.update(textToBeEncrypted, 'utf8', 'hex'); // Encrypt text
    // let encrypted = cipher.update(String(textToBeEncrypted), 'utf8', 'hex'); // Encrypt text
    encrypted += cipher.final('hex'); // Finalize encryption
    return iv.toString('hex') + ':' + encrypted; // Return IV + encrypted text
};
// Decrypt function
const decrypt = (encryptedText) => {
    const textParts = encryptedText.split(':'); // Split the IV and encrypted text
    const iv = Buffer.from(textParts.shift(), 'hex'); // Extract the IV
    const encryptedTextBuffer = Buffer.from(textParts.join(':'), 'hex'); // Extract the encrypted text
    const decipher = crypto.createDecipheriv('aes-256-ctr', Buffer.from(ENCRYPTION_KEY, 'utf8'), iv); // Create decipher
    let decrypted = decipher.update(encryptedTextBuffer, 'hex', 'utf8'); // Decrypt text
    decrypted += decipher.final('utf8'); // Finalize decryption
    return decrypted;
};
// FOR CRYPTO: Replace with a secure, secret key.



// *****************************************************************
// Middlewares
// *****************************************************************
const encryptPassword = require("../middlewares/EncryptPassword");
const createJWT = require("../middlewares/GenerateToken");
const mailSender = require("../middlewares/MailSender");
// *****************************************************************
// *****************************************************************









     


// Our Account Creation Logic starts here
exports.signUp = async (req, res) => {

    try {

        // Generate a Random Number
        var randNum = await Math.floor(366 * Math.random()) + Math.floor(765 * Math.random()) + Math.floor(876 * Math.random());
        
        // Payload
        const { id, firstName, lastName, email, password, approvesTandC } = req.body;

        // FORM VALIDATION:  "Compulsory Payload"
        if (!(firstName && lastName && email && password)) {
            const responseData = {
                success: false,
                message: "Fill all the required inputs."
            };
            console.log("*************************************",
                "\n*********  SIGNUP  ATTEMPT  *********",
                "\n*************************************",
                "\nSignup Error: ", responseData.message + "\n\n");
            return res.status(200).json(responseData);
        }

        const emailExists = await User.findOne({ email: email.toLowerCase() });
        if (emailExists) {
            const responseData = {
                success: false,
                message: "E-mail exists. Please sign-in."
            };
            console.log("E-mail Exists: ", emailExists);
            return res.status(200).json(responseData);
        }
        
        // const usernameExists = await User.findOne({ userName: username.toLowerCase() });
        // if (usernameExists) {
        //     const responseData = {
        //         success: false,
        //         message: "Username exists. Please sign-in."
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
        const roleAdmin = await Role.findOne({ role: "ROLE_ADMIN" });
        // const roleEditor = await Role.findOne({ role: "ROLE_EDITOR" }),
        // const roleStaff = await Role.findOne({ role: "ROLE_STAFF" });
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


        // **************************************** //
        // ***    FE: SAVE USER INFORMATION     *** //
        // **************************************** //
        const user = new User({
            _id: id * randNum,
            // userName: username.toLowerCase(),           // sanitize: convert email to lowercase. NOTE: You must sanitize your data before forwarding to backend.
            firstName,
            lastName,
            email: email.toLowerCase(),          // sanitize: convert email to lowercase. NOTE: You must sanitize your data before forwarding to backend.
            password: encryptedPassword,
            approvesTandC,
            status: 'pending',
            expirationInMs: encrypt(expiresIn),        // Encode: token lifespan
            roles: [
                {
                    _id: roleAdmin._id,
                    role: roleAdmin.role,
                    createdAt: roleAdmin.createdAt,
                    updatedAt: roleAdmin.updatedAt,
                },
                // {
                //     _id: roleEditor._id, 
                //     role: roleEditor.role, 
                //     createdAt: roleEditor.createdAt, 
                //     updatedAt: roleEditor.updatedAt, 
                // },
                // {
                //     _id: roleStaff._id, 
                //     role: roleStaff.role, 
                //     createdAt: roleStaff.createdAt, 
                //     updatedAt: roleStaff.updatedAt, 
                // },
                // {
                //     _id: roleUsers._id, 
                //     role: roleUsers.role, 
                //     createdAt: roleUsers.createdAt, 
                //     updatedAt: roleUsers.updatedAt,
                // }
            ],
        });
        const newUser = await user.save();        
        // ******************************************************************************************************//
        // ***  FE: USE MIDDLEWARE: (JWT) TO CREATE "ACCESS-TOKEN" FOR USER AUTHENTICATION AND AUTHORIZATION  ***//
        // ******************************************************************************************************//
        const token = await createJWT(newUser._id);
        
   
        // **************************************** //
        // ***    BE: SAVE USER INFORMATION     *** //
        // **************************************** //
        // const user = new User({ 
        //     _id: 123,
        //     userName: "gabby",
        //     firstName: "Oyebanji", 
        //     lastName: "Gabriel", 
        //     email: "idkraqinz@gmail.com",
        //     password: await encryptPassword("London123"),
        //     isVerified: true, 
        //     approvesTandC: true,  
        //     status: "approved",
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
        // // ******************************************************************************************************//
        // // ***  Add Generated TOKEN to New User before Saving to DB ***//
        // // ******************************************************************************************************//
        // user.accessToken = token;
        // user.expirationInMs = encrypt(expiresIn),        // Encode: token lifespan
        // const newUser = await user.save();


        // ***************************************************************//
        // E-mail Service Config
        // ***************************************************************//
        await mailSender(token, newUser);

        // let valueOfEncodedText = decrypt(newUser.expirationInMs);
        // console.log("Encrypted token lifespan: ", valueOfEncodedText);


        console.log("\n*********************************************************",
            "\n*****        TOKEN GENERATED FOR NEW USER           *****",
            `\n*********************************************************
            \nAccess Token: ${token}`,
            "\n\n*********************************************************",
            "\n*****          NEW USER ACCOUNT DETAILS             *****",
            `\n*********************************************************
            \nRegistration Status: ${newUser}`,
            "\n\n******************************************************************************************\n");
                
        const responseData = {
            success: true,
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
};

// Our Account Re-Activation Logic starts here
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
}

// Our Account Verification Logic starts here
// exports.verifySignUp = async (req, res) => {
//     const AuthHeader = req.headers.authorization;
//     if (!AuthHeader || !AuthHeader.startsWith('Bearer ')) {
//         const responseData = { 
//             success: false, 
//             message: "Unauthorized: Bearer token required",
//         };
//         console.log("Token required to verify account: ", responseData);
//         return res.status(403).json(responseData);
//     }
    
//     const token = AuthHeader.split(" ")[1];
//     try {          
//         const existingUser = await jwt.verify(token, secretKey);
//         const _id = existingUser.id;
//         const user = await User.findById(_id);
//         if (!user) {
//             const dataToUpdate = {
//                 status: 'rejected',
//                 isVerified: false,
//                 accessToken: token,
//             };
//             const email = user.email;
//             await User.findOneAndUpdate({ email }, dataToUpdate, { new: true });

//             const responseData = { 
//                 success: false,
//                 message: "User not found",
//             };
//             console.log("Account verification failed: ", responseData);
//             return res.status(404).json(responseData);
//         } else {
//             const dataToUpdate = {
//                 status: 'approved',
//                 isVerified: true,
//                 accessToken: token,
//             };
//             const email = user.email;
//             const updatedUser = await User.findOneAndUpdate({ email }, dataToUpdate, { new: true });

//             const responseData = {
//                 success: true,
//                 data: updatedUser,
//                 message: "Account verification successful",
//             };
//             console.log("Account verification status: ", responseData);
//             return res.status(200).json(responseData);
//         };
//     } catch (error) {
//         const responseData = { 
//             success: false, 
//             message: "Internal Server Error",
//         };
//         console.error("Unexpected error during account verification: ", error);
//         return res.status(500).json(responseData);
//     }
// };
// exports.verifySignUp = async (req, res) => {
//     try {
//         // Step 1: Get the authorization header from the request
//         const AuthHeader = req.headers.authorization;
        
//         // Step 2: Check if the authorization header is present and starts with 'Bearer '
//         if (!AuthHeader || !AuthHeader.startsWith('Bearer ')) {
//             const responseData = { 
//                 success: false, 
//                 message: "Unauthorized",  // No token provided
//             };
//             console.log("Missing Token for Account Verification: ", responseData);
//             return res.status(401).json(responseData); // Send a 401 Unauthorized response
//         }
        
//         // Step 3: Extract the token from the authorization header
//         const token = AuthHeader.split(" ")[1];
        
//         // Step 4: Verify the token using a secret key
//         const existingUser = await jwt.verify(token, secretKey);
        
//         // Step 5: If the token is valid, find the user by ID
//         const _id = existingUser.id;
//         const user = await User.findById(_id);
        
//         if (user) {
//             // Step 6: If user exists, update their status to "approved" and set them as verified
//             const email = user.email;   
//             const dataToUpdate = {
//                 status: "approved",
//                 accessToken: token,
//                 isVerified: true,
//             };
//             const updatedUser = await User.findOneAndUpdate({ email }, dataToUpdate, { new: true });               
        
//             const responseData = {
//                 success: true,
//                 data: updatedUser,
//                 message: "Successful"
//             };
//             console.log("*********************************************************",
//                 "\n*****           NEW ACCOUNT VERIFICATION             ****",
//                 "\n*********************************************************",
//                 "\nVerification Status: ", responseData,
//                 "\n*********************************************************\n\n");
//             return res.status(200).json(responseData); // Send a success response
//         } else {
//             // Step 7: If the user does not exist
//             const responseData = {
//                 success: false,
//                 message: "user not found",
//             };
//             console.log("*********************************************************",
//                 "\n*****           NEW ACCOUNT VERIFICATION             ****",
//                 "\n*********************************************************",
//                 "\nVerification Status: ", responseData,
//                 "\n*********************************************************\n\n");
//             return res.status(404).json(responseData); // Send a 404 Not Found response
//         };

//     } catch (error) {
//         // Step 8: Error handling for different cases
//         if (error.name === 'TokenExpiredError') {
//             // If the token has expired
//             const responseData = {
//                 errorStatus: false,
//                 errorMessage: "Token has expired",
//             };
//             console.error('Token verification error: ', error); // Log the original error for debugging
//             return res.status(401).json(responseData.data); // Send a 401 Unauthorized response

//         } else if (error.name === "JsonWebTokenError") {
//             // If the token is invalid
//             const responseData = {
//                 errorStatus: false,
//                 errorMessage: "Token does not exist",
//             };
//             console.error('Token verification error: ', error); // Log the original error for debugging
//             return res.status(401).json(responseData.data); // Send a 401 Unauthorized response

//         } else {
//             // Catch any other unexpected errors
//             const responseData = {
//                 errorStatus: false,
//                 errorMessage: "An unexpected error occurred",
//             };
//             console.error('Unexpected error: ', error); // Log the original error for debugging
//             return res.status(500).json(responseData.data); // Send a 500 Internal Server Error response
//         };
//     };
// };

exports.verifySignUp = async (req, res) => {

    const AuthHeader = req.headers.authorization;
    if (!AuthHeader || !AuthHeader.startsWith('Bearer ')) {
        const responseData = { 
            success: false, 
            message: "Unauthorized",
        };
        console.log("Token required to verify account: ", responseData);
        return res.status(401).json(responseData);
    }
    
    const token = AuthHeader.split(" ")[1];
    try {
        const decodedData = await jwt.verify(token, secretKey);
        console.log('Token is valid:', decodedData);

        // Additional logic after successful token verification
        const _id = decodedData.id;
        const user = await User.findById(_id);
        
        if (decodedData.id || !user._id) {
            // console.error('Token verification failed:', error.message);
            const responseData = { 
                success: false, 
                message: "User not found",
            };
            console.log("Invalid user: ", responseData);
            return res.status(500).json(responseData);
        }

        // Step 6: If user exists, update their status to "approved" and set them as verified
        const email = user.email;   
        const dataToUpdate = {
            status: "approved",
            accessToken: token,
            isVerified: true,
        };
        const updatedUser = await User.findOneAndUpdate({ email }, dataToUpdate, { new: true });               
    
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
        } else {
            // console.error('Token verification failed:', error.message);
            const responseData = { 
                success: false, 
                message: "Internal Server Error",
            };
            console.error("Unexpected error during account verification: ", error);
            return res.status(500).json(responseData);
        };
    };
};

// Our Login Logic starts here
exports.logIn = async (req, res) => {

    try {
        const { email, password } = req.body;

        // 1) Required Payload.
        if (!(email && password)) {
            const responseData = { 
                success: false, 
                message: "All fields are required.",
            };
            console.log("*************************************",
                        "\n**********  LOGIN ATTEMPT  **********",
                        "\n*************************************",
                        "\nLogin Error: ", responseData.message + "\n\n");
            return res.status(200).json(responseData);
        };

        // 2) Check if E-mail belongs to a Registered User.
        const user = await User.findOne({ email });        
        if (!user) {        
            const responseData = { 
                success: false, 
                message: "Incorrect password or email.",
            };
            console.log("***********************************",
                        "\n*****    LOG-IN ATTEMPT BY    *****",
                        "\n***********************************",
                        "\nAccount ID: ", user._id,
                        "\nAccount Owner: ", user.firstName + " " + user.lastName,
                        "\nAccount E-mail: ", user.email,
                        "\nIS PASSWORD CORRECT?: ", auth +
                        "\nAccount Token: ", user.accessToken,
                        "\n***********************************\n");
            return res.status(200).json(responseData);
        }

        // 3) Use Middleware: 'bCrypt' to compare Password provided, with User's Password.
        const auth = await bcrypt.compare(password, user.password);
        if (!auth) {        
            const responseData = { 
                success: false, 
                message: "Incorrect password or email.",
            };
            console.log("***********************************",
                        "\n*****    LOG-IN ATTEMPT BY    *****",
                        "\n***********************************",
                        "\nAccount ID: ", user._id,
                        "\nAccount Owner: ", user.firstName + " " + user.lastName,
                        "\nAccount E-mail: ", user.email,
                        "\nIS PASSWORD CORRECT?: ", auth +
                        "\nAccount Token: ", user.accessToken,
                        "\n***********************************\n");
            return res.status(200).json(responseData);
        }

        // 4) Check if User Has Verified their Account Registration
        if (!(user.isVerified && user.accessToken)) {
            // ***********************************************************************************//
            // *************         EXISTING USER ATTEMPTING TO LOG-IN             **************//
            // ***********************************************************************************//
            console.log("***********************************",
                        "\n*****    LOG-IN ATTEMPT BY    *****",
                        "\n***********************************",
                        "\nAccount ID: ", user._id,
                        "\nAccount Owner: ", user.firstName + " " + user.lastName,
                        "\nAccount E-mail: ", user.email,
                        "\nAccount Token: ", user.accessToken,
                        "\nAccount isVerified: ", user.isVerified,
                        "\nACCOUNT HAVE ROLE(S): ", user.roles, "\n");
            // ***********************************************************************************//
            // NOTE:- Use USER 'accessToken' for Authentication & Authorization
            // ***********************************************************************************//  
            const responseData = {
                success: false,
                data: user,
                message: `Kindly verify your account.`
            };
            return res.status(200).json(responseData);
        }
        

        // 5) Assign Token to Logged-In User
        // NOTE:-  Token has a Life-span.
        const token = await createJWT(user._id);
        user.accessToken = token;
        
        // ***********************************************************************************//
        // *************                CURRENT LOGGED-IN USER                  **************//
        // ***********************************************************************************//
        console.log("***********************************************",
            "\n******      🔐  LOGIN SUCCESSFUL 🔑      ******",
            "\n***********************************************",
            "\n=====>       CURRENT LOGGED-IN USER      <=====",
            "\n***********************************************",
            "\nAccount ID: ", user._id,
            "\nAccount Owner: ", user.firstName + " " + user.lastName,
            "\nAccount E-mail: ", user.email,
            "\nAccount Token: ", user.accessToken,
            "\nAccount isVerified: ", user.isActivated,
            "\nACCOUNT HAVE ROLE(S): ", user.roles, "\n");
        // ***********************************************************************************//
        // NOTE:- By assigning Token to Logged-in User,
        //        Now you can use User's "accessToken" 
        //        for Headers Authentication & Authorization
        // ***********************************************************************************//  
        const responseData = {
            success: true,
            data: user,
            message: "Successful",
        };
        return res.status(200).json(responseData);
        
    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }
}

// Finding All ADMINS
exports.findAllAdmins = async (req, res) => {

    const { page = 1, limit = 10, status } = req.query; // Destructure query parameters   
    
    try {
        let query = {};

        // Add "status" filter
        if (status) {
            query.status = status;
        };
        
        // Pagination logic
        const staffsList = await User.find(query)
                                .skip((page - 1) * limit)
                                .limit(parseInt(limit));
        // console.log("STAFFS LIST: ", staffsList);

        const totalAdminUsers = await User.countDocuments(query); // Total number of users with the given status
        const totalPages = Math.ceil(totalAdminUsers / limit); // Calculate total pages


        const pagination = {
            staffsRecord: totalAdminUsers,
            lastPage: totalPages,
        };

        const responseData = {
            success: true,
            data: {
                staffsList,
                pagination
            },
            message: "Items retrieved successfully",
        }
        res.status(200).json(responseData);

    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).send(`Internal Server Error: ${error.message}`);
    };
};

// Finding All USERS
exports.findAllUsers = async (req, res) => {

    const { page = 1, limit = 10, status } = req.query; // Destructure query parameters   
    
    try {
        let query = {};

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
};

// Find a Single User by their ID
exports.findUserById = async (req, res) => {
    
    try {
        const _id = req.params.id;
        const user = await User.findById(_id);
        const decodedExpiresIn = decrypt(user.expirationInMs); // Decode here
        console.log("Decoded Token Expiration Time: ", decodedExpiresIn);

        if (!(user)) {
            const responseData = {
                success: false,
                message: "User not found",
            };
            console.log("Find User by ID: ", responseData);
            return res.status(404).json(responseData);
        }
        

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
};

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