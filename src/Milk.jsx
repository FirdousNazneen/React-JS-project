import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./store";
import { useState } from "react";

function Milk() {
  const Milk = useSelector(state => state.products.milk);
  const dispatch = useDispatch();

  // State to hold the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter milk items based on the search query
  const filteredMilkItems = Milk.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mapping the filtered milk items to display
  const milkItems = filteredMilkItems.map((item, index) => (
    <li key={index} className="milk-item">
      <div className="milk-info">
        <h3>{item.name}</h3>
        <img src={item.image} alt={`Image of ${item.name}`} /> 
        <span className="milk-price">${item.price}</span>
      </div>
      <button 
        className="add-to-cart-btn" 
        onClick={() => dispatch(addToCart(item))}
      >
        Add to Cart
      </button>
    </li>
  ));

  return (
    <div className="milk-container">
      <h1 className="milk-title">Milk Items:</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search Milk Items"
        className="search-bar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
      />

      <ol className="milk-list">
        {milkItems}
      </ol>
    </div>
  );
}

export default Milk;
