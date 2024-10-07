import { useEffect, useState, } from "react";
import { Link, useParams, } from "react-router-dom";
import { HomeFooter, Nav } from "../components";
import api from "../api";










const convertDate = (dateString) => {
    const date = new Date(dateString);

    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    };

    return date.toLocaleString('en-GB', options);
};



const BlogSinglePost = () => {

    const { slug } = useParams();

    // eslint-disable-next-line
    const [isLoading, setIsLoading] = useState(true);
    // console.log("IS LOADING: ", isLoading);

    const [blogSinglePost, setBlogSinglePost] = useState(null);
    // console.log("Single Post: ", blogSinglePost);
        
    // ************************ //
    // *** FIND POST BY URL *** //
    // ************************ //
    useEffect(() => {
        // const url = slug.replace(/-/g, ' '); // Convert slug back to title    
        const url = slug;
        api.get(`/api/v1/admin/blogs/manage/post/${url}`)
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
    // ************************ //
    // *** FIND POST BY URL *** //
    // ************************ //

    const formattedDate = convertDate(blogSinglePost?.createdAt);

    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        if (!blogSinglePost?.title) {
            const pageTitle = "Blog Post", 
                  siteTitle = "Samuel Akinola Foundation";
            document.title = `${pageTitle} | ${siteTitle}`;           
        } else {
            const pageTitle = `${blogSinglePost?.title?.toUpperCase()}`, 
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

    



    const [sidebarPosts, setSidebarPosts] = useState([]);
    console.log("Sidebar Post: ", sidebarPosts);
    
    const [currentPage, setCurrentPage] = useState(1);
    const limit = 3; // Number of items per page   

    useEffect(() => {
        async function fetchAllSidebarBlogPosts() {
            var status = 'published';
            var sort = 'recent';
            
            await api.get(`/api/v1/admin/blogs/manage?page=${currentPage}&limit=${limit}&status=${status}&sort=${sort}`)
            .then((response) => {
                const { success, data, message } = response.data;
                const { allBlogPosts, } = data;
  
                if (!success && message === "No article found") {
                    console.log("Success: ", success);
                    console.log("Message: ", message);
                };
  
                setSidebarPosts(allBlogPosts);                                            
            })
            .catch((error) => {
                console.log("Error fetching data: ", error);
            });
        };
        var timerID = setTimeout(fetchAllSidebarBlogPosts, 400);   // Delay execution of findAllStaffs by 1800ms
        return () => {
            clearTimeout(timerID);                  // Clean up timer if component unmounts or token changes
        };
    }, [currentPage]);





    return (
        <>
            <Nav />

            <main className="container mx-auto mb-64 px-32">            
                <div class="mx-12 lg:mx-16 mt-32 grid grid-cols-28 gap-16">  
                
                    <section className="p-0">   
                                <div className="max-w-full mx-auto flex flex-col items-center p-0">  
                                
                                    {/* SINGLE POST PAGE */}           
                                    <div className="block w-full">
                                            
                                        <div className="self-stretch p-0 mb-0">
                                            <div className="rounded shadow-md h-full">
                                                <Link to={`/blog/${blogSinglePost?.uri}`}>
                                                    <img className="w-full m-0 rounded-t lazy" 
                                                        // src="data:image/svg+xml,%3Csvg%20xmlns%3D&#39;http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg&#39;%20viewBox%3D&#39;0%200%201%201&#39;%20height%3D&#39;500&#39;%20width%3D&#39;960&#39;%20style%3D&#39;background-color%3Argb(203%2C213%2C224)&#39;%2F%3E" 
                                                        // data-src="/assets/img/small-business.jpg" 
                                                        // width="960" 
                                                        src={blogSinglePost?.img}   
                                                        width="100%"
                                                        height="500" 
                                                        alt="post thumbnail" 
                                                    />
                                                </Link>
                                                <div className="px-11 pt-10 pb-20 flex flex-col gap-8">
                                                    <div className="font-semibold text-lg mb-2 border-gray-600 border-b-2 pb-2">
                                                        <Link to={`/blog/${blogSinglePost?.uri}`} className="text-slate-900 text-5xl font-semibold capitalize hover:text-slate-700">{blogSinglePost?.title}</Link>
                                                        <div className="mt-5 pb-2 text-2xl italic font-bold">{formattedDate}</div>
                                                    </div>
                                                    {/* <p class="text-slate-700 mb-1" title="Published date">{blogSinglePost?.author?.name}</p> */}
                                                    {/* <p class="text-slate-800 text-2xl/relaxed font-medium tracking-tightened mb-2">            
                                                        {blogSinglePost?.description}               
                                                    </p> */}
                                                    <div
                                                        className="rendered-output"
                                                        dangerouslySetInnerHTML={{ __html: blogSinglePost?.description }} // Render HTML content here
                                                    />                   
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                    {/* SINGLE POST PAGE */}    

                                </div>
                    </section>




                    <aside>
                        <div className="max-w-full mx-0">                        
                                    <div className="flex flex-wrap mx-auto">                            
                                        <h2 className="text-3xl font-bold pb-3 mb-8 tracking-tightened border-b-2 border-b-black w-full">Recent Posts</h2>

                                        {
                                            sidebarPosts.map((post) => {                
                                                return (                                        
                                                    <div key={post?._id} className="w-full sm:w-1/2 md:w-1/3 self-stretch p-0 mb-4">
                                                        <div className="rounded shadow-md h-full">
                                                            <Link to={`/blog/${post?.uri}`}>
                                                                <img 
                                                                    src={post?.img}
                                                                    class="w-full m-0 rounded-t lazy"
                                                                    width="960" 
                                                                    height="500" 
                                                                    alt="This post thumbnail" 
                                                                />
                                                            </Link>
                                                            <div className="px-6 py-5">
                                                                <div className="font-semibold text-lg mb-2">
                                                                    <Link 
                                                                        to={`/blog/${post?.uri}`}
                                                                        className="text-slate-900 hover:text-slate-700">{post?.title}</Link>
                                                                </div>
                                                                <p className="text-slate-700 mb-1" title="Published date">16 January 2019 10:00 AM</p>
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
                        </div>
                    </aside>

                </div>
            </main>

            <HomeFooter />
        </>
    );

};

export default BlogSinglePost;

