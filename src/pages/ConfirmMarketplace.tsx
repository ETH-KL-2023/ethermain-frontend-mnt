import Navbar from "@/components/Navbar";
import { Button, Card, Divider, Input } from "@chakra-ui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, JSX, SVGProps, useEffect, useRef, useState } from "react";
import DropdownButton from "@/components/DropdownButton";

function ConfirmMarketplace() {
  const [subtotalPrice, setSubtotalPrice] = useState(0.15);

  return (
    <div className="h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100">
      <Navbar />
      <div className="mt-8 w-1/2 mx-auto items-center justify-center">
        <h1 className="text-4xl font-semibold">Confirm Purchase</h1>
        <Card className="mt-8 p-8 mx-auto justify-center">
          <h1 className="text-2xl font-semibold text-center justify-center">
            gavincool.emn
          </h1>
          <Divider colorScheme="gray" className="my-4" />
          <div className="flex mt-2">
            <h1 className="text-lg text-left font-semibold">
              Current Owner:
            </h1>
            <text className="ml-2 text-lg text-left font-semibold">0xui7awjk89awd</text>
          </div>
          <div className="flex mt-2">
            <h1 className="text-lg text-left font-semibold">
              Listed Price:
            </h1>
            <text className="ml-2 text-lg text-left font-semibold">0.15 ETH</text>
          </div>
          <div className="flex mt-2">
            <h1 className="text-lg text-left font-semibold">
              Domain Expiry:
            </h1>
            <text className="ml-2 text-lg text-left font-semibold">13/10/25</text>
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
            <Button colorScheme="blackAlpha" variant="solid" className="w-1/2">
              Buy Now
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ConfirmMarketplace;
