import React, { useEffect, useState } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { productURL } from '../../Api/EndPoints'
import ProductCard from '../../Components/Products/ProductCard'
import Loader from '../../Components/Loder/Loder'

function ProductDetail() {
  const { productId } = useParams()
  const [product, setProduct] = useState({});
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    setIsLoading(true)
    axios.get(`${productURL}/products/${productId}`)
      .then((res) => {
        setProduct(res.data)
        setIsLoading(false)
      }).catch((err) => {
        console.log(err);
        setIsLoading(false)
      })
  }, [])

  return (
    <LayOut>
      {isLoading? (<Loader/>):(<ProductCard 
      product={product}
        flex={true}
        Description={true}
        addRender={true}
         />)}
     </LayOut>
  )
}

export default ProductDetail
