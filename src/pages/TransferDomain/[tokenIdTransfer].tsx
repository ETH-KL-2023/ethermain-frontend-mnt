import Navbar from "@/components/Navbar";
import { Button, Card, Divider, Input } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { Fragment, JSX, SVGProps, useEffect, useRef, useState } from "react";

function TransferDomain () {
  const router = useRouter();
  const { tokenIdTransfer } = router.query;
  
  const [subtotalPrice, setSubtotalPrice] = useState(0.15);

  return (
    <div className="h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100">
      <Navbar />
      <div className="mt-8 w-1/2 mx-auto items-center justify-center">
        <h1 className="text-4xl font-semibold">Transfer Domain</h1>
        <Card className="mt-8 p-8 mx-auto justify-center">
          <h1 className="text-2xl font-semibold text-center justify-center">
            gavincool.emn
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
            />
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

export default TransferDomain;
