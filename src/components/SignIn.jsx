import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const SignUp = () => {
    const [userName, setUserName] = useState("");
    const [password, setPassword] = useState("");

    const loginSuccessAlert = () => {
        toast('✔ Signed In Successfully', {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }

    const loginFailedAlert = () => {
        toast('Please Enter Valid Credentials', {
            position: "bottom-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
            });
    }

    const validate = () => {
        let result = true;

        if (userName == "" || userName == null) {
            result = false;
            toast.error("Please Enter Username", {
                position: "bottom-right"});
        }

        else if (password == "" || password == null) {
            result = false;
            toast.error("Please Enter Password", {
                position: "bottom-right"});
        }

        else {
            result = true
        }

        return result;
    };

    const proceedLogin = (e) => {
        e.preventDefault();

        if (validate()) {
            const enteredUsername = userName;
            const enteredPassword = password;

            const storedUsernames =
                JSON.parse(localStorage.getItem("UserNames")) || [];
            const storedPasswords =
                JSON.parse(localStorage.getItem("Passwords")) || [];

            const index = storedUsernames.indexOf(enteredUsername);

            if (index !== -1 && storedPasswords[index] === enteredPassword) {
                loginSuccessAlert();
                navigate("/");
            } else {
                loginFailedAlert();
            }
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://cdn-icons-png.flaticon.com/512/60/60992.png"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign In to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium leading-6 text-gray-900">
                                User Name
                            </label>
                            <div className="mt-2">
                                <input
                                    id="userName"
                                    name="userName"
                                    type="userName"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label className="block text-sm font-medium leading-6 text-gray-900">
                                    Password
                                </label>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={e => proceedLogin(e)}
                                className="flex w-full bg-[#252C32] justify-center rounded-md text-[#252C32] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:text-[#252C32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:text-[#252C32]"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{" "}
                        <Link
                            to="/signup"
                            className="font-semibold leading-6 text-[#252C32] hover:text-[#252C32]"
                        >
                            Sign Up
                        </Link>
                    </p>
                </div>
            </div>
            <ToastContainer/>
        </>
    );
};

export default SignUp;
