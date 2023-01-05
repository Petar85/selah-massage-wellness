import React from 'react';
import { client } from "../lib/client";
import { Product, FooterBanner, HeroBanner } from "../components";

const Home = ({ products, bannerData }) => {
  return (
    <>
    <HeroBanner />

    <div className="products-heading">
      <h2>Best Selling Essential Oils</h2>
      <p>Add essence to your life with these astonishing essential oils</p>
    </div>

    <div className='products-container'>
      {products?.map((product) => product.name)}
    </div>

    <FooterBanner />
    </>
  )
};

export const getServerSideProps = async () => {
  const query = "*[_type == 'product']";
  const products = await client.fetch(query);

  const bannerQuery = "*[_type == 'banner']";
  const bannerData = await client.fetch(bannerQuery);

  return {
    props: { products, bannerData }
  }
}

export default Home;