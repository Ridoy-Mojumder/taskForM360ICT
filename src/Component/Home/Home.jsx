import Product from "../Product/Product";

const Home = () => {
    return (
        <div className="bg-gray-900 text-white min-h-screen">
            <header className="bg-gradient-to-r from-purple-600 to-pink-500 py-12">
                <div className="container mx-auto text-center px-4">
                    <h1 className="text-5xl font-bold text-white">Welcome to Our Website</h1>
                    <p className="text-xl text-white mt-4">Discover how we can help you achieve your goals.</p>
                    <p className="text-xl text-white mt-2">Learn about our commitment to quality and customer satisfaction.</p>
                </div>
            </header>

            <section className="py-16">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl font-bold mb-8 text-center">Our Products</h2>
                    <Product />
                </div>
            </section>
            <footer className="bg-gray-800 text-white py-6">
                <div className="container mx-auto px-4 text-center">
                    <p>&copy; {new Date().getFullYear()} Your Company. All rights reserved.</p>
                </div>
            </footer>
        </div>
    );
};

export default Home;
