import React, { useContext } from 'react';
import Rating from '@mui/material/Rating';
import { Link } from 'react-router-dom';
import CurrencyFormat from '../CurrencyFormat/Currency';
import style from './product.module.css'
import { DataContext } from '../DataProvider/DataProvider';
import {Type} from '../../Utility/action.type'

function ProductCard({ product, flex,  Description, addRender }) { 
  
const {image, title, id, rating, price, description} = product;

const [stat, dispatch] = useContext(DataContext)
// console.log(state);

const addToCart = () => {
  dispatch({
    type:Type.ADD_TO_BASKET,
    item:{
      image, title, id, rating, price, description
    }
  })
}

  return (

    <div className={`${style.mainCard_container} ${flex? style.product_flexed: ''}`}>
    
        <Link to={`/products/${id}`}>

          <img src={image} alt="" className={style.img_container}/>
        </Link>
      
      <div>
        <h3>{title}</h3>

        {Description && <div className={style.sam}>{description}</div>}

        <div className={style.rating}>

          <Rating value={rating?.rating?.rate} precision={0.1} />

          <small>{product.rating?.count || 0}</small>

        </div>

        <div>

          <CurrencyFormat amount={price} />

        </div>

        {
          addRender && <button className={style.button} onClick={addToCart}>Add to Cart</button>
        }

      </div>

    </div>
  );
}

export default ProductCard;