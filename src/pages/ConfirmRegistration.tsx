import Navbar from "@/components/Navbar";
import { Button, Card, Divider, Input } from "@chakra-ui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, JSX, SVGProps, useEffect, useRef, useState } from "react";
import DropdownButton from "@/components/DropdownButton";

function ConfirmRegistration() {
  const [selectedItem, setSelectedItem] = useState("Duration");
  const [price, setPrice] = useState(0);
  const [registrarPrice, setRegistrarPrice] = useState(0.005);
  const [subtotalPrice, setSubtotalPrice] = useState(0.005);

  useEffect(() => {
    const TotalPrice = price + registrarPrice;
    const formattedTotalPrice = TotalPrice.toFixed(3);

    setSubtotalPrice(parseFloat(formattedTotalPrice));
  }, [price, registrarPrice]);

  const handleDurationChange = (newDuration: any) => {
    setSelectedItem(newDuration);

    // Update the price based on the selected duration
    switch (newDuration) {
      case "30 day":
        setPrice(0.01);
        break;
      case "90 day":
        setPrice(0.02);
        break;
      case "365 day":
        setPrice(0.05);
        break;
      case "720 day":
        setPrice(0.1);
        break;
      default:
        setPrice(0); // Set a default price
    }
  };

  const handlePriceChange = (newPrice: any) => {
    setPrice(parseFloat(newPrice));
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100">
      <Navbar />
      <div className="mt-8 w-1/2 mx-auto items-center justify-center">
        <h1 className="text-4xl font-semibold">Confirm Registration</h1>
        <Card className="mt-8 p-8 mx-auto justify-center">
          <h1 className="text-2xl font-semibold text-center justify-center">
            gavin123.emn
          </h1>
          <Divider colorScheme="gray" className="my-4" />
          <div className="flex">
            <h1 className="text-lg text-left font-semibold mr-8 mt-1">
              Set Duration:
            </h1>
            <DropdownButton
              values={["30 day", "90 day", "365 day", "720 day"]}
              defaultValue={selectedItem}
              onDurationChange={handleDurationChange}
            />
          </div>
          <div className="flex mt-8">
            <h1 className="text-lg text-left font-semibold mr-8 mt-1">
              Duration Price:
            </h1>
            <Input
              className="ml-[359px] text-sm font-medium text-center"
              htmlSize={8}
              width="auto"
              variant="filled"
              value={`${price} ETH`}
              onChange={(e) => handlePriceChange(e.target.value)}
              readOnly
            />
          </div>
          <Divider colorScheme="gray" className="my-4" />
          <div className="flex mt-2">
            <h1 className="mt-2 text-lg text-left font-semibold">
              Registrar Fee:
            </h1>
            <Input
              className="ml-[30px] text-sm font-medium text-center"
              htmlSize={9}
              width="auto"
              variant="filled"
              value={`${registrarPrice} ETH`}
              readOnly
            />
          </div>
          <div className="flex mt-4">
            <h1 className="mt-2 text-lg text-left font-semibold">
              Domain Expiry:
            </h1>
            <Input
              className="ml-[20px] text-sm font-medium text-center"
              htmlSize={9}
              width="auto"
              variant="filled"
              value="dd/mm/yy"
              readOnly
            />
          </div>
          <Divider colorScheme="gray" className="my-4" />
          <div className="flex mt-2 mb-8">
            <h1 className="ml-96 mt-2 text-lg text-left font-semibold">
              Subtotal:
            </h1>
            <Input
              className="ml-12 text-sm font-medium text-center"
              htmlSize={9}
              width="auto"
              variant="filled"
              value={`${subtotalPrice} ETH`}
              readOnly
            />
          </div>
          <div className="flex justify-center mt-6">
            <Button colorScheme="blackAlpha" variant="solid" className="w-1/2">
              Register Domain
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}

export default ConfirmRegistration;
