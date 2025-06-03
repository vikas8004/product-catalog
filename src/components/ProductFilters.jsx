import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setSearchQuery, setSelectedCategory, selectCategories, setLoading } from '../features/products/productsSlice';

export default function ProductFilters() {
    const dispatch = useDispatch();
    const categories = useSelector(selectCategories);
    const selected = useSelector(state => state.products.selectedCategory);


    const query = useSelector(state => state.products.searchQuery);

    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <>
            <div className="mb-6">
                <div className="relative w-full max-w-md mx-auto">
                    <input
                        type="text"
                        value={query}
                        onChange={(e) => dispatch(setSearchQuery(e.target.value))}
                        placeholder="Search products..."
                        className="w-full p-2 pr-12 border border-gray-300 rounded"
                    />

                    <button
                        onClick={() => setIsModalOpen(true)}
                        aria-label="Open filter categories"
                        className={`absolute right-2 top-1/2 -translate-y-1/2 p-1 focus:outline-none ${selected != "All" ? 'text-blue-600' : 'text-gray-600 hover:text-blue-600'
                            }`}
                    >
                        {selected ? (
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 019 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                            </svg>
                        ) : (

                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2a1 1 0 01-.293.707L15 13.414V19a1 1 0 01-.553.894l-4 2A1 1 0 019 21v-7.586L3.293 6.707A1 1 0 013 6V4z" />
                            </svg>
                        )}
                    </button>
                </div>
            </div>

            {/* Modal */}
            {isModalOpen && (
                <div
                    className="fixed inset-0 bg-base-300 bg-opacity-40 flex items-center justify-center z-50"
                    onClick={() => setIsModalOpen(false)}
                >
                    <div
                        className="bg-white rounded-lg p-6 max-w-sm w-full relative"
                        onClick={(e) => e.stopPropagation()}
                    >

                        <button
                            onClick={() => setIsModalOpen(false)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-blue-600 focus:outline-none cursor-pointer"
                            aria-label="Close filter modal"
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>

                        <h2 className="text-lg text-black font-semibold mb-4">Filter by Category</h2>
                        <div className="flex flex-wrap gap-2">
                            {categories.map((cat) => (
                                <button
                                    key={cat}
                                    onClick={() => {
                                        dispatch(setSelectedCategory(cat));
                                        setIsModalOpen(false);
                                        dispatch(setLoading());
                                        setTimeout(() => {
                                            dispatch(setLoading())
                                        }, 0);
                                    }}
                                    className={`px-4 py-2 rounded cursor-pointer text-sm ${selected === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}`}
                                >
                                    {cat}
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
