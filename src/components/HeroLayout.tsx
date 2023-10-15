import { useEffect } from "react";
import React, { useState } from "react";
import { Text } from "@chakra-ui/react";
import router from "next/router";

const HeroLayout = () => {
  const handleRegisterRoute = () => {
    router.push("/RegisterDomain");
  };
  const handleMarketplaceRoute = () => {
    router.push("/Marketplace");
  };
  const handleProfileRoute = () => {
    router.push("/Profile");
  };

  return (
    <div className="h-screen flex-col mx-auto justify-center items-center place-content-center bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100">
      <Text
        fontSize="7xl"
        className="pt-32 text-center font-bold"
        color="black"
      >
        e t h e r m a i n
      </Text>
      <Text fontSize="xl" className="text-center font-bold mb-4 text-slate-500">
        register, buy, sell and manage onchain web domains
      </Text>
      <div className="w-1/3 flex-col mx-auto items-center justify-center place-content-center">
        <button
          className="w-full bg-transparent rounded-lg border-2 border-slate-500 p-4 text-lg font-semibold text-slate-500 my-4"
          onClick={handleRegisterRoute}
        >
          Register a New Domain
        </button>
        <button
          className="w-full bg-transparent rounded-lg border-2 border-slate-500 p-4 text-lg font-semibold text-slate-500 my-4"
          onClick={handleMarketplaceRoute}
        >
          Marketplace: Buy Domain
        </button>
        <button
          className="w-full bg-transparent rounded-lg border-2 border-slate-500 p-4 text-lg font-semibold text-slate-500 my-4"
          onClick={handleProfileRoute}
        >
          Profile: Manage Domains
        </button>
      </div>
    </div>
  );
};

export default HeroLayout;
