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

  function handleClick() {
    write?.();
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
