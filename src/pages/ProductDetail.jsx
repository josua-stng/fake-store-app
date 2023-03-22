import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";

const ProductDetail = () => {
  const [products, setProducts] = useState(null);
  const [stockBarang, setStockBarang] = useState(0);
  const [cart, setCart] = useState([]);
  const { productId } = useParams();

  const getProductById = async (productId) => {
    const response = await fetch(
      `https://fakestoreapi.com/products/${productId}`
    );
    return response;
  };

  const addToCart = () => {
    if (stockBarang > 0) {
      let item = { ...products, quantity: stockBarang, id: Date.now() };
      const newCart = [...cart, item];
      setCart(newCart);
      localStorage.setItem("cart", JSON.stringify(newCart));
      setStockBarang(0);
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "success",
        title: "Items add",
      });
    } else {
      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 1000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer);
          toast.addEventListener("mouseleave", Swal.resumeTimer);
        },
      });

      Toast.fire({
        icon: "warning",
        title: "number of items cannot be empty",
      });
    }
  };

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem("cart"));
    if (cartData) {
      setCart(cartData);
    }
  }, []);

  useEffect(() => {
    (async () => {
      const response = await getProductById(productId);
      const movie = await response.json();
      setProducts(movie);
    })();
  }, [productId]);

  const stockAddItesm = () => {
    setStockBarang(stockBarang + 1);
  };

  const stockReductItems = () => {
    setStockBarang(stockBarang - 1);
  };

  if (stockBarang < 0) {
    setStockBarang(0);
  }

  return (
    <div>
      <Link to="/">
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 w-20 border border-blue-700 rounded-lg m-3 ">
          Back
        </button>
      </Link>
      <div className="flex justify-center my-20 items-center">
        <div>
          <img src={`${products?.image}`} className="w-64 " alt="" />
        </div>
        <div className="mt-20 ml-6 w-80 leading-7">
          <h2 className="font-bold text-lg mb-5">{products?.title}</h2>
          <p>
            Rating:{products?.rating.rate} Terjual:{products?.rating.count}
          </p>
          <p>Price: ${products?.price}</p>
          <p className="border-4 w-48 mt-4 mb-5 drop-shadow-2xl rounded-lg p-2 text-center cursor-pointer hover:bg-gray-200">
            Ada promo diskon lhoo
          </p>
        </div>
      </div>
      <div className="grid  lg:grid-cols-2 gap-10 ">
        <div className=" w-6/7 text-base p-5 bg-slate-200 mx-2 h-full">
          <h2 className="mb-4 font-bold text-lg">Detail Product</h2>
          <p className="mb-3">Desc: {products?.description}</p>
          <p className="mb-3">Type: {products?.category}</p>
          <p className="mb-3">Price: ${products?.price}</p>
          <p className="mb-3">Terjual: {products?.rating.count}</p>
          <p>Rating: {products?.rating.rate}</p>
        </div>

        <div className="border-2 w-80 p-5">
          <h2 className="mb-2">Atur jumlah barang</h2>
          <img
            src={`${products?.image}`}
            alt="image_product"
            className="w-12 mb-2"
          />
          <div className="flex border-2 w-32 justify-center align-center">
            <button onClick={stockReductItems}>-</button>
            <p className="ml-7 mr-7">{stockBarang}</p>
            <button onClick={stockAddItesm}>+</button>
          </div>
          <div className="flex justify-between mt-2">
            <p>Subtotal: </p>
            <p>${(stockBarang * products?.price).toFixed(2)}</p>
          </div>
          <button
            className="border-2 rounded-lg p-2 w-full bg-sky-600 text-white mt-5 hover:bg-sky-700"
            onClick={addToCart}
          >
            +Keranjang
          </button>
          <button className="border-2 rounded-lg p-2 w-full   ">
            Beli Langsung
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
