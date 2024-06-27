import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Product = () => {
    const [products, setProducts] = useState([]);
    const [showAll, setShowAll] = useState(false); // State to manage show more functionality

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products');
                setProducts(response.data.products);
            } catch (error) {
                console.error("Error fetching products:", error);
            }
        };

        fetchProducts();
    }, []);

    const toggleShowAll = () => {
        setShowAll(!showAll);
    };

    const truncateDescription = (description, maxLength) => {
        if (description.length <= maxLength) {
            return description;
        }
        return description.substring(0, maxLength) + "...";
    };

    return (
        <div className="container mx-auto p-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-6">
                {products.slice(0, showAll ? products.length : 6).map(product => (
                    <div key={product.id} className="bg-white p-4 rounded-lg shadow-md">
                        <img src={product.thumbnail} alt={product.title} className="w-full h-48 object-cover rounded-t-lg" />
                        <div className="p-4">
                            <h2 className="text-xl font-semibold">{product.title}</h2>
                            <p className="text-gray-600 mt-2">{truncateDescription(product.description, 100)}</p>
                            <p className="text-gray-800 mt-2">Price: ${product.price}</p>
                            <p className="text-gray-800 mt-2">Rating: {product.rating}</p>
                            <p className="text-gray-800 mt-2">Stock: {product.stock}</p>
                            <Link to={`/product/${product.id}`} className="mt-4 inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
                                View Details
                            </Link>
                        </div>
                    </div>
                ))}
            </div>
            {/* Show more button */}
            {!showAll && (
                <div className="mt-8 text-center">
                    <button
                        onClick={toggleShowAll}
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded shadow-lg transform transition-transform duration-300 hover:scale-105"
                    >
                        Show More
                    </button>
                </div>
            )}
        </div>
    );
};

export default Product;
