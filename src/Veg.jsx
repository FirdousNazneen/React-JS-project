import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "./Store";
import { useState } from "react";

function Veg() {
    const veg = useSelector(state => state.products.veg);
    const dispatch = useDispatch();

    
    const [searchQuery, setSearchQuery] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 4;  

    // Filter veg items based on the search query
    const filteredVegItems = veg.filter(item =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // Calculate the index of the first item to display on the current page
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Get the items for the current page (only 4 items per page)
    const currentItems = filteredVegItems.slice(indexOfFirstItem, indexOfLastItem);

    //  limit the number of pages to 3
    const totalPages = Math.min(3, Math.ceil(filteredVegItems.length / itemsPerPage));

    // Handle pagination 
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    let vegItems = currentItems.map((item) => (
        <li key={item.id} className="veg-item"> 
            <div className="veg-info">
                <h3>{item.name}</h3>
                <img src={item.image} alt={`Image of ${item.name}`} /> {/* More descriptive alt text */}
                <p className="veg-price">${item.price}</p>
            </div>
            <button className="add-to-cart-btn" onClick={() => dispatch(addToCart(item))}>
                Add to Cart
            </button>
        </li>
    ));

    return (
        <>
            <h1 className="veg-title">Veg Items</h1>

            {/* Search bar */}
            <input
                type="text"
                placeholder="Search Veg Items"
                className="search-bar"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
            />

            <ul className="veg-list">
                {vegItems}
            </ul>

            {/* Pagination Controls */}
            <div className="pagination">
                <button
                    onClick={() => currentPage > 1 && setCurrentPage(currentPage - 1)} // Ensure no negative page number
                    disabled={currentPage === 1}
                >
                    Previous
                </button>

                {/* Display only 3 pages */}
                {[...Array(totalPages).keys()].map((pageNumber) => (
                    <button
                        key={pageNumber + 1}
                        onClick={() => paginate(pageNumber + 1)}
                        className={currentPage === pageNumber + 1 ? "active" : ""}
                    >
                        {pageNumber + 1}
                    </button>
                ))}

                <button
                    onClick={() => currentPage < totalPages && setCurrentPage(currentPage + 1)} // Ensure no page exceeds totalPages
                    disabled={currentPage === totalPages}
                >
                    Next
                </button>
            </div>
        </>
    );
}

export default Veg;
