import React, { useEffect, useState } from "react";
import Product from "../components/Product";
// import Navbar from "./Navbar";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [searchBar, setSearchBar] = useState("");
  const [loadingProduct,setLoadingProduct]= useState(true)
  const getProduct = async () => {
    setLoadingProduct(true)
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    setProducts(data);
    setLoadingProduct(false)
  };

  useEffect(() => {
    getProduct();
  }, []);

  const getValueInput = (event) => {
    setSearchBar(event.target.value);
    // console.log(searchBar);
  };

  if(loadingProduct) return <h1 className="text-center my-10 text-2xl italic">Loading...</h1>

  return (
    <>
      <div
        className="flex
     bg-blue-400 p-6 mb-5 justify-between "
      >
        <input
          className="p-1 rounded-lg sticky"
          placeholder="Search..."
          onChange={getValueInput}
        />

        <div className="p-1">
          <a href="/#" className="p-1 ml-20 mr-2 bg-white rounded-md">
            Chat
          </a>
          <a href="/#" className="p-1  bg-white rounded-md">
            Bantuan
          </a>
        </div>
      </div>
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 gap-4">
          {products
            .filter((post) => {
              if (searchBar === "") {
                return post;
              } else if (
                post.title.toLowerCase().includes(searchBar.toLowerCase())
              ) {
                return post;
              }
              return false;
            })
            .map((product, index) => (
              <div className="box" key={index}>
                <Product
                  key={product.id}
                  productId={product.id}
                  title={product.title}
                  image={product.image}
                  price={product.price}
                  description={product.description}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default Home;
