import React from "react";
import Auth from "@/components/auth/Auth";
import LatestNews from "@/components/others/LatestNews";
import Hero from "@/components/others/Hero";

const page = () => {
  return (
    // <Auth />
    <>
      <Hero />
      <LatestNews />
    </>
  );
};

export default page;
