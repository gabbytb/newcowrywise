const db = require("../models");
const Blog = db.blogs;







// Our CREATE ACCOUNT Logic starts here
exports.createBlogPost = async (req, res) => {

    // Gets a unique number based on the current time
    const uniqueId = Date.now();

    // Payload
    const { id = 23401, title, description, excerpt, tags, categories, author, isPublished } = req.body;
    
    try {

        // FORM VALIDATION:  "Compulsory Payload"
        if (!(title)) {
            const responseData = {
                success: false,
                message: "Post title missing"
            };
            console.log("*************************************",
                "\n*****  ATTEMPT: CREATE NEW POST ******",
                "\n*************************************",
                "\nCreate Post Error: ", responseData.message + "\n\n");
            return res.status(200).json(responseData);
        };

        
        //  CHECK IF POST TITLE EXISTS IN BLOG REPOSITORY
        const titleExists = await Blog.findOne({ title: title.toLowerCase() });
        if (titleExists) {
            const responseData = {
                success: false,
                message: "Post Exists"
            };
            console.log("********************************",
                        "\n*** CREATE NEW POST FAILED   ***",
                        "\n********************************",
                        "\nPOST ID: ", titleExists._id,
                        "\nPOST TITLE: ", titleExists.title + "\n\n");
            return res.status(200).json(responseData);
        };
       

        // ************************************ //
        // ***  FE: CREATE "BLOG" INSTANCE  *** //
        // ************************************ //      
        const blog = new Blog({
            _id: uniqueId % id,                     
            title: title.toLowerCase(),         // sanitize: convert title to lowercase. NOTE: You must sanitize your data before forwarding to backend.                      
            description,
            excerpt,
            author,
            tags,
            categories,  
            isPublished,
            status: isPublished === true ? 'published' : 'draft' ,        
            // expirationInMs: encrypt(expiresIn),        // Encode: token lifespan  
        });
        // // ******************************************************************************************************//
        // // ***  FE: USE MIDDLEWARE: (JWT) TO ASSIGN "TOKEN" TO USER FOR AUTHENTICATION AND AUTHORIZATION  ***//
        // // ******************************************************************************************************//
        // const token = await assignTwoDaysToken(user._id);
        // // ****************************************************
        // // ***  FE: USE MIDDLEWARE: (JWT) TO VERIFY "TOKEN"
        // // ****************************************************
        // const tokenDecoded = await verifyToken(token);
        
        // RESULT:-  Token Details:  { id: 31825360, iat: 1722812853, exp: 1722816453 }
        // NOTE:-
        //      1) Token id (id): This is a custom payload claim, likely representing the user's unique identifier (e.g., user ID in the database).
        //      2) Issued At (iat): This is a standard JWT claim representing the time at which the token was issued. It's typically expressed as a Unix timestamp, which counts the number of seconds since January 1, 1970 (UTC).
        //      3) Expiration Time (exp): This is another standard JWT claim, indicating the time at which the token will expire. It's also expressed as a Unix timestamp.
        // Format using: new Date(tokenDecoded.exp * 1000) 
        // To Get Current Date Setting for Token Expiration Time to start counting from!       
        // const tokenExpiryDate = new Date(tokenDecoded.exp * 1000);
        // user.tokenExpires = tokenExpiryDate;
        const newBlog = await blog.save();
        // **************************************** //
        // ***    FE: SAVE USER INFORMATION     *** //
        // **************************************** //




        // // **************************************** //
        // // ***    BE: SAVE USER INFORMATION     *** //
        // // **************************************** //
        // const user = new User({ 
        //     _id: 666, 
        //     username: "admin", 
        //     firstName: "Oyebanji", 
        //     lastName: "Gabriel", 
        //     phone: 2347038662402, 
        //     address: '11a, Chidison str', 
        //     address2: '14, Lekan Muritala str, Aboru, Lagos', 
        //     city: 'Iba', 
        //     state: 'Oyo', 
        //     country: 'Nigeria', 
        //     zipCode: 23401, 
        //     email: "try-email@example.com", 
        //     password: encryptPassword("Administrativerightsonly"),
        //     roles: [{ ...roleEditor }],
        //     approvesTandC: true,
        //     status: 'rejected',
        //     isVerified: true, 
        // });
        // // ******************************************************************************************************//
        // // ***  BE: USE MIDDLEWARE: (JWT) TO CREATE "ACCESS-TOKEN" FOR USER AUTHENTICATION AND AUTHORIZATION  ***//
        // // ******************************************************************************************************//
        // const token = await assignOneDayToken(user._id);
        // // ****************************************************
        // // ***  BE: USE MIDDLEWARE: (JWT) TO VERIFY "TOKEN"
        // // ****************************************************
        // const decodedData = await verifyToken(token);
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
        // user.tokenExpires = new Date(decodedData.exp * 1000);
        // // **************************************** //
        // // ***    BE: SAVE USER INFORMATION     *** //
        // // **************************************** //
        // const newUser = await user.save();
        // // **************************************** //


        // ***************************************************************//
        // E-mail Service Config
        // ***************************************************************//
        // await mailSenderPostSignUp(token, newUser);
        // await mailSenderForGetSignUp(token, newUser);

        // let valueOfEncodedText = decrypt(newUser.expirationInMs);
        // console.log("Encrypted token lifespan: ", valueOfEncodedText);
        
        // **************************************** //

        console.log(
            // "\n*********************************************************",
            // "\n*****        TOKEN GENERATED FOR NEW USER           *****",
            // `\n*********************************************************`,
            // `\nToken: ${token}`,
            // "\nToken Details: ", tokenDecoded,
            "\n\n*********************************************************",
            "\n*****          NEW BLOG ARTICLE DETAILS             *****",
            "\n*********************************************************",
            `\nBlog Article Status: ${newBlog}`,
            "\n******************************************************************************************\n");
                
        const responseData = {
            success: true,
            data: newBlog,
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


// Our FIND All USERS Logic starts here
exports.findAllBlogPosts = async (req, res) => { 

    const { page = 1, limit = 10, status } = req.query; // Destructure query parameters   
    // published
    // draft

    try {
        let query = { 

        };

        if (status) {
            query.status = status;
        };
 
        const allBlogPosts = await Blog.find(query)
                                .skip((page - 1) * limit)
                                .limit(parseInt(limit));
        console.log("ALL BLOG POSTS: ", allBlogPosts);


        const totalBlogPosts = await Blog.countDocuments(query); // Total number of users with the given status
        const totalPages = Math.ceil(totalBlogPosts / limit); // Calculate total pages
        const pagination = {
            postsRecord: totalBlogPosts,
            page,
            limit,
            lastPage: totalPages,
        };
        console.log("PAGINATION: ", pagination, "\n\n");

        const responseData = {
            success: true,
            data: {
                allBlogPosts,
                pagination
            },
            message: "BLOG: Items retrieved successfully",
        }
        res.status(200).json(responseData);

    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).send(`Internal Server Error: ${error.message}`);
    };
};  //// THOROUGHLY Tested === Working


// Our FIND All USERS Logic starts here
exports.findAllBlogPosts = async (req, res) => { 

    const { page = 1, limit = 10, status } = req.query; // Destructure query parameters   
    // published
    // draft
    
    try {
        let query = { 

        };

        if (status) {
            query.status = status;
        };
 
        const allBlogPosts = await Blog.find(query)
                                .skip((page - 1) * limit)
                                .limit(parseInt(limit));
        console.log("ALL BLOG POSTS: ", allBlogPosts);


        const totalBlogPosts = await Blog.countDocuments(query); // Total number of users with the given status
        const totalPages = Math.ceil(totalBlogPosts / limit); // Calculate total pages
        const pagination = {
            postsRecord: totalBlogPosts,
            page,
            limit,
            lastPage: totalPages,
        };
        console.log("PAGINATION: ", pagination, "\n\n");

        
        const responseData = {
            success: true,
            data: {
                allBlogPosts,
                pagination
            },
            message: "Post Item retrieved successfully",
        }
        res.status(200).json(responseData);

    } catch (error) {
        console.error("Internal Server Error:", error);
        return res.status(500).send(`Internal Server Error: ${error.message}`);
    };
};  //// THOROUGHLY Tested === Working


// Our FIND SINGLE USER by ID Logic starts here
exports.findSingleBlogPostById = async (req, res) => {
    
    try {
        const _id = req.params.id;
        const blog = await Blog.findById(_id);

        if (!blog) {
            const responseData = {
                success: false,
                message: "Blog post not found",
            };
            console.log("Find Blog by ID: ", responseData);
            return res.status(404).json(responseData);
        };
        
        const responseData = {
            success: true,
            data: blog,
            message: "Successful",
        };
        console.log("Find Post by ID: ", responseData);
        return res.status(200).json(responseData);

    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
    };
};  // THOROUGHLY Tested === Working


// Our FIND SINGLE USER by ID Logic starts here
exports.findSingleBlogPostByTitle = async (req, res) => {
    
    try {
        const title = req.params.title;
        const blog = await Blog.findOne(title);

        if (!blog) {
            const responseData = {
                success: false,
                message: "Post not found",
            };
            console.log("Find Blog Post by TITLE: ", responseData);
            return res.status(404).json(responseData);
        };
        
        const responseData = {
            success: true,
            data: blog,
            message: "Successful",
        };
        console.log("Find Post by TITLE: ", responseData);
        return res.status(200).json(responseData);

    } catch (error) {
        // Catch error
        return res.status(500).send(`Internal Server Error ${error}`);
    };
};  // THOROUGHLY Tested === Working
