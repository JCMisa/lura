import Navbar from "@/components/custom/Navbar";
import { NavbarFallback } from "@/components/custom/NavbarFallback";
import React, { Suspense } from "react";

const SharedLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <Suspense fallback={<NavbarFallback />}>
        <Navbar />
      </Suspense>
      {children}
    </>
  );
};

export default SharedLayout;
