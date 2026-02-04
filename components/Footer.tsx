export default function Footer() {
    return (
        <footer className="bg-gray-900 text-white py-16 px-6">
            <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-12">
                <div className="col-span-1 md:col-span-1">
                    <h3 className="text-2xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-pink-500">
                        Nano Banana
                    </h3>
                    <p className="text-gray-400 text-sm">
                        Future of freshness. Experience the revolution in every bottle.
                    </p>
                </div>

                <div>
                    <h4 className="font-bold mb-4">Shop</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li className="hover:text-white cursor-pointer transition-colors">All Products</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Bundles</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Subscription</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4">Support</h4>
                    <ul className="space-y-2 text-gray-400 text-sm">
                        <li className="hover:text-white cursor-pointer transition-colors">FAQ</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Contact Us</li>
                        <li className="hover:text-white cursor-pointer transition-colors">Shipping & Returns</li>
                    </ul>
                </div>

                <div>
                    <h4 className="font-bold mb-4">Stay Fresh</h4>
                    <form className="flex gap-2">
                        <input
                            type="email"
                            placeholder="Enter your email"
                            className="bg-gray-800 border border-gray-700 rounded-lg px-4 py-2 text-sm focus:outline-none focus:border-orange-500 flex-1"
                        />
                        <button className="bg-orange-500 hover:bg-orange-600 px-4 py-2 rounded-lg text-sm font-bold transition-colors">
                            Join
                        </button>
                    </form>
                </div>
            </div>
            <div className="max-w-7xl mx-auto mt-12 pt-8 border-t border-gray-800 text-center text-gray-500 text-xs">
                © 2024 Nano Banana. All rights reserved.
            </div>
        </footer>
    );
}
