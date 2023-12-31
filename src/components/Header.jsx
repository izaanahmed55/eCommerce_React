import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../redux/actions/productActions";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { backendurl } from "../../config";

const Header = (props) => {
    const [input, setInput] = useState("");
    const [searchedCategory, setSearchedCategory] = useState("");

    const noOfItems = useSelector((state) => state.cartLength.payload);
    const dispatch = useDispatch();

    const refreshAuth = async () => {
        const isLoggedInResponse = await axios.post(
            `${backendurl}/user/isloggedin`,
            {},
            { withCredentials: true }
        );
        const response = isLoggedInResponse.data;
        console.log("IsloggedIn : ", response);
        props.setIsLogin(response.auth);
    };

    useEffect(() => {
        refreshAuth();
    }, [props.isLogin]);
    console.log("Is Login : ", props.isLogin);

    const searchHandler = (e) => {
        e.preventDefault();
        setInput(e.target.value);
        getSearched();
    };

    const getSearched = async () => {
        const response = await axios
            .get(`https://dummyjson.com/products/search?q=${input}`)
            .catch((err) => {
                console.log("Err", err);
            });
        dispatch(setProducts(response?.data));
    };

    const handleLogout = async () => {
        const isLoggedInResponse = await axios.post(
            `${backendurl}/user/logOut`,
            {},
            { withCredentials: true }
        );
        const response = isLoggedInResponse.data;
        console.log("Logout response : ", response);
        props.setIsLogin(false);
    };

    let url;

    if (
        searchedCategory == "" ||
        searchedCategory == null ||
        searchedCategory == undefined
    ) {
        url = "https://dummyjson.com/products?limit=10";
    } else {
        url = `https://dummyjson.com/products/category/${searchedCategory}`;
    }

    useEffect(() => {
        getSearchedCategory();
    }, [searchedCategory]);

    const getSearchedCategory = async () => {
        const response = await axios.get(url).catch((err) => {
            console.log("Err", err);
        });
        dispatch(setProducts(response?.data));
    };

    return (
        <div className="bg-black">
            <div className="border py-3 px-6">
                <div className="flex justify-between">
                    <Link to={`/`}>
                        <div className="flex items-center">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="9" cy="21" r="1" />
                                <circle cx="20" cy="21" r="1" />
                                <path d="M1 1h4l2.25 10.46a2 2 0 0 0 2.74 1.14l8.11-4.78M5.25 15.46L6.5 9" />
                            </svg>
                            <span className="ml-2 font-semibold text-white">
                                Bliss Bazaar
                            </span>
                        </div>
                    </Link>

                    <div className="ml-6 flex flex-1 gap-x-3">
                        <input
                            type="text"
                            className="w-full rounded-md border border-[#DDE2E4] px-3 py-2 text-sm"
                            placeholder="Search Product"
                            onChange={(e) => searchHandler(e)}
                            value={input}
                            name="Product Search"
                        />
                    </div>

                    <div className="ml-2 flex">
                        <Link to={`/cart`}>
                            <div className="flex cursor-pointer items-center gap-x-1 rounded-md py-2 px-4">
                                <div className="relative">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-7 w-7 text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                                    </svg>
                                    <span className="absolute -top-2 -right-2 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 p-2 text-xs text-white">
                                        {noOfItems ? noOfItems : 0}
                                    </span>
                                </div>
                                <span className="text-sm text-white font-medium">
                                    Cart
                                </span>
                            </div>
                        </Link>
                        {props.isLogin ? (
                            <button onClick={() => handleLogout()}>
                                <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 text-white">
                                    <span className="text-sm font-medium">
                                        LogOut
                                    </span>
                                </div>
                            </button>
                        ) : (
                            <Link to={`/signin`}>
                                {/* <button onClick={Logout}>
                            <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 text-white">
                                <span className="text-sm font-medium">
                                    Logout
                                </span>
                            </div>
                          </button> */}
                                <button>
                                    <div className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 text-white">
                                        <span className="text-sm font-medium">
                                            Sign In
                                        </span>
                                    </div>
                                </button>
                            </Link>
                        )}
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-between">
                    <div className="flex gap-x-2 py-1 px-2">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5 text-white"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                        >
                            <path
                                fillRule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clipRule="evenodd"
                            />
                        </svg>
                        <span className="text-md text-white font-medium">
                            Pakistan
                        </span>
                    </div>

                    <div>
                        <select
                            id="categories"
                            onChange={(e) =>
                                setSearchedCategory(e.target.value)
                            }
                            className="w-auto bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg 
                        focus:ring-blue-500 focus:border-blue-500 block p-1.5 dark:bg-gray-700 
                        dark:border-gray-600 dark:placeholder-gray-400 dark:text-white 
                        dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        >
                            <option defaultValue="Choose a category">
                                Choose a category
                            </option>
                            <option value="smartphones">Smart Phones</option>
                            <option value="laptops">Laptops</option>
                            <option value="fragrances">Fragrances</option>
                            <option value="skincare">Skin Care</option>
                        </select>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
