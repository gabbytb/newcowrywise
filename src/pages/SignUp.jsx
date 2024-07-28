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
            // var signUpContentWrapper = document.querySelector("#signUpID .content-wrapper");

            if ((!success) && (message === "Fill all the required inputs.")) {
                /// Scroll to Top
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });
                
                setFormSubmitted(success);
                setFormMessage(message);
                
                errMsg.classList.remove('error');
                errMsg.classList.add('error-message-info');

                setTimeout(() => {
                    errMsg.classList.remove('error-message-info');
                    errMsg.classList.add('error');
                }, 2800);

            } else if ((!success) && (message === "E-mail exists. Please sign-in.")) {
                /// Scroll to Top
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });

                setFormSubmitted(success);
                setFormMessage(message);

                errMsg.classList.remove('error');
                errMsg.classList.add('error-message-info');

                setTimeout(() => {
                    errMsg.classList.remove('error-message-info');
                    errMsg.classList.add('error');
                }, 2800);

            } else if ((!success) && (message === "Username exists. Please sign-in.")) {
                /// Scroll to Top
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });

                setFormSubmitted(success);
                setFormMessage(message);

                errMsg.classList.remove('error');
                errMsg.classList.add('error-message-info');

                setTimeout(() => {
                    errMsg.classList.remove('error-message-info');
                    errMsg.classList.add('error');
                }, 2800);

            } else {         
                /// Scroll to Bottom
                window.scrollTo({ left: 0, top: 500, behavior: 'smooth', });
                
                setFormSubmitted(success);
                setFormMessage(message);

                successMsg.classList.remove('success');
                successMsg.classList.add('success-message-info');

                // signUpContentWrapper.classList.remove('mb-16');
                // signUpContentWrapper.classList.add('mb-12');   
                                    
                setTimeout(() => {
                    successMsg.classList.remove('success-message-info');
                    successMsg.classList.add('success');

                    // signUpContentWrapper.classList.remove('mb-12');
                    // signUpContentWrapper.classList.add('mb-16');                
                    
                    /// Scroll to Top
                    window.scroll({ left: 0, top: 0, behavior: 'smooth', });               
                }, 3300);

                // window.location.reload();
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
                <div className="relative w-full h-full pt-14">
                    <div className="mt-48 mb-16 items-center content-wrapper">

                        
                        <div className="mx-auto error">
                            { formMessage }
                        </div>
                        

                        <form id="signUp" onSubmit={handleSubmit}>
                            <div className="text-center pt-16 form--title">
                                <h5 className="capitalize">sign up</h5>
                            </div>

                            <div className="px-8 pb-20 w-full">
                                <div className="form--wrapper gap-6">

                                    <label htmlFor="username">
                                        <input type="text" name="username" placeholder="Username" onChange={handleChange} onKeyUp={handleKeyUp} />
                                    </label>

                                    <div className="flex flex-row gap-4">
                                        <label htmlFor="firstName">
                                            <input type="text" name="firstName" placeholder="First Name" onChange={handleChange}  onKeyUp={handleKeyUp} />
                                        </label>
                                        <label htmlFor="lastName">
                                            <input type="text" name="lastName" placeholder="Last Name" onChange={handleChange}  onKeyUp={handleKeyUp} />
                                        </label>
                                    </div>

                                    <label htmlFor="email">
                                        <input type="email" name="email" placeholder="example@email.com" onChange={handleChange}  onKeyUp={handleKeyUp} />
                                    </label>

                                    <label htmlFor="password">
                                        <input className="pwd" type="text" name="password" placeholder="*************" onChange={handleChange}  onKeyUp={handleKeyUp} />
                                    </label>
   
                                    <label htmlFor="approvesTandC" className="flex justify-start items-end flex-row gap-4">
                                        <input type="checkbox" name="approvesTandC" onChange={handleChange} onKeyUp={handleKeyUp} />
                                        By proceeding, I acknowledge that I have read and agreed to Samuel Akinola Foundation's terms & conditions
                                    </label>

                                    <ButtonSubmit
                                        label="submit"
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
                                    />

                                    <div className="text-2xl/normal text-slate-600 font-medium">Have an account? 
                                        <Link className="text-black font-semibold capitalize" to={"/user/login"}> sign in</Link>
                                    </div>
                                </div>

                                <div className="mx-auto success">
                                    { formMessage }
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
