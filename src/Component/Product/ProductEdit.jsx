import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Form, Input, Button, message, Select, InputNumber, Spin } from "antd";
import axios from "axios";
import { LoadingOutlined } from "@ant-design/icons";

const { Option } = Select;

const ProductEdit = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const [categories, setCategories] = useState([]);
    const [loadingProduct, setLoadingProduct] = useState(true);
    const [loadingCategories, setLoadingCategories] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/products/${id}`);
                setProduct(response.data);
                setLoadingProduct(false);
            } catch (error) {
                console.error("Error fetching product:", error);
                setLoadingProduct(false);
            }
        };

        const fetchCategories = async () => {
            try {
                const response = await axios.get(`https://dummyjson.com/products/categories`);
                setCategories(response.data);
                setLoadingCategories(false);
            } catch (error) {
                console.error("Error fetching categories:", error);
                setLoadingCategories(false);
            }
        };

        fetchProduct();
        fetchCategories();
    }, [id]);

    const onFinish = async (values) => {
        try {
            const response = await axios.patch(`https://dummyjson.com/products/${id}`, values);
            console.log("Updated Product:", response.data);
            message.success("Product updated successfully!");
            setProduct(response.data); // Optionally update local state with updated data
        } catch (error) {
            console.error("Error updating product:", error);
            message.error("Failed to update product.");
        }
    };

    if (loadingProduct || loadingCategories) {
        return (
            <div className="flex items-center justify-center h-screen">
                <div className="text-center">
                    <div className="mb-4">
                        <Spin indicator={<LoadingOutlined style={{ fontSize: 48, color: "#1890ff" }} spin />} />
                    </div>
                    <p className="text-lg font-semibold text-gray-800">Loading...</p>
                </div>
            </div>
        );
    }

    return (
        <div>
            <h2>Edit Product: {product.title}</h2>
            <Form
                layout="vertical"
                initialValues={product}
                onFinish={onFinish}
                onFinishFailed={(errorInfo) => console.log("Failed:", errorInfo)}
            >
                <Form.Item label="Title" name="title" rules={[{ required: true, message: "Please enter a title" }]}>
                    <Input />
                </Form.Item>
                <Form.Item label="Description" name="description">
                    <Input.TextArea rows={4} />
                </Form.Item>
                <Form.Item label="Category" name="category">
                    <Select style={{ width: "100%" }} placeholder="Select category">
                        {categories.map((category) => (
                            <Option key={category} value={category}>
                                {category}
                            </Option>
                        ))}
                    </Select>
                </Form.Item>
                <Form.Item label="Price" name="price">
                    <InputNumber
                        formatter={(value) => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                        parser={(value) => value.replace(/\$\s?|(,*)/g, "")}
                    />
                </Form.Item>
                <Form.Item label="Reviews" name="reviews">
                    <Form.List name="reviews" initialValue={product.reviews}>
                        {(fields, { add, remove }) => (
                            <>
                                {fields.map((field) => (
                                    <Form.Item key={field.key} name={[field.name, 'text']}>
                                        <Input placeholder="Review" style={{ width: "60%", marginRight: 8 }} />
                                        <Button type="link" onClick={() => remove(field.name)}>
                                            Remove
                                        </Button>
                                    </Form.Item>
                                ))}
                                <Form.Item>
                                    <Button type="dashed" onClick={() => add()} style={{ width: "60%" }}>
                                        Add Review
                                    </Button>
                                </Form.Item>
                            </>
                        )}
                    </Form.List>
                </Form.Item>
                <Form.Item>
                    <Button type="primary" htmlType="submit">
                        Update Product
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default ProductEdit;
