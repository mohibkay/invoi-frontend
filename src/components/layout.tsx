import React from "react";
import Navbar from "./Navbar";

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Navbar />
      <div className='max-w-6xl mx-auto'>{children}</div>
    </>
  );
};

export default Layout;
