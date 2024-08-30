module.exports = app => {
         
    const router = require('express').Router();
    const cors = require("cors");
    const corsOptions = {        
        origin: ["http://127.0.0.1:3000"],
        methods: ["GET", "POST", "PUT", "DELETE"],
        credentials: true,
    }
    const requireAUTHORIZATION = require("../middlewares/RequireAuthorization.js");
    const users = require("../controllers/user.controllers.js");   

    




    

    // Create a new "User" DATA using this API
    router.post("/api/v1/admin/users/manage/create", cors(corsOptions), users.signUp);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage/create") for the frontend to access.
    

    // Verify Unverified Existing "User" Accounts using this API
    router.post("/api/v1/admin/users/manage/account/verify", cors(corsOptions), users.reSignUp);
    // Expose this endpoint(i.e "http://127.0.0.1:3000/api/v1/admin/users/manage/account-revalidation") for the frontend to access.


    // Verify All "User" Accounts using this API
    router.post("/user/verify/:token", cors(corsOptions), users.verifySignUp); 
    // Expose this endpoint(i.e "http://127.0.0.1:8000/user/verify/:token") for the frontend to access.
    

    // router.get("/user/verify", cors(corsOptions), users.verifySignUpWithGet);

    
    // Login User
    router.post("/api/v1/auth/login", users.logIn);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/auth/login") for the frontend to access.

    
    // Fetch all "Users" DATA from using API
    router.get("/api/v1/auth/account/admins", users.findAllAdmins);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage") for the frontend to access.


    // Fetch all "Users" DATA from using API
    router.get("/api/v1/auth/account/by-role/ROLE_USERS", users.findAllUsers);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage") for the frontend to access.
    

    // Fetch all "isActive Users" DATA using this API
    router.get("/api/v1/admin/users/manage/active", users.findAllActive);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage/published") for the frontend to access.


    // Fetch a "Single User" DATA by it's ID, using this API
    router.get("/api/v1/admin/users/manage/:id", users.findUserById);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage/:id") for the frontend to access.


    // Update a "Single User" DATA by it's ID, using this API
    router.put("/api/v1/admin/users/manage/update/:id", users.updateUserById);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage/update/:id") for the frontend to access.


    // Delete a "Single User" DATA by it's ID, using this API
    router.delete("/api/v1/admin/users/manage/delete/:id", requireAUTHORIZATION, users.deleteUser);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage/delete/:id") for the frontend to access.


    // Delete all "Users" DATA using this API
    router.delete("/api/v1/admin/users/manage/delete", requireAUTHORIZATION, users.deleteAllUsers);
    // Expose this endpoint(i.e "http://127.0.0.1:8000/api/v1/admin/users/manage/delete") for the frontend to access.


    app.use("/", router);

};



























// const requireAuth = (req, res, next) => {
//     const bearerHeader = req.headers.authorization;
//     if (!bearerHeader || !bearerHeader.startsWith('Bearer ')) {
//         const responseData = { 
//             success: false, 
//             message: "Unauthorized",
//         }
//         return res.status(401).json(responseData);
//     }
//
//     next();
// }
//
// OR
//
// const verifyToken = (req, res, next) => {
//     const bearerHeader = req.headers["authorization"];
//     if (typeof bearerHeader !== "undefined") {
//         const bearerToken = bearerHeader.split(" ")[1];
//         req.token = bearerToken;
//         next();
//     } else {  
//         res.sendStatus(403);  
//     }  
// }