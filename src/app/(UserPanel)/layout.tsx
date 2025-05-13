import React, { ReactNode } from "react";
import Header from "@/common_components/Header";
import Footer from "@/common_components/Footer";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  return (
    <>
      <Header />
        {children}
      <Footer />
    </>
  );
};

export default UserLayout;
