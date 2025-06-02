import React, { useEffect, useState } from 'react'
// import style from './Results.module.css'
import LayOut from '../../Components/LayOut/LayOut'
import { useParams } from 'react-router-dom';
import axios from 'axios'
import {productURL} from '../../Api/EndPoints'
import ProductCard from '../../Components/Products/ProductCard'
import style from './Reslut.module.css'

function Result() {
  const [results, setResults] = useState([]);
  const { categoryName } = useParams();
  console.log(categoryName);
  useEffect(() => {
    axios.get(`${productURL}/products/category/${categoryName}`)
      .then((res) => {
        console.log(res.data);
        setResults(res.data);
      }).catch((err) => {
        console.log(err);
      });
  }, []); // Added empty dependency array

  return (
    <LayOut>
      <section>
        <h1 style={{ padding: '30px' }}>Results</h1>
        <p style={{ padding: '30px' }}>Category /{categoryName}</p>
        <hr />
        <div className={style.mainContainer_product}>
          {results?.map((product) => (
            <ProductCard 
              key={product.id} 
              product={product}
              renderAdd={true}
              Description={false}
              addRender={true}
            />
          ))}
        </div>
      </section>
    </LayOut>
  );
}
export default Result



// (
//   <LayOut>
//     <section>
//       <h1 style={{ padding: "30px" }}>Results</h1>
//       <p style={{ padding: "30px" }}>Category / {categoryName}</p>
//       <hr />
//       {isLoading ? (
//         <Loader />
//       ) : (
//          <div className={style.mainContainer_product}>
//           {results?.map((product) => (
//             <ProductCard
//               key={product.id}
//               renderAdd={true}
//               product={product}
//             />
//           ))}
//         </div>
//       )}
//     </section>
//   </LayOut>
// );

