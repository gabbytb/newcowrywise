import { useState, useEffect } from "react";
import { HomeFooter, Nav } from "../components";
import api from "../api";
import { Link } from "react-router-dom";











const BlogPosts = () => {


    // { color }
    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(true);
    



    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        const pageTitle = "Blog News", 
              siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;
    }, []);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //



    
    // ****************************************************************************
    // MANAGE STATE:-  TO FIND ALL BLOG POSTS
    // ****************************************************************************
    const [allBlogPosts, setAllBlogPosts] = useState([]);
    console.log("ALL BLOG POSTS: ", allBlogPosts);
        
    // eslint-disable-next-line
    const [totalBlogPosts, setTotalBlogPosts] = useState(null);
    // console.log("TOTAL BLOG POSTS: ", totalBlogPosts);

    const [totalPages, setTotalPages] = useState(0);
    // console.log("TOTAL BLOG PAGES: ", totalPages);

    const [currentPage, setCurrentPage] = useState(1);
    const limit = 10; // Number of items per page   





    useEffect(() => {      
  
        // ****************************************************************************
        // CALL TO API:-  TRIGGER FUNCTION TO FIND ALL BLOG POSTS
        // ****************************************************************************             
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });

        async function fetchAllPublishedBlogPosts() {
            var status = 'published';
            await api.get(`/api/v1/admin/blogs/manage?page=${currentPage}&limit=${limit}&status=${status}`)
            .then((response) => {
                const { success, data, message } = response.data;
                const { allBlogPosts, pagination } = data;
  
                if (!success && message === "No article found") {
                        console.log("Success: ", success);
                        console.log("Message: ", message);
                };
  
                setAllBlogPosts(allBlogPosts);
                                              
                setTotalBlogPosts(pagination?.postsRecord);
                setTotalPages(pagination?.lastPage);

                if (currentPage > 1 ) {                                           
                        const pageTitle = `Blog News - Page ${currentPage}`, 
                              siteTitle = "Samuel Akinola Foundation";
                        document.title = `${pageTitle} | ${siteTitle}`;                 
                        
                        const new_URL = window.location.origin + `/blog/page/${currentPage}`;
                        // console.log("ORIGINAL URL: ", new_URL);

                        window.history.replaceState({}, document.title, new_URL );

                } else {                                                 
                        const pageTitle = 'Blog News', 
                              siteTitle = "Samuel Akinola Foundation";
                        document.title = `${pageTitle} | ${siteTitle}`;                 

                        const new_URL = window.location.origin + '/blog';
                        // console.log("ORIGINAL URL: ", new_URL);
                                                   
                        window.history.replaceState({}, document.title, new_URL );     
                };
            })
            .catch((error) => {
                    console.log("Error fetching data: ", error);
            })
            .finally(() => {
                    setIsLoading(false);
            });
        };
  
        var timerID = setTimeout(fetchAllPublishedBlogPosts, 400);   // Delay execution of findAllStaffs by 1800ms
        return () => {
                clearTimeout(timerID);                  // Clean up timer if component unmounts or token changes
        };

    }, [currentPage]); // Fetch data when currentPage changes and update URL with /page/currentPage value
    // ****************************************************************************
    // ****************************************************************************   
    const handlePageChange = (page) => {
        setCurrentPage(page);
    };
    // ****************************************************************************
    // ****************************************************************************
  



    


    const formatUrl = (title) => {
        return title.replace(/ /g, '-').toLowerCase();
    };

    return (
        <>
            <Nav />


            <div className="container mx-auto">
                <main className="mx-12 lg:mx-16 mt-32 mb-28 grid">                     
                    <div className="mx-auto flex flex-col items-center pl-16 pr-12">  

                        <h1 className="text-4xl font-black mb-32">RECENT POSTS</h1>   
           
           
                        {/* POSTS LISTING */}          
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-20 mx-28 sm:mx-8 lg:mx-16 flex-wrap">                                    
                            {
                                allBlogPosts.map((post) => {                
                                    return (                                        
                                        <div key={post._id} className="self-stretch p-2 mb-12">
                                            <div className="rounded shadow-md h-full">
                                                <Link to={`/blog/${formatUrl(post.title)}`}>
                                                    <img className="w-full m-0 rounded-t lazy" 
                                                        // src="data:image/svg+xml,%3Csvg%20xmlns%3D&#39;http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg&#39;%20viewBox%3D&#39;0%200%201%201&#39;%20height%3D&#39;500&#39;%20width%3D&#39;960&#39;%20style%3D&#39;background-color%3Argb(203%2C213%2C224)&#39;%2F%3E"
                                                        //  data-src="/assets/img/small-business.jpg" 
                                                        width="960" 
                                                        height="500" 
                                                        alt="This post thumbnail" 
                                                    />
                                                </Link>
                                                <div className="px-6 py-5">
                                                    <div className="font-semibold text-lg mb-2">
                                                        <Link className="text-slate-900 hover:text-slate-700" to={`/blog/${formatUrl(post.title)}`}>
                                                            {post.title}
                                                        </Link>
                                                    </div>
                                                    <p className="text-slate-700 mb-1" title="Published date">{post.createdAt}</p>
                                                    <p className="text-slate-800">            
                                                        {post?.excerpt}                
                                                    </p>
                                                </div>
                                            </div>
                                        </div>                                        
                                    );
                                })                                
                            }                          
                        </div>
                        {/* POSTS LISTING */}    
                                                                


                        {/* PAGINATION */}
                        {/* <div class="mt-12 mb-28 flow-root">
                                    <a href="/" class="float-left bg-white font-semibold py-2 px-4 border rounded shadow-md text-slate-800 cursor-pointer hover:bg-slate-100">Previous</a>
                                    <a href="javascript:void(0)" class="float-right bg-white font-semibold py-2 px-4 border rounded shadow-md text-slate-800 cursor-default text-opacity-50">Next</a>
                        </div> */}
                        {/* PAGINATION */}



                        {/* Pagination controls */}
                        <div className="flex justify-between items-center py-2 mt-16 mr-6">
                            {/* <div className="p-4 font-medium text-3xl font-firma tracking-supertight flex flex-row gap-6 items-center">
                                {limit} 
                                <div className="text-xl normal-case">Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></div>
                            </div> */}
                            <nav className="relative z-0 inline-flex gap-3">
                                {/* Previous page button */}
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-full border border-gray-300 bg-white text-xl font-medium text-black tracking-extratight hover:bg-gray-50 w-20 justify-center h-20 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed hidden' : ''}`}
                                    disabled={currentPage === 1}
                                >prev
                                </button>


                                {/* Page numbers */}
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`-ml-px relative inline-flex items-center px-4 py-2 rounded-full border border-gray-300 bg-white text-xl font-bold text-black hover:bg-gray-50 w-20 justify-center h-20 ${currentPage === index + 1 ? 'bg-gray-200' : ''}`}>
                                    {index + 1}
                                    </button>
                                ))}


                                {/* Next page button */}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className={`-ml-px relative inline-flex items-center px-2 py-2 rounded-full rounded-r-md border border-gray-300 bg-white text-xl font-medium text-black tracking-extratight hover:bg-gray-50 w-20 justify-center h-20 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    // disabled={currentPage === totalPages}
                                >next
                                </button>
                            </nav>
                        </div>
                        {/* Pagination controls */}
                    </div>
                </main> 
            </div>


            <HomeFooter />
        </>
    );
};


export default BlogPosts;

