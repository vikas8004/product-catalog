
import { useSelector, useDispatch } from 'react-redux';
import { removeFromCart, increaseQty, decreaseQty, clearCart } from '../features/cart/cartSlice';
import { Link } from 'react-router-dom';

export default function CartModal({ onClose }) {
    const cartItems = useSelector(state => state.cart.items);
    // console.log(cartItems);

    const dispatch = useDispatch();
    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white max-w-md w-full p-4 rounded shadow-lg relative text-black mx-4 sm:mx-auto">
                <button className="btn btn-sm btn-circle absolute top-2 right-2" onClick={onClose}>✕</button>
                <h3 className="text-lg font-bold mb-4">Your Cart</h3>

                {cartItems.length === 0 ? (
                    <p>Your cart is empty.</p>
                ) : (
                    <>
                        <ul className="space-y-4 max-h-64 overflow-y-auto pr-2">
                            {cartItems.map(item => (
                                <li key={item.id} className="flex items-center gap-4 border-b pb-2">
                                    <img src={item.image} alt={item.title} className="h-16 w-16 object-contain rounded" />
                                    <div className="flex-1">
                                        <p className="font-semibold">{item.title}</p>
                                        <p className="text-sm text-gray-500">${item.price} × {item.quantity}</p>
                                        <div className="flex items-center gap-2 mt-1">
                                            <button className="btn btn-xs" onClick={() => dispatch(decreaseQty(item.id))}>-</button>
                                            <button className="btn btn-xs" onClick={() => dispatch(increaseQty(item.id))}>+</button>
                                            <button className="btn btn-xs btn-error" onClick={() => dispatch(removeFromCart(item.id))}>Remove</button>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>


                        <div className="mt-4 pt-4 flex justify-between items-center">
                            <h4 className="text-lg font-bold">Total:</h4>
                            <span className="text-lg font-bold">${totalAmount.toFixed(2)}</span>
                        </div>


                        <div className="mt-2 flex justify-between">
                            <button className="btn btn-sm btn-outline" onClick={() => dispatch(clearCart())}>Clear Cart

                            </button>
                            <Link to={"/cart-items-list"} className="btn btn-outline btn-sm" onClick={onClose}>
                                Full Details
                            </Link>

                        </div>
                    </>
                )}
            </div>
        </div>
    );
}
