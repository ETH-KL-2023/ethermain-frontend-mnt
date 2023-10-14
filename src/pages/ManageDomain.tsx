import DropdownButtonProfile from "@/components/DropdownButtonProfile";
import Navbar from "@/components/Navbar";
import { Button, Card, Divider, Input } from "@chakra-ui/react";
import { Fragment, JSX, SVGProps, useEffect, useRef, useState } from "react";

function ManageDomain() {
  const [selectedItemAlgo, setSelectedItemAlgo] = useState("13: ECDSA/P256/SHA256");

  const handleAlgoChange = (newDuration: any) => {
    setSelectedItemAlgo(newDuration);
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100">
      <Navbar />
      <div className="mt-8 w-1/2 mx-auto items-center justify-center">
        <h1 className="text-4xl font-semibold">Manage DNS</h1>
        <Card className="mt-8 p-8 mx-auto justify-center">
          <h1 className="text-2xl font-semibold text-center justify-center">
            gavincool.emn
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
                value="roxy.ns.cloudflare.com"
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
                value="will.ns.cloudflare.com"
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
                value="2371"
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
          <div className="flex justify-center mt-14">
            <Button colorScheme="blackAlpha" variant="solid" className="w-1/2">
              Transfer Domain
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ManageDomain;
