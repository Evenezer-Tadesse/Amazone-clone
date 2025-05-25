import React from 'react';
import { catagoryInfos } from './DataCatagory';
import CatagoryCard from './CatagoryCard';
import classes from './Category.module.css';

function Catagory() {
  return (
    <section className={classes.Catagory_Container}>
      {catagoryInfos.map((infos) => (
        <CatagoryCard key={infos.id} data={infos} />
      ))}
    </section>
  );
}

export default Catagory;