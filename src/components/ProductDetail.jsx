import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
    selectedProduct,
    removeSelectedProduct,
    cartCounter,
} from "../redux/actions/productActions";
import { ActionTypes } from "../redux/constants/action-types";
import Swal from "sweetalert2";
import FadeLoader from "react-spinners/FadeLoader";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

const ProductDetails = () => {
    const product = useSelector((state) => state.product);
    const { thumbnail, title, price, category, description, images } = product;
    const { productId } = useParams();
    const dispatch = useDispatch();

    const addToCartAlert = () => {
      toast('✔ Item Added to Cart', {
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

  const quantityUpdateAlert = () => {
      toast('✔ Quantity Updated', {
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

    const fetchProductDetail = async () => {
        const response = await axios
            .get(`https://dummyjson.com/products/${productId}`)
            .catch((error) => {
                console.log("Err", error);
            });
        dispatch(selectedProduct(response.data));
        localStorage.setItem("myCart", JSON.stringify(response.data));
    };

    const cartHandle = (product) => {
        let data = { name: "Cart Data", value: product };
        dispatch({ type: ActionTypes.ADD_TO_CART, payload: data });

        if (product.stock > 0) {
            const myCartLocalStorage = localStorage.getItem("myCart");
            const cartClone = myCartLocalStorage
                ? JSON.parse(myCartLocalStorage)
                : [];

            let isPresentInCart = cartClone?.filter(eachCartItem => eachCartItem.id == product.id);

            if (isPresentInCart.length > 0) {
                Swal.fire({
                    title: "Item already in your cart, Do you want to update the quantity ?",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonText: `Update`,
                    confirmButtonColor: "#bf1e2e",
                    cancelButtonColor: "#808080",
                }).then((res) => {
                    if (res.isConfirmed) {
                        let updatedCartAsOfClone = cartClone.map(
                            (eachCartItem) => {
                                if (eachCartItem.id === product.id) {
                                    return {
                                        ...eachCartItem,
                                        counter:
                                            eachCartItem.counter +
                                            product.counter,
                                        isPresentInCart,
                                    };
                                }
                                return eachCartItem;
                            }
                        );

                        quantityUpdateAlert();
                        localStorage.setItem(
                            "myCart",
                            JSON.stringify(updatedCartAsOfClone)
                        );
                    }
                });
            } else {
                addToCartAlert()
                cartClone.push(product);
                localStorage.setItem("myCart", JSON.stringify(cartClone));
                dispatch(cartCounter(cartClone.length));
            }
        } else {
            Swal.fire("Item not Added", "Product Out of Stock", "error");
        }
    };

    useEffect(() => {
        if (productId && productId !== "") fetchProductDetail();
        return () => {
            dispatch(removeSelectedProduct());
        };
    }, [productId]);

    return (
        <div className="Container">
            {Object.keys(product).length === 0 ? (
                <div className="centerr">
                    <FadeLoader size={100} color={"#000000"} />
                </div>
            ) : (
                <section className="py-12 sm:py-16">
                    <div className="container mx-auto px-4">
                        <nav className="flex">
                            <ol role="list" className="flex items-center">
                                <li className="text-left">
                                    <div className="-m-1">
                                        <a
                                            href="#"
                                            className="rounded-md p-1 text-sm font-medium text-gray-600 focus:text-gray-900 focus:shadow hover:text-gray-800"
                                        >
                                            {" "}
                                            Product Listing / {category} /{" "}
                                            {title}{" "}
                                        </a>
                                    </div>
                                </li>
                            </ol>
                        </nav>

                        <div className="lg:col-gap-12 xl:col-gap-16 mt-8 grid grid-cols-1 gap-12 lg:mt-12 lg:grid-cols-5 lg:gap-16">
                            <div className="lg:col-span-3 lg:row-end-1">
                                <div className="lg:flex lg:items-start">
                                    <div className="lg:order-2 lg:ml-5">
                                        <div className="max-w-xl overflow-hidden rounded-lg">
                                            <img
                                                className="h-full w-full max-w-full object-cover"
                                                src={thumbnail}
                                                alt=""
                                            />
                                        </div>
                                    </div>

                                    <div className="mt-2 w-full lg:order-1 lg:w-32 lg:flex-shrink-0">
                                        <div className="flex flex-row items-start lg:flex-col">
                                            <button
                                                type="button"
                                                className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-200 text-center"
                                            >
                                                <img
                                                    className="h-full w-full object-cover"
                                                    src={images[0]}
                                                    alt=""
                                                />
                                            </button>
                                            <button
                                                type="button"
                                                className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-200 text-center"
                                            >
                                                <img
                                                    className="h-full w-full object-cover"
                                                    src={images[1]}
                                                    alt=""
                                                />
                                            </button>
                                            <button
                                                type="button"
                                                className="flex-0 aspect-square mb-3 h-20 overflow-hidden rounded-lg border-2 border-gray-200 text-center"
                                            >
                                                <img
                                                    className="h-full w-full object-cover"
                                                    src={images[2]}
                                                    alt=""
                                                />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="lg:col-span-2 lg:row-span-2 lg:row-end-2">
                                <h1 className="sm: text-2xl font-bold text-gray-900 sm:text-3xl">
                                    {title}
                                </h1>

                                <div className="mt-5 flex items-center">
                                    <div className="flex items-center">
                                        <svg
                                            className="block h-4 w-4 align-middle text-yellow-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                className=""
                                            ></path>
                                        </svg>
                                        <svg
                                            className="block h-4 w-4 align-middle text-yellow-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                className=""
                                            ></path>
                                        </svg>
                                        <svg
                                            className="block h-4 w-4 align-middle text-yellow-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                className=""
                                            ></path>
                                        </svg>
                                        <svg
                                            className="block h-4 w-4 align-middle text-yellow-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                className=""
                                            ></path>
                                        </svg>
                                        <svg
                                            className="block h-4 w-4 align-middle text-yellow-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 20 20"
                                            fill="currentColor"
                                        >
                                            <path
                                                d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"
                                                className=""
                                            ></path>
                                        </svg>
                                    </div>
                                    <p className="ml-2 text-sm font-medium text-gray-500">
                                        1,209 Reviews
                                    </p>
                                </div>

                                <div className="mt-10 flex flex-col items-center justify-between space-y-4 border-t border-b py-4 sm:flex-row sm:space-y-0">
                                    <div className="flex items-end">
                                        <h1 className="text-3xl font-bold">
                                            ${price}
                                        </h1>
                                    </div>

                                    <button
                                        onClick={() => cartHandle(product)}
                                        type="button"
                                        className="inline-flex items-center justify-center rounded-md border-2 border-transparent bg-gray-900 bg-none px-12 py-3 text-center text-base font-bold text-white transition-all duration-200 ease-in-out focus:shadow hover:bg-gray-800"
                                    >
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="shrink-0 mr-3 h-5 w-5"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
                                            />
                                        </svg>
                                        Add to cart
                                    </button>
                                </div>

                                <ul className="mt-8 space-y-2">
                                    <li className="flex items-center text-left text-sm font-medium text-gray-600">
                                        <svg
                                            className="mr-2 block h-5 w-5 align-middle text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                                                className=""
                                            ></path>
                                        </svg>
                                        Free shipping worldwide
                                    </li>

                                    <li className="flex items-center text-left text-sm font-medium text-gray-600">
                                        <svg
                                            className="mr-2 block h-5 w-5 align-middle text-gray-500"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z"
                                                className=""
                                            ></path>
                                        </svg>
                                        Cancel Anytime
                                    </li>
                                </ul>
                            </div>

                            <div className="lg:col-span-3">
                                <div className="border-b border-gray-300">
                                    <nav className="flex gap-4">
                                        <a
                                            href="#"
                                            title=""
                                            className="border-b-2 border-gray-900 py-4 text-sm font-medium text-gray-900 hover:border-gray-400 hover:text-gray-800"
                                        >
                                            {" "}
                                            Description{" "}
                                        </a>
                                    </nav>
                                </div>

                                <div className="mt-8 flow-root sm:mt-12">
                                    <h1 className="text-3xl font-bold">
                                        Delivered To Your Door
                                    </h1>
                                    <p className="mt-4">{description}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            )}
            <ToastContainer/>
        </div>
    );
};

export default ProductDetails;
