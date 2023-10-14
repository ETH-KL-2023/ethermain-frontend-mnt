import { useAccount, useContractRead, useContractWrite } from "wagmi";
import { getSupabase } from "@/shared/utils";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";
import {
  Button,
  Card,
  Divider,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { parseEther } from "viem";
import { usePrepareContractWrite } from "wagmi";
import {
  LISTING_CONTRACT_ADDRESS,
  REGISTRY_CONTRACT_ADDRESS,
} from "../../globalvar";
import abiiRegistry from "../../abiiRegistry.json";
import abiiListing from "../../abiiListing.json";

export default function Profile() {
  const { address, isConnecting, isDisconnected } = useAccount();

  // Define a state variable to store the token IDs
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [listedIds, setListedIds] = useState<number[]>([]);

  const supabase = getSupabase();

  async function fetchAndSetTokenIdsByAddress(address: string) {
    try {
      const { data, error } = await supabase
        .from("tokenTable")
        .select("token_id")
        .eq("Address", address)
        .single();

      if (error) {
        console.error("Error fetching token IDs:", error);
        setTokenIds([]); // Set the state directly here
        return;
      }

      if (data && data.token_id) {
        setTokenIds(data.token_id); // Set the state directly here
      } else {
        console.log(`No tokens found for address ${address}.`);
        setTokenIds([]); // Set the state directly here
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      setTokenIds([]); // Set the state directly here
    }
  }

  async function fetchAndSetListedIdsByAddress(address: string) {
    try {
      const { data, error } = await supabase
        .from("tokenTable")
        .select("listed_id")
        .eq("Address", address)
        .single();

      if (error) {
        console.error("Error fetching listed IDs:", error);
        setListedIds([]); // Set the state directly here
        return;
      }

      if (data && data.listed_id) {
        setListedIds(data.listed_id); // Set the state directly here
      } else {
        console.log(`No tokens found for address ${address}.`);
        setListedIds([]); // Set the state directly here
      }
    } catch (err) {
      console.error("An unexpected error occurred:", err);
      setListedIds([]); // Set the state directly here
    }
  }

  function handleClick() {
    fetchAndSetTokenIdsByAddress(address as string);
    fetchAndSetListedIdsByAddress(address as string);
  }

  // useEffect(() => {
  //   console.log(tokenIds);
  // });

  // const { data, isError, isLoading } = useContractRead({
  //   address: '0x33eBDE06DB11A17a21ef3Db82E0B60aaa901295d',
  //   abi: abii,
  //   functionName: 'getDNSData',
  //   args:[1],
  // })

  return (
    <div className="h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100">
      <Navbar />
      <div className="container mt-8 w-8/12 mx-auto">
        <button
          className="w-1/3 p-2 bg-slate-400 rounded-lg text-white font-semibold"
          onClick={handleClick}
        >
          View my token
        </button>

        <h1 className="mt-8 text-2xl font-semibold">Active Domains</h1>
        <Card className="mt-2 p-4 mx-auto justify-center">
          {tokenIds.map((id) => (
            <TokenData key={id} tokenId={id} />
          ))}
        </Card>

        <h1 className="mt-8 text-2xl font-semibold">Listed</h1>
        <Card className="mt-2 p-4 mx-auto justify-center">
          {listedIds.map((list) => (
            <ListedData key={list} tokenId={list} />
          ))}
        </Card>
      </div>
    </div>
  );
}

////////////////////////////////////////////////////////////////// ACTIVE LISTING
function TokenData({ tokenId }: any) {
  const { data, error, isLoading } = useContractRead({
    // fetch token data
    address: REGISTRY_CONTRACT_ADDRESS,
    abi: abiiRegistry,
    functionName: "getDNSData",
    args: [tokenId],
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data for token {tokenId}</p>;

  return (
    <div>
      <div className="flex flex-row w-full my-4">
        <div className="w-1/2 p-2 bg-transparent">
          <text className="text-lg font-semibold">
            {/* ID: {data?.tokenId?.toString()} */}
            {data?.domainName}
          </text>
        </div>
        <div className="w-1/2 p-2 bg-transparent ml-64">
          <span>
            {/* <button className="w-1/3 p-2 mr-4 bg-slate-400 rounded-lg border-2 text-white font-semibold">
              List
            </button> */}

            <ListModal
              _tokenId={data?.tokenId?.toString()}
              _domainName={data?.domainName}
            />

            <button className="w-1/3 p-2 bg-slate-400 rounded-lg border-2 text-white font-semibold">
              Settings
            </button>
          </span>
        </div>
      </div>
      <Divider colorScheme="gray" className="my-2" />
    </div>
  );
}

function ListModal({_tokenId,_domainName,}: {_tokenId: string; _domainName: string;}) {

  const { isOpen, onOpen, onClose } = useDisclosure();

  const [price, setPrice] = useState<string>("");

  const { config } = usePrepareContractWrite({
    address: LISTING_CONTRACT_ADDRESS,
    abi: abiiListing,
    functionName: "list",
    args: [_tokenId, parseEther(price)],
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  function handleListingFunction() {
    write?.();
    console.log("manual log", data);
  }

  return (
    <>
      <button
        onClick={onOpen}
        className="w-1/3 p-2 mr-4 bg-slate-400 rounded-lg border-2 text-white font-semibold"
      >
        List
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{_domainName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody className=" font-bold text-lg">Price</ModalBody>

          <input
            type="text"
            className="p-3 ml-7 border border-solid h-[40px] w-[200px]"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />

          <ModalFooter className=" gap-6">
            <Button onClick={handleListingFunction} variant="ghost">
              LIST
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}





////////////////////////////////////////////////////////////////// ACTIVE LISTING


////////////////////////////////////////////////////////////////// LISTED LISTING
function ListedData({ tokenId }: any) {
  // fetch listed data
  const {
    data: data2,
    error,
    isLoading,
  } = useContractRead({
    address: REGISTRY_CONTRACT_ADDRESS,
    abi: abiiRegistry,
    functionName: "getDNSData",
    args: [tokenId],
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data for token {tokenId}</p>;

  return (
    <div>
      <div className="flex flex-row w-full my-4">
        <div className="w-1/2 p-2 bg-transparent">
          <text className="text-lg font-semibold">
            {/* ID: {data?.tokenId?.toString()} */}
            {data2?.domainName}
          </text>
        </div>
        <div className="w-1/2 p-2 bg-transparent ml-64">
          <span>
            <button className="w-1/3 p-2 mr-4 bg-slate-400 rounded-lg border-2 text-white font-semibold">
              Delist
            </button>
            <button className="w-1/3 p-2 bg-slate-400 rounded-lg border-2 text-white font-semibold">
              Relist
            </button>
          </span>
        </div>
      </div>
      <Divider colorScheme="gray" className="my-2" />
    </div>
  );
}
////////////////////////////////////////////////////////////////// LISTED LISTING