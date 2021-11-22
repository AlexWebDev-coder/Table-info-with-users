/** @format */

import React from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";

import { App } from "./App";
import { SpecialUsers } from "./components/SpecialUsers";

const Routing = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/specialUsers" element={<SpecialUsers />} />
      </Routes>
    </BrowserRouter>
  );
};

export { Routing };
