import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";

const Cart = () => {
  const [productCart, setProductCart] = useState([]);
  const cartProduct = useRef(JSON.parse(localStorage.getItem("cart")));

  useEffect(() => {
    setProductCart(cartProduct.current);
  }, []);

  let totalPrice = 0;
  if (productCart && productCart.length > 0) {
    totalPrice = productCart.reduce((total, product) => {
      return total + product.price;
    }, 0);
  }

  const deleteProduct = (productId) => {
    const updatedCart = productCart.filter(
      (product) => product.id !== productId
    );
    localStorage.setItem("cart", JSON.stringify(updatedCart));
    setProductCart(updatedCart);
  };

  return (
    <>
      <div className="flex bg-blue-400 p-6 mb-5 justify-between ">
        <input
          className="p-1 rounded-lg w-full max-w-[240px] h-10"
          placeholder="Search..."
        />
        <div className="p-1">
       
        <button className="bg-white w-[90px] rounded-md hover:bg-slate-200 h-[36px] mr-3.5">
            <Link to="/cart">Keranjang</Link>
          </button>
        </div>
      </div>
      <Link to="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-20 border border-blue-700 rounded-lg m-3">
          Back
        </button>
      </Link>
      <div className="block lg:flex justify-around">
        <div>
          {!productCart || productCart.length === 0 ? (
            <div>
              <h1 className="text-3xl font-bold mb-12 mt-16 lg:mt-16">Cart is empty</h1>
            </div>
          ) : (
            productCart.map((product) => {
              return (
                <div
                  key={product.id}
                  className="flex border-2 border-gray-300  p-5 mb-5 justify-around items-center  lg:w-[510px] "
                >
                  <div className="">
                    <img src={product.image} alt="" className="w-[110px]" />
                  </div>
                  <div className=" w-[200px] h-35">
                    <p className="font-bold">{product.title}</p>
                    <p className="pt-2">${product.price}</p>
                    <button
                      className="mt-8 ml-10 lg:ml-36 bg-sky-300 w-24 h-10 text-slate-900 hover:bg-sky-200 rounded-lg"
                      onClick={() => deleteProduct(product.id)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })
          )}
        </div>

        <div className="cart-purchase ">
          <div className="border-2 border-gray-300  lg:fixed w-screen lg:right-20 lg:w-[250px] h-[180px] flex flex-col justify-center items-center p-5">
            <p>Total</p>
            <p className="pt-1 text-2xl font-bold">${totalPrice.toFixed(2)}</p>
            <p className="pb-5 text-sm">
              of {productCart ? productCart.length : ""} products
            </p>
            <button className="bg-indigo-500 text-white w-32 h-12 rounded-lg hover:bg-indigo-400"
            disabled={!totalPrice}
            >
              Order Now
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cart;
