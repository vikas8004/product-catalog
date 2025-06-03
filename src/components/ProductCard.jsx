import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { setSelectedProduct } from '../features/products/productsSlice';

export default function ProductCard({ id, title, price, image, rating, description, ...product }) {
    const dispatch = useDispatch();
    const cartItems = useSelector(state => state.cart.items);
    // console.log(id, title, price, image, rating, description)

    // Check if this product is already in the cart
    const isInCart = cartItems.some(item => item.id === id);

    return (
        <div
            className="card w-full bg-base-100 shadow-xl cursor-pointer"
            onClick={() => dispatch(setSelectedProduct({ id, title, price, image, rating, description, ...product }))}
        >
            <figure className="p-4">
                <img src={image} alt={title} className="h-40 object-contain" />
            </figure>
            <div className="card-body">
                <h2 className="card-title">{title}</h2>
                <p className="text-sm">⭐ {rating?.rate} ({rating?.count})</p>
                <p className="font-bold">${price}</p>
                <div className="card-actions justify-end">
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(addToCart({ id, title, price, image, description, rating, ...product }));
                        }}
                        disabled={isInCart}
                    >
                        {isInCart ? 'In Cart' : 'Add to Cart'}
                    </button>
                </div>
            </div>
        </div>
    );
}
