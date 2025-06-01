import React from 'react';
import classes from "./Category.module.css";
import { Link } from 'react-router-dom';

function CatagoryCard({ data }) {
  console.log(data);
  return (
    <div className={classes.Cards}>
      <Link to={`/category/${data.name}`}>
        <span>
          <h2>{data.name}</h2>
        </span>
        <img src={data?.image} alt={data.name} />
        <p>Shop Now</p>
      </Link>
    </div>
  );
}

export default CatagoryCard;