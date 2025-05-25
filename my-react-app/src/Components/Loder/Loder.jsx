import React from 'react'
import {FadeLoader} from 'react-spinners'
import style from './Loder.module.css'

function Loder() {
  return (
    <div className={style.looder}>
      <FadeLoader color='#36d7b7'/>
    </div>
  )
}

export default Loder;
