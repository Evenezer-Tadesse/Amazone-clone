import React, { useEffect, useState } from 'react'; 
import axios from 'axios';
import ProductCard from './ProductCard.jsx';
import style from "./product.module.css"


function Product() {

  const [products, setProducts] = useState([]); 

  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {

    axios.get("https://fakestoreapi.com/products")

      .then((respo) => {

        setProducts(respo.data); 

        setIsLoading(false)
        
      })
      .catch((err) => {
        console.log(err);
      isLoading(false)
      });
  }, []);

  return (
    <>
  {
    isLoading?(<Loader/>) : (
      
   <section className={style.product_main}> 

      {products?.map((singleProduct, i) => { 

        return <ProductCard
        addRender={true}
         product={singleProduct} key= 
        {i} />
      })}
    </section>
    )
  }
  </>
  );
}

export default Product;