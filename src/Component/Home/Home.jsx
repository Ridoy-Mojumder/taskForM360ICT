
import { Link } from "react-router-dom";
import { Layout, Typography, Button } from "antd";
import Product from "../Product/Product";

const { Content } = Layout;
const { Title, Paragraph } = Typography;

const Home = () => {
    return (
        <Layout className="bg-gray-900 text-white min-h-screen">
            {/* Header Section */}
            <header className="bg-gradient-to-r from-purple-600 to-pink-500 py-12">
                <div className="container mx-auto text-center px-4">
                    <Title className="text-5xl  text-green-500 font-extrabold mb-4">Welcome to Our Website</Title>
                    <Paragraph className="text-xl text-white mb-8">
                        Discover how we can help you achieve your goals.
                    </Paragraph>
                    <Link to="/products">
                        <Button type="primary" size="large" className="bg-white text-gray-900 hover:bg-gray-100">
                            Explore Products
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Main Content Section */}
            <Content className="py-16">
                <div className="container mx-auto px-4">
                    <Title level={2} className="text-4xl font-bold mb-8 text-center text-gray-200">
                        Our Products
                    </Title>
                    <Product />
                </div>
            </Content>

            {/* Footer Section */}
            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto px-4 text-center">
                    <Paragraph className="text-gray-300">
                        &copy; {new Date().getFullYear()} Your Company. All rights reserved.
                    </Paragraph>
                </div>
            </footer>
        </Layout>
    );
};

export default Home;
