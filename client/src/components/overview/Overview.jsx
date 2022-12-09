import React, { useEffect, useState, useMemo } from 'react';

import AddCart from './AddCart.jsx';
import StyleSelector from './StyleSelector.jsx';
import Features from './Features.jsx';
import Reviews from './Reviews.jsx';
import Description from './Description.jsx';
import Images from './Images.jsx';

const Overview = ({ currentProduct, request, currentProductStyle, setCurrentProductStyle, outfit, setOutfit }) => {

  const [ratings, setRatings] = useState([]);
  const [styles, setStyles] = useState([]);
  const [features, setFeatures] = useState(null);
  const [totalReviews, setTotalReviews] = useState(NaN);
  const [stock, setStock] = useState(null);



  //This behemouth code is grabbing all needed data from API (requested styles, features, and reviews/ratings)
  useEffect(() => {

    request(`/products/${currentProduct.id}/styles`, 'GET', {}, (err, response) => {
      if (err) {
        console.log(err);
      } else {
        setStyles(response.results);
        setCurrentProductStyle(response.results[0]);
        //setting stock of current product style to send to Add Cart
        const supply = {};
        const values = Object.values(response.results[0].skus);
        values.forEach(value => {
          let sized = value.size;
          let quantity = value.quantity;
          supply[sized] = quantity;
        })
        setStock(supply);

        request(`/products/${currentProduct.id}`, 'GET', {}, (err, response) => {
          if (err) {
            console.log(err);
          } else {
            setFeatures(response);
            request(`/reviews/?product_id=${currentProduct.id}&count=1000`, 'GET', {}, (err, response) => {
              if (err) {
                console.log(err);
              } else {
                setRatings(response.results.map(result => {
                  return result.rating;
                }));
                setTotalReviews(response.results.length);
              }
            })
          }
        })
      }
    })
  }, [currentProduct])



  return (
    <div className="overview">
      <div id="overview">
        {currentProductStyle !== null &&
          <Images currentProduct={currentProduct} currentProductStyle={currentProductStyle} />
        }
        {ratings.length !== 0 && totalReviews &&
          <Reviews ratings={ratings} totalReviews={totalReviews} />
        }
        {features !== null &&
          <Description currentProduct={currentProduct} currentProductStyle={currentProductStyle} />
        }
        {currentProductStyle !== null && styles !== null &&
          <StyleSelector currentProductStyle={currentProductStyle} setCurrentProductStyle={setCurrentProductStyle} styles={styles} />
        }
        {currentProductStyle !== null && stock !== null &&
          <AddCart request={request} currentProductStyle={currentProductStyle} outfit={outfit} setOutfit={setOutfit} currentProduct={currentProduct} stock={stock} />
        }
        {features !== null &&
          <Features features={features} />
        }
      </div>
    </div>
  )
}

export default Overview