import { useState, useEffect } from "react";
import { Nav } from "../components";
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
    const leftArrow = "<", rightArrow = ">";




    useEffect(() => {
        // if (activeDisplay === "allStaffs") {
  
        //     setIsLoading(true);
  
            // ****************************************************************************
            // CALL TO API:-  TRIGGER FUNCTION TO FIND ALL BLOG POSTS
            // ****************************************************************************             
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
        // };
    }, [currentPage]); // Fetch data when currentPage changes
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
                <main className="mx-12 lg:mx-16 mt-32 grid">                     
                    <div className="mx-auto flex flex-col items-center pl-16 pr-12">  
                        {/* POSTS LISTING */}          
                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-x-12 gap-y-20 mx-28 sm:mx-8 lg:mx-16 flex-wrap">                                    
                            {
                                allBlogPosts.map((post) => {                
                                    return (                                        
                                        <div key={post._id} className="self-stretch p-2 mb-12">
                                            <div className="rounded shadow-md h-full">
                                                        <Link to={`/blog/${formatUrl(post.title)}/${post._id}`}>
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
                                                                <Link className="text-slate-900 hover:text-slate-700" to={`/blog/${formatUrl(post.title)}/${post._id}`}>
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
                        <div className="flex justify-between items-center py-2 mr-6">
                            <div className="p-4 font-medium text-3xl font-firma tracking-supertight flex flex-row gap-6 items-center">
                                {limit} 
                                <div className="text-xl normal-case">Page <strong>{currentPage}</strong> of <strong>{totalPages}</strong></div>
                            </div>
                            <nav className="relative z-0 inline-flex shadow-sm">
                                {/* Previous page button */}
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-xl font-black text-gray-500 hover:bg-gray-50 w-16 justify-center h-14 ${currentPage === 1 ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={currentPage === 1}
                                >{leftArrow}
                                </button>


                                {/* Page numbers */}
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <button
                                    key={index}
                                    onClick={() => handlePageChange(index + 1)}
                                    className={`-ml-px relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-xl font-bold text-gray-700 hover:bg-gray-50 w-16 justify-center h-14 ${currentPage === index + 1 ? 'bg-gray-200' : ''}`}>
                                    {index + 1}
                                    </button>
                                ))}


                                {/* Next page button */}
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    className={`-ml-px relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-xl font-black text-gray-500 hover:bg-gray-50 w-16 justify-center h-14 ${currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : ''}`}
                                    disabled={currentPage === totalPages}
                                >{rightArrow}
                                </button>
                            </nav>
                        </div>
                        {/* Pagination controls */}
                    </div>
                </main> 
            </div>
        </>
    );
};

export default BlogPosts;




//      {/* <!-- Feature Section Starts --> */}
//      <section id="featured">
//      <div class=" container mx-auto lg:flex justify-between align-middle px-5 lg:px-0">
//          <h2 class="font-heading text-4xl ">Featured Posts</h2>
//          <div class="pt-5 lg:pt-0">
//              <button
//              class="filter-button font-heading text-sm rounded-full hover:bg-primary hover:text-white px-4 py-2 mt-3 lg:mt-0 active uppercase"
//              data-filter="*">All</button>
//              <button
//              class="filter-button font-heading text-sm rounded-full hover:bg-primary hover:text-white px-4 py-2 mt-3 lg:mt-0  uppercase"
//              data-filter=".love">love</button>
//              <button
//              class="filter-button font-heading text-sm rounded-full hover:bg-primary hover:text-white px-4 py-2 mt-3 lg:mt-0  uppercase"
//              data-filter=".yoga">yoga</button>
//              <button
//              class="filter-button font-heading text-sm rounded-full hover:bg-primary hover:text-white px-4 py-2 mt-3 lg:mt-0  uppercase"
//              data-filter=".recipes">recipes</button>
//              <button
//              class="filter-button font-heading text-sm rounded-full hover:bg-primary hover:text-white px-4 py-2 mt-3 lg:mt-0  uppercase"
//              data-filter=".naturalherbs">natural
//              herbs</button>
//          </div>
//      </div>

//      <div class="container mx-auto px-5 lg:px-0">
//          <div class="isotope-container mt-12">

//              <div class="grid grid-cols-2 gap-4">
//              <div class="item love lg:me-28">
//                  <div class="featured-post py-2">
//                  <span class="blog-date uppercase">dating and Relationships</span>
//                  <h3 class="font-heading text-2xl font-normal hover:text-gray-500 "><a href="blog-single.html"
//                      class="blog-link capitalize">How 'Weak
//                      Ties' Can Strengthen Our
//                      Relationships</a></h3>
//                  </div>
//                  <hr class="my-4" />
//              </div>
//              <div class="item love lg:me-28">
//                  <div class="featured-post py-2 ">
//                  <span class="blog-date uppercase">dating and Relationships</span>
//                  <h3 class="font-heading text-2xl font-normal hover:text-gray-500"><a href="blog-single.html"
//                      class="blog-link capitalize">How 'Weak
//                      Ties' Can Strengthen Our
//                      Relationships</a></h3>
//                  </div>
//                  <hr class="my-4 "/>
//              </div>
//              <div class="item yoga lg:me-28">
//                  <div class="featured-post py-2">
//                  <span class="blog-date uppercase">dating and Relationships</span>
//                  <h3 class="font-heading text-2xl font-normal hover:text-gray-500"><a href="blog-single.html"
//                      class="blog-link capitalize">What It's
//                      Really Like to Date While
//                      Anxious </a></h3>
//                  </div>
//                  <hr class="my-4" />
//              </div>
//              <div class="item yoga lg:me-28">
//                  <div class="featured-post py-2 ">
//                  <span class="blog-date uppercase">dating and Relationships</span>
//                  <h3 class="font-heading text-2xl font-normal hover:text-gray-500"><a href="blog-single.html"
//                      class="blog-link capitalize">What It's
//                      Really Like to Date While
//                      Anxious </a></h3>
//                  </div>
//                  <hr class="my-4 " />
//              </div>
//              <div class="item recipes lg:me-28">
//                  <div class="featured-post py-2">
//                  <span class="blog-date uppercase">dating and Relationships</span>
//                  <h3 class="font-heading text-2xl font-normal hover:text-gray-500"><a href="blog-single.html"
//                      class="blog-link capitalize">Benefits
//                      to Having Much Older
//                      Friends than you</a></h3>
//                  </div>
//                  <hr class="my-4" />
//              </div>
//              <div class="item recipes lg:me-28">
//                  <div class="featured-post py-2 ">
//                  <span class="blog-date uppercase">dating and Relationships</span>
//                  <h3 class="font-heading text-2xl font-normal hover:text-gray-500"><a href="blog-single.html"
//                      class="blog-link capitalize">Benefits
//                      to Having Much Older
//                      Friends than you</a></h3>
//                  </div>
//                  <hr class="my-4 " />
//              </div>
//              <div class="item naturalherbs lg:me-28">
//                  <div class="featured-post py-2">
//                  <span class="blog-date uppercase">dating and Relationships</span>
//                  <h3 class="font-heading text-2xl font-normal hover:text-gray-500"><a href="blog-single.html"
//                      class="blog-link capitalize">How Often
//                      You Should Wash Your
//                      Hair in winter</a></h3>
//                  </div>
//                  <hr class="my-4 " />
//              </div>
//              <div class="item naturalherbs lg:me-28">
//                  <div class="featured-post py-2 ">
//                  <span class="blog-date uppercase">dating and Relationships</span>
//                  <h3 class="font-heading text-2xl font-normal hover:text-gray-500"><a href="blog-single.html"
//                      class="blog-link capitalize">How Often
//                      You Should Wash Your
//                      Hair in winter</a></h3>
//                  </div>
//                  <hr class="my-4 " />
//              </div>
//              </div>




//          </div>
//      </div>
//  </section>

//  {/* <!-- Blog-block Section Starts --> */}
//  <section id="blog-block">
//      <div class="columns-5 gap-0 pt-40">

//      <figure class="blog-block-content image-zoom relative">
//          <a href="blog-single.html" class=" ">
//          {/* <img class="blog-block-img " src="images/blog7.png" alt="" /> */}
//          <div class="header-overlay hidden lg:flex absolute inset-x-0 bottom-0 justify-center">
//              <h5 class="font-heading text-white text-xl p-12">5 Helpful Tips for Living Healthy Life</h5>
//          </div>
//          </a>
//      </figure>
//      <figure class="blog-block-content image-zoom relative">
//          <a href="blog-single.html" class=" ">
//          {/* <img class="blog-block-img " src="images/blog8.png" alt="" /> */}
//          <div class="header-overlay hidden lg:flex absolute inset-x-0 bottom-0 justify-center">
//              <h5 class="font-heading text-white text-xl p-12">5 Helpful Tips for Living Healthy Life</h5>
//          </div>
//          </a>
//      </figure>
//      <figure class="blog-block-content image-zoom relative">
//          <a href="blog-single.html" class=" ">
//          {/* <img class="blog-block-img " src="images/blog9.png" alt="" /> */}
//          <div class="header-overlay hidden lg:flex absolute inset-x-0 bottom-0 justify-center">
//              <h5 class="font-heading text-white text-xl p-12">5 Helpful Tips for Living Healthy Life</h5>
//          </div>
//          </a>
//      </figure>
//      <figure class="blog-block-content image-zoom relative">
//          <a href="blog-single.html" class=" ">
//          {/* <img class="blog-block-img " src="images/blog10.png" alt="" /> */}
//          <div class="header-overlay hidden lg:flex absolute inset-x-0 bottom-0 justify-center">
//              <h5 class="font-heading text-white text-xl p-12">5 Helpful Tips for Living Healthy Life</h5>
//          </div>
//          </a>
//      </figure>
//      <figure class="blog-block-content image-zoom relative">
//          <a href="blog-single.html" class=" ">
//          {/* <img class="blog-block-img " src="images/blog11.png" alt="" /> */}
//          <div class="header-overlay hidden lg:flex absolute inset-x-0 bottom-0 justify-center">
//              <h5 class="font-heading text-white text-xl p-12">5 Helpful Tips for Living Healthy Life</h5>
//          </div>
//          </a>
//      </figure>


//      </div>
//  </section>

//  {/* <!-- cta Section Starts --> */}
//  <section id="cta" class="bg-gray-50">
//      <div class="container mx-auto xl:px-60 py-40 px-5 ">
//      <div class="lg:grid grid-cols-3 gap-6">
//          <div class="grid grid-cols-subgrid col-span-2">
//          <div class="col-span-2">
//              <h2 class="font-heading text-6xl">Never miss a Post <br /> Subscribe Now</h2>
//              <p class="pt-5">I am so happy, my dear friend, so absorbed in the exquisite sense of
//              mere tranquil existence, that I neglect my talents. I should be incapable of drawing</p>
//          </div>
//          </div>
//          <div class="mt-6 lg:0">
//          <div class="grid grid-cols-1 gap-2">
//              <label class="block">
//              <input type="text"
//                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500  focus:ring-gray-300 focus:ring-opacity-50"
//                  placeholder="Your Name"/>
//              </label>
//              <label class="block">
//              <input type="email"
//                  class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500  focus:ring-gray-300 focus:ring-opacity-50"
//                  placeholder="E-mail Address" />
//              </label>
//              <button class="bg-primary rounded-md text-white uppercase p-3 w-full" type="button">Subscribe</button>
//          </div>
//          </div>
//      </div>
//      </div>
//  </section>