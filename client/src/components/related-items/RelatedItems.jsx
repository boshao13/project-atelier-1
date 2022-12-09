import React from 'react';
const { useState, useEffect } = React;

import Card from './Card.jsx';

import Container from './styles/RelatedItems.js';
import Category from './styles/Category.js';
import { Carousel, List, Button } from './styles/Carousel.js';

const RelatedItems = ({ currentProduct, setCurrentProduct, outfit, setOutfit, request }) => {
  const [relatedProductIds, setRelatedProductIds] = useState(null);
  const [renderRange, setRenderRange] = useState([0, 0]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(false);
    request(`/products/${currentProduct.id}/related`, 'GET', {}, (error, productIds) => {
      if (error) {
        console.error(error);
      } else {
        setRelatedProductIds(Array.from(new Set(productIds)).filter((productId) => productId !== currentProduct.id));
        setRenderRange([0, productIds.length < 4 ? productIds.length : 4]);
      }
    });
  }, [currentProduct]);

  useEffect(() => {
    setReady(relatedProductIds !== null)
  }, [relatedProductIds]);

  const handleRenderRangeAdjustment = (magnitude = 0) => {
    if (magnitude < 0 && relatedProductIds[renderRange[0] + magnitude] !== undefined) {
      setRenderRange([renderRange[0] + magnitude, renderRange[1] + magnitude]);
    } else if (magnitude > 0 && relatedProductIds[renderRange[1]] !== undefined) {
      setRenderRange([renderRange[0] + magnitude, renderRange[1] + magnitude]);
    }
  };

  const renderCarousel = () => {
    return (
      <div className="relatedproducts">
      <Carousel>
        {relatedProductIds.length === 0 ? <p>There are no related products to display</p> : (
          <>
            <Button onClick={() => handleRenderRangeAdjustment(-1)} style={{ visibility: renderRange[0] === 0 ? 'hidden' : 'visible' }}>&lt;</Button>
            <List>
            {relatedProductIds.slice(renderRange[0], renderRange[1]).map((productId) => <Card key={productId} productId={productId} currentProduct={currentProduct} setCurrentProduct={setCurrentProduct} outfit={outfit} setOutfit={setOutfit} request={request} />)}
            </List>
            <Button onClick={() => handleRenderRangeAdjustment(1)} style={{ visibility: renderRange[1] === relatedProductIds.length ? 'hidden' : 'visible' }}>&gt;</Button>
          </>
        )}
      </Carousel>
      </div>
    );
  };

  return (
    <Container data-testid="jest/related-items">
      <Category>You May Also Like</Category>
      {!ready ? null : renderCarousel()}
    </Container>
  );
};

export default RelatedItems;