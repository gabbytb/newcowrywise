import React from 'react'

const BlogLayout = () => {
  return (
    <>
        <nav class="fixed navbar w-full z-10">
            <div class=" py-6 px-4 sm:px-6 lg:px-8">
                <div class="flex items-center justify-between ">
                    
                    <div class="flex items-center justify-between">
                        <div class="flex-shrink-0">
                            <a href="">
                                {/* <img class="" src="images/Amanda.png" alt="Your Company" /> */}
                            </a> 
                        </div>
                    </div>

                    <div class="hidden md:block">
                        <div class="flex items-baseline ">
                            {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                            <a href="index.html" class="font-heading uppercase text-base text-black hover:text-gray-500 py-2"
                            aria-current="page">Home</a>
                            <div class="group relative cursor-pointer">
                                <div class="flex items-center justify-between">
                                <a class="menu-hover font-heading uppercase text-base text-black hover:text-gray-500 px-10 py-2" onClick="">
                                    Pages 
                                    <iconify-icon icon="iconamoon:arrow-down-2-fill"></iconify-icon>
                                </a>
                                </div>
                                <div
                                class="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 ps-1 text-gray-800 shadow-xl group-hover:visible"
                                onClick="">
                                <a href="about.html"
                                    class="my-2 font-heading uppercase text-sm text-black hover:text-gray-500 md:mx-2">About Us <span class="inline-flex items-center capitalize rounded-md bg-slate-700 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">Pro</span></a>
                                <a href="blog.html"
                                    class="my-2 font-heading uppercase text-sm text-black hover:text-gray-500 md:mx-2">Blog <span class="inline-flex items-center capitalize rounded-md bg-slate-700 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">Pro</span></a>
                                <a href="blog-single.html"
                                    class="my-2 font-heading uppercase text-sm text-black hover:text-gray-500 md:mx-2">Single Post<span class="inline-flex items-center capitalize rounded-md bg-slate-700 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">Pro</span>
                                </a>
                                <a href="contact.html"
                                    class="my-2 font-heading uppercase text-sm text-black hover:text-gray-500 md:mx-2">Contact <span class="inline-flex items-center capitalize rounded-md bg-slate-700 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">Pro</span>
                                </a>
                                <a href="faq.html"
                                    class="my-2 font-heading uppercase text-sm text-black hover:text-gray-500 md:mx-2">FAQs <span class="inline-flex items-center capitalize rounded-md bg-slate-700 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">Pro</span>
                                </a>
                                <a href="gallary.html"
                                    class="my-2 font-heading uppercase text-sm text-black hover:text-gray-500 md:mx-2">Gallery <span class="inline-flex items-center capitalize rounded-md bg-slate-700 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">Pro</span>
                                </a>
                                </div>
                            </div>
                            <a href="about.html" class="font-heading uppercase text-base text-black hover:text-gray-500 py-2 pe-5">About</a>
                            <a href="blog.html" class="font-heading uppercase text-base text-black hover:text-gray-500 py-2 px-5">Blog</a>
                            <a href="contact.html" class="font-heading uppercase text-base text-black hover:text-gray-500 py-2 ps-5">Contact</a>
                            <a href="https://templatesjungle.gumroad.com/l/amanda-lifestyle-blog-tailwind-css-website-template" class="font-heading uppercase font-bold text-base text-black hover:text-gray-500 py-2 ps-5" target="_blank">GET PRO</a>
                        </div>
                    </div>

                    <div class="-mr-2 flex md:hidden mobile-menu-button">
                        {/* <!-- Mobile menu button --> */}
                        <button type="button"
                            class="relative inline-flex items-center justify-center rounded-md  p-2 text-black hover:bg-slate-700 hover:text-white"
                            aria-controls="mobile-menu" aria-expanded="false">
                            <span class="absolute -inset-0.5"></span>
                            <span class="sr-only">Open main menu</span>
                            {/* <!-- Menu open: "hidden", Menu closed: "block" --> */}
                            <svg class="open-icon block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                            </svg>
                            {/* <!-- Menu open: "block", Menu closed: "hidden" --> */}
                            <svg class="close-icon hidden h-6 w-6" fill="none" viewBox="0 0 24 24" stroke-width="1.5"
                            stroke="currentColor" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>

                </div>
            </div>

            {/* <!-- Mobile menu, show/hide based on menu state. --> */}
            <div class="md:hidden hidden bg-white" id="mobile-menu">
                <div class="space-y-1 px-2 pb-3 pt-2 h-screen sm:px-3">
                    {/* <!-- Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" --> */}
                    <a href="" class="font-heading block uppercase text-base text-black hover:text-gray-500 p-2"aria-current="page">Home</a>
                    <div class="group relative cursor-pointer">
                        <div class="flex items-center justify-between">
                            <a class="menu-hover font-heading block uppercase text-base text-black hover:text-gray-500 p-2" onClick="">
                            Pages <iconify-icon
                            icon="iconamoon:arrow-down-2-fill"></iconify-icon>
                            </a>
                        </div>
                        <div
                            class="invisible absolute z-50 flex w-full flex-col bg-gray-100 py-1 px-2 text-gray-800 shadow-xl group-hover:visible"
                            onClick="">
                            <a href="about.html"
                            class="my-2 font-heading uppercase text-sm text-black hover:text-gray-500 md:mx-2">About Us <span class="inline-flex items-center capitalize rounded-md bg-slate-700 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">Pro</span></a>
                            <a href="blog.html"
                            class="my-2 font-heading uppercase text-sm text-black hover:text-gray-500 md:mx-2">Blog <span class="inline-flex items-center capitalize rounded-md bg-slate-700 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">Pro</span></a>
                            <a href="blog-single.html"
                            class="my-2 font-heading uppercase text-sm text-black hover:text-gray-500 md:mx-2">Single Post <span class="inline-flex items-center capitalize rounded-md bg-slate-700 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">Pro</span>
                            </a>
                            <a href="contact.html"
                            class="my-2 font-heading uppercase text-sm text-black hover:text-gray-500 md:mx-2">Contact <span class="inline-flex items-center capitalize rounded-md bg-slate-700 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">Pro</span>
                            </a>
                            <a href="faq.html"
                            class="my-2 font-heading uppercase text-sm text-black hover:text-gray-500 md:mx-2">FAQs <span class="inline-flex items-center capitalize rounded-md bg-slate-700 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">Pro</span>
                            </a>
                            <a href="gallary.html"
                            class="my-2 font-heading uppercase text-sm text-black hover:text-gray-500 md:mx-2">Gallery <span class="inline-flex items-center capitalize rounded-md bg-slate-700 px-2 py-1 text-xs font-medium text-white ring-1 ring-inset ring-gray-500/10">Pro</span>
                            </a>
                        </div>
                    </div>
                    <a href="about.html" class="font-heading block uppercase text-base text-black hover:text-gray-500 p-2 ">About</a>
                    <a href="blog.html" class="font-heading block uppercase text-base text-black hover:text-gray-500 p-2 ">Blog</a>
                    <a href="contact.html" class="font-heading block uppercase text-base text-black hover:text-gray-500 p-2 ">Contact</a>
                    <a href="https://templatesjungle.gumroad.com/l/amanda-lifestyle-blog-tailwind-css-website-template" class="font-heading font-bold block uppercase text-base text-black hover:text-gray-500 p-2 ">GET PRO</a>
                </div>
            </div>
        </nav>

        {/* <!-- hero Section Starts --> */}
        <section id="hero" class="jarallax jarallax-img title-img" 
            // style="background-image: url(images/hero-img.png);"
            >
            <div class="py-80 xl:px-96 text-center">
            <h2 class="font-heading text-5xl sm:text-6xl lg:text-8xl font-thin">About self love & Relationships</h2>
            <p class="text-xl sm-text-2xl lg:text-4xl xl:px-40 py-10 text-stone-700">Hi, I’m a Fitness enthusiast eager to
                share everything that i
                learned
                through
                my 5 year transformation </p>
            </div>
        </section>

        {/* <!-- blog-card Section Starts --> */}
        <section id="blog-card">
            <div class="container mx-auto py-28">
                <div class="columns-1 md:columns-2 lg:columns-3 gap-7 px-5 lg:px-0">
                    <div class="blog-post py-10">

                        <div class="image-zoom ">
                            <a href="blog-single.html" class="blog-img">
                                {/* <img src="images/blog6.png" alt="" class="" /> */}
                            </a>
                        </div>
                        <div class="pt-8">
                            <span class="blog-date uppercase">in <b>Travel Tips</b> on 12th Jan 2023</span>
                        </div>
                        <div class="">
                            <h3 class="py-5"><a href="blog-single.html" class="font-heading font-thin text-2xl hover:text-gray-500">I am
                                alone, and feel the charm
                                of
                                existence
                                created for the bliss</a></h3>
                            <p class="pb-10">I am so happy, my dear friend, so absorbed in the exquisite sense of mere
                            tranquil existence, that I neglect my talents. I should be incapable of drawing since
                            </p>
                            <a href="blog-single.html"
                            class="font-heading text-sm font-normal py-4 px-8 bg-transparent hover:bg-black text-black hover:text-white border-black border-2 hover:border-transparent rounded-full transition duration-700 ease-in-out">
                            Read More
                            </a>
                        </div>

                    </div>
                    <div class="blog-post py-10">

                        <div class="image-zoom">
                            <a href="blog-single.html" class="blog-img">
                                {/* <img src="images/blog5.png" alt="" class="img-fluid" /> */}
                            </a>
                        </div>
                        <div class="pt-8">
                            <span class="blog-date uppercase">in <b>Travel Tips</b> on 12th Jan 2023</span>
                        </div>
                        <div class="">
                            <h3 class="py-5"><a href="blog-single.html" class="font-heading font-thin text-2xl hover:text-gray-500">I am
                                alone, and feel the charm
                                of
                                existence
                                created for the bliss</a></h3>
                            <p class="pb-10">I am so happy, my dear friend, so absorbed in the exquisite sense of mere
                            tranquil existence, that I neglect my talents. I should be incapable of drawing since
                            </p>
                            <a href="blog-single.html"
                            class="font-heading text-sm font-normal py-4 px-8 bg-transparent hover:bg-black text-black hover:text-white border-black border-2 hover:border-transparent rounded-full transition duration-700 ease-in-out">
                            Read More
                            </a>
                        </div>

                    </div>
                    <div class="blog-post py-10">

                        <div class="image-zoom">
                            <a href="blog-single.html" class="blog-img">
                                {/* <img src="images/blog4.png" alt="" class="img-fluid" /> */}
                            </a>
                        </div>
                        <div class="pt-8">
                            <span class="blog-date uppercase">in <b>Travel Tips</b> on 12th Jan 2023</span>
                        </div>
                        <div class="">
                            <h3 class="py-5"><a href="blog-single.html" class="font-heading font-thin text-2xl hover:text-gray-500">I am
                                alone, and feel the charm
                                of
                                existence
                                created for the bliss</a></h3>
                            <p class="pb-10">I am so happy, my dear friend, so absorbed in the exquisite sense of mere
                            tranquil existence, that I neglect my talents. I should be incapable of drawing since
                            </p>
                            <a href="blog-single.html"
                            class="font-heading text-sm font-normal py-4 px-8 bg-transparent hover:bg-black text-black hover:text-white border-black border-2 hover:border-transparent rounded-full transition duration-700 ease-in-out">
                            Read More
                            </a>
                        </div>

                    </div>
                    <div class="blog-post py-10">

                    <div class="image-zoom">
                        <a href="blog-single.html" class="blog-img">
                            {/* <img src="images/blog3.png" alt="" class="img-fluid" /> */}
                        </a>
                    </div>
                    <div class="pt-8">
                        <span class="blog-date uppercase">in <b>Travel Tips</b> on 12th Jan 2023</span>
                    </div>
                    <div class="">
                        <h3 class="py-5"><a href="blog-single.html" class="font-heading font-thin text-2xl hover:text-gray-500">I am
                            alone, and feel the charm
                            of
                            existence
                            created for the bliss</a></h3>
                        <p class="pb-10">I am so happy, my dear friend, so absorbed in the exquisite sense of mere
                        tranquil existence, that I neglect my talents. I should be incapable of drawing since
                        </p>
                        <a href="blog-single.html"
                        class="font-heading text-sm font-normal py-4 px-8 bg-transparent hover:bg-black text-black hover:text-white border-black border-2 hover:border-transparent rounded-full transition duration-700 ease-in-out">
                        Read More
                        </a>
                    </div>

                    </div>
                    <div class="blog-post py-10">

                        <div class="image-zoom">
                            <a href="blog-single.html" class="blog-img">
                                {/* <img src="images/blog2.png" alt="" class="img-fluid" /> */}
                            </a>
                        </div>
                        <div class="pt-8">
                            <span class="blog-date uppercase">in <b>Travel Tips</b> on 12th Jan 2023</span>
                        </div>
                        <div class="">
                            <h3 class="py-5"><a href="blog-single.html" class="font-heading font-thin text-2xl hover:text-gray-500">I am
                                alone, and feel the charm
                                of
                                existence
                                created for the bliss</a></h3>
                            <p class="pb-10">I am so happy, my dear friend, so absorbed in the exquisite sense of mere
                            tranquil existence, that I neglect my talents. I should be incapable of drawing since
                            </p>
                            <a href="blog-single.html"
                            class="font-heading text-sm font-normal py-4 px-8 bg-transparent hover:bg-black text-black hover:text-white border-black border-2 hover:border-transparent rounded-full transition duration-700 ease-in-out">
                            Read More
                            </a>
                        </div>

                    </div>
                    <div class="blog-post py-10">

                        <div class="image-zoom">
                            <a href="blog-single.html" class="blog-img">
                                {/* <img src="images/blog1.png" alt="" class="img-fluid" /> */}
                            </a>
                        </div>
                        <div class="pt-8">
                            <span class="blog-date uppercase">in <b>Travel Tips</b> on 12th Jan 2023</span>
                        </div>
                        <div class="">
                            <h3 class="py-5"><a href="blog-single.html" class="font-heading font-thin text-2xl hover:text-gray-500">I am
                                alone, and feel the charm
                                of
                                existence
                                created for the bliss</a></h3>
                            <p class="pb-10">I am so happy, my dear friend, so absorbed in the exquisite sense of mere
                            tranquil existence, that I neglect my talents. I should be incapable of drawing since
                            </p>
                            <a href="blog-single.html"
                            class="font-heading text-sm font-normal py-4 px-8 bg-transparent hover:bg-black text-black hover:text-white border-black border-2 hover:border-transparent rounded-full transition duration-700 ease-in-out">
                            Read More
                            </a>
                        </div>

                    </div>
                </div>
            </div>
        </section>

        {/* <!-- Feature Section Starts --> */}
        <section id="featured">
            <div class=" container mx-auto lg:flex justify-between align-middle px-5 lg:px-0">
                <h2 class="font-heading text-4xl ">Featured Posts</h2>
                <div class="pt-5 lg:pt-0">
                    <button
                    class="filter-button font-heading text-sm rounded-full hover:bg-primary hover:text-white px-4 py-2 mt-3 lg:mt-0 active uppercase"
                    data-filter="*">All</button>
                    <button
                    class="filter-button font-heading text-sm rounded-full hover:bg-primary hover:text-white px-4 py-2 mt-3 lg:mt-0  uppercase"
                    data-filter=".love">love</button>
                    <button
                    class="filter-button font-heading text-sm rounded-full hover:bg-primary hover:text-white px-4 py-2 mt-3 lg:mt-0  uppercase"
                    data-filter=".yoga">yoga</button>
                    <button
                    class="filter-button font-heading text-sm rounded-full hover:bg-primary hover:text-white px-4 py-2 mt-3 lg:mt-0  uppercase"
                    data-filter=".recipes">recipes</button>
                    <button
                    class="filter-button font-heading text-sm rounded-full hover:bg-primary hover:text-white px-4 py-2 mt-3 lg:mt-0  uppercase"
                    data-filter=".naturalherbs">natural
                    herbs</button>
                </div>
            </div>

            <div class="container mx-auto px-5 lg:px-0">
                <div class="isotope-container mt-12">

                    <div class="grid grid-cols-2 gap-4">
                    <div class="item love lg:me-28">
                        <div class="featured-post py-2">
                        <span class="blog-date uppercase">dating and Relationships</span>
                        <h3 class="font-heading text-2xl font-normal hover:text-gray-500 "><a href="blog-single.html"
                            class="blog-link capitalize">How 'Weak
                            Ties' Can Strengthen Our
                            Relationships</a></h3>
                        </div>
                        <hr class="my-4" />
                    </div>
                    <div class="item love lg:me-28">
                        <div class="featured-post py-2 ">
                        <span class="blog-date uppercase">dating and Relationships</span>
                        <h3 class="font-heading text-2xl font-normal hover:text-gray-500"><a href="blog-single.html"
                            class="blog-link capitalize">How 'Weak
                            Ties' Can Strengthen Our
                            Relationships</a></h3>
                        </div>
                        <hr class="my-4 "/>
                    </div>
                    <div class="item yoga lg:me-28">
                        <div class="featured-post py-2">
                        <span class="blog-date uppercase">dating and Relationships</span>
                        <h3 class="font-heading text-2xl font-normal hover:text-gray-500"><a href="blog-single.html"
                            class="blog-link capitalize">What It's
                            Really Like to Date While
                            Anxious </a></h3>
                        </div>
                        <hr class="my-4" />
                    </div>
                    <div class="item yoga lg:me-28">
                        <div class="featured-post py-2 ">
                        <span class="blog-date uppercase">dating and Relationships</span>
                        <h3 class="font-heading text-2xl font-normal hover:text-gray-500"><a href="blog-single.html"
                            class="blog-link capitalize">What It's
                            Really Like to Date While
                            Anxious </a></h3>
                        </div>
                        <hr class="my-4 " />
                    </div>
                    <div class="item recipes lg:me-28">
                        <div class="featured-post py-2">
                        <span class="blog-date uppercase">dating and Relationships</span>
                        <h3 class="font-heading text-2xl font-normal hover:text-gray-500"><a href="blog-single.html"
                            class="blog-link capitalize">Benefits
                            to Having Much Older
                            Friends than you</a></h3>
                        </div>
                        <hr class="my-4" />
                    </div>
                    <div class="item recipes lg:me-28">
                        <div class="featured-post py-2 ">
                        <span class="blog-date uppercase">dating and Relationships</span>
                        <h3 class="font-heading text-2xl font-normal hover:text-gray-500"><a href="blog-single.html"
                            class="blog-link capitalize">Benefits
                            to Having Much Older
                            Friends than you</a></h3>
                        </div>
                        <hr class="my-4 " />
                    </div>
                    <div class="item naturalherbs lg:me-28">
                        <div class="featured-post py-2">
                        <span class="blog-date uppercase">dating and Relationships</span>
                        <h3 class="font-heading text-2xl font-normal hover:text-gray-500"><a href="blog-single.html"
                            class="blog-link capitalize">How Often
                            You Should Wash Your
                            Hair in winter</a></h3>
                        </div>
                        <hr class="my-4 " />
                    </div>
                    <div class="item naturalherbs lg:me-28">
                        <div class="featured-post py-2 ">
                        <span class="blog-date uppercase">dating and Relationships</span>
                        <h3 class="font-heading text-2xl font-normal hover:text-gray-500"><a href="blog-single.html"
                            class="blog-link capitalize">How Often
                            You Should Wash Your
                            Hair in winter</a></h3>
                        </div>
                        <hr class="my-4 " />
                    </div>
                    </div>




                </div>
            </div>
        </section>

        {/* <!-- Blog-block Section Starts --> */}
        <section id="blog-block">
            <div class="columns-5 gap-0 pt-40">

            <figure class="blog-block-content image-zoom relative">
                <a href="blog-single.html" class=" ">
                {/* <img class="blog-block-img " src="images/blog7.png" alt="" /> */}
                <div class="header-overlay hidden lg:flex absolute inset-x-0 bottom-0 justify-center">
                    <h5 class="font-heading text-white text-xl p-12">5 Helpful Tips for Living Healthy Life</h5>
                </div>
                </a>
            </figure>
            <figure class="blog-block-content image-zoom relative">
                <a href="blog-single.html" class=" ">
                {/* <img class="blog-block-img " src="images/blog8.png" alt="" /> */}
                <div class="header-overlay hidden lg:flex absolute inset-x-0 bottom-0 justify-center">
                    <h5 class="font-heading text-white text-xl p-12">5 Helpful Tips for Living Healthy Life</h5>
                </div>
                </a>
            </figure>
            <figure class="blog-block-content image-zoom relative">
                <a href="blog-single.html" class=" ">
                {/* <img class="blog-block-img " src="images/blog9.png" alt="" /> */}
                <div class="header-overlay hidden lg:flex absolute inset-x-0 bottom-0 justify-center">
                    <h5 class="font-heading text-white text-xl p-12">5 Helpful Tips for Living Healthy Life</h5>
                </div>
                </a>
            </figure>
            <figure class="blog-block-content image-zoom relative">
                <a href="blog-single.html" class=" ">
                {/* <img class="blog-block-img " src="images/blog10.png" alt="" /> */}
                <div class="header-overlay hidden lg:flex absolute inset-x-0 bottom-0 justify-center">
                    <h5 class="font-heading text-white text-xl p-12">5 Helpful Tips for Living Healthy Life</h5>
                </div>
                </a>
            </figure>
            <figure class="blog-block-content image-zoom relative">
                <a href="blog-single.html" class=" ">
                {/* <img class="blog-block-img " src="images/blog11.png" alt="" /> */}
                <div class="header-overlay hidden lg:flex absolute inset-x-0 bottom-0 justify-center">
                    <h5 class="font-heading text-white text-xl p-12">5 Helpful Tips for Living Healthy Life</h5>
                </div>
                </a>
            </figure>


            </div>
        </section>

        {/* <!-- cta Section Starts --> */}
        <section id="cta" class="bg-gray-50">
            <div class="container mx-auto xl:px-60 py-40 px-5 ">
            <div class="lg:grid grid-cols-3 gap-6">
                <div class="grid grid-cols-subgrid col-span-2">
                <div class="col-span-2">
                    <h2 class="font-heading text-6xl">Never miss a Post <br /> Subscribe Now</h2>
                    <p class="pt-5">I am so happy, my dear friend, so absorbed in the exquisite sense of
                    mere tranquil existence, that I neglect my talents. I should be incapable of drawing</p>
                </div>
                </div>
                <div class="mt-6 lg:0">
                <div class="grid grid-cols-1 gap-2">
                    <label class="block">
                    <input type="text"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500  focus:ring-gray-300 focus:ring-opacity-50"
                        placeholder="Your Name"/>
                    </label>
                    <label class="block">
                    <input type="email"
                        class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-gray-500  focus:ring-gray-300 focus:ring-opacity-50"
                        placeholder="E-mail Address" />
                    </label>
                    <button class="bg-primary rounded-md text-white uppercase p-3 w-full" type="button">Subscribe</button>
                </div>
                </div>
            </div>
            </div>
        </section>
    </>
  )
}

export default BlogLayout;