import Navbar from "@/components/Navbar";
import { Button, Card, Divider, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Fragment, JSX, SVGProps, useEffect, useRef, useState } from "react";
import {
  useContractRead,
  useContractWrite,
  usePrepareContractWrite,
} from "wagmi";
import { REGISTRY_CONTRACT_ADDRESS } from "../../../globalvar";
import abiiRegistry from "../../../abiiRegistry.json";
import { getSupabase } from "@/shared/utils";

function TransferDomain() {
  const router = useRouter();
  const { tokenIdTransfer } = router.query;
  const [currentTokenId, setCurrentTokenId] = useState(tokenIdTransfer);
  const [destinationAddress, setDestinationAddress] = useState("");

  useEffect(() => {
    // Update currentTokenId when tokenId changes
    setCurrentTokenId(tokenIdTransfer);
  }, [tokenIdTransfer]);

  const { data, error, isLoading } = useContractRead({
    // fetch token data
    address: REGISTRY_CONTRACT_ADDRESS,
    abi: abiiRegistry,
    functionName: "getDNSData",
    args: [currentTokenId],
  });

  const { config } = usePrepareContractWrite({
    address: "0xecb504d39723b0be0e3a9aa33d646642d1051ee1",
    abi: abiiRegistry,
    functionName: "updateOwner",
    args: [currentTokenId, destinationAddress],
    onSettled(data, error) {
      console.log("Settled", { data, error });
    },
  });
  const {
    data: data2,
    isLoading: isLoading2,
    isSuccess,
    write,
  } = useContractWrite(config);

  ///////////////////////////////////////////////////
  const supabase = getSupabase();

  async function checkiftokenListed(tokenId: number) {
    const { data, error } = await supabase
      .from("tokenMantle")
      .select("*")
      .contains("token_id", [tokenId]);
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
      .from("tokenMantle")
      .select("Address")
      .eq("Address", address);

    if (error) {
      console.error("Error checking address:", error);
      return false;
    }

    return data && data.length > 0;
  }

  async function removeFromTokenId(tokenId: number) {
    const { data, error } = await supabase
      .from("tokenMantle")
      .select("*")
      .contains("token_id", [tokenId]);

    if (error) {
      console.error(
        `Error fetching rows with listed_id containing ${tokenId}:`,
        error
      );
      return;
    }

    for (const row of data!) {
      const updatedListedIds = row.token_id.filter(
        (id: number) => id !== tokenId
      );
      const { error: updateError } = await supabase
        .from("tokenMantle")
        .update({ token_id: updatedListedIds })
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

    //listed
    const exists = await addressExists(address);

    // Remove the tokenId from any address that has it in the tokenid columns.
    await removeFromTokenId(tokenId);

    if (!exists) {
      // Insert a new row with the address and tokenId.
      const { error } = await supabase.from("tokenMantle").insert({
        Address: address,
        token_id: [tokenId],
      });

      if (error) {
        console.error("Error inserting new address:", error);
      }
    } else {
      // Append the tokenId to the token_id array of the existing address.
      const { data, error } = await supabase
        .from("tokenMantle")
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
        .from("tokenMantle")
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

  ////////////////////////////////////////////////////

  function handleClick() {
    write?.();
    processTokenForAddress(String(destinationAddress), Number(currentTokenId));
  }

  return (
    <div className="h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100">
      <Navbar />
      <div className="mt-8 w-1/2 mx-auto items-center justify-center">
        <h1 className="text-4xl font-semibold">Transfer Domain</h1>
        <Card className="mt-8 p-8 mx-auto justify-center">
          <h1 className="text-2xl font-semibold text-center justify-center">
            {(data as { domainName: string })?.domainName}
          </h1>
          <Divider colorScheme="gray" className="my-4" />
          <div className="mx-4 flex mt-4">
            <h1 className="text-lg text-left font-semibold mr-4 mt-1">
              New Address:
            </h1>
            <Input
              className="text-sm font-medium text-right"
              htmlSize={50}
              width="auto"
              variant="outline"
              borderColor="gray"
              placeholder="Enter new address here..."
              value={destinationAddress}
              onChange={(e) => setDestinationAddress(e.target.value)}
            />
          </div>
          <div className="flex justify-center mt-14">
            <Button
              onClick={handleClick}
              colorScheme="blackAlpha"
              variant="solid"
              className="w-1/2"
            >
              Transfer Domain
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default TransferDomain;
