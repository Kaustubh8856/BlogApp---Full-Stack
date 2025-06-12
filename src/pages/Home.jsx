import React from "react";
import Navbar from "../Components/Navbar";
import Header from "../Components/Header";
import BlogList from "../Components/BlogList";
import Newsletter from "../Components/Newsletter";

const Home = () => {
  return (
    <>
      <Navbar />
      <Header />
      <BlogList />
      <Newsletter />
    </>
  );
};

export default Home;
