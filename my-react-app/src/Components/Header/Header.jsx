import React, { useContext } from 'react'
import classes from './header.module.css'
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";
import { LiaCartArrowDownSolid } from "react-icons/lia";
import LowerHeader from './LowerHeader';
import { IoLocation } from "react-icons/io5";
import {DataContext} from '../DataProvider/DataProvider'




function Header() {

const [{basket}, dispatch] = useContext(DataContext)
// console.log(basket.length);

  return (
    <section className={classes.fix}>
    <section>
        <div  className={classes.heade_cotainer}>
            {/* logo section */}
            <div className={classes.log_cotainer}>
                <Link to="/">
                    <img src="https://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon logo" />
                </Link>
                <div className={classes.delivery}>
                    <span>
                       <IoLocation />
                    </span>
                    <div>
                        <p>Delivered to</p>
                        <span>ITALY</span>
                    </div>
                </div>
                
            </div>
            {/* search section */}
            <div className={classes.search}>
                <select name="" id="">
                    <option value="">All</option>
                </select>
                <input type="text" />
                <FaSearch size={24}/>
            </div>
            {/* other section */}
            <div className={classes.order_container}>
        <Link to="#" className={classes.language}>
            <img src="https://pngimg.com/uploads/flags/flags_PNG14592.png" alt="" />
            <select name="" id="">
                <option value="">EN</option>
            </select>
        </Link>
        <Link to="/auth">
            <p>Hi,Sign in Here</p>
            <span>Account & Lists</span>
        </Link>
        <Link to="/orders">
            <p>Returns</p>
            <span>& Orders</span>
        </Link>
        <Link to="/cart" className={classes.cart}>
            <LiaCartArrowDownSolid size={35}/>
            <span>{basket.length}</span>
        </Link>
        </div>
        </div>
    </section>
    <LowerHeader/>
    </section>
  )
}

export default Header
