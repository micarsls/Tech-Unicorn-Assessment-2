import React from "react";
import "./App.css";
import { Header } from "./pages/page_components/Header";
import { Footer } from "./pages/page_components/Footer";
import { Shop } from "./pages/Shop";

function App() {
  return (
    <div>
      <Header />
      <Shop />
      <Footer />
    </div>
  );
}

export default App;
