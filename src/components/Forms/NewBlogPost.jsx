import { useState, } from "react";
import api from "../../api";






const FormNewBlogPost = () => {


    console.clear();

    // localStorage.clear();

    


    // ********************************* //
    // *** PAYLOAD FOR NEW BLOG POST *** //
    // ********************************* //
    const [post, setPost] = useState({
        // _id: null, // Assuming you'll set this when fetching or creating a post
        title: '',
        description: '',
        excerpt: '',
        // author: {
        //     img: '',
        //     name: '',
        //     bio: '',
        // },
        isPublished: true,
        status: '',
        tags: [],
        categories: [],
        // statuses: '',
    });
    console.log("*** NEW BLOG POST ***\nBlog Post: ", post);
    // ********************************* //
    // *** PAYLOAD FOR NEW BLOG POST *** //
    // ********************************* //




    // ************************************************** //
    // ** MANAGE STATE OF:- TOKEN, FROM RESPONSE DATA *** //
    // ************************************************** //
    // const [accessToken, setAccessToken] = useState(null);
    // console.log("*** ACCOUNT TOKEN ***\nToken: ", accessToken); 

    const [formMessage, setFormMessage] = useState(null);
    // console.log("Create Attempt: ", formMessage);
    
    // eslint-disable-next-line
    const [formSubmitted, setFormSubmitted] = useState(false);
    // console.log("Created Successful: ", formSubmitted);

    // Function to update the tags
    const updateTags = (newTags) => {
        setPost((prevPost) => ({
            ...prevPost,
            tags: newTags,
        }));
    };

    // Function to update the categories
    const updateCategories = (newCategories) => {
        setPost((prevPost) => ({
            ...prevPost,
            categories: newCategories,
        }));
    };

    // Function to handle form submission
    const handlePostFormSubmission = async (e) => {
        e.preventDefault();
        
        await api.post('/api/v1/admin/blogs/manage/create', post) // Update the URL to your API endpoint
        .then((response) => {
            const { success, data, message } = response.data;
            var errMsg = document.querySelector('#newPostFormID .create_error'); 
            var successMsg = document.querySelector('#newPostFormID .create_success');
        
            if (!success || message === "Post title missing") {

                // Scroll to Top
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });

                // Perform These Actions
                setFormSubmitted(success);
                setFormMessage(message);
                               
                errMsg?.classList.remove('create_error');
                errMsg?.classList.add('error-message-info');
            
                setTimeout(() => {
                    errMsg?.classList.remove('error-message-info');
                    errMsg?.classList.add('create_error');
                }, 3000);
                // Perform These Actions

            } else if (!success || message === "Post Exists") {

                // Scroll to Top
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });

                // Perform These Actions
                setFormSubmitted(success);
                setFormMessage(message);
                               
                errMsg?.classList.remove('create_error');
                errMsg?.classList.add('error-message-info');
            
                setTimeout(() => {
                    errMsg?.classList.remove('error-message-info');
                    errMsg?.classList.add('create_error');
                }, 3000);
                // Perform These Actions

            } else {

                // console.log("Success: ", success);
                // console.log("Data: ", data);
                // console.log("Message: ", message);
                setFormSubmitted(success);
                setFormMessage(message);

                // RESET FORM AFTER SUBMISSION
                document.getElementById("newPostFormID").reset();
                   
                successMsg.classList.remove('create_success');
                successMsg.classList.add('success-message-info'); 
                                    
                // Scroll to Bottom
                window.scrollTo({ left: 0, top: 1200, behavior: 'smooth', });

                setTimeout(() => {
                    successMsg.classList.remove('success-message-info');
                    successMsg.classList.add('create_success');            
                }, 3500);
                // Perform These Actions

                setTimeout(() => {
                    window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });
                }, 3900);
                // Perform These Actions

            };
        }) 
        .catch ((error) => {
            console.error('Error saving post:', error);
        });
    };






    return (
        <div id="createArticle" className="relative flex flex-col min-w-0 break-words w-full mb-16 shadow-lg rounded-lg bg-blueGray-100 border-0">
            <div>

                {/* <div className={`activeDisplay ${activeForm === 'update-form' ? 'block' : 'hidden'}`}> */}
                <div className="rounded-t bg-white mb-0 p-6">
                    <div className="text-center flex justify-between items-center">
                        <h6 className="text-blueGray-700 text-42xl tracking-tightener font-bold capitalize">Create New Post</h6>                          
                        {/* <button onClick={showUserInfo}
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-lg tracking-tightener px-8 py-2 rounded-lg shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"> Back
                        </button> */}
                    </div>
                </div>


                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    {/* FORM FOR UPDATING USER DATA */}
                    <form id="newPostFormID" onSubmit={handlePostFormSubmission}>
                      
                        {/* Error Message */}
                        <div className="mx-auto mt-8 mb-6 create_error">
                            {formMessage}
                        </div>
                        {/* Error Message */}

                      
                        <h6 className="text-gray-500 text-2xl mt-12 mb-12 font-black uppercase px-4">
                        {/* Create New Post */}
                        </h6>
                        <div className="flex flex-wrap">                                                            

                            {/* Title */}
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="flex flex-col uppercase text-blueGray-600 text-lg font-extrabold tracking-moretight mb-2"
                                        htmlFor="title">
                                        Post Title
                                    
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-3 mb-6 placeholder-gray-600 text-blueGray-600 bg-white rounded text-sm shadow hover:bg-white focus:bg-white focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                                                                         
                                            name="title"                                                                              
                                            placeholder="Post Title"
                                            // value={post.title}
                                            onChange={(e) => setPost({ ...post, title: e.target.value })}                                                                                                                                                
                                        />
                                    </label>
                                </div>
                            </div>

                            {/* Description */}
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="flex flex-col uppercase text-blueGray-600 text-lg font-extrabold tracking-moretight mb-2"
                                        htmlFor="description">
                                        Post Description

                                        <textarea
                                            type="text"
                                            className="border-0 px-6 py-6 mt-3 mb-6 placeholder-gray-600 text-blueGray-600 bg-white rounded text-3xl shadow hover:bg-white focus:bg-white focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                                
                                            name="description"                                                             
                                            placeholder="Description"
                                            // value={post.description} 
                                            onChange={(e) => setPost({ ...post, description: e.target.value })}                                              
                                            rows="7">
                                        </textarea>
                                    </label>
                                </div>
                            </div>

                            {/* Post Excerpt */}
                            <div className="w-full lg:w-12/12 px-4">
                                <div className="relative w-full mb-3">
                                    <label
                                        className="flex flex-col uppercase text-blueGray-600 text-lg font-extrabold tracking-moretight mb-2"
                                        htmlFor="excerpt">
                                        Post Excerpt

                                        <textarea
                                            type="text"
                                            className="border-0 px-6 py-6 mt-3 mb-6 placeholder-gray-600 text-blueGray-600 bg-white rounded text-3xl shadow hover:bg-white focus:bg-white focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                                
                                            name="excerpt"                                                             
                                            placeholder="Post excerpt"
                                            // value={post.excerpt}
                                            onChange={(e) => setPost({ ...post, excerpt: e.target.value })}                                              
                                            rows="3">
                                        </textarea>
                                    </label>
                                </div>
                            </div>

                        </div>

                        <hr className="mt-6 border-b-1 border-blueGray-300" />

                        <h6 className="text-gray-500 text-lg mt-10 mb-8 px-4 font-bold uppercase">
                        Post Attributes
                        </h6>
                        <div className="flex flex-wrap">

                            {/* TAGS AND CATEGORIES WRAPPER */}
                            <div className="w-full lg:w-12/12 px-4 flex gap-8">

                                {/* TAGS */}
                                <div className="relative w-3/6 mb-3">
                                    <label
                                        className="flex flex-col uppercase text-blueGray-600 text-lg font-extrabold tracking-moretight mb-2"
                                        htmlFor="tags">
                                        Tags

                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-0 mb-6 placeholder-gray-600 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                                
                                            name="tags"
                                            placeholder="Enter Tags (comma separated)"
                                            onChange={(e) => updateTags(e.target.value.split(','))}                                                                           
                                        />
                                    </label>
                                </div>

                                {/* CATEGORIES */}
                                <div className="relative w-3/6 mb-3">
                                    <label
                                        className="flex flex-col uppercase text-blueGray-600 text-lg font-extrabold tracking-moretight mb-2"
                                        htmlFor="categories">
                                        Categories
                                    
                                        <input
                                            type="text"
                                            className="border-0 px-3 py-3 mt-0 mb-6 placeholder-gray-600 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"                                        
                                            name="categories"
                                            placeholder="Categories (comma separated)"
                                            onChange={(e) => updateCategories(e.target.value.split(','))}                                                                                  
                                        />
                                    </label>
                                </div>
                                
                            </div>

                        </div>    
                        <div className="flex flex-wrap">                           
             
                             {/* IS PUBLISHED */}               
                            <div className="relative mb-3 px-4">
                                <label
                                        className="flex flex-row gap-3 items-end uppercase text-blueGray-600 text-lg font-extrabold tracking-moretight mb-2"
                                        htmlFor="isPublished">

                                        <input
                                            type="checkbox"
                                            className="border-0 px-3 py-3 mt-0 placeholder-gray-600 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-8 h-8 ease-linear transition-all duration-150"                                        
                                            name="isPublished"                                                                                  
                                            onChange={(e) => setPost({ ...post, isPublished: e.target.type === 'checkbox' ? !e.target.checked : e.target.value })}                                                                                  
                                        /> Save as Draft

                                </label>                                                                                      
                            </div>

                        </div>    
                    
                        {/* SUBMIT BUTTON */}
                        <div className="rounded-t px-6 mt-4 mb-4">
                            <div className="text-center flex justify-end">
                                <button type="submit"                           
                                    className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-semibold uppercase text-lg tracking-verytight px-8 py-4 rounded-xl shadow hover:bg-blue-600 hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                > Submit</button>
                            </div>
                        </div>
                        {/* SUBMIT BUTTON */}   

                        {/* Success Message */}
                        <div className="mt-3 mb-3 mx-auto create_success">
                            {formMessage}
                        </div>
                        {/* Success Message */}
                    </form>
                </div>                   
                {/* </div>   */}

            </div>
        </div>
    );
};

export default FormNewBlogPost;