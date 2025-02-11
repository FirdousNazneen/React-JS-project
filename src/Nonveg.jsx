import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./Store";
import { useState } from "react";

function Nonveg() {
  const Nonveg = useSelector(state => state.products.Nonveg);
  const dispatch = useDispatch();

  // State to hold the search query
  const [searchQuery, setSearchQuery] = useState("");

  // Filter non-veg items based on the search query
  const filteredNonvegItems = Nonveg.filter(item =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Mapping the filtered non-veg items to display
  const Nonvegi = filteredNonvegItems.map((item, index) => (
    <li key={index} className="nonveg-item">
      <div className="nonveg-info">
        <h3>{item.name}</h3>
        <img src={item.image} alt={`Image of ${item.name}`} /> 
        <span className="nonveg-price">${item.price}</span>
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
    <div className="nonveg-container">
      <h1 className="nonveg-title">Non-Veg Items:</h1>

      {/* Search bar */}
      <input
        type="text"
        placeholder="Search Non-Veg Items"
        className="search-bar"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
      />

      <ol className="nonveg-list">
        {Nonvegi}
      </ol>
    </div>
  );
}

export default Nonveg;
