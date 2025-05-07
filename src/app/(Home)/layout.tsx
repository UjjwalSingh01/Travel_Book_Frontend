import Footer from "@/common_components/Footer";
import Header from "@/common_components/Header";
import React, { ReactNode } from "react";

interface HomeLayoutProps {
    children: ReactNode;
}

const HomeLayout: React.FC<HomeLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  );
}
  
export default HomeLayout;  