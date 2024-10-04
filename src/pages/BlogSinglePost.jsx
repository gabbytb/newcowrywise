import { useEffect, useState, } from "react";
import { Link, useParams, } from "react-router-dom";
import { Nav } from "../components";
import api from "../api";










const BlogSinglePost = () => {

    const { slug } = useParams();

    const [isLoading, setIsLoading] = useState(true);
    console.log("IS LOADING: ", isLoading);

    const [blogSinglePost, setBlogSinglePost] = useState(undefined);
    console.log("Single Post: ", blogSinglePost);


    const formatUrl = (title) => {
        return title.replace(/ /g, '-').toLowerCase();
    };


    useEffect(() => {
        const title = slug.replace(/-/g, ' '); // Convert slug back to title

        // api.get(`/api/v1/admin/blogs/manage/post/${formatUrl(title)}`)
        api.get(`/api/v1/admin/blogs/manage/post/${title}`)
        .then((response) => {
            const { success, data, message } = response.data; 
            if (!success && message === "Post not found") {
                console.log("Success: ", success);
                console.log("Message: ", message);
            };

            console.log("Success: ", success);
            console.log("Data: ", data);
            console.log("Message: ", message);

            setBlogSinglePost(data);

        })
        .catch((error) => {
            console.log("Error fetching data: ", error);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [slug]);


    

    
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        if (blogSinglePost?.title !== undefined) {
            const pageTitle = `${blogSinglePost?.title}`, 
                  siteTitle = "Samuel Akinola Foundation";
            document.title = `${pageTitle} | ${siteTitle}`;
        } else {
            const pageTitle = "Blog Post", 
                  siteTitle = "Samuel Akinola Foundation";
            document.title = `${pageTitle} | ${siteTitle}`;
        };

        // const uri = new URLSearchParams(window.location.search);
        // const = uri.getItem('');
        // const = uri.getItem('');
        // const = uri.getItem('');
        
    }, [blogSinglePost]);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //





    return (
        <>
            <Nav />


            <div className="container mx-auto">
                <main class="mx-12 lg:mx-16 mt-32 grid grid-cols-28">  

            
                        <section>   
                            <div class="mx-auto flex flex-col items-center pl-16 pr-12">  
                               
                                {/* SINGLE POST PAGE */}           
                                <div class="block">
                                        
                                    <div class="self-stretch p-2 mb-0">
                                        <div class="rounded shadow-md h-full">
                                            <Link to={"/small-business/"}>
                                                <img class="w-full m-0 rounded-t lazy" 
                                                    // src="data:image/svg+xml,%3Csvg%20xmlns%3D&#39;http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg&#39;%20viewBox%3D&#39;0%200%201%201&#39;%20height%3D&#39;500&#39;%20width%3D&#39;960&#39;%20style%3D&#39;background-color%3Argb(203%2C213%2C224)&#39;%2F%3E" 
                                                    // data-src="/assets/img/small-business.jpg" 
                                                    width="960" 
                                                    height="500" 
                                                    alt="This post thumbnail" 
                                                />
                                            </Link>
                                            <div class="px-6 py-5">
                                                <div class="font-semibold text-lg mb-2">
                                                    <Link to={"/small-business/"} class="text-slate-900 hover:text-slate-700">{blogSinglePost?.title}</Link>
                                                </div>
                                                <p class="text-slate-700 mb-1" title="Published date">16 January 2019 10:00 AM</p>
                                                <p class="text-slate-800">            
                                                    {blogSinglePost?.description}               
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </div>
                                {/* SINGLE POST PAGE */}    

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
