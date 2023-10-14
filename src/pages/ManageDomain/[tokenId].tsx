import DropdownButtonProfile from "@/components/DropdownButtonProfile";
import Navbar from "@/components/Navbar";
import { Button, Card, Divider, Input } from "@chakra-ui/react";
import { Fragment, JSX, SVGProps, useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useContractWrite, useContractRead, usePrepareContractWrite } from "wagmi";

import { REGISTRY_CONTRACT_ADDRESS } from "../../../globalvar";
import abiiRegistry from "../../../abiiRegistry.json";

function ManageDomain() {
  const router = useRouter();
  const { tokenId } = router.query;

  const [selectedItemAlgo, setSelectedItemAlgo] = useState("13: ECDSA/P256/SHA256");
  const [selectedItemDigest, setSelectedItemDigest] = useState("2: SHA256");

  const [dns1, setDns1] = useState("roxy.ns.cloudflare.com");
  const [dns2, setDns2] = useState("will.ns.cloudflare.com");
  const [keyTag, setKeyTag] = useState("2371");
  const [digest, setDigest] = useState("2089c5c7aa8...fd3fd23cf7");

  const handleAlgoChange = (newDuration: any) => {
    setSelectedItemAlgo(newDuration);
  };

  const handleDigestChange = (newDuration: any) => {
    setSelectedItemDigest(newDuration);
  };

  //Set DATA in DNS registry
  //GET domain name from tokenid
  const { data:dnsData, error:error1, isLoading:loading2} = useContractRead({
    // fetch token data
    address: REGISTRY_CONTRACT_ADDRESS,
    abi: abiiRegistry,
    functionName: "registry",
    args: [tokenId],
  });
  
//   console.log(dnsData)
    //check dns data
    //if empty set default value
    //else set value from dns data
  useEffect(() => {
    if (Array.isArray(dnsData)){
        // [4]  dns1,
        if(dnsData[4]!=0){
            setDns1(dnsData[4]);
        }
        // [5]  dns2,
        if(dnsData[5]!=0){
            setDns2(dnsData[5]);
        }
        // [6]  keyTag,
        if(dnsData[6]!=0){
            setKeyTag(dnsData[6]);
        }
        // [7]  selectedItemAlgo//algo
        if(dnsData[7]!=0){
            setSelectedItemAlgo(dnsData[7]);
        }
        // [8]  selectedItemDigest//digestType
        if(dnsData[8]!=0){
            setSelectedItemDigest(dnsData[8]);
        }
        // [9]  digest
        if(dnsData[9]!=0){
            setDigest(dnsData[9]);
        }
    }
    }, [dnsData]); 
 


  //GET domain name from tokenid
  const { data:data1, error, isLoading:loading1 } = useContractRead({
    // fetch token data
    address: REGISTRY_CONTRACT_ADDRESS,
    abi: abiiRegistry,
    functionName: "getDNSData",
    args: [tokenId],
  });


  //updateDNSData dns Data from tokenid
    const { config } = usePrepareContractWrite({
        address: REGISTRY_CONTRACT_ADDRESS,
        abi: abiiRegistry,
        functionName: "updateDNSData",
        args: [tokenId, 
            dns1,
            dns2,
            keyTag,
            selectedItemAlgo,//algo
            selectedItemDigest,//digestType
            digest,],
        onError(error) {
        console.log("Error", error);
        },
        onSuccess(data) {
        console.log("Success", data);
        },
    });
    const { data, isLoading, isSuccess, write } = useContractWrite(config);

    function writeDNSData(){
      write?.();
      console.log("Update DNS data successful", data); 
    }

    if (loading1||loading2) return <p>Loading...</p>;
    if (error||error1) return <p>Error fetching data for token {tokenId}</p>;

  return (
    <div className="h-full bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100">
        <Navbar />
        <div className="mt-8 w-1/2 mx-auto items-center justify-center">
            <h1 className="text-4xl font-semibold">Manage DNS</h1>
            <Card className="mt-8 p-8 mx-auto justify-center">
                <h1 className="text-2xl font-semibold text-center justify-center">
                    {(data1 as { domainName: string })?.domainName}
                </h1>
                <Divider colorScheme="gray" className="my-4" />
                <h1 className="mx-2 text-2xl font-semibold mb-2">Nameservers:</h1>
                <div className="flex flex-row w-full my-1">
                    <div className="w-1/4 p-2 bg-transparent">
                        <h1 className="text-lg text-left font-semibold mr-4 mt-1">
                            NS1:
                        </h1>
            </div>
            <div className="w-3/4 p-2 bg-transparent">
              <Input
                className="text-sm font-medium text-right"
                htmlSize={50}
                width="auto"
                variant="outline"
                borderColor="gray"
                placeholder="Enter DNS1 here..."
                value={dns1}
                onChange={(e) => setDns1(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row w-full my-1">
            <div className="w-1/4 p-2 bg-transparent">
              <h1 className="text-lg text-left font-semibold mr-4 mt-1">
                NS2:
              </h1>
            </div>
            <div className="w-3/4 p-2 bg-transparent">
              <Input
                className="text-sm font-medium text-right"
                htmlSize={50}
                width="auto"
                variant="outline"
                borderColor="gray"
                placeholder="Enter DNS2 here..."
                value={dns2}
                onChange={(e) => setDns2(e.target.value)}
              />
            </div>
          </div>
          <Divider colorScheme="gray" className="my-4" />
          <h1 className="mx-2 text-2xl font-semibold mb-2">
            DS Records (DNSSEC):
          </h1>
          <div className="flex flex-row w-full my-1">
            <div className="w-1/4 p-2 bg-transparent">
              <h1 className="text-lg text-left font-semibold mr-4 mt-1">
                Key Tag:
              </h1>
            </div>
            <div className="w-3/4 p-2 bg-transparent">
              <Input
                className="text-sm font-medium text-right"
                htmlSize={50}
                width="auto"
                variant="outline"
                borderColor="gray"
                placeholder="Enter DNS1 here..."
                value={keyTag}
                onChange={(e) => setKeyTag(e.target.value)}
              />
            </div>
          </div>
          <div className="flex flex-row w-full my-1">
            <div className="w-1/4 p-2 bg-transparent">
              <h1 className="text-lg text-left font-semibold mr-4 mt-1">
                Algorithm:
              </h1>
            </div>
            <div className="w-3/4 p-2 bg-transparent">
              <DropdownButtonProfile
                values={[
                  "13: ECDSA/P256/SHA256",
                  "5: RSA/SHA-1",
                  "6: DSA-NSEC3-SHA1",
                  "16: ED448",
                ]}
                defaultValue={selectedItemAlgo}
                onDurationChange={handleAlgoChange}
              />
            </div>
          </div>
          <div className="flex flex-row w-full my-1">
            <div className="w-1/4 p-2 bg-transparent">
              <h1 className="text-lg text-left font-semibold mr-4 mt-1">
                Digest Type:
              </h1>
            </div>
            <div className="w-3/4 p-2 bg-transparent">
              <DropdownButtonProfile
                values={[
                  "2: SHA256",
                  "1: SHA-1",
                ]}
                defaultValue={selectedItemDigest}
                onDurationChange={handleDigestChange}
              />
            </div>
          </div>
          <div className="flex flex-row w-full my-1">
            <div className="w-1/4 p-2 bg-transparent">
              <h1 className="text-lg text-left font-semibold mr-4 mt-1">
                Digest:
              </h1>
            </div>
            <div className="w-3/4 p-2 bg-transparent">
              <Input
                className="text-sm font-medium text-right"
                htmlSize={50}
                width="auto"
                variant="outline"
                borderColor="gray"
                placeholder="Enter digest here..."
                value={digest}
                onChange={(e) => setDigest(e.target.value)}
              />
            </div>
          </div>
          <Divider colorScheme="gray" className="my-4" />
          <div className="flex justify-center mt-10">
            <Button colorScheme="blackAlpha" variant="solid" className="w-1/2"
            onClick={writeDNSData}
            >
              Update
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ManageDomain;
