import { useCart } from '../context/CartContext';
import { useTheme } from '../context/ThemeContext';
import { Link } from 'react-router-dom';

export default function Cart() {
  const { items, removeFromCart, updateQuantity, clearCart, totalPrice } = useCart();
  const { darkMode } = useTheme();

  if (items.length === 0) {
    return (
      <div
        className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}
      >
        <div className="max-w-3xl mx-auto text-center py-20">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className={`h-16 w-16 mx-auto mb-4 ${darkMode ? 'text-gray-400' : 'text-gray-500'}`}
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 100 4 2 2 0 000-4z"
            />
          </svg>
          <h2 className={`text-2xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'} mb-2`}>
            Your cart is empty
          </h2>
          <p className={`${darkMode ? 'text-gray-400' : 'text-gray-600'} mb-6`}>
            Browse our products and add items to your cart.
          </p>
          <Link
            to="/products"
            className="bg-primary hover:bg-accent text-white px-6 py-3 rounded-lg font-medium transition-colors"
          >
            Browse Products
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen ${darkMode ? 'bg-dark' : 'bg-gray-100'} pt-20 pb-16 px-4 transition-colors duration-300`}
    >
      <div className="max-w-3xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h1 className={`text-3xl font-bold ${darkMode ? 'text-light' : 'text-gray-800'}`}>
            Shopping Cart
          </h1>
          <button
            onClick={clearCart}
            className={`text-sm px-3 py-1 rounded ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-600 hover:text-red-600'} transition-colors`}
            aria-label="Clear cart"
          >
            Clear All
          </button>
        </div>

        <div className="space-y-4">
          {items.map((item) => {
            const effectivePrice = item.discount
              ? item.price * (1 - item.discount)
              : item.price;

            return (
              <div
                key={item.productId}
                className={`flex items-center gap-4 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm transition-colors duration-300`}
              >
                <img
                  src={`/${item.imgName}`}
                  alt={item.name}
                  className="w-16 h-16 object-contain rounded"
                />
                <div className="flex-grow min-w-0">
                  <h3
                    className={`font-semibold truncate ${darkMode ? 'text-light' : 'text-gray-800'}`}
                  >
                    {item.name}
                  </h3>
                  <p className="text-primary font-medium">${effectivePrice.toFixed(2)}</p>
                </div>
                <div
                  className={`flex items-center space-x-2 ${darkMode ? 'bg-gray-700' : 'bg-gray-200'} rounded-lg p-1`}
                >
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity - 1)}
                    className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors`}
                    aria-label={`Decrease quantity of ${item.name}`}
                  >
                    -
                  </button>
                  <span
                    className={`min-w-[2rem] text-center ${darkMode ? 'text-light' : 'text-gray-800'}`}
                  >
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateQuantity(item.productId, item.quantity + 1)}
                    className={`w-8 h-8 flex items-center justify-center ${darkMode ? 'text-light' : 'text-gray-700'} hover:text-primary transition-colors`}
                    aria-label={`Increase quantity of ${item.name}`}
                  >
                    +
                  </button>
                </div>
                <span
                  className={`font-bold min-w-[5rem] text-right ${darkMode ? 'text-light' : 'text-gray-800'}`}
                >
                  ${(effectivePrice * item.quantity).toFixed(2)}
                </span>
                <button
                  onClick={() => removeFromCart(item.productId)}
                  className={`p-1 rounded ${darkMode ? 'text-gray-400 hover:text-red-400' : 'text-gray-500 hover:text-red-500'} transition-colors`}
                  aria-label={`Remove ${item.name} from cart`}
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    />
                  </svg>
                </button>
              </div>
            );
          })}
        </div>

        <div
          className={`mt-6 p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm transition-colors duration-300`}
        >
          <div className="flex justify-between items-center">
            <span className={`text-lg font-semibold ${darkMode ? 'text-light' : 'text-gray-800'}`}>
              Total
            </span>
            <span className="text-2xl font-bold text-primary">${totalPrice.toFixed(2)}</span>
          </div>
          <button
            className="w-full mt-4 bg-primary hover:bg-accent text-white py-3 rounded-lg font-medium transition-colors"
            aria-label="Proceed to checkout"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}
