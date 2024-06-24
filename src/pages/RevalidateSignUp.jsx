import { useState, useEffect } from "react";
import { Link, } from "react-router-dom";
import axios from "axios";
import { Nav, ButtonSubmit } from "../components";






const RevalidateSignUp = () => {


    // console.clear();


    


    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        window.scrollTo(0, 0);
        const pageTitle = "Account Activation",
        siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;
    }, []);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //




    // ******************************************** //
    // ***** REVALIDATE EXISTING USER ACCOUNT ***** //
    // ******************************************** //
    const [user, setUser] = useState({ email: "" });    
    console.log("*** Re-activate Account  ***", "\nAccount: ", user);

    const [formMessage, setFormMessage] = useState(null);
    console.log("Re-activate Account Response: ", formMessage);

    // eslint-disable-next-line
    const [formSubmitted, setFormSubmitted] = useState(null);
    console.log("Re-activate Account Successful: ", formSubmitted);

    
    async function handleKeyUp(e) {
        const name = e.target.name;
        const value = e.target.value;

        setUser({
            ...user,
            [name]: value
        });
    };

    async function handleChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setUser({
            ...user,
            [name]: value
        });        
    };

    async function handleSubmit(e) {
        e.preventDefault();
        
        axios.post("http://127.0.0.1:8000/api/v1/admin/users/manage/account/verify", user)
        .then((response) => {
            const { success, message, data } = response.data; 
            var errMsg = document.querySelector('.error'); 
            var successMsg = document.querySelector('#signUp .success');
            var signUpContentWrapper = document.querySelector("#signUpID .content-wrapper");

            if ((!success) && (message === "User does not exist. Sign up.")) {
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
        <div className="absolute top-0 w-full h-screen -z-10">
            <main className="w-full h-128 relative">

                <div className="mt-40 pt-24 items-center">`
                    <div className="mx-auto error">
                        <pre className="hidden">
                            {formSubmitted}
                        </pre>
                        {formMessage}
                    </div>

                    <form id="logIn" onSubmit={handleSubmit}>

                        <div className="text-center pt-16 form--title">
                            <h5 className="capitalize">Account Activation</h5>
                        </div>

                        <div className="px-8 pb-32 w-full">
                            <div className="form--wrapper gap-6">

                                <label htmlFor="email">
                                    <input type="email" name="email" value={user.email} placeholder="E-mail address" onChange={handleChange} onKeyUp={handleKeyUp} />
                                </label>

                                <ButtonSubmit 
                                    btnType="submit"
                                    btnProps="text-white text-2xl font-bold capitalize px-6 py-5 w-full rounded-lg 
                                        hover:bg-blue-700 
                                        focus:bg-blue-700 
                                        hover:ring-blue-300 
                                        focus:ring-blue-300
                                        hover:ring-2 
                                        focus:ring-2
                                        ease-in-out
                                        duration-300"
                                    btnBg
                                    label="submit"
                                />

                                <div className="text-2xl/normal text-slate-600 font-medium">Already have an account? 
                                    <Link className="text-black font-semibold capitalize" to={"/user/login"}> log in</Link>
                                </div>
                            </div>

                            <div className="mx-auto success">
                                {formMessage}
                            </div>
                        </div>

                    </form>
                </div>
            </main>
        </div>
    </>
    );
}

export default RevalidateSignUp
