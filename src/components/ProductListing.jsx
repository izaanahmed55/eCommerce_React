import { useEffect } from "react";
import { useDispatch } from "react-redux";
import ProductComponent from "./ProductComponent";
import axios from "axios";
import { setProducts } from "../redux/actions/productActions";
import Hero from "./Hero";
import { useState } from "react";

const ProductListing = () => {
  const dispatch = useDispatch();

  const [page, setPage] = useState(1);

  const fetchProducts = async () => {
    const response = await axios
      .get(`https://dummyjson.com/products?limit=10&skip=${(page - 1) * 10}`)
      .catch((err) => {
        console.log("Err", err);
      });
    dispatch(setProducts(response.data));
  };

  useEffect(() => {
    fetchProducts();
  }, [page]);

  const prevPage = (e) => {
    e.target.value;
    setPage(page - 1);
    if (page < 2) {
      setPage(10);
    }
  };

  const nextPage = (e) => {
    e.target.value;
    setPage(page + 1);
    if (page > 9) {
      setPage(1);
    }
  };

  return (
    <>
      <Hero />
      <div className="flex justify-center items-center">
        <button
          className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 bg-gray-900 text-white"
          onClick={(e) => prevPage(e)}
        >
          {" "}
          Prev{" "}
        </button>
        &nbsp; {page} &nbsp;
        <button
          className="ml-2 flex cursor-pointer items-center gap-x-1 rounded-md border py-2 px-4 bg-gray-900 text-white"
          onClick={(e) => nextPage(e)}
        >
          {" "}
          Next{" "}
        </button>
      </div>
      <ProductComponent />
    </>
  );
};

export default ProductListing;
