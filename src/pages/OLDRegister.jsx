import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { brandOfficialWhiteLogo } from "../assets/images"
import { ButtonSubmit } from "../components";








const OLDRegister = () => {


    // console.clear();
    


    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        var timeout = setTimeout(autoEffect, 180);
        return () => {
            clearTimeout(timeout);
        };
    }, []);
    function autoEffect() {
        window.scrollTo({ left: 0, top: 0, behavior: 'smooth' });
        const pageTitle = "Sign Up", siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;
    }
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //



    // *************************** //
    // ***** CREATE NEW USER ***** //
    // *************************** //
    const randNum = Math.floor(256*Math.random()) * Math.floor(256*Math.random());
    const [user, setUser] = useState({        
        id: randNum,
        username: '', 
        firstName: '', 
        lastName: '', 
        email: '',
        password: '', 
        approvesTandC: false,
        isActivated: false,
    });
     
    const [formSubmitted, setFormSubmitted] = useState(false);           
    // console.log("Registration Successful: ", formSubmitted);

    const [formMessage, setFormMessage] = useState(null);       
    // console.log("Sign-Up Response: ", formMessage);

    async function handleKeyUp(e) {
        // console.clear();
        let name = e.target.name;
        let value = e.target.value;
        // console.log(`COLLECTING USER DETAILS.....
        //     \nUsername: ${user.username} 
        //     \nFull Name: ${user.firstName} ${user.lastName} 
        //     \nEmail: ${user.email} 
        //     \nPassword: ${user.password} 
        //     \nT&C approval: ${user.approvalTandC} 
        //     \nisActive: ${user.isActivated}`);
    }

    async function handleChange(e) {
        let name = e.target.name;
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setUser({
            ...user,
            [name]: value
        });        
    };

    async function handleSubmit(e) {
        e.preventDefault();

        const url = "http://127.0.0.1:8000/api/v1/admin/users/manage/create";
        axios.post(url, user)
        .then((response) => {
            const { success, message, data } = response.data; 
            
            var errMsg = document.querySelector('.error'); 
            var successMsg = document.querySelector('#signUp .success');
            var signUpContentWrapper = document.querySelector("#signUpID .content-wrapper");

            if ((!success) && (message === "Fill all the required inputs.")) {
                window.scroll({ left: 0, top: 0, behavior: 'smooth', });

                setFormSubmitted(success);
                setFormMessage(message);
                
                errMsg.classList.remove('error');
                errMsg.classList.add('error-message-info');

                setTimeout(() => {
                    errMsg.classList.remove('error-message-info');
                    errMsg.classList.add('error');
                }, 2800);

            } else if ((!success) && (message === "E-mail exists. Please sign-in.")) {
                window.scroll({ left: 0, top: 0, behavior: 'smooth', });

                setFormSubmitted(success);
                setFormMessage(message);

                errMsg.classList.remove('error');
                errMsg.classList.add('error-message-info');

                setTimeout(() => {
                    errMsg.classList.remove('error-message-info');
                    errMsg.classList.add('error');
                }, 2800);

            } else if ((!success) && (message === "Username exists. Please sign-in.")) {
                window.scroll({ left: 0, top: 0, behavior: 'smooth', });
                
                setFormSubmitted(success);
                setFormMessage(message);

                errMsg.classList.remove('error');
                errMsg.classList.add('error-message-info');

                setTimeout(() => {
                    errMsg.classList.remove('error-message-info');
                    errMsg.classList.add('error');
                }, 2800);
                
            } else {         
                window.scroll({ left: 0, top: 500, behavior: 'smooth', });
                
                setFormSubmitted(success);
                setFormMessage(message);

                successMsg.classList.remove('success');
                successMsg.classList.add('success-message-info');
                // signUpContentWrapper.classList.remove('min-h-120');
                // signUpContentWrapper.classList.add('min-h-126.5');   
                signUpContentWrapper.classList.remove('mb-16');
                signUpContentWrapper.classList.add('mb-12');   
                                    
                setTimeout(() => {
                    successMsg.classList.remove('success-message-info');
                    successMsg.classList.add('success');
                    // signUpContentWrapper.classList.remove('min-h-126.5');
                    // signUpContentWrapper.classList.add('min-h-120'); 
                    signUpContentWrapper.classList.remove('mb-12');
                    signUpContentWrapper.classList.add('mb-16');                
                    // window.scroll({ left: 0, top: 0, behavior: 'smooth', });               
                }, 3300);

                window.location.reload();
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
        <main id="signUpID" className="h-max flex justify-center items-center bg-signup-bg">
            <div className="block h-full w-135 bg-skin-signup-box-bg pt-2 pb-10 px-10 shadow-lg">
                <div className="flex flex-col">
                    <Link to="/" alt="home">
                        <img src={brandOfficialWhiteLogo} alt="brand logo" />
                    </Link>

                    <hr></hr>

                    <div className="mt-10 mb-6 flex flex-col gap-1">
                        <h1 className="capitalize text-black text-24xl/relaxed font-black font-firma">sign up</h1>
                        <p className="text-2xl/snug font-normal tracking-tight font-firma">It's free to signup and only takes a minute.</p>
                    </div>




                        
                    <div className="mx-auto error">
                        { formMessage }
                    </div>
                        

                    <form onSubmit={handleSubmit} className="mt-13.7 flex box-border">
                        <div className="flex flex-col gap-6">
                            <label htmlFor="username">
                                <input type="text" placeholder="username" name="username" onChange={handleChange} onKeyUp={handleKeyUp} />
                            </label>
                        
                            <div className="flex flex-row justify-between">
                                <label htmlFor="firstName">
                                    <input type="text" placeholder="first name" name="firstName"  onChange={handleChange} onKeyUp={handleKeyUp} />                                
                                </label>
                                <label htmlFor="lastName">
                                    <input type="text" placeholder="last name" name="lastName" onChange={handleChange} onKeyUp={handleKeyUp} />                                
                                </label>
                            </div>

                            <label htmlFor="email">
                                <input type="email" placeholder="e-mail" name="email" onChange={handleChange} onKeyUp={handleKeyUp} />                                
                            </label>
                            
                            <label htmlFor="password">
                                <input type="password" placeholder="******************" name="password" onChange={handleChange} onKeyUp={handleKeyUp} />                                
                            </label>

                            {/* <label htmlFor="approvesTandC" className="flex items-center gap-x-3 text-xl/snug tracking-supertight mt-4">
                                <input type="checkbox" name="approvesTandC" onChange={handleChange} onKeyUp={handleKeyUp} required /> I agree to your terms and conditions.
                            </label> */}
                            <label htmlFor="approvesTandC" className="flex justify-start items-center flex-row gap-4 text-lg/6 font-normal text-gray-500">
                                <input className="w-10 h-10 rounded-lg border-slate-600" type="checkbox" name="approvesTandC" onChange={handleChange} onKeyUp={handleKeyUp} required />
                                By proceeding, I acknowledge that I have read and agreed to Samuel Akinola Foundation's terms & conditions
                            </label>

                            <ButtonSubmit
                                label="submit"
                                btnType="submit"
                                btnBg="bg-blue-600"
                                btnProps="text-white 
                                    text-2xl 
                                    font-bold 
                                    capitalize 
                                    px-6 
                                    py-5 
                                    w-full 
                                    rounded-full 
                                    hover:bg-blue-700 
                                    focus:bg-blue-700 
                                    hover:ring-blue-300 
                                    focus:ring-blue-300
                                    hover:ring-2 
                                    focus:ring-2
                                    ease-in-out
                                    duration-300"
                            />

                            <div className="text-2xl/normal text-slate-600 font-medium w-full flex justify-center items-center gap-2 mb-10">Have an account?<Link className="text-black font-semibold capitalize" to={"/user/login"}>Sign in</Link></div>

                            {/* <button type="submit" className="w-full flex justify-center text-2xl text-white font-semibold px-40 py-5 bg-blue-500 hover:bg-blue-600 focus:bg-blue-600 hover:ring-2 hover:ring-green-300 delay-50 duration-75 rounded-lg capitalize">submit</button> */}
                        </div>
                    </form>


                </div>
            </div>
        </main>
    )
}

export default OLDRegister;