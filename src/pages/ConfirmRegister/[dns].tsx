import Navbar from "@/components/Navbar";
import { Button, Card, Divider, Input } from "@chakra-ui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, JSX, SVGProps, useEffect, useRef, useState } from "react";
import DropdownButton from "@/components/DropdownButton";
import { getSupabase } from "@/shared/utils";
import { useAccount, useContractWrite, usePrepareContractWrite } from "wagmi";
import { parseEther } from "viem";
import abiiRegistry from "../../../abiiRegistry.json"
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter } from 'next/router';

import { REGISTRY_CONTRACT_ADDRESS } from "../../../globalvar";
import { LISTING_CONTRACT_ADDRESS } from "../../../globalvar";

function ConfirmRegistration () {
  const [selectedItem, setSelectedItem] = useState("Duration");
  const [price, setPrice] = useState(0);
  const [registrarPrice, setRegistrarPrice] = useState(25);
  const [subtotalPrice, setSubtotalPrice] = useState(25);
  const [expiryDate, setExpiryDate] = useState('dd/mm/yy'); 

  const formatDate = (date: Date) => {
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  const router = useRouter();
  const { dns } = router.query;

  useEffect(() => {
    if (router.isReady) { // ensures dns value is available
        setdnsName(dns ? dns + "123.emn" : "defaultvalue.emn"); // you can set a default value if dns is not available for any reason
    }
}, [router.isReady, dns]);

  // useEffect(() => {
  //   const TotalPrice = price + registrarPrice;
  //   const formattedTotalPrice = TotalPrice.toFixed(3);

  //   setSubtotalPrice(parseFloat(formattedTotalPrice));
  // }, [price, registrarPrice]);

  const handleDurationChange = (newDuration: any) => {
    setSelectedItem(newDuration);
    const currentDate = new Date();

    // Update the price based on the selected duration
    switch (newDuration) {
      case "30 day":
        setPrice(50);
        setTime("1");
        setSubtotalPrice(75);

        const expiryDate30 = new Date(currentDate);
        expiryDate30.setDate(currentDate.getDate() + 30); // Adding 30 days
        setExpiryDate(formatDate(expiryDate30)); // Format as DD/MM/YYYY
        break;

      case "90 day":
        setPrice(125);
        setTime("2");
        setSubtotalPrice(150);

        const expiryDate90 = new Date(currentDate);
        expiryDate90.setDate(currentDate.getDate() + 90); // Adding 90 days
        setExpiryDate(formatDate(expiryDate90)); // Format as DD/MM/YYYY
        break;
      case "365 day":
        setPrice(250);
        setTime("3");
        setSubtotalPrice(275);

        const expiryDate365 = new Date(currentDate);
        expiryDate365.setDate(currentDate.getDate() + 365); // Adding 90 days
        setExpiryDate(formatDate(expiryDate365)); // Format as DD/MM/YYYY
        break;
      case "730 day":
        setPrice(500);
        setTime("4");
        setSubtotalPrice(525);

        const expiryDate730 = new Date(currentDate);
        expiryDate730.setDate(currentDate.getDate() + 730); // Adding 90 days
        setExpiryDate(formatDate(expiryDate730)); // Format as DD/MM/YYYY
        break;
      default:
        setPrice(0); // Set a default price
    }
  };

  const handlePriceChange = (newPrice: any) => {
    setPrice(parseFloat(newPrice));
  };

  //////////////////////////////////////////////////////////////////////////////////////////
  const { address, isConnecting, isDisconnected } = useAccount();


  const [dnsName, setdnsName] = useState<string>(dns + "123.emn"); // INPUT HARD CODE DI SINI
  const [time, setTime] = useState<string>("1"); // INPUT HARD CODE DI SINI

  const [tokenId, setTokenId] = useState<any>(null);
  const intToken = Number(tokenId);

  const { config } = usePrepareContractWrite({
    // address: process.env.REGISTRY_CONTRACT as `0x${string}`,

    address:REGISTRY_CONTRACT_ADDRESS,

    abi: abiiRegistry,
    functionName: "registerDNS",
    value: parseEther(subtotalPrice.toString()),
    args: [dnsName, time],
    onError(error) {
      console.log("Error:", error)
    },
    onSuccess(data) {
      console.log("Success", data);
      if (data && data.result) {
        setTokenId(data.result);
      }
    },
  });

  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  function handleClick() {
    write?.();
    console.log("manual log", data);
    console.log("manual log", time);
    handleWallet(address, intToken);
  }

  return (
    <div className="h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100">
      <Navbar />
      <ToastContainer />
      <div className="mt-8 w-1/2 mx-auto items-center justify-center">
        <h1 className="text-4xl font-semibold">Confirm Registration</h1>
        <Card className="mt-8 p-8 mx-auto justify-center">
          <h1 className="text-2xl font-semibold text-center justify-center">
            {dnsName}
          </h1>
          <Divider colorScheme="gray" className="my-4" />
          <div className="flex">
            <h1 className="text-lg text-left font-semibold mr-8 mt-1">
              Set Duration:
            </h1>
            <DropdownButton
              values={["30 day", "90 day", "365 day", "730 day"]}
              defaultValue={selectedItem}
              onDurationChange={handleDurationChange}
            />
          </div>
          <div className="flex mt-8">
            <h1 className="text-lg text-left font-semibold mr-8 mt-1">
              Duration Price:
            </h1>
            <Input
              className="ml-[359px] text-sm font-medium text-center"
              htmlSize={8}
              width="auto"
              variant="filled"
              value={`${price} MNT`}
              onChange={(e) => handlePriceChange(e.target.value)}
              readOnly
            />
          </div>
          <Divider colorScheme="gray" className="my-4" />

          <div className="flex mt-2">
            <h1 className="mt-2 text-lg text-left font-semibold">
              Registrar Fee:
            </h1>
            <Input
              className="ml-[30px] text-sm font-medium text-center"
              htmlSize={9}
              width="auto"
              variant="filled"
              value={`${registrarPrice} MNT`}
              readOnly
            />
          </div>
          <div className="flex mt-4">
            <h1 className="mt-2 text-lg text-left font-semibold">
              Domain Expiry:
            </h1>
            <Input
              className="ml-[20px] text-sm font-medium text-center"
              htmlSize={9}
              width="auto"
              variant="filled"
              value={expiryDate}
              readOnly
            />
          </div>
          <Divider colorScheme="gray" className="my-4" />
          <div className="flex mt-2 mb-8">
            <h1 className="ml-96 mt-2 text-lg text-left font-semibold">
              Subtotal:
            </h1>
            <Input
              className="ml-12 text-sm font-medium text-center"
              htmlSize={9}
              width="auto"
              variant="filled"
              value={`${subtotalPrice} MNT`}
              readOnly
            />
          </div>

          <div className="flex justify-center mt-10">
            <button
              className="w-1/2 p-2 bg-slate-400 rounded-lg text-white font-semibold"
              onClick={handleClick}
              disabled={isLoading}
            >
              {isLoading ? "🔄" : isSuccess ? "Success!" : "Submit"}
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ConfirmRegistration;

// SUPABASE
const supabase = getSupabase();
async function handleWallet(wallet: any, newTokenId: any) {
  // First, check if the address exists in the table
  const { data, error } = await supabase
    .from("tokenTable")
    .select("token_id")
    .eq("Address", wallet);

  // If the address does not exist, insert a new row
  if (!data || data.length === 0) {
    const { error: insertError } = await supabase.from("tokenTable").insert([
      {
        Address: wallet,
        token_id: [newTokenId],
        // listed_id: [newListedId],
      },
    ]);
    if (insertError) {
      console.error("Error inserting data:", insertError);
    }
  } else {
    // If the address exists, fetch the current token_id array and append the new value
    const currentTokenIds = data[0].token_id || [];
    const updatedTokenIds = [...currentTokenIds, newTokenId];

    const { error: updateError } = await supabase
      .from("tokenTable")
      .update({ token_id: updatedTokenIds })
      .eq("Address", wallet);

    if (updateError) {
      console.error("Error updating data:", updateError);
    }
  }
}
