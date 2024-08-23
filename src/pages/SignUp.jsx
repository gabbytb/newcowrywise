import { useState, useEffect, } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import loginImg from '../assets/login.jpg'
import { brandOfficialLogo, loginBg } from '../assets/images';









function SignUp() {  


    console.clear();


    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
        const pageTitle = "Sign Up", 
              siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;
    }, []);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //




    // ******************************** //
    // *** USER PAYLOAD FOR SIGN UP *** //
    // ******************************** //
    const [user, setUser] = useState({ firstName: "", lastName: "", email: "", password: "", approvesTandC: false, });
    console.log("*** ACCOUNT CREATION ***\nUser: ", user);
    // ******************************** //
    // *** USER PAYLOAD FOR SIGN UP *** //
    // ******************************** //




    const [formMessage, setFormMessage] = useState(null);
    // console.log("Login Attempt: ", formMessage);
    const [formSubmitted, setFormSubmitted] = useState(false);
    // console.log("Login Successful: ", formSubmitted);

    async function handleOnKeyUp(e) {
        let name = e.target.name;
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setUser({
            ...user,
            [name]: value
        });
    };

    async function handleOnChange(e) {
        let name = e.target.name;
        let value = e.target.type === "checkbox" ? e.target.checked : e.target.value;

        setUser({
            ...user,
            [name]: value
        });        
    };

    async function handleFormSubmission(e) {
        e.preventDefault();

        await axios.post("http://127.0.0.1:8000/api/v1/admin/users/manage/create", user)
        .then((response) => {
            const { success, message, data} = response.data;
            var errMsg = document.querySelector('#signUpForm .signup_error'); 
            var successMsg = document.querySelector('#signUpForm .signup_success');

            if ((!success) && (message === "Fill all the required inputs")) {

                /// Scroll to Top
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });

                // Perform These Actions
                setFormSubmitted(success);
                setFormMessage(message);
                   
                errMsg?.classList.remove('signup_error');
                errMsg?.classList.add('error-message-info');

                setTimeout(() => {
                    errMsg?.classList.remove('error-message-info');
                    errMsg?.classList.add('signup_error');
                }, 3000);
                // Perform These Actions

            } else if ((!success) && (message === "E-mail exists. Sign In")) {
 
                /// Scroll to Top
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });

                // Perform These Actions
                setFormSubmitted(success);
                setFormMessage(message);
                    
                errMsg?.classList.remove('signup_error');
                errMsg?.classList.add('error-message-info');

                setTimeout(() => {
                    errMsg?.classList.remove('error-message-info');
                    errMsg?.classList.add('signup_error');
                }, 3000);
                // Perform These Actions

            } else if ((!success) && (message === "Username exists. Sign In")) {
   
                // Scroll to Top
                window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });

                // Perform These Actions
                setFormSubmitted(success);
                setFormMessage(message);
                    
                errMsg?.classList.remove('signup_error');
                errMsg?.classList.add('error-message-info');

                setTimeout(() => {
                    errMsg?.classList.remove('error-message-info');
                    errMsg?.classList.add('signup_error');
                }, 3000);
                // Perform These Actions
                                
            } else {             
                // RESET FORM AFTER SUBMISSION
                document.getElementById("signUpForm").reset();

                // Perform These Actions
                setFormSubmitted(success);
                setFormMessage(message);
                                
                // Scroll to Bottom
                window.scrollTo({ left: 0, top: 300, behavior: 'smooth', });
                
                successMsg.classList.remove('signup_success');
                successMsg.classList.add('success-message-info'); 
                                    
                setTimeout(() => {
                    successMsg.classList.remove('success-message-info');
                    successMsg.classList.add('signup_success');            
                }, 3500);
                // Perform These Actions

                setTimeout(() => {
                    window.scrollTo({ left: 0, top: 0, behavior: 'smooth', });
                }, 3900);
                // Perform These Actions
            };
        })
        .catch((error) => {
            console.log("Error encountered: ", error);
        });
    };

        
    
    return (
        <div id="loginId" className="block h-screen w-full bg-skin-signup-signin-bg">
            {/* ADD ton Below:  right-pane */}
            <div className="flex flex-col justify-center gap-4 relative bg-skin-signup-signin-bg"> 

                {/* PAGE NAV */}
                <div className="flex flex-col justify-center items-center w-full h-30 bg-white px-8">
                    <Link className="w-56" to={"/"}>
                        <img src={brandOfficialLogo} alt="brand logo" />
                    </Link>
                </div>
                {/* PAGE NAV */}

                <form id="signUpForm" className='max-w-[400px] w-full mx-auto mb-10 rounded-lg bg-skin-signup-signin-bg py-8 px-10' onSubmit={handleFormSubmission}>
                                            
                    {/* PAGE ICON */}
                    <div className="flex justify-center">
                        <img className="h-44 w-48" src={loginBg} alt="user-img" />
                    </div>
                    {/* PAGE ICON */}


                    {/* PAGE TITLE */}
                    <h2 className='text-2xl dark:text-white font-bold text-center mt-0 mb-24 uppercase opacity-30'>sign up</h2>
                    {/* PAGE TITLE */}

                    
                    {/* Error Message */}
                    <div className="mx-auto signup_error">
                        {formMessage}
                    </div>
                    {/* Error Message */}


                    {/* Username */}
                    {/* <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="username">Username
                            <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" name="username" onChange={handleOnChange} onKeyUp={handleOnKeyUp} />
                        </label>
                    </div> */}
                    {/* Username */}
                    

                    {/* First & Last Name */}
                    <div className='flex flex-row text-gray-400 py-2 gap-12'>
                        <label htmlFor="firstName">First Name
                            <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" name="firstName" onChange={handleOnChange} onKeyUp={handleOnKeyUp} required />
                        </label>

                        <label htmlFor="lastName">Last Name
                            <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" name="lastName" onChange={handleOnChange} onKeyUp={handleOnKeyUp} required />
                        </label>
                    </div>
                    {/* First & Last Name */}

                    
                    {/* E-mail Address */}
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="email">E-mail address
                            <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="email" name="email" onChange={handleOnChange} onKeyUp={handleOnKeyUp} required />
                        </label>
                    </div>
                    {/* E-mail Address */}


                    {/* Password */}
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="password">Password
                            <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" name="password" onChange={handleOnChange} onKeyUp={handleOnKeyUp} required />
                        </label>
                    </div>
                    {/* Password */}


                    {/* Approves TandC */}
                    <div className="text-white pt-6 pb-0">{/* text-gray-400 */}
                        <label className="flex justify-center items-center gap-2 leading-6" htmlFor="approvesTandC">
                            {/* ref={checkboxInput} */}
                            <input className="mr-2 w-8 h-8" type="checkbox" name="approvesTandC" onChange={handleOnChange} onKeyUp={handleOnKeyUp} /> I have read and understood Samuel Akinola Foundation's terms and conditions.
                        </label>
                    </div>
                    {/* Approves TandC */}
                    
  
                    {/* SUBMIT BUTTON */}
                    <button className="w-full my-5 py-5 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg uppercase">submit</button>
                    {/* SUBMIT BUTTON */}


                    {/* LINK: SIGN IN & PASSWORD RESET */}
                    <div className="login__register flex flex-col mt-4 mb-6 gap-4">
                        <p className="text-white">Have an account? <Link className='capitalize' to={"/user/login"}>sign in</Link></p>
                        <p className="text-white"><Link to={"/user/password-reset"}>Forgot Password</Link></p>
                    </div>
                    {/* LINK: SIGN IN & PASSWORD RESET */}


                    {/* Success Message */}
                    <div className="mt-6 mx-auto signup_success">
                        {formMessage}
                    </div>
                    {/* Success Message */}

                </form>
            </div>
        </div>
    );
};

export default SignUp;