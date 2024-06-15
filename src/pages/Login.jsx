import { useState, } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { Nav, ButtonSubmit, } from "../components";





const Login = () => {

    console.clear();
    
    const [user, setUser] = useState({ email: "", password: "", });
    console.log("Login Attempt By: ", user.email);

    const [formMessage, setFormMessage] = useState(null);
    console.log("Login Attempt: ", formMessage);

    const [formSubmitted, setFormSubmitted] = useState(null);
    console.log("Login Successful: ", formSubmitted);

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
        .then((res) => {
            const { success, message, data } = res.data; 
            var errMsg = document.querySelector('.error'); 
            var successMsg = document.querySelector('#signUp .success');

            if (!success && message === "All fields are required.") {
                setFormMessage(message);
                setFormSubmitted(success);     
                errMsg.classList.remove('error');
                errMsg.classList.add('error-message-info');
                setTimeout(() => {
                    errMsg.classList.remove('error-message-info');
                    errMsg.classList.add('error');
                }, 2800);
            } else if (!success && message === "Incorrect password or email.") {
                setFormMessage(message);
                setFormSubmitted(success);
                errMsg.classList.remove('error');
                errMsg.classList.add('error-message-info');
                setTimeout(() => {
                    errMsg.classList.remove('error-message-info');
                    errMsg.classList.add('error');
                }, 2800);
            } else {
                // // Console Logs
                // console.log("Success: ", success);
                // console.log("Message: ", message);
                // console.log("Data: ", data);     
                // // Console Logs



                // Perform These Actions
                setFormMessage(message);
                setFormSubmitted(success);
                localStorage.setItem('user', JSON.stringify(data));

                successMsg.classList.remove('success');
                successMsg.classList.add('success-message-info');

                setTimeout(() => {
                    successMsg.classList.remove('success-message-info');
                    successMsg.classList.add('success');
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

                        <form id="signUp" onSubmit={handleLogin}>

                            <div className="text-center pt-16 form--title">
                                <h5 className="capitalize">log in</h5>
                            </div>

                            <div className="px-8 pb-20 w-full">
                                <div className="form--wrapper gap-6">

                                    <label htmlFor="email">
                                        <input type="email" name="email" value={user.email} placeholder="E-mail address" onChange={handleChange} onKeyUp={handleKeyUp} />
                                    </label>

                                    <label htmlFor="password">
                                        <input type="text" name="password" value={user.password} placeholder="*************" onChange={handleChange} onKeyUp={handleKeyUp} />
                                    </label>

                                    <ButtonSubmit 
                                        btnType="submit"
                                        btnProps="text-white text-2xl font-bold capitalize px-6 py-5 w-full rounded-lg"
                                        btnBg
                                        label="submit"
                                    />

                                    <div className="text-2xl/normal text-slate-600 font-medium">Don't have an account? 
                                        <Link className="text-black font-semibold capitalize" to={"/user/signup"}> sign up</Link>
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

export default Login;
