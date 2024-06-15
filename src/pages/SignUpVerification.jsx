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
    // console.log("Collected User Details: ", user);

    const [formMessage, setFormMessage] = useState(null);
    // console.log("Form Message: ", formMessage);

    const [formSubmitted, setFormSubmitted] = useState(null);
    // console.log("Form Submitted: ", formSubmitted);

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
        .then((res) => {
            const { success, message, data } = res.data; 
            var errMsg = document.querySelector('.error'); 
            var successMsg = document.querySelector('#signUp .success');

            if (!success && message === "Fill all the required inputs.") {
                setFormMessage(message);
                setFormSubmitted(success);     
                errMsg.classList.remove('error');
                errMsg.classList.add('error-message-info');
                setTimeout(() => {
                    errMsg.classList.remove('error-message-info');
                    errMsg.classList.add('error');
                }, 2800);
             } else if (!success && message === "E-mail exists. Please sign-in.") {
                setFormMessage(message);
                setFormSubmitted(success);
                errMsg.classList.remove('error');
                errMsg.classList.add('error-message-info');
                setTimeout(() => {
                    errMsg.classList.remove('error-message-info');
                    errMsg.classList.add('error');
                }, 2800);
            } else if (!success && message === "Username exists. Please sign-in.") {
                setFormMessage(message);
                setFormSubmitted(success);
                errMsg.classList.remove('error');
                errMsg.classList.add('error-message-info');
                setTimeout(() => {
                    errMsg.classList.remove('error-message-info');
                    errMsg.classList.add('error');
                }, 2800);
            } else {
                setFormMessage(message);
                setFormSubmitted(success);
                successMsg.classList.remove('success');
                successMsg.classList.add('success-message-info');
                setTimeout(() => {
                    successMsg.classList.remove('success-message-info');
                    successMsg.classList.add('success');
                }, 2800);   

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
                if ((!success) && (message === "Unauthorized")) {
                    setIsVerified(success);
                    setAuthenticationResponseMsg(message);
                    return;
                } else if ((!success) && (message === "Token does not exist")) {
                    setIsVerified(success);
                    setAuthenticationResponseMsg(message);
                    return;
                } else if ((!success) && (message === "unauthorized")) {
                    setIsVerified(success);
                    setAuthenticationResponseMsg(message);
                    return;
                } else {
                    setIsVerified(success);
                    setExistingUser(data);
                    setAuthenticationResponseMsg(message);
                    return;
                };      
            })
            .catch((error) => {
                console.log("Account Verification Error: ", error);
            })
            .finally(disableIsLoading);
        }
        setTimeout(verifyAccountRegistration, 2300);


        // function redirToLogin() {
        //     const loginURL = "/user/login";
        //     window.location = loginURL;
        // }
        // setTimeout(redirToLogin, 8000);
    }, []);

    useEffect(() => {
        const pageTitle = "Account Verification",
        siteTitle = "Samuel Akinola Foundation";
        document.title = `${pageTitle} - ${existingUser.email} | ${siteTitle}`;

        const endVerificationSuccessfulMessage = document.querySelector('#signUpVerificationID .success-verify');
        if (isVerified) {
            endVerificationSuccessfulMessage.classList.remove('success-verify');
            endVerificationSuccessfulMessage.classList.add('success-message-info');
            setTimeout(() => {
                endVerificationSuccessfulMessage.classList.remove('success-message-info');
                endVerificationSuccessfulMessage.classList.add('success-verify');
            }, 2300);
        };
    }, [isVerified]);
    // ******************************** //
    // ***** VERIFY EXISTING USER ***** //
    // ******************************** //




    if (isLoading) {
        return(
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
                       
                            <form id="signUp" onSubmit={handleSubmit}>

                                <div className="text-center pt-16 form--title">
                                    <h5 className="capitalize">sign up</h5>
                                </div>

                                <div className="px-8 pb-20">
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
                                            <input type="text" name="password" value={user.password} placeholder="*************" onChange={handleChange} onKeyUp={handleKeyUp} />
                                        </label>

                                        <label htmlFor="isActivated" className="flex justify-end items-end flex-row-reverse gap-4">I agree to terms & conditions?
                                            <input type="checkbox" name="isActivated" value={user.isActivated} onChange={handleChange} onKeyUp={handleKeyUp} />
                                        </label>

                                        <ButtonSubmit 
                                            btnType="submit"
                                            btnProps="text-white text-2xl font-bold capitalize px-6 py-5 w-full rounded-lg"
                                            btnBg
                                            label="submit"
                                        />

                                        <div className="text-2xl/normal text-slate-600 font-medium">Have an account? 
                                            <Link className="text-black font-semibold capitalize" to={"/user/login"}> sign in</Link>
                                        </div>
                                    </div>

                                    <div className="mx-auto success">
                                        {formMessage}
                                    </div>
                                    <div className="success-message-info mt-8">    
                                        Processing...
                                    </div>
                                </div>
                            </form>
                        </div>
                    </main>
                </div>
            </>
        );
    };

    return (
        <>
            <Nav />
            <div className="absolute top-0 w-full h-screen -z-10">
                <main id="signUpVerificationID" className="w-full h-128 relative">

                    <div className="mt-40 pt-24 items-center">
                        <div className="mx-auto error">
                            <pre className="hidden">
                                {formSubmitted}
                            </pre>
                            {formMessage}
                        </div>
                        <div className="w-123 mb-12 success-verify">
                            {authenticationResponseMsg}
                        </div>

                        <form id="signUp" onSubmit={handleSubmit}>

                            <div className="text-center pt-16 form--title">
                                <h5 className="capitalize">sign up</h5>
                            </div>

                            <div className="px-8 pb-20">
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
                                        <input type="text" name="password" value={user.password} placeholder="*************" onChange={handleChange} onKeyUp={handleKeyUp} />
                                    </label>

                                    <label htmlFor="isActivated" className="flex justify-end items-end flex-row-reverse gap-4">I agree to terms & conditions?
                                        <input type="checkbox" name="isActivated" value={user.isActivated} onChange={handleChange} onKeyUp={handleKeyUp} />
                                    </label>

                                    <ButtonSubmit 
                                        btnType="submit"
                                        btnProps="text-white text-2xl font-bold capitalize px-6 py-5 w-full rounded-lg"
                                        btnBg
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
                </main>
            </div>
        </>
    );
};


export default SignUpVerification;
