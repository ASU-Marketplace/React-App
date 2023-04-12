import React from 'react';
import { Link } from 'react-router-dom';

export function ExampleListings() {
  return (
    <body>
      <h1 style={{ textAlign: "center" }}>Item name: Jansport backpack</h1>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <img src="https://m.media-amazon.com/images/I/81dkWDxetjL._AC_UY1000_.jpg" alt="backpack" style={{ width: "30%" }} />
      </div>
      <h2 style={{ textAlign: "left" , marginLeft: "50px"}}>Item condition: Mint</h2>
      <h2 style={{ textAlign: "left" , marginLeft: "50px"}}>Item category: Other</h2>
      <h2 style={{ textAlign: "left", marginLeft: "120px" }}>Item description: </h2>
      <p style={{textAlign: "center" }}> This is an item description of the Jansport Backpack. This item is Brand
      new and worth $50. Willing to haggle on price.</p>
      <div style={{ display: "flex", justifyContent: "center", marginTop: "20px" }}>
        <Link to="/chat">
          <button style={{ fontSize: "20px", padding: "10px 20px", marginRight: "20px" }}>Chat with seller</button>
        </Link>
        <Link to="/chat">
          <button style={{ fontSize: "20px", padding: "10px 20px" }}>Report listing</button>
        </Link>
      </div>
    </body>
  );
}