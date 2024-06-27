import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Spin } from "antd";

const ProductDetails = () => {
    const { id } = useParams(); // Get the product ID from route params
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/products/${id}`);
                setProduct(response.data);
            } catch (error) {
                console.error("Error fetching product details:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProductDetails();
    }, [id]);

    if (loading) {
        return <Spin size="large" className="spinner" />;
    }

    return (
        <div className="container mx-auto p-4">
            {product && (
                <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                    <div className="">
                        <div className="md:flex-shrink-0">
                            <img src={product.thumbnail} alt={product.title} className="h-64 w-full object-cover md:w-[600px]" />
                        </div>
                        <div className="p-8">
                            <div className="uppercase tracking-wide text-sm text-indigo-500 font-semibold">{product.category}</div>
                            <h1 className="block mt-1 text-3xl font-semibold text-gray-900">{product.title}</h1>
                            <p className="mt-2 text-gray-600">{product.description}</p>
                            <div className="mt-4">
                                <h2 className="text-xl font-semibold">Details</h2>
                                <ul className="list-disc list-inside mt-2">
                                    <li><strong>Price:</strong> ${product.price}</li>
                                    <li><strong>Discount:</strong> {product.discountPercentage}%</li>
                                    <li><strong>Rating:</strong> {product.rating}</li>
                                    <li><strong>Stock:</strong> {product.stock}</li>
                                    <li><strong>Brand:</strong> {product.brand}</li>
                                    <li><strong>SKU:</strong> {product.sku}</li>
                                    <li><strong>Weight:</strong> {product.weight} g</li>
                                    <li><strong>Dimensions:</strong> {product.dimensions.width}cm x {product.dimensions.height}cm x {product.dimensions.depth}cm</li>
                                    <li><strong>Warranty:</strong> {product.warrantyInformation}</li>
                                    <li><strong>Shipping:</strong> {product.shippingInformation}</li>
                                    <li><strong>Availability:</strong> {product.availabilityStatus}</li>
                                </ul>
                            </div>

                            <div className="mt-4">
                                <h2 className="text-xl font-semibold">Tags</h2>
                                <div className="flex flex-wrap mt-2">
                                    {product.tags.map((tag, index) => (
                                        <span key={index} className="bg-gray-200 px-2 py-1 mr-2 mb-2 rounded">{tag}</span>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-4">
                                <h2 className="text-xl font-semibold">Reviews</h2>
                                {product.reviews.map((review, index) => (
                                    <div key={index} className="bg-gray-100 p-4 rounded-lg mt-2">
                                        <p><strong>Rating:</strong> {review.rating}</p>
                                        <p><strong>Reviewer:</strong> {review.reviewerName}</p>
                                        <p><strong>Email:</strong> {review.reviewerEmail}</p>
                                        <p><strong>Comment:</strong> {review.comment}</p>
                                        <p><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="mt-4">
                                <h2 className="text-xl font-semibold">Meta Information</h2>
                                <ul className="list-disc list-inside mt-2">
                                    <li><strong>Created At:</strong> {new Date(product.meta.createdAt).toLocaleDateString()}</li>
                                    <li><strong>Updated At:</strong> {new Date(product.meta.updatedAt).toLocaleDateString()}</li>
                                    <li><strong>Barcode:</strong> {product.meta.barcode}</li>
                                    <li><strong>QR Code:</strong> <img src={product.meta.qrCode} alt="QR Code" className="mt-2" style={{ maxWidth: "100%", maxHeight: "200px" }} /></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetails;
