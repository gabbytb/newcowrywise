const db = require("../models");
const User = db.users;
const Role = db.roles;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { secretKey } = process.env;


// *****************************************************************
// Middlewares
// *****************************************************************
const encryptPassword = require("../middlewares/EncryptPassword");
const createJWT = require("../middlewares/GenerateToken");
const mailSender = require("../middlewares/MailSender");
// *****************************************************************
// *****************************************************************






            

// Our Account Creation Logic starts here
exports.createAccount = async (req, res) => {

    try {

        // Generate a Random Number
        const randNum = await Math.floor(366 * Math.random()) + Math.floor(765 * Math.random()) + Math.floor(876 * Math.random());
        
        // Payload
        const { id, username, firstName, lastName, email, password, approvalTandC, isActivated, } = req.body;

        // FORM VALIDATION:  "Compulsory Payload"
        if (!( username && firstName && lastName && email && password )) {
            const responseData = {
                success: false,
                message: 'Fill all the required inputs.'
            };
            console.log("Payload missing: ", responseData);
            return res.status(200).json(responseData);
        }

        const emailExists = await User.findOne({ email: email.toLowerCase() });
        if (emailExists) {
            const responseData = {
                success: false,
                message: "E-mail exists. Please sign-in."
            };
            // console.log("E-mail Exists: ", emailExists);
            console.log("E-mail Exists: ", responseData);
            return res.status(200).json(responseData);
        }
        
        const usernameExists = await User.findOne({ username: username.toLowerCase() });
        if (usernameExists) {
            const responseData = {
                success: false,
                message: "Username exists. Please sign-in."
            };
            // console.log("Username Exists: ", usernameExists);
            console.log("Username Exists: ", responseData);
            return res.status(200).json(responseData);
        }


        // ***************************************************************//
        // Hash/Encrypt Password
        // ***************************************************************//
        const encryptedPassword = await encryptPassword(password);
       
    
        // ***************************************************************//
        // PICK A SINGLE ROLE
        // ***************************************************************//
        // const roleAdmin = await Role.findOne({ role: "ROLE_ADMIN" });
        // const roleStaff = await Role.findOne({ role: "ROLE_STAFF" });
        const roleUsers = await Role.findOne({ role: "ROLE_USERS" });
        // ***************************************************************//
        // PICK ALL ROLES
        // ***************************************************************//
        // const roleAdmin = await Role.findOne({ role: "ROLE_ADMIN" }), 
        // roleEditor = await Role.findOne({ role: "ROLE_EDITOR" }), 
        // roleStaff = await Role.findOne({ role: "ROLE_STAFF" }), 
        // roleUsers = await Role.findOne({ role: "ROLE_USERS" });        
        // ***************************************************************//
        // ***************************************************************//


        // ************************************* //
        // ***     SAVE USER INFORMATION     *** //
        // ************************************* //
        const newUser = new User({
            _id: id * randNum,
            username: username.toLowerCase(),           // sanitize: convert email to lowercase. NOTE: You must sanitize your data before forwarding to backend.
            firstName,
            lastName,
            email: email.toLowerCase(),          // sanitize: convert email to lowercase. NOTE: You must sanitize your data before forwarding to backend.
            password: encryptedPassword,
            approvalTandC,
            isActivated,
            status: 'pending',
            roles: [
                // {
                //     _id: roleAdmin._id,
                //     role: roleAdmin.role,
                //     createdAt: roleAdmin.createdAt,
                //     updatedAt: roleAdmin.updatedAt,
                // },
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
                {
                    _id: roleUsers._id, 
                    role: roleUsers.role, 
                    createdAt: roleUsers.createdAt, 
                    updatedAt: roleUsers.updatedAt,
                }
            ],
        });
        const user = await newUser.save();


        // *************************************************************************************************//
        // ***  USE MIDDLEWARE: (JWT) TO CREATE "ACCESS-TOKEN" FOR USER AUTHENTICATION AND AUTHORIZATION  ***//
        // *************************************************************************************************//
        const token = await createJWT(user._id);
        

        // ***************************************************************//
        // E-mail Service Config
        // ***************************************************************//
        await mailSender(token, user);


        console.log("\n*********************************************************",
            "\n*****        TOKEN GENERATED FOR NEW USER           *****",
            `\n*********************************************************
            \nAccess Token: ${token}`,
            "\n\n*********************************************************",
            "\n*****          NEW USER ACCOUNT DETAILS             *****",
            `\n*********************************************************
            \nRegistration Status: ${user}`,
            "\n\n******************************************************************************************\n");
        const responseData = {
            success: true,
            data: user,
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
exports.completeSignUp = async (req, res) => {
    
    const { email } = req.body;

    try {
        const existingUser = await User.findOne({ email: email.toLowerCase() });        
        if (!existingUser) {
            const responseData = {
                success: false,
                message: "User not found !",
            }
            return res.status(404).json(responseData);
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
exports.accountVerification = async (req, res) => {
    try {
        const AuthHeader = req.headers.authorization;
        if (!AuthHeader || !AuthHeader.startsWith('Bearer ')) {
            const responseData = { 
                success: false, 
                message: "Unauthorized: Bearer token required",
            };
            console.log("Token required to verify account: ", responseData);
            return res.status(403).json(responseData);
        }
        
        const token = AuthHeader.split(" ")[1];
        try {          
            const existingUser = await jwt.verify(token, secretKey);
            const _id = existingUser.id;
            
            try {
                const user = await User.findById(_id);
                if (!user) {
                    const dataToUpdate = {
                        status: 'rejected',
                    };
                    const email = user.email;
                    await User.findOneAndUpdate({ email }, dataToUpdate, { new: true });

                    const responseData = { 
                        success: false,
                        message: "User not found",
                    };
                    console.log("Account verification failed: ", responseData);
                    return res.status(404).json(responseData);
                }

                const dataToUpdate = {
                    status: 'approved',
                    accessToken: token,
                    isActivated: true,
                };
                const email = user.email;
                const updatedUser = await User.findOneAndUpdate({ email }, dataToUpdate, { new: true });
                const responseData = {
                    success: true,
                    data: updatedUser,
                    message: "Account verification successful",
                };
                console.log("Account verification status: ", responseData);
                return res.status(200).json(responseData);

            } catch (error) {
                const responseData = { 
                    success: false, 
                    message: "Internal Server Error" 
                };
                console.error("Database error during account verification: ", error);
                return res.status(500).json(responseData);
            }
        } catch (error) {
            const responseData = { 
                success: false, 
                message: "Invalid token",
            };
            console.log("Error validating account: ", error);
            return res.status(403).json(responseData);
        }
    } catch (error) {
        const responseData = { 
            success: false, 
            message: "Internal Server Error",
        };
        console.error("Unexpected error during account verification: ", error);
        return res.status(500).json(responseData);
    }
};

// Our Login Logic starts here
exports.logIn = async (req, res) => {

    try {

        const { email, password } = req.body;

        // 1) Verify Payload.
        if (!(email && password )) {
            const responseData = { 
                success: false, 
                message: "All fields are required.",
            };
            console.log("***********************************",
                        "\n*********  LOGIN ATTEMPT  *********",
                        "\n***********************************",
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
        if (!user.isActivated && !user.accessToken) {
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
                        "\nAccount isVerified: ", user.isActivated,
                        "\nACCOUNT HAVE ROLE(S): ", user.roles, "\n");
            // ***********************************************************************************//
            // NOTE:- Use USER 'accessToken' for Authentication & Authorization
            // ***********************************************************************************//  
            const responseData = {
                success: false,
                message: `Kindly verify your account.`
            };
            return res.status(200).json(responseData);
        }
        

        // Set Token with Timer for Logged-In User
        const token = await createJWT(user._id);
        user.accessToken = token;

        // ***********************************************************************************//
        // *************                CURRENT LOGGED-IN USER                  **************//
        // ***********************************************************************************//
        console.log("***********************************************",
                    "\n*****          LOGIN SUCCESSFUL          ******",
                    "\n***********************************************",
                    "\nAccount ID: ", user._id,
                    "\nAccount Owner: ", user.firstName + " " + user.lastName,
                    "\nAccount E-mail: ", user.email,
                    "\nAccount Token: ", user.accessToken,
                    "\nAccount isVerified: ", user.isActivated,
                    "\nACCOUNT HAVE ROLE(S): ", user.roles, "\n");
        // ***********************************************************************************//
        // NOTE:- Use USER 'accessToken' for Authentication & Authorization
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
        const accountList = await User.find(query)
                                .skip((page - 1) * limit)
                                .limit(parseInt(limit));

        const totalUsers = await User.countDocuments(query); // Total number of users with the given status
        const totalPages = Math.ceil(totalUsers / limit); // Calculate total pages

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
        
        const pagination = {
            adminRecords: totalUsers,
            lastPage: totalPages,
        };

        const responseData = {
            success: true,
            data: {
                accountList,
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

        // Add status filter if provided
        if (status) {
            query.status = status;
        };
        

        // Pagination logic
        const usersList = await User.find(query)
                                .skip((page - 1) * limit)
                                .limit(parseInt(limit));

        const totalUsers = await User.countDocuments(query); // Total number of users with the given status
        const totalPages = Math.ceil(totalUsers / limit); // Calculate total pages

        const responseData = {
            success: true,
            data: {
                usersList,
                totalPages
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
        const userId = await User.findById(_id);

        if (!(userId)) {
            const responseData = {
                success: false,
                message: "Users not found",
            };
            console.log("Failed to fetch all User items: ", responseData);
            return res.status(404).json(responseData);
        }
        
        const responseData = {
                success: true,
                data: userId,
                message: "Successful",
        };
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
        const { email, phone, address, address2, city, state, country, zipCode, isActive } = req.body;

        // To Add New Roles to Existing User's Account
        // const roleStaff = await Role.findOne({ role: "ROLE_STAFF" });
        // const roleUsers = await Role.findOne({ role: "ROLE_USERS" });
        const dataToUpdate = {
            phone,
            address,
            address2,
            city,
            state,
            country,
            zipCode,
            isActive,
            //    roles: [
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
// };