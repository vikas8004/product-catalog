
import { useSelector, useDispatch } from 'react-redux';
import { increaseQty, decreaseQty, removeFromCart } from '../features/cart/cartSlice';

export default function CartItemsList() {
    const cartItems = useSelector((state) => state.cart.items);
    const dispatch = useDispatch();

    if (cartItems.length === 0) {
        return <p className="text-gray-500 text-center mt-30">No items in the cart.</p>;
    }

    const totalAmount = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

    return (
        <div className="mt-24 px-4">
            <div className="max-w-4xl mx-auto space-y-6">
                {cartItems.map((item) => (
                    <div
                        key={item.id}
                        className="flex flex-col sm:flex-row items-center gap-4 border rounded-lg shadow-md bg-white p-4"
                    >
                        <img
                            src={item.image}
                            alt={item.title}
                            className="w-28 h-28 object-contain rounded-md bg-gray-50 p-2"
                        />

                        <div className="flex-1 w-full">
                            <h2 className="text-lg font-semibold">{item.title}</h2>
                            <p className="text-sm text-gray-600 ">{item.description}</p>

                            <div className="mt-3 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                                <div className="text-sm space-y-1">
                                    <p>Price: <span className="font-medium">${item.price}</span></p>
                                    <p>
                                        Quantity:
                                        <span className="inline-flex items-center ml-2 gap-2">
                                            <button
                                                className="btn btn-sm btn-outline"
                                                onClick={() => dispatch(decreaseQty(item.id))}
                                            >
                                                -
                                            </button>
                                            <span className="font-semibold">{item.quantity}</span>
                                            <button
                                                className="btn btn-sm btn-outline"
                                                onClick={() => dispatch(increaseQty(item.id))}
                                            >
                                                +
                                            </button>
                                        </span>
                                    </p>
                                    <p>
                                        Subtotal: <span className="font-semibold">${(item.price * item.quantity).toFixed(2)}</span>
                                    </p>
                                </div>

                                <div className="text-right">
                                    <button
                                        className="btn btn-sm btn-error"
                                        onClick={() => dispatch(removeFromCart(item.id))}
                                    >
                                        Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}

                <div className="text-right bg-white p-4 rounded-lg shadow-md">
                    <h3 className="text-2xl font-bold">Total: ${totalAmount.toFixed(2)}</h3>
                </div>
            </div>
        </div>
    );
}
