// src/pages/Home.jsx
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts, selectFilteredProducts } from '../features/products/productsSlice';
import ProductCard from '../components/ProductCard';
import LoadingSpinner from '../components/LoadingSpinner';
import ErrorMessage from '../components/ErrorMessage';
import ProductFilters from '../components/ProductFilters';
import ProductModal from '../components/ProductModal';

export default function Home() {
    const dispatch = useDispatch();
    const loading = useSelector(state => state.products.loading);
    const error = useSelector(state => state.products.error);
    const products = useSelector(selectFilteredProducts);
    const isModalOpen = useSelector((state) => state.products.isModalOpen);
    const [showLoading, setShowLoading] = useState(true);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);


    useEffect(() => {
        let timer;

        if (loading) {
            setShowLoading(true); // start showing spinner
            timer = setTimeout(() => {
                setShowLoading(false); // allow hiding after 3s
            }, 1000);
        } else {
            // If loading finishes before 3s, still wait for timer to finish
            timer = setTimeout(() => {
                setShowLoading(false);
            }, 1000);
        }

        return () => clearTimeout(timer); // cleanup
    }, [loading]);
    if (loading || showLoading) return <LoadingSpinner />;
    if (error) return <ErrorMessage />;

    return (
        <div className="p-6 mt-[64px]">
            {isModalOpen && <ProductModal />}
            <ProductFilters />
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                {products.map(product => (
                    <ProductCard key={product.id} {...product} />
                ))}
            </div>
        </div>
    );
}
