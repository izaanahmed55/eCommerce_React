import { useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  selectedProduct,
  removeSelectedProduct,
} from "../redux/actions/productActions";
import { ActionTypes } from "../redux/constants/action-types";

const ProductDetails = () => {
  const product = useSelector((state) => state.product);
  const { thumbnail, title, price, category, description } = product;
  const { productId } = useParams();
  const dispatch = useDispatch();

  const fetchProductDetail = async () => {
    const response = await axios
      .get(`https://dummyjson.com/products/${productId}`)
      .catch((error) => {
        console.log("Err", error);
      });
    dispatch(selectedProduct(response.data));
  };

  const cartHandle = (e, product) => {
    let data = { name: "Cart Data", value: product}
    dispatch({ type: ActionTypes.ADD_TO_CART, payload: data})
   
  }

  useEffect(() => {
    if (productId && productId !== "") 
      fetchProductDetail();
    return () => {
      dispatch(removeSelectedProduct());
    };
  }, [productId]);

  return (
    <div className="Container">
      {Object.keys(product).length === 0 ? (
        <div>...Loading</div>
      ) : (
          <div className="Container display-flex justify-content-center">
            <div className="grid grid-cols-2">
              <div className="w-4/4 p-5">
                <img className="center" src={thumbnail} />
              </div>
              <div className="w-3/4 p-50 pt-20">
                <h1>{title}</h1>
                <h2>
                  <a className=""> ${price} </a>
                </h2>
                <h3 className=""> {category} </h3>
                <p> {description} </p> <br></br>
               
                <button className="rounded-full w-40 bg-sky-500/100 text-white" 
                onClick={(e) => cartHandle(e, product)}> Add to Cart </button>
              </div>
            </div>
          </div>
      )}
    </div>
  );
};

export default ProductDetails;
