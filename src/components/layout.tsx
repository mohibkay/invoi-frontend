import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className='h-screen flex flex-col justify-between'>
      <Navbar />
      <div className='max-w-6xl mx-auto'>{children}</div>
      <Footer />
    </div>
  );
};

export default Layout;
