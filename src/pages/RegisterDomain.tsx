import DropdownButton from "@/components/DropdownButton";
import Navbar from "@/components/Navbar";
import { words } from "@/data/SearchData";
import { Card, Divider, Button, Input } from "@chakra-ui/react";
import { useState } from "react";
import { AiOutlineSearch } from "react-icons/ai";
import { BsFillPersonFill } from "react-icons/bs";
import { useRouter } from "next/router";
import OwnerCard from "@/components/OwnerCard";

function RegisterDomain() {
  const [activeSearch, setActiveSearch] = useState<string[]>([]);
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [showOwner1, setShowOwner1] = useState(false);
  const [showOwner2, setShowOwner2] = useState(false);

  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    if (inputValue.length < 3) {
      setActiveSearch([]);
      return false;
    } else {
      setActiveSearch(
        words.filter((w) => w.includes(e.target.value)).slice(0, 4)
      );
    }
  };

  const handleSearchButtonClick = () => {
    setSearchButtonClicked(true);
  };

  const handleRegisterButtonClick = () => {
    router.push("/ConfirmRegistration");
  };

  const handleBuyButtonClick = () => {
    router.push("/Marketplace");
  };

  return (
    <div className="h-screen bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100">
      <Navbar />
      <div className="w-full flex flex-col items-center justify-center">
        <div className="w-full mt-4 flex items-center justify-center">
          <input
            type="search"
            placeholder="Enter your domain here..."
            className="w-1/2 mx-0 p-4 rounded-lg items-center border-2 border-slate-400 bg-transparent relative"
            onChange={(e) => handleSearch(e)}
          />
          <button
            className="bg-transparent rounded-full p-4"
            onClick={handleSearchButtonClick}
          >
            <AiOutlineSearch className="text-3xl text-slate-400" />
          </button>
        </div>
        {activeSearch.length > 0 && (
          <div className="w-1/2 mt-2 mr-16 p-4 bg-transparent text-black border-2 border-slate-400 rounded-xl flex flex-col gap-2">
            {activeSearch.map((s, index) => (
              <span key={index} className="pb-2 border-b border-gray-300">
                {s}
              </span>
            ))}
          </div>
        )}
        {searchButtonClicked == true && (
          <Card className="w-7/12 mt-8 p-8 mx-auto justify-center" variant="">
            <h1 className="text-2xl font-semibold text-center justify-center">
              UNAVAILABLE
            </h1>
            <div className="flex mt-8">
              <h1 className="ml-4 text-lg text-left font-semibold mr-4 mt-1">
                gavin.emn
              </h1>
              <div className="relative inline-block">
                <button
                  onMouseEnter={() => setShowOwner1(true)}
                  onMouseLeave={() => setShowOwner1(false)}
                >
                  <BsFillPersonFill className="text-3xl text-black mr-16" />
                </button>
                {showOwner1 && (
                  <div className="absolute z-10 top-0 left-0 -mt-44 -ml-16">
                    <OwnerCard
                      domainName="gavin.emn"
                      ownerAddress="0xawfj90jf0aw9h03"
                      expiryDate="13/10/2024"
                    />
                  </div>
                )}
              </div>
              <Input
                className="w-1/6 ml-96 text-sm font-medium text-center"
                htmlSize={8}
                width="auto"
                variant="filled"
                placeholder="Not Listed"
                readOnly
              />
            </div>
            <Divider colorScheme="gray" className="my-4 mb-32" />
            <h1 className="text-2xl font-semibold text-center justify-center">
              AVAILABLE
            </h1>
            <div className="flex mt-8">
              <h1 className="ml-4 text-lg text-left font-semibold mr-20 mt-1">
                gavin123.emn
              </h1>
              <button
                className="w-1/6 ml-96 px-3 p-2 text-md font-medium text-white text-center bg-slate-500 rounded-lg"
                onClick={handleRegisterButtonClick}
              >
                Register Now
              </button>
            </div>
            <Divider colorScheme="gray" className="my-4" />
            <div className="flex mt-8">
              <h1 className="ml-4 text-lg text-left font-semibold mr-4 mt-1">
                gavincool.emn
              </h1>
              <div className="relative inline-block">
                <button
                  onMouseEnter={() => setShowOwner2(true)}
                  onMouseLeave={() => setShowOwner2(false)}
                >
                  <BsFillPersonFill className="text-3xl text-black mr-7" />
                </button>
                {showOwner2 && (
                  <div className="absolute z-10 top-0 left-0 -mt-44 -ml-16">
                    <OwnerCard
                      domainName="gavincool.emn"
                      ownerAddress="0xui7awjk89awd"
                      expiryDate="13/10/2025"
                    />
                  </div>
                )}
              </div>
              <button
                className="w-1/6 ml-96 px-3 p-2 text-md font-medium text-white text-center bg-slate-500 rounded-lg"
                onClick={handleBuyButtonClick}
              >
                Buy Now
              </button>
            </div>
          </Card>
        )}
      </div>
    </div>
  );
}

export default RegisterDomain;
