import React from 'react';
import { Link } from 'react-router-dom';
import "./Example.css"

 export function ExampleListings() {
  //this page is just an example of what a listing would look like
  return (
    <div className='example-container'>
    <h1>Item name: Jansport backpack</h1>
    <div>
      <img src="https://m.media-amazon.com/images/I/81dkWDxetjL._AC_UY1000_.jpg" alt="backpack" />
    </div>
    <h2>Item condition: Mint</h2>
    <h2>Item category: Other</h2>
    <h2>Campus available: Tempe</h2>
    <h2>Item description: </h2>
    <p>This is an item description of the Jansport Backpack. This item is Brand
    new and worth $50. Willing to haggle on price.</p>
    <div>
      <Link to="/chat">
        <button>Chat with seller</button>
      </Link>
      <Link to="/chat">
        <button>Report listing</button>
      </Link>
    </div>
  </div>
  );
}

export default ExampleListings;