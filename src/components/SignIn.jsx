import axios from "axios";
import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { loggedInUser } from "../redux/actions/productActions";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";

const SignUp = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const [user, setUser] = useState({
        username: '', 
        password: '',
    });

    const handleChange = (e) => {
        setUser({ 
            ...user, 
            [e.target.name]: e.target.value 
        });
    
    };

    const onSubmit = (e) => {
        e.preventDefault();
        if (user.username !== '' && user.password !== '') {
            axios.post("http://localhost:3000/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: {
                    "username": user.username,
                    "password": user.password,
                  }

            }).then((res) => {
                console.log(res.data)
                    if (res.data.success == true) {
                        console.log("Logged In Successfully");
                        dispatch(loggedInUser(user.username))
                        navigate('/')
                    }
                    else{
                        loginFailedAlert()
                    }
                });
        }
    };

    // const loginSuccessAlert = () => {
    //     toast('✔ Signed In Successfully', {
    //         position: "bottom-right",
    //         autoClose: 4000,
    //         hideProgressBar: false,
    //         closeOnClick: true,
    //         pauseOnHover: true,
    //         draggable: true,
    //         progress: undefined,
    //         theme: "dark",
    //         });
    // }

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
                                    name="username"
                                    type="text"
                                    value={user.username}
                                    onChange={(e) => handleChange(e)}
                                    className="block w-full rounded-md border-1 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                    name="password"
                                    type="password"
                                    value={user.password}
                                    onChange={(e) => handleChange(e)}
                                    className="block w-full rounded-md border-0 px-4 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button
                                onClick={(e) => onSubmit(e)}
                                className="flex w-full bg-[#252C32] justify-center rounded-md text-[#252C32] px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:text-[#252C32] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:text-[#252C32]"
                            >
                                Sign In
                            </button>
                        </div>
                    </form>

                    {/* <p className="mt-10 text-center text-sm text-gray-500">
                        Not a member?{" "}
                        <Link
                            to="/signup"
                            className="font-semibold leading-6 text-[#252C32] hover:text-[#252C32]"
                        >
                            Sign Up
                        </Link>
                    </p> */}
                </div>
            </div>
            <ToastContainer/>
        </>
    );
};

export default SignUp;
