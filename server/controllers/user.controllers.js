const db = require("../models");
const User = db.users;
const Role = db.roles;
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const encryptPassword = require("../middlewares/EncryptPassword");
const createJWT = require("../middlewares/CreateToken");
const nodemailer = require("nodemailer");
const { secretKey, mailServiceProvider, mailServiceUser, mailServicePwd } = process.env;
console.log("***********************************************",
            "\n*********    E-MAIL SERVICE CONFIG    *********",
            `\n\nService Provider: ${mailServiceProvider}`,
            `\nE-mail (Admin): ${mailServiceUser}`);




            

// Our Account Creation Logic starts here
exports.signUp = async (req, res) => {

    try {

        // Generate a Random Number
        const randNum = await Math.floor(21 * Math.random()) + Math.floor(47 * Math.random()) + Math.floor(98 * Math.random());
        
        // Payload
        const { id, username, firstName, lastName, email, password, isActivated } = req.body;

        // FORM VALIDATION:  "Compulsory Payload"
        if (!(username && firstName && lastName && email && password)) {
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
            return res.status(200).json(responseData);
        }
        
        const usernameExists = await User.findOne({ username: username.toLowerCase() });
        if (usernameExists) {
            const responseData = {
                success: false,
                message: "Username exists. Please sign-in."
            };
            // console.log("Username Exists: ", usernameExists);
            return res.status(200).json(responseData);
        }

        // ***************************************************************//
        // Hash Password
        // ***************************************************************//
        const encryptedPassword = await encryptPassword(password);
        // const encryptedPassword = await bcrypt.hashSync(password, bcrypt.genSaltSync());
        
    
        // ***************************************************************//
        // PICKING SINGLE ROLES
        // ***************************************************************//
        const roleAdmin = await Role.findOne({ role: "ROLE_ADMIN" });
        // const roleStaff = await Role.findOne({ role: "ROLE_STAFF" });
        // const roleUsers = await Role.findOne({ role: "ROLE_USERS" });
        // ***************************************************************//
        // PICKING MULTIPLE ROLES
        // ***************************************************************//
        // const roleAdmin = await Role.findOne({ role: "ROLE_ADMIN" }), 
        // roleStaff = await Role.findOne({ role: "ROLE_STAFF" }), 
        // roleUsers = await Role.findOne({ role: "ROLE_USERS" });        
        // ***************************************************************//
        // ***************************************************************//


        const newUser = new User({
            _id: id * randNum,
            username: username.toLowerCase(),    // sanitize: convert username to lowercase.
            firstName,
            lastName,
            email: email.toLowerCase(),         // sanitize: convert email to lowercase. NOTE: You must sanitize your data before forwarding to backend.
            password: encryptedPassword,
            isActivated,
            roles: [
                {
                    _id: roleAdmin._id,
                    role: roleAdmin.role,
                    createdAt: roleAdmin.createdAt,
                    updatedAt: roleAdmin.updatedAt,
                },
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
        const user = await newUser.save();


        // ***********************************************************************************//
        // ***********  USE MIDDLEWARE (JWT) FOR AUTHENTICATION AND AUTHORIZATION  ***********//
        // ***********************************************************************************//
        const token = createJWT(user._id);
        


        // E-mail Service Config
        const transporter = nodemailer.createTransport({
            service: mailServiceProvider,
            auth: {
                user: mailServiceUser,
                pass: mailServicePwd,
            },
        });
    
        const siteURL = `<a href="www.samuelakinolafoundation.com" style="text-decoration:none;color:blue;">www.samuelakinolafoundation.com</a>`;
        const verifyActivationLink = `http://127.0.0.1:3000/user/verify/${token}`;
        const verificationLink = `<button style="background:limegreen;border:0;padding:15px 20px;border-radius:3px;"><a style="color:white;font-weight:500;text-decoration:none;" href="${verifyActivationLink}" alt="account verification">Verify your email address</a></button>`;
        // const verificationLink = `<button style="background:limegreen;border:0;padding:15px 20px;border-radius:3px;"><a style="color:white;font-weight:500;text-decoration:none;" href="${verifyActivationLink}" alt="account verification">Verify your email address</a></button>`;
        // :visited {background: green}
        // :hover {background: yellow}
        // :visited:hover {background: purple}
        const activationLink = `<span style="color:black;font-size:10px;">or copy and paste this link on your browser</span><br /><a href="http://127.0.0.1:3000/user/verify/${token}" alt="activation link" style="font-size:10px;">http://127.0.0.1:3000/user/verify/${token}</a>`;
        const mailOptions = {
            from: `Samuel Akinola Foundation <${mailServiceUser}>`,
            to: user.email,
            subject: 'Account Activation',
            text: `Hello ${user.firstName}, \nThank you for registering with us at www.samuelakinolafoundation.com \nWe are more than just a foundation. \nPlease verify your account by clicking the link below to have a personalized experience. \n\n\n ${verificationLink} \n${activationLink}`,
            html: `<strong>Hello ${user.firstName} ${user.lastName}</strong>, <br /><br />Thank you for registering with us at ${siteURL}. <br /><br />We are more than just a charity organization. <br /><br />Please verify your account by clicking the link below to have a personalized experience. <br /><br /><div className="mailer-wrapper">${verificationLink}</div> <br />${activationLink}<br /><br /><br />`,
        };
        try {
            const mailSender = await transporter.sendMail(mailOptions);
            console.log("E-mail Service Details:", mailSender.envelope,
                        `\nE-mail Service Response: ${mailSender.response}`);
        } catch (error) {
            console.error('Error sending email: ', error);
        };

        // NOTE: 
        // Don't parse token to User accessToken until it is verified!",
        // Use JWT.verify to verify the signed "token" sent to User E-mail;",
        // So until "token" is Verified, 'user.accessToken === undefined && user.isActive === false' will remain like this.",
        // ****************************************************************",
        console.log("\n*********************************************************",
                    "\n*****        TOKEN GENERATED FOR NEW USER           *****",
                    `\n*********************************************************,
                    \nToken: ${token}`,
                    "\n*********************************************************",
                    "\n*****          NEW USER ACCOUNT DETAILS             *****",
                    `\n*********************************************************,
                    \nRegistration Status: ${user}`,
                    "\n*********************************************************");

        const responseData = {
            success: true,
            data: user,
            message: "Successful",
        };
        // console.log("*** NEW USER: ", responseData);
        res.status(201).json(responseData);
        return;

    } catch (error) {
        return res.status(500).send(`Internal Server Error ${error}`);
        // const errResponseData = { 
        //     success: false, 
        //     message: "INTERNAL SERVER ERROR: ", 
        //     error: error.message 
        // }
        // return res.status(500).json(errResponseData);    
    }
};

// Our Account Verification Logic starts here
exports.accountVerification = async (req, res) => {

    try {
        const AuthHeader = req.headers.authorization;
        if (!AuthHeader || !AuthHeader.startsWith('Bearer ')) {
            const responseData = { 
                success: false, 
                message: "Unauthorized",
            }
            console.log("Missing Token for Account Verification: ", responseData);
            return res.status(403).json(responseData);
        }
        
        const token = AuthHeader.split(" ")[1];
        jwt.verify(token, secretKey, async (err, decodedData) => {            
            // If any error whatsoever, is encountered during Account Verification, Log Error !
            if (err) {
                const responseData = { 
                    success: false, 
                    message: "token does not exist",
                };
                console.log("Email verification error: ", responseData);
                return res.status(404).json(responseData);
            }

            // If token was signed to an Existing User, find the Existing User ID !
            const _id = decodedData.id
            const user = await User.findById(_id);

            //  If the User Exists
            if (user) {
                // Step 2: Update these Records for the User upon Account Verification
                const dataToUpdate = {
                    accessToken: token,
                    isActivated: true,
                };
                const email = user.email;       // Step 1: find the UserByEmail to Update previous User Record 
                const updatedUser = await User.findOneAndUpdate({ email }, dataToUpdate, { new: true });               
                
                const responseData = {
                    success: true,
                    data: updatedUser,
                    message: "Successful"
                };
                console.log("Verification Status: ", responseData);
                return res.status(200).json(responseData);

            } else {
                // If token was signed to an Existing User, but Existing User cannot be found !
                // Account Verification Error:  TypeError: Cannot read properties of undefined (reading 'email')
                const responseData = { 
                    success: false,
                    message: "Failed",
                };
                console.log("Verification Status: ", responseData);
                return res.status(200).json(responseData);
            };
        });

    } catch (error) {
        return res.status(500).send(`Internal Server Error: ${error}`);
    }

};

// Our Login Logic starts here
exports.logIn = async (req, res) => {

    try {

        const { email, password } = req.body;

        // Verify important Payload
        if (!(email && password )) {
            const responseData = { 
                success: false, 
                message: "All fields are required.",
            };
            console.log("***********************************",
                        "\n*********  LOGIN ATTEMPT  *********",
                        "\n***********************************",
                        "\nLogin Error: ", responseData.message)
            return res.status(200).json(responseData);
        };

        const user = await User.findOne({ email });        
        if (!user) {        // 2) Check if Email exists for any User
            const responseData = { 
                success: false, 
                message: "Incorrect password or email.",
            };
            console.log("***********************************",
                        "\n*****    LOG-IN ATTEMPT BY    *****",
                        "\n***********************************",
                        "\nUSER INFO: ", user?.firstName + " " + user?.lastName, 
                        "\nUSER E-MAIL: ", user?.email,
                        "\n\nUSER TOKEN: ", user?.accessToken +
                        "\n***********************************");
            return res.status(200).json(responseData);
        }

        const auth = await bcrypt.compare(password, user.password);     // 3) Used bCrypt to compare Password with User's Existing Password 
        if (!auth) {        // 4) Check if Password for Existing User is Correct
            const responseData = { 
                success: false, 
                message: "Incorrect password or email.",
            };
            console.log("***********************************",
                        "\n*****    LOG-IN ATTEMPT BY    *****",
                        "\n***********************************",
                        "\nUSER INFO: ", user?.firstName + " " + user?.lastName, 
                        "\nUSER E-MAIL: ", user?.email,
                        "\nIS PASSWORD CORRECT?: ", auth +
                        "\nACCESS TOKEN: ", user?.accessToken,
                        "\n***********************************");
            return res.status(200).json(responseData);
        }

        // ***********************************************************************************//
        // ***********                 USER CURRENT INFORMATION                   ************//
        // ***********************************************************************************//
        console.log("***********************************************",
                    "\n*****   LOGGED-IN USER CURRENT DETAILS   ******",
                    "\n***********************************************",
                    "\nAccount ID: ", user._id,
                    "\nAccount Owner: ", user.firstName + " " + user.lastName,
                    "\nAccount E-mail: ", user.email,
                    "\nAccount Token: ", user.accessToken,
                    "\nAccount isVerified: ", user.isActivated,
                    "\nAccount HAVE ROLE(S): ", user.roles, "\n");
        // ***********************************************************************************//
        // NOTE:- Use USER accessToken for Authorization in headers.
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

// Finding All Users
exports.findAll = async (req, res) => {

    const allUsers = await User.find({});

    try {

        if (!allUsers) {
            const responseData = {
                success: false,
                message: "Users not found",
            };
            console.log("Failed to fetch all User items: ", responseData);
            return res.status(404).json(responseData);
        }

        const responseData = {
            success: true,
            data: allUsers,
            message: "Successful",
        };
        return res.status(200).json(responseData);

    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
    }

};

// Find a Single User by their ID
exports.findUserById = async (req, res) => {
    
    try {
        const { _id } = req.params.id;
        const userId = await User.findById(_id);

        if (!userId) {
            const responseData = {
                success: false,
                message: "Failed to retrieve Single User"
            };
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
    }
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