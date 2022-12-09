import React, { useState, useEffect } from 'react';

const Features = ({ features }) => {

  return (
    <div className="grid-container" id="features">
      <div id="feature-grid">

        <div id="summary">
          <span id="slogan">{features.slogan}</span>
          <p>
            {features.description}
          </p>
        </div>

        <div id="feature-list">
          {features.features.map((feature, index) => {
            return <div key={index}>
              {feature.feature}: &nbsp;{feature.value} &nbsp; &#9989;
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default Features