import React from 'react'
import { TiThMenuOutline } from "react-icons/ti";
import classes from './header.module.css'

function LowerHeader() {
  return (
    <div className={classes.lower_conti}>
      
<ul>                 
    <li>
        <TiThMenuOutline />
        <p>All</p>
    </li>
    <li>Today's Deals</li>
    <li>Registry</li>
    <li>Gift Cards</li>
    <li>Customer Service</li>
    <li>Sell</li>
</ul>



    </div>
  )
}

export default LowerHeader
