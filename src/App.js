import { useEffect, useState } from "react";
import { Products, Navbar, Cart } from "./components";

import { commerce } from "./lib/commerce";

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  const fetchProducts = async () => {
    const { data } = await commerce.products.list();

    setProducts(data);
  };

  const fetchCart = async () => {
    const cart = await commerce.cart.retrieve();
    setCart(cart);
  };

  const handleAddToCart = async (productId, quanitity) => {
    const cart = await commerce.cart.add(productId, quanitity);
    setCart(cart);
  };

  useEffect(() => {
    fetchProducts();
    fetchCart();
  }, []);

  // console.log("handleAddToCart", cart);

  return (
    <div className="app">
      <Navbar totalItems={cart.total_items} />
      {/* <Products products={products} onAddToCard={handleAddToCart} /> */}
      <Cart cart={cart} />
    </div>
  );
}

export default App;
