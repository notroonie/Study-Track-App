import React from "react";
import Banner from "../../components/Banner";
import { Outlet } from "react-router-dom";

export const SharedLayout = () => {
  return (
    <section>
      <header>
        <Banner />
      </header>
      <main className="main-content">
        <Outlet />
      </main>
    </section>
  );
};
export default SharedLayout;
