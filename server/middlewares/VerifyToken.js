const jwt = require('jsonwebtoken');
const secretKey = process.env.secretKey || "false_key";
const User = require("../models");



// const verifyToken = async (req, res, token,) => {

//     try {
//         const decodedData = await jwt.verify(token, secretKey);
//         console.log('Token is valid:', decodedData);

//         // Additional logic after successful token verification
//         const _id = decodedData.id;
//         const user = await User.findById(_id);
        
//         // Step 6: If user exists, update their status to "approved" and set them as verified
//         const email = user.email;   
//         const dataToUpdate = {
//             status: "approved",
//             accessToken: token,
//             isVerified: true,
//         };
//         const updatedUser = await User.findOneAndUpdate({ email }, dataToUpdate, { new: true });               
    
//         const responseData = {
//             success: true,
//             data: updatedUser,
//             message: "Successful"
//         };
//         console.log("*********************************************************",
//             "\n*****           NEW ACCOUNT VERIFICATION             ****",
//             "\n*********************************************************",
//             "\nVerification Status: ", responseData,
//             "\n*********************************************************\n\n");
//         res.status(200).json(responseData); // Send a success response
//     } catch (error) {
//         if (error.name === 'TokenExpiredError') {
//             // console.error("Token has expired");
//             const responseData = { 
//                 success: false, 
//                 message: "Token has expired",
//             };
//             console.log("Token verification status: ", responseData);
//             return res.status(403).json(responseData);
//         } else if (error.name === 'JsonWebTokenError') {
//             // console.error("Token does not exist");
//             const responseData = { 
//                 success: false, 
//                 message: "Token does not exist",
//             };
//             console.log("Token verification status: ", responseData);
//             return res.status(401).json(responseData);
//         } else {
//             // console.error('Token verification failed:', error.message);
//             const responseData = { 
//                 success: false, 
//                 message: "Unexpected error encountered",
//             };
//             console.log("Token verification status: ", responseData);
//             return res.status(500).json(responseData);
//         };
//     }
// }

// module.exports = verifyToken;



// await jwt.verify(token, secretKey, async (error, decodedData) => {
//     if (error) {
//         if (error.name === 'TokenExpiredError') {
//             // console.error("Token has expired");
//             const responseData = { 
//                 success: false, 
//                 message: "Token has expired",
//             };
//             console.log("Token verification status: ", responseData);
//         } else if (error.name === 'JsonWebTokenError') {
//             // console.error("Token does not exist");
//             const responseData = { 
//                 success: false, 
//                 message: "Token does not exist",
//             };
//             console.log("Token verification status: ", responseData);
//         } else {
//             // console.error('Token verification failed:', error.message);
//             const responseData = { 
//                 success: false, 
//                 message: "Token verification failed",
//             };
//             console.log("Token verification status: ", responseData);
//         };
//     } else {
//         console.log('Token is valid:', decodedData);

//         // Additional logic after successful token verification
//         const _id = decodedData.id;
//         const user = await User.findById(_id);
        
//         // Step 6: If user exists, update their status to "approved" and set them as verified
//         const email = user.email;   
//         const dataToUpdate = {
//             status: "approved",
//             accessToken: token,
//             isVerified: true,
//         };
//         const updatedUser = await User.findOneAndUpdate({ email }, dataToUpdate, { new: true });               
    
//         const responseData = {
//             success: true,
//             data: updatedUser,
//             message: "Successful"
//         };
//         console.log("*********************************************************",
//             "\n*****           NEW ACCOUNT VERIFICATION             ****",
//             "\n*********************************************************",
//             "\nVerification Status: ", responseData,
//             "\n*********************************************************\n\n");
//         return res.status(200).json(responseData); // Send a success response
//     };
// });