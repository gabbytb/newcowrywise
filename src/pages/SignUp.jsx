import { useState, useEffect, } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Nav, ButtonSubmit, } from "../components";








const SignUp = () => {


    // console.clear();


    
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        window.scrollTo(0, 0);
        const pageTitle = "Sign Up",
        siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;
    }, []);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //





    // *************************** //
    // ***** CREATE NEW USER ***** //
    // *************************** //
    const randNum = Math.floor(256*Math.random());
    const [user, setUser] = useState({ id: randNum, username: "", firstName: "", lastName: "", email: "", password: "", isActivated: false, });    
    console.log("***  Account Registration  ***", "\nAccount: ", user);

    const [formMessage, setFormMessage] = useState(null);
    console.log("Sign-Up Response: ", formMessage);

    // eslint-disable-next-line
    const [formSubmitted, setFormSubmitted] = useState(null);
    console.log("Sign-Up Successful: ", formSubmitted);

    
    async function handleKeyUp(e) {
        const name = e.target.name;
        const value = e.target.checkbox ? e.target.checked : e.target.value;

        setUser({
            ...user,
            [name]: value
        });
    };

    async function handleChange(e) {
        const name = e.target.name;
        const value = e.target.checkbox ? e.target.checked : e.target.value;

        setUser({
            ...user,
            [name]: value
        });        
    };

    async function handleSubmit(e) {
        e.preventDefault();
        
        axios.post("http://127.0.0.1:8000/api/v1/admin/users/manage/create", user)
        .then((response) => {
            const { success, message, data } = response.data; 
            var errMsg = document.querySelector('.error'); 
            var successMsg = document.querySelector('#signUp .success');
            var signUpContentWrapper = document.querySelector("#signUpID .content-wrapper");

            if ((!success) && (message === "Fill all the required inputs.")) {
                window.scroll({ left: 0, top: 0, behavior: 'smooth', });
                // window.scrollTo(0, 0);
                // window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
                // window.scrollTo({ left: 0, top: document.documentElement.scrollHeight, behavior: 'smooth', });                                      
                setFormSubmitted(success);
                setFormMessage(message);
                
                errMsg.classList.remove('error');
                errMsg.classList.add('error-message-info');
                signUpContentWrapper.classList.remove('min-h-120');
                signUpContentWrapper.classList.add('min-h-126.5');  

                setTimeout(() => {
                    errMsg.classList.remove('error-message-info');
                    errMsg.classList.add('error');
                    signUpContentWrapper.classList.remove('min-h-126.5');
                    signUpContentWrapper.classList.add('min-h-120');
                }, 2800);
            } else if ((!success) && (message === "E-mail exists. Please sign-in.")) {
                window.scroll({ left: 0, top: 0, behavior: 'smooth', });
                setFormSubmitted(success);
                setFormMessage(message);

                errMsg.classList.remove('error');
                errMsg.classList.add('error-message-info');
                signUpContentWrapper.classList.remove('min-h-120');
                signUpContentWrapper.classList.add('min-h-126.5');  

                setTimeout(() => {
                    errMsg.classList.remove('error-message-info');
                    errMsg.classList.add('error');
                    signUpContentWrapper.classList.remove('min-h-126.5');
                    signUpContentWrapper.classList.add('min-h-120');
                }, 2800);
            } else if ((!success) && (message === "Username exists. Please sign-in.")) {
                window.scroll({ left: 0, top: 0, behavior: 'smooth', });
                setFormSubmitted(success);
                setFormMessage(message);

                errMsg.classList.remove('error');
                errMsg.classList.add('error-message-info');
                signUpContentWrapper.classList.remove('min-h-120');
                signUpContentWrapper.classList.add('min-h-126.5');  

                setTimeout(() => {
                    errMsg.classList.remove('error-message-info');
                    errMsg.classList.add('error');
                    signUpContentWrapper.classList.remove('min-h-126.5');
                    signUpContentWrapper.classList.add('min-h-120');
                }, 2800);
            } else {         
                // async function takeAction() {
                //     window.scrollTo({ left: 0, top: 500, behavior: 'smooth', });
                // };
                // takeAction();
                setFormSubmitted(success);
                setFormMessage(message);
                setTimeout(() => {
                    window.scrollTo({ left: 0, top: 500, behavior: 'smooth', });
                }, 100);  
                successMsg.classList.remove('success');
                successMsg.classList.add('success-message-info');
                signUpContentWrapper.classList.remove('min-h-120');
                signUpContentWrapper.classList.add('min-h-126.5');                        
                                
                setTimeout(() => {
                    successMsg.classList.remove('success-message-info');
                    successMsg.classList.add('success');
                    signUpContentWrapper.classList.remove('min-h-126.5');
                    signUpContentWrapper.classList.add('min-h-120');                
                    window.scroll({ left: 0, top: 0, behavior: 'smooth', });
                }, 3300);   

                console.log("Success: ", success);
                console.log("Message: ", message);
                console.log("Data: ", data);             
            };
        })
        .catch((error) => {
            console.log("Error encountered: ", error);
        });
    };
    // *************************** //
    // ***** CREATE NEW USER ***** //
    // *************************** //
     




    return (
        <>
            <Nav />
            <main id="signUpID" className="absolute top-0 w-full h-fit grid grid-cols-1 -z-10">
                <div className="relative w-full h-full">



                    <div className="mt-40 pt-24 items-center min-h-120 content-wrapper">
                        <div className="mx-auto error">
                            {/* <pre className="block">
                                {formSubmitted}
                            </pre> */}
                            {formMessage}
                        </div>



                        <form id="signUp" onSubmit={handleSubmit}>
                            <div className="text-center pt-16 form--title">
                                <h5 className="capitalize">sign up</h5>
                            </div>

                            <div className="px-8 pb-20 w-full">
                                <div className="form--wrapper gap-6">

                                    <label htmlFor="username">
                                        <input type="text" name="username" value={user.username} placeholder="Username" onChange={handleChange} onKeyUp={handleKeyUp} />
                                    </label>

                                    <div className="flex flex-row gap-4">
                                        <label htmlFor="firstName">
                                            <input type="text" name="firstName" value={user.firstName} placeholder="First Name" onChange={handleChange} onKeyUp={handleKeyUp} />
                                        </label>
                                        <label htmlFor="lastName">
                                            <input type="text" name="lastName" value={user.lastName} placeholder="Last Name" onChange={handleChange} onKeyUp={handleKeyUp} />
                                        </label>
                                    </div>

                                    <label htmlFor="email">
                                        <input type="email" name="email" value={user.email} placeholder="example@email.com" onChange={handleChange} onKeyUp={handleKeyUp} />
                                    </label>

                                    <label htmlFor="password">
                                        {/* className={`${pwdIsHidden ? "hide" : "show"}`} */}
                                        <input type="text" name="password" value={user.password} placeholder="*************" onChange={handleChange} onKeyUp={handleKeyUp} className="pwd" />
                                    </label>

                                    <label htmlFor="isActivated" className="flex justify-start items-end flex-row gap-4">I agree to terms & conditions?
                                        <input type="checkbox" name="isActivated" value={user.isActivated} onChange={handleChange} onKeyUp={handleKeyUp} />
                                    </label>

                                    <ButtonSubmit 
                                        btnType="submit"
                                        btnBg
                                        btnProps="text-white text-2xl font-bold capitalize px-6 py-5 w-full rounded-lg 
                                            hover:bg-blue-700 
                                            focus:bg-blue-700 
                                            hover:ring-blue-300 
                                            focus:ring-blue-300
                                            hover:ring-2 
                                            focus:ring-2
                                            ease-in-out
                                            duration-300"
                                        label="submit"
                                    />

                                    <div className="text-2xl/normal text-slate-600 font-medium">Have an account? 
                                        <Link className="text-black font-semibold capitalize" to={"/user/login"}> sign in</Link>
                                    </div>
                                </div>

                                <div className="mx-auto success">
                                    {formMessage}
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};


export default SignUp;
