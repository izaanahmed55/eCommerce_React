import {useEffect} from 'react'
import { useDispatch} from 'react-redux'
import ProductComponent from './ProductComponent'
import axios from 'axios'
import { setProducts } from '../redux/actions/productActions'
import Hero from './Hero'

const ProductListing = () => {

    const dispatch = useDispatch();

    const fetchProducts = async () => {
        const response = await axios.get("https://dummyjson.com/products").catch((err) => {
            console.log("Err", err)
        })
        dispatch(setProducts(response.data))
    }

    useEffect(() => {
        fetchProducts()
    }, [])

  return (
    <>
        <Hero/>
        <ProductComponent/>
    </>
  )
}

export default ProductListing