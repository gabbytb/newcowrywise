import { useState, useEffect, } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import loginImg from "../assets/login.jpg";
import { brandOfficialLogo, loginBg } from '../assets/images';









function SignIn() {


    // console.clear();
    

    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
        const pageTitle = "Log In", 
              siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;
    }, []);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //




    const [user, setUser] = useState({ email: "", password: "", });
    // console.log("Login Attempt By: ", user.email);

    const [formMessage, setFormMessage] = useState(null);
    // console.log("Login Attempt: ", formMessage);

    // eslint-disable-next-line
    const [formSubmitted, setFormSubmitted] = useState(false);
    // console.log("Login Successful: ", formSubmitted);

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

    async function handleLogin(e) {
        e.preventDefault();

        axios.post("http://127.0.0.1:8000/api/v1/auth/login", user)
        .then((response) => {
            const { success, message, data } = response.data; 
            var errMsg = document.querySelector('#loginId .error'); 
            var successMsg = document.querySelector('#loginId .success');
            // var reactivateAccountMsg = document.querySelector("#logIn .validate-account");
            // console.log("Re-activate Account: ", reactivateAccountMsg);


            if (!success && message === "All fields are required.") {

                // Perform These Actions
                setFormMessage(message);
                setFormSubmitted(success);   
                  
                errMsg?.classList.remove('error');
                errMsg?.classList.add('error-message-info');

                setTimeout(() => {
                    errMsg?.classList.remove('error-message-info');
                    errMsg?.classList.add('error');
                }, 2800);
                // Perform These Actions

            } else if (!success && message === "Incorrect password or email.") {
                
                // Perform These Actions
                setFormSubmitted(success);
                setFormMessage(message);
                
                errMsg?.classList.remove('error');
                errMsg?.classList.add('error-message-info');

                setTimeout(() => {
                    errMsg?.classList.remove('error-message-info');
                    errMsg?.classList.add('error');
                }, 2800);
                // Perform These Actions

            } else if (!success && message === "Invalid account.") {
                
                // Perform These Actions
                setFormSubmitted(success);
                setFormMessage(message);

                errMsg?.classList.remove('error');
                errMsg?.classList.add('error-message-info');

                setTimeout(() => {
                    errMsg?.classList.remove('error-message-info');
                    errMsg?.classList.add('error');
                }, 2800);
                // Perform These Actions

            } else if (!success && message === "Kindly verify your account.") {

                // Perform These Actions
                setExistingUser(data);
                setFormSubmitted(success);
                setFormMessage(message);

                errMsg?.classList.remove('error');
                errMsg?.classList.add('error-message-info');

                setTimeout(() => {
                    errMsg?.classList.remove('error-message-info');
                    errMsg?.classList.add('error');
                }, 2800);
                // Perform These Actions

            } else {

                // Perform These Actions
                setFormMessage(message);
                setFormSubmitted(success);

                localStorage.setItem('user', JSON.stringify(data));
                
                successMsg?.classList.remove('success');
                successMsg?.classList.add('success-message-info');

                setTimeout(() => {
                    successMsg?.classList.remove('success-message-info');
                    successMsg?.classList.add('success');
                }, 2500);

                const redirToAdminDashboard = "/admin/dashboard";
                window.location = redirToAdminDashboard;
                // Perform These Actions

            };
        })
        .catch((error) => {
            console.log("Error encountered: ", error);
        });
    };
    



    const [existingUser, setExistingUser] = useState(null);
    console.log("Existing User: ", existingUser?.email);

    const [formMessageAccountVerification, setFormMessageAccountVerification] = useState(null);
    // console.log("Account Verification Attempt: ", formMessageAccountVerification);

    // eslint-disable-next-line
    const [formSubmittedAccountVerification, setFormSubmittedAccountVerification] = useState(false);
    // console.log("Account Verification Attempt: ", formMessageAccountVerification);

    async function handleOnChange(e) {
        const name = e.target.name;
        const value = e.target.value;

        setExistingUser({
            ...existingUser,
            [name]: value
        });
    } 
    
    async function handleVerification(e) {
        e.preventDefault();

        await axios.post("http://127.0.0.1:8000/api/v1/admin/users/manage/account/verify", existingUser?.email)
        .then((response) => {
            const { success, message, data } = response.data;
            var errVerifyMsg = document.querySelector('#loginId .verify__error'); 
            var successVerifyMsg = document.querySelector('#loginId .verify__success');


            if (!success && message === "No match found") {
                // Perform These Actions
                setFormSubmittedAccountVerification(success); 
                setFormMessageAccountVerification(message);
                    
                errVerifyMsg?.classList.remove('verify__error');
                errVerifyMsg?.classList.add('error-message-info');

                setTimeout(() => {
                    errVerifyMsg?.classList.remove('error-message-info');
                    errVerifyMsg?.classList.add('verify__error');
                }, 2800);
                // Perform These Actions
            }
            

            setFormSubmittedAccountVerification(success); 
            // setWhoVerifiedAccount(data);
            setFormMessageAccountVerification(message);   

            // Perform These Actions
            successVerifyMsg?.classList.remove('verify__success');
            successVerifyMsg?.classList.add('success-message-info');

            setTimeout(() => {
                successVerifyMsg?.classList.remove('success-message-info');
                successVerifyMsg?.classList.add('verify__success');
            }, 20500);
            // Perform These Actions
        })
        .catch((error) => {
            console.log("Error encountered: ", error);
        });
    };




    

    return (
        <div id="loginId" className="block h-screen w-full bg-skin-signup-signin-bg">
            {/* ADD ton Below:  right-pane */}
            <div className="flex flex-col justify-center gap-10 relative"> 

                {/* PAGE NAV */}
                <div className="flex flex-col justify-center items-center w-full h-30 bg-white px-8">
                    <Link className="w-56" to={"/"}>
                        <img src={brandOfficialLogo} />
                    </Link>
                </div>
                {/* PAGE NAV */}


                <form id="logInForm" className='max-w-[400px] w-full mx-auto rounded-lg bg-skin-signup-signin-bg p-8 px-8 z-1' onSubmit={handleLogin}>
                    
                    {/* PAGE ICON */}
                    <div className="flex justify-center">
                        <img className="h-44 w-48" src={loginBg} alt="user-img" />
                    </div>
                    {/* PAGE ICON */}


                    {/* PAGE TITLE */}
                    <h2 className='text-2xl dark:text-white font-bold text-center mt-0 mb-16 uppercase opacity-30'>sign in</h2>
                    {/* PAGE TITLE */}


                    {/* Error Message */}
                    <div className="mx-auto error">
                        {formMessage}
                    </div>
                    {/* Error Message */}


                    {/* E-mail Address */}
                    <div className="flex flex-col text-gray-400 py-2">
                        <label htmlFor="email">E-mail address
                            <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="email" name="email" onChange={handleChange} onKeyUp={handleKeyUp} />
                        </label>
                    </div>
                    {/* E-mail Address */}


                    {/* Password */}
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="password">Password
                            <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" name="password" onChange={handleChange} onKeyUp={handleKeyUp} />
                        </label>
                    </div>
                    {/* Password */}

                
                    {/* LINK: REMEMBER ME & PASSWORD RESET */}
                    <div className='flex justify-between py-2'>{/* text-gray-400 */}
                        <p className='flex items-center text-white'><input className='mr-2' type="checkbox" /> Remember Me</p>
                        <p><Link className='text-white' to={"/user/password-reset"}>Forgot Password</Link></p>
                    </div>
                    {/* LINK: REMEMBER ME & PASSWORD RESET */}

                    
                    {/* SUBMIT BUTTON */}
                    <button className='w-full my-5 py-5 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg uppercase'>sign in</button>
                    {/* SUBMIT BUTTON */}


                    {/* LINK: SIGN UP */}
                    <div className="text-white login__register">
                        Don't have an account? <Link className='capitalize' to={"/user/signup"}>sign up</Link>
                    </div>
                    {/* LINK: SIGN UP */}


                    {/* Success Message */}
                    <div className="mt-6 mx-auto success">
                        {formMessage}
                    </div>
                    {/* Success Message */}
                </form>
            </div>

            
            {/* Signup Modal */}
            <div id="verifyId" className="hidden inset-0 backdrop-blur-sm bg-opacity-5 h-screen w-screen signup__modal">
                <div className="grid place-content-center items-center h-full">
                    <div>
                        <div className="bg-gray-800 flex flex-col justify-center gap-16 rounded-lg right-pane">             
                            

                            <form id="verifyForm" className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'>
                                
                                {/* PAGE TITLE */}
                                <h2 className='text-4xl dark:text-white font-bold text-center mt-4 mb-6'>Verify account</h2>                            
                                {/* PAGE TITLE */}


                                {/* E-mail Address */}
                                <div className="flex flex-col text-gray-400 py-2">
                                    <label htmlFor="email">E-mail address
                                        <input 
                                            className="rounded-lg
                                                bg-gray-700 
                                                mt-2 
                                                p-2 
                                                focus:border-blue-500 
                                                focus:bg-gray-800 
                                                focus:outline-none"
                                            type="email"
                                            name="email"
                                            value={existingUser?.email} 
                                            onChange={handleOnChange} 
                                            disabled 
                                        />
                                    </label>
                                </div>
                                {/* E-mail Address */}


                                {/* SUBMIT BUTTON */}
                                <button className="w-full my-5 py-5 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg uppercase" onClick={handleVerification}>Verify email</button>
                                {/* SUBMIT BUTTON */}


                                {/* lINK: LOGIN */}
                                <div className="text-white login__register">
                                    Have an account? <Link className="capitalize cursor-pointer" to={"/user/login"}>sign in</Link>
                                </div>
                                {/* lINK: LOGIN */}


                                {/* VERIFICATION Success Message */}
                                <div className="mt-6 mx-auto verify__success">
                                    {formMessageAccountVerification}
                                </div>
                                {/* VERIFICATION Success Message */}
                            </form>


                        </div>
                    </div>
                </div>
            </div>
            {/* Signup Modal */}

        </div>
    );

};

export default SignIn;










// return (
//     <div id="loginId" className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
         

//         {/* <div className='hidden sm:block left-pane relative'>               
//             <div className="relative h-full">
//                 <div className="flex justify-center items-center w-full h-30 bg-white px-8">
//                     <Link className="w-56" to={"/"}><img src={brandOfficialLogo} /></Link>
//                 </div>
    
//                 <img className="w-full h-full object-cover absolute top-0 -z-3" src={loginImg} alt="background-img" />
//             </div>
//         </div> */}


//         <div className="flex flex-col justify-center items-center gap-8 w-full h-30 bg-white px-8">
//             <Link className="w-80" to={"/"}>`
//                 <img src={brandOfficialLogo} />
//             </Link>
//             <h1 className="text-2xl/6 -tracking-supertight font-black italic un">Reaching out to Great Minds.</h1>
//         </div>

//         <div className='bg-skin-signup-signin-bg flex flex-col justify-center gap-16 right-pane relative'>             
//             <form id="logInForm" className='max-w-[400px] w-full mx-auto rounded-lg bg-skin-signup-signin-bg p-8 px-8 z-1' onSubmit={handleLogin}>
                
//                 {/* PAGE ICON */}
//                 <div className="flex justify-center">
//                     <img className="h-32 w-36" src={loginBg} alt="user-img" />
//                 </div>
//                 {/* PAGE ICON */}


//                 {/* PAGE TITLE */}
//                 <h2 className='text-4xl dark:text-white font-bold text-center mt-0 mb-16 uppercase opacity-30'>sign in</h2>
//                 {/* PAGE TITLE */}


//                 {/* Error Message */}
//                 <div className="mx-auto error">
//                     {formMessage}
//                 </div>
//                 {/* Error Message */}


//                 {/* E-mail Address */}
//                 <div className="flex flex-col text-gray-400 py-2">
//                     <label htmlFor="email">E-mail address
//                         <input className="rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none" type="email" name="email" onChange={handleChange} onKeyUp={handleKeyUp} />
//                     </label>
//                 </div>
//                 {/* E-mail Address */}


//                 {/* Password */}
//                 <div className='flex flex-col text-gray-400 py-2'>
//                     <label htmlFor="password">Password
//                         <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" name="password" onChange={handleChange} onKeyUp={handleKeyUp} />
//                     </label>
//                 </div>
//                 {/* Password */}

            
//                 {/* LINK: REMEMBER ME & PASSWORD RESET */}
//                 <div className='flex justify-between py-2'>{/* text-gray-400 */}
//                     <p className='flex items-center text-white'><input className='mr-2' type="checkbox" /> Remember Me</p>
//                     <p><Link className='text-white' to={"/user/password-reset"}>Forgot Password</Link></p>
//                 </div>
//                 {/* LINK: REMEMBER ME & PASSWORD RESET */}

                
//                 {/* SUBMIT BUTTON */}
//                 <button className='w-full my-5 py-5 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg uppercase'>sign in</button>
//                 {/* SUBMIT BUTTON */}


//                 {/* LINK: SIGN UP */}
//                 <div className="text-white login__register">
//                     Don't have an account? <Link className='capitalize' to={"/user/signup"}>sign up</Link>
//                 </div>
//                 {/* LINK: SIGN UP */}


//                 {/* Success Message */}
//                 <div className="mt-6 mx-auto success">
//                     {formMessage}
//                 </div>
//                 {/* Success Message */}
//             </form>
//         </div>

        
//         {/* Signup Modal */}
//         <div id="verifyId" className="hidden inset-0 backdrop-blur-sm bg-opacity-5 h-screen w-screen signup__modal">
//             <div className="grid place-content-center items-center h-full">
//                 <div>
//                     <div className="bg-gray-800 flex flex-col justify-center gap-16 rounded-lg right-pane">             
                        

//                         <form id="verifyForm" className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 p-8 px-8'>
                            
//                             {/* PAGE TITLE */}
//                             <h2 className='text-4xl dark:text-white font-bold text-center mt-4 mb-6'>Verify account</h2>                            
//                             {/* PAGE TITLE */}


//                             {/* E-mail Address */}
//                             <div className="flex flex-col text-gray-400 py-2">
//                                 <label htmlFor="email">E-mail address
//                                     <input 
//                                         className="rounded-lg
//                                             bg-gray-700 
//                                             mt-2 
//                                             p-2 
//                                             focus:border-blue-500 
//                                             focus:bg-gray-800 
//                                             focus:outline-none"
//                                         type="email"
//                                         name="email"
//                                         value={existingUser?.email} 
//                                         onChange={handleOnChange} 
//                                         disabled 
//                                     />
//                                 </label>
//                             </div>
//                             {/* E-mail Address */}


//                             {/* SUBMIT BUTTON */}
//                             <button className="w-full my-5 py-5 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg uppercase" onClick={handleVerification}>Verify email</button>
//                             {/* SUBMIT BUTTON */}


//                             {/* lINK: LOGIN */}
//                             <div className="text-white login__register">
//                                 Have an account? <Link className="capitalize cursor-pointer" to={"/user/login"}>sign in</Link>
//                             </div>
//                             {/* lINK: LOGIN */}


//                             {/* VERIFICATION Success Message */}
//                             <div className="mt-6 mx-auto verify__success">
//                                 {formMessageAccountVerification}
//                             </div>
//                             {/* VERIFICATION Success Message */}
//                         </form>


//                     </div>
//                 </div>
//             </div>
//         </div>
//         {/* Signup Modal */}

//     </div>
// );