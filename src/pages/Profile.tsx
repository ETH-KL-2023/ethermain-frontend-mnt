import { useAccount, useContractRead } from "wagmi";
import abii from "../../abii.json";
import { getSupabase } from "@/shared/utils";
import { useEffect, useState } from "react";
import Navbar from "@/components/Navbar";

export default function Profile() {
  const { address, isConnecting, isDisconnected } = useAccount();
  // Define a state variable to store the token IDs
  const [tokenIds, setTokenIds] = useState<number[]>([]);

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

  function handleclick() {
    fetchAndSetTokenIdsByAddress(address as string);
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
    <div>
      <Navbar></Navbar>
      <button onClick={handleClick}>View my token</button>
      <br />
      <br />

      <div className="h-[300px] w-[700px] bg-amber-300 rounded-xl">
        <h1>Active Domain</h1>
        {tokenIds.map((id) => (
          <TokenData key={id} tokenId={id} />
        ))}
      </div>

      <br />
      <br />

      <div className="h-[300px] w-[700px] bg-amber-300 rounded-xl">
        <h1>listed</h1>

      </div>
    </div>
  );
}


function TokenData({ tokenId }: any) {
  const { data, error, isLoading } = useContractRead({
    address: "0x6A9898DFe2c89A1cc5e4373a99eD59447560c946",
    abi: abii,
    functionName: "getDNSData",
    args: [tokenId],
  });

  if (isLoading) return <p>Loading...</p>;
  if (error) return <p>Error fetching data for token {tokenId}</p>;

  return (
    <div className="h-[50px] w-[400px] bg-red-600 rounded-xl my-[20px]">
      <p>ID: {data?.tokenId?.toString()} Name: {data?.domainName} </p>
    </div>
  );
}
