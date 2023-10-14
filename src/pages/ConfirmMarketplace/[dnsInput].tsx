import Navbar from "@/components/Navbar";
import { getSupabase } from "@/shared/utils";
import { Button, Card, Divider, Input } from "@chakra-ui/react";
import { Fragment, JSX, SVGProps, useEffect, useRef, useState } from "react";
import { useAccount, useContractRead, useContractWrite, usePrepareContractWrite } from "wagmi";
import { LISTING_CONTRACT_ADDRESS, REGISTRY_CONTRACT_ADDRESS } from "../../../globalvar";
import abiiListing from "../../../abiiListing.json";
import { parseEther } from "viem";
import { useRouter } from "next/router";
import abiiRegistry from "../../../abiiRegistry.json"

function ConfirmMarketplace() {
  /////////////////////////////////////
  const supabase = getSupabase();

  const router = useRouter();
  const { dnsInput } = router.query;
  const [dnsName, setdnsName] = useState<string>(dnsInput + ".emn");

  useEffect(() => {
    if (router.isReady) { // ensures dns value is available
        setdnsName(dnsInput ? dnsInput + ".emn" : "defaultvalue.emn"); // you can set a default value if dns is not available for any reason
    }
}, [router.isReady, dnsInput]);

  async function checkiftokenListed(tokenId: number) {
    const { data, error } = await supabase
      .from("tokenTable")
      .select("*")
      .contains("listed_id", [tokenId]);
    if (error) {
      console.error(`tokenId of ${tokenId} is not listed or expired`, error);
      return false;
    }

    if (data?.length === 0) {
      console.log(`tokenId of ${tokenId} is not listed or expired`);
      return false;
    }
    return true;
  }

  async function addressExists(address: string): Promise<boolean> {
    const { data, error } = await supabase
      .from("tokenTable")
      .select("Address")
      .eq("Address", address);

    if (error) {
      console.error("Error checking address:", error);
      return false;
    }

    return data && data.length > 0;
  }

  async function removeFromListedId(tokenId: number) {
    const { data, error } = await supabase
      .from("tokenTable")
      .select("*")
      .contains("listed_id", [tokenId]);

    if (error) {
      console.error(
        `Error fetching rows with listed_id containing ${tokenId}:`,
        error
      );
      return;
    }

    for (const row of data!) {
      const updatedListedIds = row.listed_id.filter(
        (id: number) => id !== tokenId
      );
      const { error: updateError } = await supabase
        .from("tokenTable")
        .update({ listed_id: updatedListedIds })
        .eq("id", row.id);

      if (updateError) {
        console.error(`Error updating listed_id row:`, updateError);
      }
    }
  }

  async function processTokenForAddress(address: string, tokenId: number) {
    const listed = await checkiftokenListed(tokenId);
    if (!listed) {
      return;
    }

    const exists = await addressExists(address);

    // Remove the tokenId from any address that has it in the listed_id columns.
    await removeFromListedId(tokenId);

    if (!exists) {
      // Insert a new row with the address and tokenId.
      const { error } = await supabase.from("tokenTable").insert({
        Address: address,
        token_id: [tokenId],
      });

      if (error) {
        console.error("Error inserting new address:", error);
      }
    } else {
      // Append the tokenId to the token_id array of the existing address.
      const { data, error } = await supabase
        .from("tokenTable")
        .select("*")
        .eq("Address", address);

      if (error) {
        console.error("Error fetching address:", error);
        return;
      }

      const currentTokenIds = data![0].token_id || [];
      const updatedTokenIds = Array.from(
        new Set([...currentTokenIds, tokenId])
      );

      const { error: updateError } = await supabase
        .from("tokenTable")
        .update({ token_id: updatedTokenIds })
        .eq("Address", address);

      if (updateError) {
        console.error(
          "Error updating token_id for existing address:",
          updateError
        );
      }
    }
  }
  /////////////////////////////////////

  const { address, isConnecting, isDisconnected } = useAccount();


  const {
    data: tokenId,
    error,
    isLoading: loading1,
  } = useContractRead({
    // fetch token data
    address: REGISTRY_CONTRACT_ADDRESS,
    abi: abiiRegistry,
    functionName: "checkActiveDomainName",
    args:[dnsName],
    onSettled(data, error) {
      console.log("Settled", { data, error });
    },
  });


  const { config } = usePrepareContractWrite({
    address: LISTING_CONTRACT_ADDRESS,
    abi: abiiListing,
    functionName: "buy",
    value: parseEther('0.015'),
    args: [Number(tokenId)],    //HARD CODEEEEEEE Nama function: checkActiveDomainName
    onError(error) {
      console.log("Error", error);
    },
    onSettled(data, error) {
      console.log("Settled", { data, error });
    },
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);


  function handleClick() {
    processTokenForAddress(String(address), Number(1)); //HARD CODEEEEEEE
    write?.();
  }

  const [subtotalPrice, setSubtotalPrice] = useState(0.015);

  return (
    <div className="h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100">
      <Navbar />
      <div className="mt-8 w-1/2 mx-auto items-center justify-center">
        <h1 className="text-4xl font-semibold">Confirm Purchase</h1>
        <Card className="mt-8 p-8 mx-auto justify-center">
          <h1 className="text-2xl font-semibold text-center justify-center">
            {dnsName}
          </h1>
          <Divider colorScheme="gray" className="my-4" />
          <div className="flex mt-2">
            <h1 className="text-lg text-left font-semibold">Current Owner:</h1>
            <text className="ml-2 text-lg text-left font-semibold">
              0xui7awjk89awd
            </text>
          </div>
          <div className="flex mt-2">
            <h1 className="text-lg text-left font-semibold">Listed Price:</h1>
            <text className="ml-2 text-lg text-left font-semibold">
              0.015 ETH
            </text>
          </div>
          <div className="flex mt-2">
            <h1 className="text-lg text-left font-semibold">Domain Expiry:</h1>
            <text className="ml-2 text-lg text-left font-semibold">
              13/10/25
            </text>
          </div>

          <Divider colorScheme="gray" className="my-4" />
          <div className="flex mt-2 mb-8">
            <h1 className="ml-96 mt-2 text-lg text-left font-semibold">
              Subtotal:
            </h1>
            <Input
              className="ml-12 text-lg font-medium text-center"
              htmlSize={9}
              width="auto"
              variant="filled"
              value={`${subtotalPrice} ETH`}
              readOnly
            />
          </div>
          <div className="flex justify-center mt-6">
            <Button
              onClick={handleClick}
              colorScheme="blackAlpha"
              variant="solid"
              className="w-1/2"
            >
              Buy Now
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ConfirmMarketplace;