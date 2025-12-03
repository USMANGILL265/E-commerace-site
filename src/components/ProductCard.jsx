// components/ProductCard.jsx
"use client";
import React from "react";
import { useDispatch } from "react-redux";
import { add } from "../redux/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(add(product)); // product must have id,title,price,image
  };

  return (
    <div style={{border:"1px solid #ddd", padding:12}}>
      <img src={product.image} alt={product.title} width={120} />
      <h3>{product.title}</h3>
      <p>{product.price}</p>
      <button onClick={handleAdd}>Add to cart</button>
    </div>
  );
};

export default ProductCard;
