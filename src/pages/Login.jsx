import { useEffect, useState, } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { NavNoTopBar, ButtonSubmit, } from "../components";







const Login = () => {

    


    // *************************** //
    // *** SET PAGE TITLE(SEO) *** //
    // *************************** //
    useEffect(() => {
        window.scrollTo(0, 0);
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

    const [formSubmitted, setFormSubmitted] = useState(null);
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
            var errMsg = document.querySelector('.error'); 
            var successMsg = document.querySelector('#logIn .success');
            var reactivateAccountMsg = document.querySelector("#logIn .validate-account");
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
                setFormSubmitted(success);
                setFormMessage(message);
                errMsg?.classList.remove('error');
                errMsg?.classList.add('error-message-info');
                setTimeout(() => {
                    reactivateAccountMsg?.classList.remove("hidden");
                }, 1800);
                setTimeout(() => {
                    errMsg?.classList.remove('error-message-info');
                    errMsg?.classList.add('error');
                }, 3500);
                // Perform These Actions
            } else {
                reactivateAccountMsg?.classList.add("hidden");
                
                // Perform These Actions
                setFormMessage(message);
                setFormSubmitted(success);

                localStorage.setItem('user', JSON.stringify(data));
                
                successMsg?.classList.remove('success');
                successMsg?.classList.add('success-message-info');

                setTimeout(() => {
                    successMsg?.classList.remove('success-message-info');
                    successMsg?.classList.add('success');
                }, 2000);

                setTimeout(() => {
                    const redirToAdminDashboard = "/admin/dashboard";
                    window.location = redirToAdminDashboard;
                }, 3000);
                // Perform These Actions
            };
        })
        .catch((error) => {
            console.log("Error encountered: ", error);
        });
    };

    


    return (
        <>
            <NavNoTopBar />
            <div className="absolute top-0 w-full h-screen -z-10">
                <main className="w-full h-128 relative bg-login bg-no-repeat bg-top-left bg-cover">

                    <div className="mt-32 pt-32 items-center">
                        <div className="mx-auto error">
                            {formMessage}
                        </div>

                        {/* <form id="logIn" onSubmit={handleLogin}>
                            <div className="text-center pt-16 form--title">
                                <h5 className="capitalize">log in</h5>
                            </div>

                            <div className="px-8 pb-32 w-full">
                                <div className="form--wrapper gap-6">
                                    <label htmlFor="email">
                                        <input type="email" name="email" value={user.email} placeholder="Email ID" onChange={handleChange} onKeyUp={handleKeyUp} />
                                    </label>

                                    <label htmlFor="password">
                                        <input type="text" name="password" value={user.password} placeholder="*************" onChange={handleChange} onKeyUp={handleKeyUp} />
                                    </label>

                                    <ButtonSubmit 
                                        btnType="submit"
                                        btnProps="text-black text-2xl font-bold capitalize px-6 py-5 w-full rounded-full 
                                            hover:text-white
                                            focus:text-white
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

                                    <div className="text-2xl/normal text-slate-300 font-medium text-center">Don't have an account? 
                                        <Link className="text-white font-semibold capitalize" to={"/user/signup"}> Register</Link>
                                    </div>

                                    <div className="text-2xl/normal text-slate-300 font-medium hidden validate-account">
                                        To resend activation e-mail
                                        <Link className="text-slate-50 font-semibold capitalize" to={"/user/verify"}> click here</Link>
                                    </div>
                                </div>

                                <div className="mx-auto success">
                                    {formMessage}
                                </div>
                            </div>
                        </form> */}


                        <form action="" class="login__form">
                            <h1 class="login__title">Login</h1>

                            <div class="login__inputs">
                                <div class="login__box">
                                    <input type="email" placeholder="Email ID" required class="login__input" />
                                    <i class="ri-mail-fill"></i>
                                </div>

                                <div class="login__box">
                                    <input type="password" placeholder="Password" required class="login__input" />
                                    <i class="ri-lock-2-fill"></i>
                                </div>
                            </div>

                            <div class="login__check">
                                <div class="login__check-box">
                                    <input type="checkbox" class="login__check-input" id="user-check" />
                                    <label for="user-check" class="login__check-label">Remember me</label>
                                </div>

                                <a href="#" class="login__forgot">Forgot Password?</a>
                            </div>

                            <button type="submit" class="login__button">Login</button>

                            <div class="login__register">
                                Don't have an account? <a href="#">Register</a>
                            </div>
                        </form>
                    </div>
                </main>
            </div>
        </>
    );
};


export default Login;
