import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { cartCounter } from "../redux/actions/productActions";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductComponent = () => {

    const dispatch = useDispatch()

    const products = useSelector((state) => state?.allProducts?.products?.products);

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
 
    const setProductKey = (product) => {

        if (product.stock > 0) {
            const myCartLocalStorage = localStorage.getItem("myCart");
            const cartClone = myCartLocalStorage ? JSON.parse(myCartLocalStorage) : []; 
            
            
            let isPresentInCart = cartClone?.filter(eachCartItem => eachCartItem.id == product.id);
            
            if(isPresentInCart.length > 0) {
                Swal.fire({ title: 'Item already in your cart, Do you want to update the quantity ?', 
                icon: 'warning', showCancelButton: true, confirmButtonText: `Update`, confirmButtonColor: 
                '#bf1e2e', cancelButtonColor: '#808080', }).then((res) => {
                    if (res.isConfirmed) { 

                        let updatedCartAsOfClone = cartClone.map((eachCartItem)=>{ 
                            if(eachCartItem.id === product.id){ 
                                return{ 
                                    ...eachCartItem, counter:eachCartItem.counter + product.counter, isPresentInCart, 
                                } 
                            } 
                                return eachCartItem; 
                            }); 
                            
                            quantityUpdateAlert();
                            localStorage.setItem("myCart", JSON.stringify(updatedCartAsOfClone));
                        } 
                    }
                ) 
            } 

            else{ 
                addToCartAlert()
                cartClone.push(product);
                localStorage.setItem("myCart", JSON.stringify(cartClone)); 
                dispatch(cartCounter(cartClone.length))
            } 
        } 
        else{
            Swal.fire( 'Item not Added', 'Product Out of Stock', 'error' ) 
        }

    };            

    return <>
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center">
    <div className="relative m-3 flex flex-wrap mx-auto justify-center">

        {products?.map((product) => {
            const { id, title, thumbnail, price } = product;
                
            return (
                <div key={id} className="relative max-w-sm min-w-[340px] bg-white shadow-md rounded-3xl p-2 mx-1 my-3 cursor-pointer">
                    <div className="overflow-x-hidden rounded-2xl relative">
                        <Link to={`/product/${id}`}>
                            <img className="h-40 rounded-2xl w-full object-cover" src={thumbnail}/>
                        </Link>
                        <button onClick={() => setProductKey(product)} className="absolute right-2 top-2 bg-white rounded-full p-2 cursor-pointer group">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-50 opacity-70" fill="none" viewBox="0 0 24 24" stroke="black">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            
                        </button>
                </div>
                <div className="mt-4 pl-2 mb-2 flex justify-between ">
                    <Link to={`/product/${id}`}>
                        <div>
                            <p className="text-lg font-semibold text-gray-900 mb-0">{title}</p>
                            <p className="text-md text-gray-800 mt-0">${price}</p>
                        </div>
                    </Link>
                </div>
                </div>
            )
            })
        }
    </div>
    </div>
    <ToastContainer/>
    </>
};


export default ProductComponent;