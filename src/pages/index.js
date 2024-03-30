import Layout from "../components/Layout";
import ProductItem from "../components/ProductItem";
import db from "../utils/db";
import Product from "../../models/Product";
import { useContext } from "react";
import { Store } from "@/utils/Store";
import axios from "axios";
import { toast } from "react-toastify";
// import { trace } from "next/dist/trace";
// import type   GetServerSideProps  from 'next'
export default function Home({ products }) {
  const { state, dispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async (product) => {
    const existingItem = cart.cartItems.find((x) => x.slug === product.slug);
    const quantity = existingItem ? existingItem.quantity + 1 : 1;
    const { data } = await axios.get(`/api/products/${product._id}`);

    dispatch({ type: "CART_ADD_ITEM", payload: { ...product, quantity } });

    toast.success("Product added to cart");
    if (data.countInStock < quantity) {
    return  toast.error("Sory! Product is out of stock..");
    }
  };
  return (
    <Layout title={"Home Page"}>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {products.map((product) => (
          <ProductItem
            addToCartHandler={addToCartHandler}
            product={product}
            key={product.slug}
          />
        ))}
      </div>
    </Layout>
  );
}
export async function getServerSideProps() {
  await db.connect();
  const products = await Product.find().lean();
  return {
    props: {
      products: products.map(db.convertDocToObj),
    },
  };
}
