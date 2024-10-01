import { useEffect, } from "react";
// import { useParams useState } from "react-router-dom";
import { Nav } from "../components";








const BlogSinglePost = () => {


    // const { id } = useParams();


    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        const pageTitle = "Blog", siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;

        // const uri = new URLSearchParams(window.location.search);
        // const = uri.getItem('');
        // const = uri.getItem('');
        // const = uri.getItem('');
        
    }, []);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //

    // const [blogSinglePost, setBlogSinglePost] = useState(null);


    



    return (
        <>
            <Nav />


            <div className="container mx-auto">
                <main class="mx-12 lg:mx-16 mt-32 grid grid-cols-28">  

            
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


export default BlogSinglePost;
