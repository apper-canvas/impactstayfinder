import React from "react";
import { Outlet } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import PropertyComparison from "@/components/pages/PropertyComparison";
import Help from "@/components/pages/Help";
import Wishlist from "@/components/pages/Wishlist";
import PropertyDetail from "@/components/pages/PropertyDetail";
import Home from "@/components/pages/Home";
import Search from "@/components/pages/Search";
import Header from "@/components/organisms/Header";
function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Outlet />
      </main>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        style={{ zIndex: 9999 }}
      />
    </div>
  );
}

export default App;