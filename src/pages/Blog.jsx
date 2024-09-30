import { useEffect } from "react";
import { Nav } from "../components";








const Blog = () => {



    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        const pageTitle = "Blog", siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;
    }, []);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //



    return (
        <>
            <Nav />


            <div className="container mx-auto">
                <main class="mx-7 lg:mx-16 mt-32 grid grid-cols-28">  

            
                        <section>   
                            <div class="mx-auto flex flex-col items-center pl-16 pr-12">  
                                {/* POSTS LISTING */}          
                                <div class="grid grid-cols-3 gap-4 flex-wrap">
                                        
                                    <div class="self-stretch p-2 mb-12">
                                        <div class="rounded shadow-md h-full">
                                            <a href="/small-business/">
                                                <img class="w-full m-0 rounded-t lazy" src="data:image/svg+xml,%3Csvg%20xmlns%3D&#39;http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg&#39;%20viewBox%3D&#39;0%200%201%201&#39;%20height%3D&#39;500&#39;%20width%3D&#39;960&#39;%20style%3D&#39;background-color%3Argb(203%2C213%2C224)&#39;%2F%3E" data-src="/assets/img/small-business.jpg" width="960" height="500" alt="This post thumbnail" />
                                            </a>
                                            <div class="px-6 py-5">
                                                <div class="font-semibold text-lg mb-2">
                                                    <a class="text-slate-900 hover:text-slate-700" href="/small-business/">7 Things You Should Know About Running a Small Business</a>
                                                </div>
                                                <p class="text-slate-700 mb-1" title="Published date">16 January 2019 10:00 AM</p>
                                                <p class="text-slate-800">            
                                                    When you start your small business, you will quickly become aware that there are many othe...                
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="self-stretch p-2 mb-12">
                                        <div class="rounded shadow-md h-full">
                                            <a href="/comparing-yourself/">
                                                <img class="w-full m-0 rounded-t lazy" src="data:image/svg+xml,%3Csvg%20xmlns%3D&#39;http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg&#39;%20viewBox%3D&#39;0%200%201%201&#39;%20height%3D&#39;500&#39;%20width%3D&#39;960&#39;%20style%3D&#39;background-color%3Argb(203%2C213%2C224)&#39;%2F%3E" data-src="/assets/img/comparing-yourself.jpg" width="960" height="500" alt="This post thumbnail" />
                                            </a>
                                            <div class="px-6 py-5">
                                                <div class="font-semibold text-lg mb-2">
                                                    <a class="text-slate-900 hover:text-slate-700" href="/comparing-yourself/">Stop Comparing Yourself to Others #SelfLove</a>
                                                </div>
                                                <p class="text-slate-700 mb-1" title="Published date">16 January 2019 10:00 AM</p>
                                                <p class="text-slate-800">
                                                    
                                                    Far quitting dwelling graceful the likewise received building. An fact so to that show am ...
                                                    
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="self-stretch p-2 mb-12">
                                        <div class="rounded shadow-md h-full">
                                            <a href="/comparing-yourself/">
                                                <img class="w-full m-0 rounded-t lazy" src="data:image/svg+xml,%3Csvg%20xmlns%3D&#39;http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg&#39;%20viewBox%3D&#39;0%200%201%201&#39;%20height%3D&#39;500&#39;%20width%3D&#39;960&#39;%20style%3D&#39;background-color%3Argb(203%2C213%2C224)&#39;%2F%3E" data-src="/assets/img/comparing-yourself.jpg" width="960" height="500" alt="This post thumbnail" />
                                            </a>
                                            <div class="px-6 py-5">
                                                <div class="font-semibold text-lg mb-2">
                                                    <a class="text-slate-900 hover:text-slate-700" href="/comparing-yourself/">Stop Comparing Yourself to Others #SelfLove</a>
                                                </div>
                                                <p class="text-slate-700 mb-1" title="Published date">16 January 2019 10:00 AM</p>
                                                <p class="text-slate-800">
                                                    
                                                    Far quitting dwelling graceful the likewise received building. An fact so to that show am ...
                                                    
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="self-stretch p-2 mb-12">
                                        <div class="rounded shadow-md h-full">
                                            <a href="/comparing-yourself/">
                                                <img class="w-full m-0 rounded-t lazy" src="data:image/svg+xml,%3Csvg%20xmlns%3D&#39;http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg&#39;%20viewBox%3D&#39;0%200%201%201&#39;%20height%3D&#39;500&#39;%20width%3D&#39;960&#39;%20style%3D&#39;background-color%3Argb(203%2C213%2C224)&#39;%2F%3E" data-src="/assets/img/comparing-yourself.jpg" width="960" height="500" alt="This post thumbnail" />
                                            </a>
                                            <div class="px-6 py-5">
                                                <div class="font-semibold text-lg mb-2">
                                                    <a class="text-slate-900 hover:text-slate-700" href="/comparing-yourself/">Stop Comparing Yourself to Others #SelfLove</a>
                                                </div>
                                                <p class="text-slate-700 mb-1" title="Published date">16 January 2019 10:00 AM</p>
                                                <p class="text-slate-800">
                                                    
                                                    Far quitting dwelling graceful the likewise received building. An fact so to that show am ...
                                                    
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="self-stretch p-2 mb-12">
                                        <div class="rounded shadow-md h-full">
                                            <a href="/comparing-yourself/">
                                                <img class="w-full m-0 rounded-t lazy" src="data:image/svg+xml,%3Csvg%20xmlns%3D&#39;http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg&#39;%20viewBox%3D&#39;0%200%201%201&#39;%20height%3D&#39;500&#39;%20width%3D&#39;960&#39;%20style%3D&#39;background-color%3Argb(203%2C213%2C224)&#39;%2F%3E" data-src="/assets/img/comparing-yourself.jpg" width="960" height="500" alt="This post thumbnail" />
                                            </a>
                                            <div class="px-6 py-5">
                                                <div class="font-semibold text-lg mb-2">
                                                    <a class="text-slate-900 hover:text-slate-700" href="/comparing-yourself/">Stop Comparing Yourself to Others #SelfLove</a>
                                                </div>
                                                <p class="text-slate-700 mb-1" title="Published date">16 January 2019 10:00 AM</p>
                                                <p class="text-slate-800">
                                                    
                                                    Far quitting dwelling graceful the likewise received building. An fact so to that show am ...
                                                    
                                                </p>
                                            </div>
                                        </div>
                                    </div>  

                                    <div class="self-stretch p-2 mb-12">
                                        <div class="rounded shadow-md h-full">
                                            <a href="/comparing-yourself/">
                                                <img class="w-full m-0 rounded-t lazy" src="data:image/svg+xml,%3Csvg%20xmlns%3D&#39;http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg&#39;%20viewBox%3D&#39;0%200%201%201&#39;%20height%3D&#39;500&#39;%20width%3D&#39;960&#39;%20style%3D&#39;background-color%3Argb(203%2C213%2C224)&#39;%2F%3E" data-src="/assets/img/comparing-yourself.jpg" width="960" height="500" alt="This post thumbnail" />
                                            </a>
                                            <div class="px-6 py-5">
                                                <div class="font-semibold text-lg mb-2">
                                                    <a class="text-slate-900 hover:text-slate-700" href="/comparing-yourself/">Stop Comparing Yourself to Others #SelfLove</a>
                                                </div>
                                                <p class="text-slate-700 mb-1" title="Published date">16 January 2019 10:00 AM</p>
                                                <p class="text-slate-800">
                                                    
                                                    Far quitting dwelling graceful the likewise received building. An fact so to that show am ...
                                                    
                                                </p>
                                            </div>
                                        </div>
                                    </div>  

                                    <div class="self-stretch p-2 mb-12">
                                        <div class="rounded shadow-md h-full">
                                            <a href="/comparing-yourself/">
                                                <img class="w-full m-0 rounded-t lazy" src="data:image/svg+xml,%3Csvg%20xmlns%3D&#39;http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg&#39;%20viewBox%3D&#39;0%200%201%201&#39;%20height%3D&#39;500&#39;%20width%3D&#39;960&#39;%20style%3D&#39;background-color%3Argb(203%2C213%2C224)&#39;%2F%3E" data-src="/assets/img/comparing-yourself.jpg" width="960" height="500" alt="This post thumbnail" />
                                            </a>
                                            <div class="px-6 py-5">
                                                <div class="font-semibold text-lg mb-2">
                                                    <a class="text-slate-900 hover:text-slate-700" href="/comparing-yourself/">Stop Comparing Yourself to Others #SelfLove</a>
                                                </div>
                                                <p class="text-slate-700 mb-1" title="Published date">16 January 2019 10:00 AM</p>
                                                <p class="text-slate-800">
                                                    
                                                    Far quitting dwelling graceful the likewise received building. An fact so to that show am ...
                                                    
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="self-stretch p-2 mb-12">
                                        <div class="rounded shadow-md h-full">
                                            <a href="/comparing-yourself/">
                                                <img class="w-full m-0 rounded-t lazy" src="data:image/svg+xml,%3Csvg%20xmlns%3D&#39;http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg&#39;%20viewBox%3D&#39;0%200%201%201&#39;%20height%3D&#39;500&#39;%20width%3D&#39;960&#39;%20style%3D&#39;background-color%3Argb(203%2C213%2C224)&#39;%2F%3E" data-src="/assets/img/comparing-yourself.jpg" width="960" height="500" alt="This post thumbnail" />
                                            </a>
                                            <div class="px-6 py-5">
                                                <div class="font-semibold text-lg mb-2">
                                                    <a class="text-slate-900 hover:text-slate-700" href="/comparing-yourself/">Stop Comparing Yourself to Others #SelfLove</a>
                                                </div>
                                                <p class="text-slate-700 mb-1" title="Published date">16 January 2019 10:00 AM</p>
                                                <p class="text-slate-800">
                                                    
                                                    Far quitting dwelling graceful the likewise received building. An fact so to that show am ...
                                                    
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="self-stretch p-2 mb-12">
                                        <div class="rounded shadow-md h-full">
                                            <a href="/comparing-yourself/">
                                                <img class="w-full m-0 rounded-t lazy" src="data:image/svg+xml,%3Csvg%20xmlns%3D&#39;http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg&#39;%20viewBox%3D&#39;0%200%201%201&#39;%20height%3D&#39;500&#39;%20width%3D&#39;960&#39;%20style%3D&#39;background-color%3Argb(203%2C213%2C224)&#39;%2F%3E" data-src="/assets/img/comparing-yourself.jpg" width="960" height="500" alt="This post thumbnail" />
                                            </a>
                                            <div class="px-6 py-5">
                                                <div class="font-semibold text-lg mb-2">
                                                    <a class="text-slate-900 hover:text-slate-700" href="/comparing-yourself/">Stop Comparing Yourself to Others #SelfLove</a>
                                                </div>
                                                <p class="text-slate-700 mb-1" title="Published date">16 January 2019 10:00 AM</p>
                                                <p class="text-slate-800">
                                                    
                                                    Far quitting dwelling graceful the likewise received building. An fact so to that show am ...
                                                    
                                                </p>
                                            </div>
                                        </div>
                                    </div>  

                                    <div class="self-stretch p-2 mb-2">
                                        <div class="rounded shadow-md h-full">
                                            <a href="/comparing-yourself/">
                                                <img class="w-full m-0 rounded-t lazy" src="data:image/svg+xml,%3Csvg%20xmlns%3D&#39;http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg&#39;%20viewBox%3D&#39;0%200%201%201&#39;%20height%3D&#39;500&#39;%20width%3D&#39;960&#39;%20style%3D&#39;background-color%3Argb(203%2C213%2C224)&#39;%2F%3E" data-src="/assets/img/comparing-yourself.jpg" width="960" height="500" alt="This post thumbnail" />
                                            </a>
                                            <div class="px-6 py-5">
                                                <div class="font-semibold text-lg mb-2">
                                                    <a class="text-slate-900 hover:text-slate-700" href="/comparing-yourself/">Stop Comparing Yourself to Others #SelfLove</a>
                                                </div>
                                                <p class="text-slate-700 mb-1" title="Published date">16 January 2019 10:00 AM</p>
                                                <p class="text-slate-800">
                                                    
                                                    Far quitting dwelling graceful the likewise received building. An fact so to that show am ...
                                                    
                                                </p>
                                            </div>
                                        </div>
                                    </div>  

                                </div>
                                {/* POSTS LISTING */}    



                                {/* PAGINATION */}
                                <div class="mt-3 flow-root">
                                    <a href="/" class="float-left bg-white font-semibold py-2 px-4 border rounded shadow-md text-slate-800 cursor-pointer hover:bg-slate-100">Previous</a>
                                    <a href="javascript:void(0)" class="float-right bg-white font-semibold py-2 px-4 border rounded shadow-md text-slate-800 cursor-default text-opacity-50">Next</a>
                                </div>
                                {/* PAGINATION */}
                            </div>
                        </section>




                        <aside>
                            <div class="max-w-lg mx-0">                        
                                <div class="flex flex-wrap -mx-2">                            
                                    <div class="w-full sm:w-1/2 md:w-1/3 self-stretch p-2 mb-2">
                                        <div class="rounded shadow-md h-full">
                                            <a href="/small-business/">
                                                {/* <img class="w-full m-0 rounded-t lazy" src="data:image/svg+xml,%3Csvg%20xmlns%3D&#39;http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg&#39;%20viewBox%3D&#39;0%200%201%201&#39;%20height%3D&#39;500&#39;%20width%3D&#39;960&#39;%20style%3D&#39;background-color%3Argb(203%2C213%2C224)&#39;%2F%3E" data-src="/assets/img/small-business.jpg" width="960" height="500" alt="This post thumbnail" /> */}
                                            </a>
                                            <div class="px-6 py-5">
                                                <div class="font-semibold text-lg mb-2">
                                                    <a class="text-slate-900 hover:text-slate-700" href="/small-business/">7 Things You Should Know About Running a Small Business</a>
                                                </div>
                                                <p class="text-slate-700 mb-1" title="Published date">16 January 2019 10:00 AM</p>
                                                <p class="text-slate-800">
                                                    
                                                    When you start your small business, you will quickly become aware that there are many othe...
                                                    
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    
                                    <div class="w-full sm:w-1/2 md:w-1/3 self-stretch p-2 mb-2">
                                        <div class="rounded shadow-md h-full">
                                            <a href="/comparing-yourself/">
                                                {/* <img class="w-full m-0 rounded-t lazy" src="data:image/svg+xml,%3Csvg%20xmlns%3D&#39;http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg&#39;%20viewBox%3D&#39;0%200%201%201&#39;%20height%3D&#39;500&#39;%20width%3D&#39;960&#39;%20style%3D&#39;background-color%3Argb(203%2C213%2C224)&#39;%2F%3E" data-src="/assets/img/comparing-yourself.jpg" width="960" height="500" alt="This post thumbnail" /> */}
                                            </a>
                                            <div class="px-6 py-5">
                                                <div class="font-semibold text-lg mb-2">
                                                    <a class="text-slate-900 hover:text-slate-700" href="/comparing-yourself/">Stop Comparing Yourself to Others #SelfLove</a>
                                                </div>
                                                <p class="text-slate-700 mb-1" title="Published date">16 January 2019 10:00 AM</p>
                                                <p class="text-slate-800">
                                                    
                                                    Far quitting dwelling graceful the likewise received building. An fact so to that show am ...
                                                    
                                                </p>
                                            </div>
                                        </div>
                                    </div>                        
                                </div>                           
                            </div>
                        </aside>

                </main> 
            </div>
        </>
    );
};


export default Blog;




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