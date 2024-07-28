import { useState, useEffect, } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import loginImg from '../assets/login.jpg'
import { BrandLogo, BrandLogoWhite, brandOfficialLogo, brandOfficialWhiteLogo } from '../assets/images';








function SignUp() {

    
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behaviour: "smooth" });
        const pageTitle = "Sign Up", siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} | ${siteTitle}`;
    }, []);
    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //



    // ******************************** //
    // *** USER PAYLOAD FOR SIGN UP *** //
    // ******************************** //
    let randNum = Math.floor(298 * Math.random()) + Math.floor(286 * Math.random());
    const [user, setUser] = useState({ id: randNum, username: "", firstName: "", lastName: "", email: "", password: "", approvesTandC: false, isActivated: false, });
    // console.log("CREATE NEW ACCOUNT: ", user);
    // ******************************** //
    // *** USER PAYLOAD FOR SIGN UP *** //
    // ******************************** //




    const [formMessage, setFormMessage] = useState(null);
    // console.log("Login Attempt: ", formMessage);

    const [formSubmitted, setFormSubmitted] = useState(false);
    // console.log("Login Successful: ", formSubmitted);




    async function handleKeyUp(e) {
        const name = e.target.name;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setUser({
            ...user,
            [name]: value
        });
    };

    async function handleChange(e) {
        const name = e.target.name;
        const value = e.target.type === "checkbox" ? e.target.checked : e.target.value;
        setUser({
            ...user,
            [name]: value
        });        
    };

    async function handleSubmit(e) {
        e.preventDefault();

        await axios.post("http://127.0.0.1:8000/api/v1/admin/users/manage/create", user)
        .then((response) => {
            const { success, message, data } = response.data; 
            var errMsg = document.querySelector('.error'); 
            var successMsg = document.querySelector('#logIn .success');
            // var reactivateAccountMsg = document.querySelector("#logIn .validate-account");
            // console.log("Re-activate Account: ", reactivateAccountMsg);


            if (!success && message === "Fill all the required inputs.") {

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
                                    
                setTimeout(() => {
                    successMsg.classList.remove('success-message-info');
                    successMsg.classList.add('success');              
                    
                    /// Scroll to Top
                    window.scroll({ left: 0, top: 0, behavior: 'smooth', });               
                }, 3300);

                window.location.reload();
            };
        })
        .catch((error) => {
            console.log("Error encountered: ", error);
        });
    };



    
    return (
        <div id="signUpId" className='grid grid-cols-1 sm:grid-cols-2 h-screen w-full'>
            <div className='hidden sm:block left-pane'>
                <img className='w-full h-full object-cover' src={loginImg} alt="background-img" />
                {/* <div className='flex justify-center'>
                    <img src={brandOfficialLogo} />
                </div> */}
            </div>

            <div className='bg-gray-800 flex flex-col justify-center gap-16 right-pane'>             
                <form className='max-w-[400px] w-full mx-auto rounded-lg bg-gray-900 py-8 px-10' onSubmit={handleSubmit}>
                    <h2 className='text-4xl dark:text-white font-bold text-center mt-4 mb-6 uppercase'>sign up</h2>
                    
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="username">Username
                            <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" name="username" value={user.username} onChange={handleChange} onKeyUp={handleKeyUp} />
                        </label>
                    </div>
                    <div className='flex flex-row text-gray-400 py-2 gap-12'>
                        <label htmlFor="firstName">First Name
                            <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" name="firstName" value={user.firstName} onChange={handleChange} onKeyUp={handleKeyUp} />
                        </label>

                        <label htmlFor="lastName">Last Name
                            <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="text" name="lastName" value={user.lastName} onChange={handleChange} onKeyUp={handleKeyUp} />
                        </label>
                    </div>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="email">E-mail address
                            <input className='rounded-lg bg-gray-700 mt-2 p-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="email" name="email" value={user.email} onChange={handleChange} onKeyUp={handleKeyUp} />
                        </label>
                    </div>
                    <div className='flex flex-col text-gray-400 py-2'>
                        <label htmlFor="password">Password
                            <input className='p-2 rounded-lg bg-gray-700 mt-2 focus:border-blue-500 focus:bg-gray-800 focus:outline-none' type="password" name="password" value={user.password} onChange={handleChange} onKeyUp={handleKeyUp} />
                        </label>
                    </div>
                    <div className="text-white py-2">{/* text-gray-400 */}
                        <label className="flex justify-center items-center gap-2 leading-6" htmlFor="approvesTandC">
                            <input className='mr-2 w-8 h-8' type="checkbox" name="approvesTandC" value={user.approvesTandC}  /> I have read and understood Samuel Akinola Foundation's terms and conditions.
                        </label>
                    </div>
                    
                    <button className='w-full my-5 py-5 bg-teal-500 shadow-lg shadow-teal-500/50 hover:shadow-teal-500/40 text-white font-semibold rounded-lg uppercase'>submit</button>

                    <div className="login__register flex flex-col mt-4 mb-6 gap-4">
                        <p className="text-white">Have an account? <Link className='capitalize' to={"/user/login"}>sign in</Link></p>
                        <p className="text-white"><Link to={"/user/password-reset"}>Forgot Password</Link></p>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default SignUp;