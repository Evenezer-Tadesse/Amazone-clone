import React, { useContext } from 'react'
import LayOut from '../../Components/LayOut/LayOut'
import { DataContext } from '../../Components/DataProvider/DataProvider'
import ProductCard from '../../Components/Products/ProductCard'
import CurrencyFormat from '../../Components/CurrencyFormat/Currency'
import {Link} from 'react-router-dom'
import classes from './Cart.module.css';
import {Type} from '../../Utility/action.type'


function Cart() {

const [{basket, user}, dispatch] = useContext(DataContext)
console.log(`basket:`, basket, typeof basket);
const total = basket.reduce((amount, item) =>{
  return item.price * item.amount  + amount
}, 0)
 console.log(basket);

const increment =(item) =>{
  dispatch({
    type:Type.ADD_TO_BASKET,
    item
  })
}
const decrement = (id) => {
  dispatch({
    type:Type.REMOVE_FROM_BASKET,
    id
  })
}

  return (
   <LayOut>

  <section className={classes.container}>
  <div className={classes.cart_container}>
    <h2>Hello</h2>
    <h3>Your Shopping Basket</h3>
    <hr />
    {
      basket?.length === 0 ? (
        <p>Sorry! No item in Your cart !!</p>
      ) : (
        basket?.map((item, i) => {
          return <section> 
          <ProductCard
            key={i}
            product={item}
            Description={true}
            addRender={false}
            flex={true}
          />
          <div>
            <button onClick={()=>increment(item)}>+</button>
            <span>{item.amount}</span>
            <button onClick={()=>decrement(item.id)}>-</button>
          </div>
          </section>
        })
      )
    }
  </div>

  {basket?.length !==0&&(

  <div className={classes.subtotal}>
    <div>
      <p>Subtotall ({basket?.length} items)</p>
      <CurrencyFormat amount={total}/>
    </div>
    <span>
      <input type="Checkbox" />
      <small>This Order Contains Gifts</small><br />
       <Link to="/payments">Continu for payment</Link>
    </span>
   
  </div>

  ) }
</section>
   </LayOut>
  )
}

export default Cart;
