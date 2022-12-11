import React from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import Starbars from './Starbars.jsx';
const { useState, useEffect } = React;
import { RBContainer, RBRFContainer } from './styles/Container';

let avgReviews = 0;
let recPercent = 0;

const RatingsBreakdown = ({ metaData, reviews, setReviews, request, currentProduct, filter, setFilter, shownFilter, setShownFilter, QuarterStars, ratingStats, recStats, avgReviews, totalReviews, recPercent, setShownReviews, setCount, count }) => {


  useEffect(() => {
    console.log('RATINGS BREAKDOWN USE EFFECT RAN')
    //   request(`/reviews/?product_id=${currentProduct.id}&count=10000`, 'GET', {}, (err, results) => {
    //     if (err) {
    //       console.error(err);
    //     } else {
    //         let reviewsCopy = [];
    //         let filteredCopy = [];
    //         for (let review of results.results) {
    //           reviewsCopy.push(review);
    //         }

    //         filteredCopy = reviewsCopy.filter(review => {
    //           if (filter.includes(review.rating)) {
    //             return review;
    //         }
    //       });

    //       setReviews(filteredCopy);
    //     }
    // })


    if (filter.length === 0) {
      setShownReviews(reviews.slice(0, count));
    } else {
      let reviewsCopy = [];
      let filteredCopy = [];
      for (let review of reviews) {
        reviewsCopy.push(review);
      }

      filteredCopy = reviewsCopy.filter(review => {
        if (filter.includes(review.rating)) {
          return review;
        }
      })

      setShownReviews(filteredCopy.slice(0, count));
      // setReviews(filteredCopy);
      // setCount(filteredCopy.length);
    }


    // let reviewsCopy = [];
    //   let filteredCopy = [];
    //   for (let review of reviews) {
    //     reviewsCopy.push(review);
    //   }

    //   filteredCopy = reviewsCopy.filter(review => {
    //     if (filter.includes(review.rating)) {
    //       return review;
    //     }
    //   })

    //   // setReviews(filteredCopy);
    //   setShownReviews(filteredCopy.slice(0, count));
    //   // setCount(filteredCopy.length);

    // if (filter.length === 0) {
    //   setShownReviews(reviews.slice(0, count));
    // } else {
    //   request(`/reviews/?product_id=${currentProduct.id}&count=10000`, 'GET', {}, (err, results) => {
    //     if (err) {
    //       console.error(err);
    //     } else {
    //         let reviewsCopy = [];
    //         let filteredCopy = [];
    //         for (let review of results.results) {
    //           reviewsCopy.push(review);
    //         }

    //         filteredCopy = reviewsCopy.filter(review => {
    //           if (filter.includes(review.rating)) {
    //             return review;
    //         }
    //       });

    //       setShownReviews(filteredCopy.slice(0, count));
    //       setReviews(filteredCopy);
    //     }
    // })}

  }, [reviews, filter, count])

  // <RBRFContainer>
  return (
    <RBContainer>
      Ratings Breakdown Component
      <div>
        <div className='h1'>
          <strong className='body' style={{ "fontSize": "30px" }}>{avgReviews} out of 5</strong> <QuarterStars rating={avgReviews} />
        </div>
        <p className = 'total-review-count'> {totalReviews} Reviews </p>
        <div style = {{'minHeight' : '75px', 'font-size' : '12px'}}> {shownFilter.length !== 0 ? shownFilter.map((number, index) => { return <div key={index} className='body h2'> Showing {number} Stars Reviews</div> }) : null}</div>
        <p className='body h3'> {recPercent}% of reviews recommend this product </p>
        {Object.keys(ratingStats).reverse().map((rating, index) => {
          return <Starbars key={index} rating={rating} ratingStats={ratingStats} totalReviews={totalReviews}
            setFilter={setFilter} filter={filter} setShownFilter={setShownFilter} />;
        })}
      </div>
    </RBContainer>
  );
};

export default RatingsBreakdown;