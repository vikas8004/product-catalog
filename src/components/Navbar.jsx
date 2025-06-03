// src/components/Navbar.jsx
import { useSelector } from 'react-redux';
import { useState } from 'react';
import CartModal from './CartModal';
import { Link } from "react-router-dom";

export default function Navbar() {
    const cartItems = useSelector(state => state.cart.items);
    const totalQty = cartItems.length;
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="navbar bg-base-200 px-6 fixed top-0 z-50">
            <Link to={"/"} className="flex-1 text-xl font-bold">🛍️ Product Catalog</Link>
            <div className="flex-none">
                <button className="btn btn-ghost btn-circle" onClick={() => setIsOpen(true)}>
                    <div className="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round"
                                strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4
              5M7 13l-1.35 6.75a1 1 0 001 .75h11.2a1 1 0 001-.75L17 13M9 21h6" /></svg>
                        <span className="badge badge-sm indicator-item">{totalQty}</span>
                    </div>
                </button>
            </div>

            {/* Cart Modal */}
            {isOpen && <CartModal onClose={() => setIsOpen(false)} />}
        </div>
    );
}
