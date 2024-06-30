import { useState, useEffect, } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { Nav, ButtonSubmit, } from "../components";







const SignUpVerification = () => {


    // console.clear();
    


    

    // *************************** //
    // ***** CREATE NEW USER ***** //
    // *************************** //
    const randNum = Math.floor(256*Math.random());
    const [user, setUser] = useState({ id: randNum, username: "", firstName: "", lastName: "", email: "", password: "", isActivated: false, });    
    // console.log("***  Account Registration  ***", "\nAccount: ", user);

    const [formMessage, setFormMessage] = useState(null);
    // console.log("Registration Process: ", authenticationResponseMsg);

    // eslint-disable-next-line
    const [formSubmitted, setFormSubmitted] = useState(null);
    // console.log("Registration Successful: ", formSubmitted);

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
                // window.scrollTo({ left: 0, top: document.body.scrollHeight, behavior: "smooth" });
                // window.scrollTo({ left: 0, top: document.documentElement.scrollHeight, behavior: 'smooth', });                                      
                setFormSubmitted(success);
                setFormMessage(message);
                
                errMsg?.classList.remove('error');
                errMsg?.classList.add('error-message-info');

                setTimeout(() => {
                    errMsg?.classList.remove('error-message-info');
                    errMsg?.classList.add('error');
                }, 2800);
            } else if ((!success) && (message === "E-mail exists. Please sign-in.")) {
                window.scroll({ left: 0, top: 0, behavior: 'smooth', });
                setFormSubmitted(success);
                setFormMessage(message);

                errMsg?.classList.remove('error');
                errMsg?.classList.add('error-message-info');

                setTimeout(() => {
                    errMsg?.classList.remove('error-message-info');
                    errMsg?.classList.add('error');
                }, 2800);
            } else if ((!success) && (message === "Username exists. Please sign-in.")) {
                window.scroll({ left: 0, top: 0, behavior: 'smooth', });
                setFormSubmitted(success);
                setFormMessage(message);

                errMsg?.classList.remove('error');
                errMsg?.classList.add('error-message-info');

                setTimeout(() => {
                    errMsg?.classList.remove('error-message-info');
                    errMsg?.classList.add('error');
                }, 2800);
            } else {         
                setFormSubmitted(success);
                setFormMessage(message);
                setTimeout(() => {
                    window.scrollTo({ left: 0, top: 500, behavior: 'smooth', });
                }, 100);  
                successMsg?.classList.remove('success');
                successMsg?.classList.add('success-message-info');
                // signUpContentWrapper.classList.remove('min-h-120');
                // signUpContentWrapper.classList.add('min-h-126.5');   
                signUpContentWrapper?.classList.remove('mb-16');
                signUpContentWrapper?.classList.add('mb-12');   
                                    
                                
                setTimeout(() => {
                    successMsg?.classList.remove('success-message-info');
                    successMsg?.classList.add('success');
                    // signUpContentWrapper.classList.remove('min-h-126.5');
                    // signUpContentWrapper.classList.add('min-h-120'); 
                    signUpContentWrapper?.classList.remove('mb-12');
                    signUpContentWrapper?.classList.add('mb-16');                
                    window.scroll({ left: 0, top: 0, behavior: 'smooth', });
                }, 3300);             
            };
        })
        .catch((error) => {
            console.log("Error encountered: ", error);
        });
    };
    // *************************** //
    // ***** CREATE NEW USER ***** //
    // *************************** //

    

    

    // ******************************** //
    // ***** VERIFY EXISTING USER ***** //
    // ******************************** //
    const { token } = useParams();
    const [existingUser, setExistingUser] = useState({ accessToken: token });
    // console.log("***  Token was assigned to User  ***", "\nAccount: ", existingUser);

    const [authenticationResponseMsg, setAuthenticationResponseMsg] = useState(null);
    // console.log("Account Verification: ", authenticationResponseMsg);

    const [isVerified, setIsVerified] = useState(false);
    // console.log("Account Verified: ", isVerified);
    
    const [isLoading, setIsLoading] = useState(true);
    // console.log("Is Loading: ", isLoading);

    useEffect(() => {  
        window.scroll({ left: 0, top: 300, behavior: "smooth" });
        function disableIsLoading() {
            setIsLoading(false);
        }
        function verifyAccountRegistration() {
            axios.post(`http://127.0.0.1:8000/user/verify/${token}`, existingUser, {
                headers: {                    
                    Authorization: `Bearer ${token}`,
                }
            })
            .then((response) => {
                const { success, data, message } = response.data;    
                const pageTitle = "Account Verification",
                siteTitle = "Samuel Akinola Foundation";
                document.title = `${pageTitle} - ${data?.email} | ${siteTitle}`;            

                var verificationStatus = document.querySelector('#signUpVerificationID .success-verify');
                if ((!success) && (message === "Unauthorized: Bearer token required")) {
                    window.scroll({ left: 0, top: 0, behavior: 'smooth' });
                    setIsVerified(success);
                    setAuthenticationResponseMsg(message);
                } else if ((!success) && (message === "User not found")) {
                    window.scroll({ left: 0, top: 0, behavior: 'smooth' });
                    setIsVerified(success);
                    setAuthenticationResponseMsg(message);
                } else if ((!success) && (message === "token does not exist")) {
                    window.scroll({ left: 0, top: 0, behavior: 'smooth' });
                    setIsVerified(success);
                    setAuthenticationResponseMsg(message);                    
                } else {
                    setIsVerified(success);
                    setExistingUser(data);
                    setAuthenticationResponseMsg(message);

                    verificationStatus?.classList.remove('success-verify');
                    verificationStatus?.classList.add('success-message-info');
                    setTimeout(() => {
                        verificationStatus?.classList.remove('success-message-info');
                        verificationStatus?.classList.add('success-verify');
                    }, 3500);
            
                    setTimeout(() => {
                        window.scroll({ left: 0, top: 0, behavior: 'smooth' });
                    }, 3750);
                };
            })
            .catch((error) => {
                console.log("Account Verification Error: ", error);
            })
            .finally(disableIsLoading);
        };
        
        let timeout = setTimeout(verifyAccountRegistration, 2300);
        return () => {
            clearTimeout(timeout);
        };
    }, [isVerified]);
    // ******************************** //
    // ***** VERIFY EXISTING USER ***** //
    // ******************************** //



    
    if (isLoading) {
        return(
            <>
                <Nav />
                <main id="signUpVerificationID" className="absolute top-0 w-full h-fit grid grid-cols-1 -z-10">
                    <div className="relative w-full h-full pt-14">
                        <div className="mt-48 mb-16 items-center content-wrapper">
                            <div className="mx-auto error">
                                {formMessage}
                            </div>

                            <form id="signUpVerification" onSubmit={handleSubmit}>
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

                                    <div className="mx-auto success-message-info">
                                        Processing...
                                    </div>
                                </div>

                            </form>
                        </div>
                    </div>
                </main>
            </>
        );
    };




    return (
        <>
            <Nav />
            <main id="signUpVerificationID" className="absolute top-0 w-full h-fit grid grid-cols-1 -z-10">
                <div className="relative w-full h-full pt-14">
                    <div className="mt-48 mb-16 items-center content-wrapper">
                        <div className="mx-auto error">
                            {formMessage}
                        </div>
                  
                        <form id="signUpVerification" onSubmit={handleSubmit}>
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
                                <div className="mx-auto success-verify">
                                    {authenticationResponseMsg}
                                </div>
                            </div>

                        </form>
                    </div>
                </div>
            </main>
        </>
    );
};


export default SignUpVerification;
