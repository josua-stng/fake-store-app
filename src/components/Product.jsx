import React from "react";
import { Link } from "react-router-dom";

const Product = ({ title, image, price, description ,productId}) => {
  return (
    <>
    <div className="bg-blue-200 p-6 ">
    <Link to={`/product/${productId}`}>
      <img className=" w-full h-48 " src={`${image}`} alt="image_photos" />
      <h2 className="font-bold text-xl mb-2 line-clamp-1">{title}</h2>
      <p className="text-blue-800 font-bold mb-2">$ {price}</p>
      <p className="line-clamp-3">{description}</p>
  
    </Link>
    </div>
    </>
  );
};

export default Product;
