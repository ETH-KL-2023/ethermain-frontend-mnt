import { Card, Divider, Input } from "@chakra-ui/react";
import { MouseEventHandler, useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useContractRead } from "wagmi";
import { REGISTRY_CONTRACT_ADDRESS } from "../../../globalvar";
import abiiRegistry from "../../../abiiRegistry.json";
import Navbar from "@/components/Navbar";

function Settings() {
  const router = useRouter();
  const { tokenIdSetting } = router.query;

  const [currentTokenId, setCurrentTokenId] = useState(tokenIdSetting);

  useEffect(() => {
    // Update currentTokenId when tokenId changes
    setCurrentTokenId(tokenIdSetting);
  }, [tokenIdSetting]);

  const handleTransferFunction = () => {
    router.push(`/TransferDomain/${currentTokenId}`);
  };

  const handleExtendFunction = () => {
    router.push(`/ExtendDuration/${currentTokenId}`);
  };

  const handleManageDNSFunction = () => {
    router.push(`/ManageDomain/${currentTokenId}`);
  };

  const {
    data: data1,
    error,
    isLoading: loading1,
  } = useContractRead({
    // fetch token data
    address: REGISTRY_CONTRACT_ADDRESS,
    abi: abiiRegistry,
    functionName: "getDNSData",
    args: [currentTokenId],
  });

  return (
    <div className="h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100">
      <Navbar />
      <Card className="w-[300px] mt-32 p-4 mx-auto justify-center bg-white shadow-lg rounded-lg">
        <h1 className="text-lg font-semibold text-center justify-center">
          {(data1 as { domainName: string })?.domainName}
        </h1>
        <Divider colorScheme="gray" className="my-2" />
        <button
          className="w-full p-2 my-2 bg-slate-400 rounded-lg border-2 text-white font-semibold"
          onClick={handleTransferFunction}
        >
          Transfer Domain
        </button>
        <button
          className="w-full p-2 my-2 bg-slate-400 rounded-lg border-2 text-white font-semibold"
          onClick={handleExtendFunction}
        >
          Extend Duration
        </button>
        <button
          className="w-full p-2 my-2 bg-slate-400 rounded-lg border-2 text-white font-semibold"
          onClick={handleManageDNSFunction}
        >
          Manage DNS
        </button>
      </Card>
    </div>
  );
}

export default Settings;
