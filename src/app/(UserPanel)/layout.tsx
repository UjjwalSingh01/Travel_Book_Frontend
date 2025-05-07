"use client";

import React, { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Header from "@/common_components/Header";
import Footer from "@/common_components/Footer";

interface UserLayoutProps {
  children: ReactNode;
}

const UserLayout: React.FC<UserLayoutProps> = ({ children }) => {
  const pathname = usePathname();

  const isRegisterPage = pathname === "/register";

  return (
    <>
      {!isRegisterPage && <Header />}
      {children}
      <Footer />
    </>
  );
};

export default UserLayout;
