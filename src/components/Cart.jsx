import Swal from "sweetalert2";
import { useDispatch } from "react-redux";
import { removeSelectedProduct } from "../redux/actions/productActions";
import { Link } from "react-router-dom";

const Cart = () => {

  const dispatch = useDispatch()

  const getLocalStorage = JSON.parse(localStorage.getItem('myCart'));
  const itemsArray = getLocalStorage;

  const emptyCart = () => {
  
    if(itemsArray?.length > 0){
      Swal.fire({ title: 'Do you want to empty the cart?', 
      icon: 'warning', showCancelButton: true, confirmButtonText: `Clear All Items`, confirmButtonColor: 
      '#bf1e2e', cancelButtonColor: '#808080', }).then((res) => {
        if(res.isConfirmed){
          localStorage.clear()
          dispatch(removeSelectedProduct())
          window.location.href = window.location.href;
        }
      })
    }
  }
  
  if(itemsArray?.length > 0) {

    const subTotal = itemsArray?.map(each => each.price)?.reduce((prev, curr) => prev + curr) 
    
    return (
      <>
      <div className="h-screen p-5">
      <h1 className="mb-10 text-center text-2xl font-bold"> Cart Items </h1>
      <div className="">
        <div className="rounded-lg flex justify-between">
          
          <div className="w-3/4 p-5">
          {itemsArray?.map((itemsArray) => {
              const {id, title, thumbnail, price} = itemsArray;
  
              return (
                <div key={id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
              <img src={thumbnail} alt="product-image" className="w-full rounded-lg sm:w-40" />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
              <div className="mt-5 sm:mt-0">
                <h2 className="text-lg font-bold text-gray-900">{title}</h2>
              </div>
              <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                <div className="flex items-center border-gray-100">
                  <span className="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-blue-500 hover:text-blue-50"> - </span>
                  <input className="h-8 w-8 border bg-white text-center text-xs outline-none" type="number" value="1" min="1" />
                  <span className="cursor-pointer rounded-r bg-gray-100 py-1 px-3 duration-100 hover:bg-blue-500 hover:text-blue-50"> + </span>
                </div>
                <div className="flex items-center space-x-4">
                  <p className="text-md font-bold">${price}</p>
                  <p>----</p>
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
              )
          }
          )}

          <button onClick={() => emptyCart()} className="mt-6 place-content-center w-1/2 rounded-md bg-red-500 py-1.5 font-medium text-red-50 hover:bg-red-600">
            Clear Cart
          </button>
          </div>
        
      
        <div className="mt-6 h-full w-1/3 rounded-lg border bg-white p-10 shadow-md">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${subTotal}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping</p>
            <p className="text-gray-700">$4.99</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">${subTotal + 4.99}</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
          </div>
          <Link to={`/checkout`}>
            <button className="mt-4 mb-8 w-full rounded-md bg-gray-900 px-6 py-3 font-medium text-white">
              Check Out
            </button>
          </Link>
        </div>
        </div>
        </div>
        </div>
        </>
  
    );
  }
  
  else{
    return <div className="text-center font-bold mt-10"> No Item in Cart. Please Shopping karen</div>
  }
}

export default Cart;
