import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Spin, Layout, Row, Col, Card, Button } from "antd";
import { LoadingOutlined } from "@ant-design/icons";

const { Content } = Layout;

const Product = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading state
    const [showAll, setShowAll] = useState(false); // State to manage show more functionality

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('https://dummyjson.com/products');
                setProducts(response.data.products);
                setLoading(false); // Set loading to false after fetching data
            } catch (error) {
                console.error("Error fetching products:", error);
                setLoading(false); // Set loading to false in case of error
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
        <div className="min-h-screen">
            <Content className="p-4 ">
                {loading ? (
                    <div className="flex items-center justify-center h-screen text-white">
                        <div className="text-center">
                            <div className="mb-4">
                                <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: "#1890ff" }} spin />} />
                            </div>
                            <p className="text-lg font-semibold ">Loading products...</p>
                        </div>
                    </div>
                ) : (
                    <Row gutter={[16, 16]}>
                        {products.slice(0, showAll ? products.length : 6).map(product => (
                            <Col key={product.id} xs={24} sm={12} md={8}>
                                <Card className="rounded-lg shadow-md border-none ">
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
                                </Card>
                            </Col>
                        ))}
                    </Row>
                )}
                {/* Show more button */}
                {!showAll && (
                    <div className="mt-8 text-center">
                        <Button
                            onClick={toggleShowAll}
                            type="primary"
                            className="transform transition-transform duration-300 hover:scale-105"
                        >
                            Show More
                        </Button>
                    </div>
                )}
            </Content>
        </div>
    );
};

export default Product;
