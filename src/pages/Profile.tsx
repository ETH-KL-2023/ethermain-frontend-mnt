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
import { useRouter } from "next/router";

export default function Profile() {
  const { address, isConnecting, isDisconnected } = useAccount();

  // Define a state variable to store the token IDs
  const [tokenIds, setTokenIds] = useState<number[]>([]);
  const [listedIds, setListedIds] = useState<number[]>([]);

  const supabase = getSupabase();

  async function fetchAndSetTokenIdsByAddress(address: string) {
    try {
      const { data, error } = await supabase
        .from("tokenMantle")
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
        .from("tokenMantle")
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
  const router = useRouter();
  const { data, error, isLoading } = useContractRead({
    // fetch token data
    address: REGISTRY_CONTRACT_ADDRESS,
    abi: abiiRegistry,
    functionName: "getDNSData",
    args: [tokenId],
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data for token {tokenId}</p>;

  const goToSettings = () => {
    router.push(`/Settings/${tokenId}`);
  };

  return (
    <div>
      <div className="flex flex-row w-full my-4">
        <div className="flex-row w-1/2 p-2 bg-transparent">
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

            <button
              className="w-1/3 p-2 bg-slate-400 rounded-lg border-2 text-white font-semibold"
              onClick={goToSettings}
            >
              Settings
            </button>
          </span>
        </div>
      </div>
      <Divider colorScheme="gray" className="my-2" />
    </div>
  );
}

function ListModal({
  _tokenId,
  _domainName,
}: {
  _tokenId: any;
  _domainName: string;
}) {
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
    moveTokenToListed(Number(_tokenId));
    console.log("tokenId", _tokenId);
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

const supabase = getSupabase();
async function moveTokenToListed(tokenId: number) {
  // Step 1: Find rows that have the token id in the token_id array
  const { data, error } = await supabase
    .from("tokenMantle")
    .select("*")
    .contains("token_id", [tokenId]);

  if (error) {
    console.error("Error fetching rows:", error);
    return;
  }

  if (!data || data.length === 0) {
    console.log(`No rows found with token id ${tokenId}`);
    return;
  }

  // Step 2: For each row found, update the arrays
  for (const row of data) {
    // Remove the token id from the token_id array
    const updatedTokenIds = row.token_id.filter((id: any) => id !== tokenId);

    // Check if listed_id exists, if not default to an empty array
    const currentListedIds = row.listed_id || [];

    // Add the token id to the listed_id array (if it's not already there)
    const updatedListedIds = currentListedIds.includes(tokenId)
      ? currentListedIds
      : [...currentListedIds, tokenId];

    // Update the row in the database
    const { error: updateError } = await supabase
      .from("tokenMantle")
      .update({
        token_id: updatedTokenIds,
        listed_id: updatedListedIds,
      })
      .eq("id", row.id);

    if (updateError) {
      console.error("Error updating row:", updateError);
    }
  }
}

////////////////////////////////////////////////////////////////// LISTED LISTING
function ListedData({ tokenId }: any) {
  // fetch listed data
  const {
    data: data2,
    error,
    isLoading,
  } = useContractRead({
    address: LISTING_CONTRACT_ADDRESS,
    abi: abiiListing,
    functionName: "getListingData",
    args: [tokenId],
    onError(error) {
      console.log("Error", error);
    },
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error fetching data for token {tokenId}</p>;

  const { config } = usePrepareContractWrite({
    address: LISTING_CONTRACT_ADDRESS,
    abi: abiiListing,
    functionName: "delist",
    args: [tokenId],
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const {
    data: data3,
    isLoading: isLoading3,
    isSuccess,
    write,
  } = useContractWrite(config);

  function handleDeList() {
    write?.();
    moveTokenToTokenId(Number(tokenId));
    console.log("tokenId", tokenId);
    console.log("manual log", data3);
  }

  return (
    <div>
      <div className="flex flex-row w-full my-4">
        <div className="w-1/2 p-2 bg-transparent">
          {data2 && (data2 as any[]).length > 0 ? ( //make sure data ga bole empty, kalo empty di kasi wait
            <>
              <text className="text-lg font-semibold">{data2[2]}</text>
              <span className="m-[30px]"></span>
              <text className="text-lg font-semibold">
                {Number(data2[1]) / 10 ** 18 + " MNT"}
              </text>
            </>
          ) : (
            <text className="text-lg font-semibold">wait</text>
          )}
        </div>

        <div className="w-1/2 p-2 bg-transparent ml-64">
          <span>
            <button
              onClick={handleDeList}
              className="w-1/3 p-2 mr-4 bg-slate-400 rounded-lg border-2 text-white font-semibold"
            >
              Delist
            </button>

            {data2 ? (
              <ReListModal _tokenId={Number(data2[0])} _domainName={data2[2]} />
            ) : (
              <p>Wait...</p>
            )}
          </span>
        </div>
      </div>
      <Divider colorScheme="gray" className="my-2" />
    </div>
  );
}

async function moveTokenToTokenId(tokenId: number) {
  // Step 1: Find rows that have the token id in the listed_id array
  const { data, error } = await supabase
    .from("tokenMantle")
    .select("*")
    .contains("listed_id", [tokenId]);

  if (error) {
    console.error("Error fetching rows:", error);
    return;
  }

  if (!data || data.length === 0) {
    console.log(`No rows found with token id ${tokenId} in listed_id`);
    return;
  }

  // Step 2: For each row found, update the arrays
  for (const row of data) {
    // Remove the token id from the listed_id array
    const updatedListedIds = row.listed_id.filter((id: any) => id !== tokenId);

    // Check if token_id exists, if not default to an empty array
    const currentTokenIds = row.token_id || [];

    // Add the token id to the token_id array (if it's not already there)
    const updatedTokenIds = currentTokenIds.includes(tokenId)
      ? currentTokenIds
      : [...currentTokenIds, tokenId];

    // Update the row in the database
    const { error: updateError } = await supabase
      .from("tokenMantle")
      .update({
        token_id: updatedTokenIds,
        listed_id: updatedListedIds,
      })
      .eq("id", row.id);

    if (updateError) {
      console.error("Error updating row:", updateError);
    }
  }
}

function ReListModal({
  _tokenId,
  _domainName,
}: {
  _tokenId: any;
  _domainName: string;
}) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const [price, setPrice] = useState<string>("");

  const { config } = usePrepareContractWrite({
    address: LISTING_CONTRACT_ADDRESS,
    abi: abiiListing,
    functionName: "relist",
    args: [_tokenId, parseEther(price)],
    onSuccess(data) {
      console.log("Success", data);
    },
  });
  const { data, isLoading, isSuccess, write } = useContractWrite(config);

  function handleListingFunction() {
    write?.();
    moveTokenToListed(Number(_tokenId));
    console.log("tokenId", _tokenId);
    console.log("manual log", data);
  }

  return (
    <>
      <button
        onClick={onOpen}
        className="w-1/3 p-2 mr-4 bg-slate-400 rounded-lg border-2 text-white font-semibold"
      >
        ReList
      </button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>{_domainName}</ModalHeader>
          <ModalCloseButton />
          <ModalBody className=" font-bold text-lg">Relist Price</ModalBody>

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
