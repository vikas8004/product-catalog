import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '../features/cart/cartSlice';
import { closeProductModal } from '../features/products/productsSlice';

export default function ProductModal() {
    const dispatch = useDispatch();
    const { selectedProduct } = useSelector((state) => state.products);
    const cartItems = useSelector(state => state.cart.items);

    // Check if this product is already in the cart
    const isInCart = cartItems.some(item => item.id === selectedProduct.id);
    // console.log(isInCart);


    if (!selectedProduct) return null;

    const { title, id, image, price, description, category, rating } = selectedProduct;

    return (
        <div className="fixed inset-0 z-50 bg-base-300 bg-opacity-40 flex items-center justify-center px-4">
            <div className="bg-white text-black w-full max-w-xl max-h-[90vh] overflow-y-auto rounded-lg p-6 shadow-lg relative">
                <button
                    className="absolute top-2 right-2 text-xl text-gray-600 hover:text-black cursor-pointer"
                    onClick={() => dispatch(closeProductModal())}
                >
                    ✕
                </button>
                <img src={image} alt={title} className="w-full h-60 object-contain mb-4" />
                <h2 className="text-xl font-bold mb-2">{title}</h2>
                <p className="text-sm text-gray-500 mb-2">Category: {category}</p>
                <p className="mb-2">{description}</p>
                <p className="font-bold mb-2">${price}</p>
                <p className="text-sm text-yellow-600">⭐ {rating?.rate} ({rating?.count} ratings)</p>
                <div className="card-actions justify-end">
                    <button
                        className="btn btn-primary btn-sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            dispatch(addToCart({ ...selectedProduct }));
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
