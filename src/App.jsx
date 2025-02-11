import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Nonveg from "./Nonveg";
import Aboutus from "./aboutus";
import Contactus from "./contactus";
import "./App.css";
import Orders from "./Orders";
import Milk from "./Milk";
import { useDispatch, useSelector } from "react-redux";
import Cart from "./Cart";
import Veg from "./Veg";
import Login from "./Login";
import 'font-awesome/css/font-awesome.min.css';
import { logout } from "./Store";

function App() {
  const cart = useSelector(state => state.cart);
  const totalitems = cart.reduce((sum, item) => sum + item.quantity, 0);

  let { isAuthenticated, user } = useSelector(state => state.auth);
  let dispatch = useDispatch();

  return (
    <>
      <BrowserRouter>
        <div className="navbar">
          <Link to="/Home" className="Myclass">
            <img src="home.png" alt="Home Icon" className="nav-icon" width={25} height={25} />
            Home
          </Link>
          <Link to="/Veg" className="Myclass2">
            <img src="shopping (1).png" alt="Veg Icon" className="nav-icon" width={25} height={25} />
            Veg items
          </Link>
          <Link to="/Nonveg" className="Myclass3">
            <img src="restaurant.png" alt="Non-Veg Icon" className="nav-icon" width={25} height={25} />
            Non-veg items
          </Link>
          <Link to="/Milk" className="Myclass8">
            <img src="milk-bottle.png" alt="Milk Icon" className="nav-icon" width={25} height={25} />
            Milk items
          </Link>
          <Link to="/Cart" className="Myclass4">
            <img src="shopping-cart.png" alt="Cart Icon" className="nav-icon" width={25} height={25} />
            Cart<span>{totalitems}</span>
          </Link>
          <Link to="/Orders" className="Myclass5">
            <img src="file.png" alt="Orders Icon" className="nav-icon" width={25} height={25} />
            Orders
          </Link>
          <Link to="/Aboutus" className="Myclass6">
            <img src="file.png" alt="About Us Icon" className="nav-icon" width={25} height={25} />
            About-us
          </Link>
          <Link to="/Contactus" className="Myclass7">
            <img src="phone-call.png" alt="Contact Us Icon" className="nav-icon" width={25} height={25} />
            Contact-us
          </Link>

          {isAuthenticated ? (
            <div>
              <span className="welcome">Welcome, {user}!</span>
              <button onClick={() => dispatch(logout())} className="logout-btn">Logout</button>
            </div>
          ) : (
            <Link to="/Login" className="Myclass">
              <img src="user-interface.png" alt="Login Icon" className="nav-icon" width={25} height={25} />
              Login
            </Link>
          )}
        </div>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/Home" element={<Home />} />
          <Route path="/Veg" element={<Veg />} />
          <Route path="/Nonveg" element={<Nonveg />} />
          <Route path="/Milk" element={<Milk />} />
          <Route path="/Cart" element={<Cart />} />
          <Route path="/Orders" element={<Orders />} />
          <Route path="/Aboutus" element={<Aboutus />} />
          <Route path="/Contactus" element={<Contactus />} />
          <Route path="/Login" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
