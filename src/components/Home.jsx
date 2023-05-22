import React from "react";
import Form from "./Form";
import Nav from "./Nav";
import { Route, Routes } from "react-router-dom";
import Members from "./Members";
import Hero from "./Hero";

const Home = () => {
  return (
    <div>
      <Nav />
      {/* <Hero /> */}
      <Routes>
        <Route path="*" element={<Hero />} />
        <Route path="/form" element={<Form />} />
        <Route path="/members" element={<Members />} />
      </Routes>
    </div>
  );
};

export default Home;
