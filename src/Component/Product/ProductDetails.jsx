import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { Spin, Layout, Row, Col, Form, Input, Card, Tag, Divider } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

const { Content } = Layout;

const ProductDetails = () => {
    const { id } = useParams();
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
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="mb-4">
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: "#1890ff" }} spin />} />
                    </div>
                    <p className="text-lg font-semibold text-gray-800">Loading products...</p>
                </div>
            </div>
        );
    }

    return (
        <Layout className="min-h-screen">
            <Content className="p-4">
                {product && (
                    <Card className="mx-auto max-w-6xl">
                        <Row gutter={[16, 16]}>
                            <Col span={24} className="flex justify-center items-center">
                                <img src={product.thumbnail} alt={product.title} className="max-w-full h-auto mb-4" />
                            </Col>

                            <Col span={24}>
                                <div className="p-4">
                                    <h1 className="text-3xl font-semibold">{product.title}</h1>
                                    <p className="text-gray-600">{product.description}</p>

                                    <Divider />

                                    <Form layout="vertical">
                                        <Row gutter={[16, 16]}>
                                            <Col xs={24} sm={12}>
                                                <Form.Item label="Price">
                                                    <Input prefix="$" value={product.price.toFixed(2)} readOnly />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item label="Rating">
                                                    <Input value={product.rating} readOnly />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item label="Stock">
                                                    <Input value={product.stock} readOnly />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item label="Brand">
                                                    <Input value={product.brand} readOnly />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item label="SKU">
                                                    <Input value={product.sku} readOnly />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item label="Weight">
                                                    <Input value={`${product.weight} g`} readOnly />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item label="Dimensions">
                                                    <Input
                                                        value={`${product.dimensions.width}cm x ${product.dimensions.height}cm x ${product.dimensions.depth}cm`}
                                                        readOnly
                                                    />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item label="Warranty">
                                                    <Input value={product.warrantyInformation} readOnly />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item label="Shipping">
                                                    <Input value={product.shippingInformation} readOnly />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24} sm={12}>
                                                <Form.Item label="Availability">
                                                    <Input value={product.availabilityStatus} readOnly />
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24}>
                                                <Form.Item label="Tags">
                                                    <div className="flex flex-wrap">
                                                        {product.tags.map((tag, index) => (
                                                            <Tag key={index}>{tag}</Tag>
                                                        ))}
                                                    </div>
                                                </Form.Item>
                                            </Col>
                                            <Col xs={24}>
                                                <Form.Item label="Reviews">
                                                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                                                        {product.reviews.map((review, index) => (
                                                            <Card key={index} className="mb-2 p-4">
                                                                <p><strong>Rating:</strong> {review.rating}</p>
                                                                <p><strong>Reviewer:</strong> {review.reviewerName}</p>
                                                                <p><strong>Email:</strong> {review.reviewerEmail}</p>
                                                                <p><strong>Comment:</strong> {review.comment}</p>
                                                                <p><strong>Date:</strong> {new Date(review.date).toLocaleDateString()}</p>
                                                            </Card>
                                                        ))}
                                                    </div>
                                                </Form.Item>
                                            </Col>

                                            <Col xs={24}>
                                                <Form.Item label="Meta Information">
                                                    <ul className="list-disc list-inside mt-2">
                                                        <li><strong>Created At:</strong> {new Date(product.meta.createdAt).toLocaleDateString()}</li>
                                                        <li><strong>Updated At:</strong> {new Date(product.meta.updatedAt).toLocaleDateString()}</li>
                                                        <li><strong>Barcode:</strong> {product.meta.barcode}</li>
                                                        <li><strong>QR Code:</strong> <img src={product.meta.qrCode} alt="QR Code" className="mt-2" style={{ maxWidth: "100%", maxHeight: "200px" }} /></li>
                                                    </ul>
                                                </Form.Item>
                                            </Col>
                                        </Row>
                                    </Form>
                                </div>
                            </Col>
                        </Row>
                    </Card>
                )}
                <div className="mt-4 flex justify-center">
                    <Link to="/" className="bg-blue-500 hover:bg-blue-600  text-white px-4 py-2 rounded">
                        Back Home
                    </Link>
                </div>
            </Content>
        </Layout>
    );
};

export default ProductDetails;
