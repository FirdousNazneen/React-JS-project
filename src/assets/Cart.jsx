import { useDispatch, useSelector } from "react-redux";
import {  clearcart, decrement, increment, purchaseitem, remove } from "./store";
import { useState } from "react";


function Cart() {
    const cart = useSelector(state => state.cart);
    const dispatch = useDispatch();
    const cartItems = cart.map((item, index) => (
      <li key={index}>
        {item.name} - ${item.price}
        <button style={{ color: 'purple' }} onClick={() => dispatch(increment(item))}>+</button>
        <button style={{ color: 'purple' }} onClick={() => dispatch(decrement(item))}>-</button>
        Quantity: {item.quantity}
        <button style={{ color: 'purple' }} onClick={() => dispatch(remove(item))}>Remove</button>
      </li>
    ));
  
    // Total price calculation
    let totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    
    // Discount functionality
    const [discountPercentage, setDiscountPercentage] = useState(0);
    const [showDiscount, setShowDiscount] = useState(false);
  
    let discountAmount = totalPrice * discountPercentage / 100;
  
    // Coupon code functionality
    const [couponCode, setCouponCode] = useState('');
    const [couponCodeDiscountPercentage, setCouponCodeDiscountPercentage] = useState(0);
  
    const handleCoupon = () => {
      switch (couponCode.toUpperCase()) {
        case 'ZOEE10': setCouponCodeDiscountPercentage(10); break;
        case 'ZOEE20': setCouponCodeDiscountPercentage(20); break;
        case 'ZOEE30': setCouponCodeDiscountPercentage(30); break;
        default:
          alert('Invalid coupon code');
          setCouponCodeDiscountPercentage(0);
      }
    };
  
    // Coupon discount
    let couponDiscountAmount = totalPrice * couponCodeDiscountPercentage / 100;
  
    // Net and final amount
    let netAmount = totalPrice - discountAmount;
    let finalAmount = netAmount - couponDiscountAmount;
  
    const handlePurchase = () => {
      const purchaseDate = new Date().toLocaleDateString();
      const purchaseDetails = { items: [...cart], price: totalPrice, Date: purchaseDate };
      dispatch(purchaseitem(purchaseDetails));
      dispatch(clearcart());
    };
  
    return (
      <div className="cart-container">
        {cart.length > 0 ? (
          <>
            <h1>Cart Items:</h1>
            <ol className="cart-items">{cartItems}</ol>
            <p className="cart-items">Total Price: ${totalPrice}</p>
  
            {showDiscount && (
              <div className="discount-info">
                <p>Discount Applied: {discountPercentage}%</p>
                <p>Discount Amount: ${discountAmount}</p>
              </div>
            )}
  
            <p className="cart-items">Net Amount to Pay: ${netAmount}</p>
  
            <button className="apply-discount" onClick={() => { setDiscountPercentage(10); setShowDiscount(true); }}>Apply 10% Discount</button>&nbsp;&nbsp;
            <button className="apply-discount" onClick={() => { setDiscountPercentage(20); setShowDiscount(true); }}>Apply 20% Discount</button>&nbsp;&nbsp;
            <button className="apply-discount" onClick={() => { setDiscountPercentage(30); setShowDiscount(true); }}>Apply 30% Discount</button>&nbsp;&nbsp;
  
            <input type="text" value={couponCode} onChange={(e) => setCouponCode(e.target.value)} placeholder="Enter Coupon Code" />
            <button className="apply-coupon" onClick={handleCoupon}>Apply Coupon</button>&nbsp;&nbsp;
  
            {couponCodeDiscountPercentage > 0 && (
              <div className="coupon-info">
                <p>Your Coupon Code Applied: {couponCode}</p>
                <p>Your Coupon Code Discount: ${couponDiscountAmount}</p>
                <p>Final Amount to Pay: ${finalAmount}</p>
              </div>
            )}
  
            <button className="complete-purchase" onClick={handlePurchase}>Complete Purchase</button>
          </>
        ) : (
          <h2>Your cart is empty...</h2>
        )}
      </div>
    );
  }
  
export default Cart;