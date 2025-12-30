import React, { useState } from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import HomeContent from "../components/HomeContent";

function HomePage() {
  const [active, setActive] = useState("dashboard");

  return (
    <div className="flex h-screen bg-gray-50 dark:bg-slate-900 text-black dark:text-white">
      <Sidebar active={active} setActive={setActive} />

      <div className="flex flex-col flex-1">
        <Header />
        <HomeContent active={active} />
      </div>
    </div>
  );
}

export default HomePage;
