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
  const [searchValue, setSearchValue] = useState("");
  const [inputValue, setInputValue] = useState("");
  const [searchButtonClicked, setSearchButtonClicked] = useState(false);
  const [showOwner1, setShowOwner1] = useState(false);
  const [showOwner2, setShowOwner2] = useState(false);
  const [showOwner3, setShowOwner3] = useState(false);
  const [showOwner4, setShowOwner4] = useState(false);

  const router = useRouter();

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setInputValue(inputValue);
  };

  const handleSearchButtonClick = () => {
    setSearchValue(inputValue);
    setSearchButtonClicked(true);
  };

  const handleETHButtonClick = () => {
    router.push(`/ConfirmMarketplace/${searchValue}`);
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
        {searchButtonClicked == true && (
          <Card className="w-7/12 mt-8 p-8 mx-auto justify-center" variant="">
            <h1 className="text-2xl font-semibold text-center justify-center">
              EXACT MATCH
            </h1>
            <div className="flex mt-8">
              <h1 className="ml-4 text-lg text-left font-semibold mr-4 mt-1">
              {searchValue + ".emn"}
              </h1>
              <div className="relative inline-block mr-24">
                <button
                  onMouseEnter={() => setShowOwner1(true)}
                  onMouseLeave={() => setShowOwner1(false)}
                >
                  <BsFillPersonFill className="text-3xl text-black mr-16" />
                </button>
                {showOwner1 && (
                  <div className="absolute z-10 top-0 left-0 -mt-44 -ml-16">
                    <OwnerCard
                      domainName={searchValue + ".emn"}
                      ownerAddress="0xui7awjk89awd"
                      expiryDate="13/10/2025"
                    />
                  </div>
                )}
              </div>
              <button
                className="w-1/6 ml-64 px-3 p-2 text-md font-medium text-white text-center bg-slate-500 rounded-lg"
                onClick={handleETHButtonClick}
              >
                0.015 ETH
              </button>
            </div>
            <Divider colorScheme="gray" className="my-4 mb-32" />
            <h1 className="text-2xl font-semibold text-center justify-center">
              RECOMMENDATION
            </h1>
            <div className="flex mt-8">
              <h1 className="ml-4 text-lg text-left font-semibold mr-4 mt-1">
              {searchValue.replace("cool", "smart") + ".emn"}
              </h1>
              <div className="relative inline-block mr-20">
                <button
                  onMouseEnter={() => setShowOwner2(true)}
                  onMouseLeave={() => setShowOwner2(false)}
                >
                  <BsFillPersonFill className="text-3xl text-black mr-16" />
                </button>
                {showOwner2 && (
                  <div className="absolute z-10 top-0 left-0 -mt-44 -ml-16">
                    <OwnerCard
                      domainName={searchValue.replace("cool", "smart") + ".emn"}
                      ownerAddress="0xu0dfyt78shwkl"
                      expiryDate="07/05/2025"
                    />
                  </div>
                )}
              </div>
              <button
                className="w-1/6 ml-64 px-3 p-2 text-md font-medium text-white text-center bg-slate-500 rounded-lg"
              >
                0.08 ETH
              </button>
            </div>
            <Divider colorScheme="gray" className="my-4" />
            <div className="flex">
              <h1 className="ml-4 text-lg text-left font-semibold mr-3 mt-1">
              {"0x" + searchValue.replace("cool", "") + ".emn"}
              </h1>
              <div className="relative inline-block mr-28">
                <button
                  onMouseEnter={() => setShowOwner3(true)}
                  onMouseLeave={() => setShowOwner3(false)}
                >
                  <BsFillPersonFill className="text-3xl text-black mr-16" />
                </button>
                {showOwner3 && (
                  <div className="absolute z-10 top-0 left-0 -mt-44 -ml-16">
                    <OwnerCard
                      domainName={"0x" + searchValue.replace("cool", "") + ".emn"}
                      ownerAddress="0xui892hfalwhdoq0"
                      expiryDate="28/07/2025"
                    />
                  </div>
                )}
              </div>
              <button
                className="w-1/6 ml-64 px-3 p-2 text-md font-medium text-white text-center bg-slate-500 rounded-lg"
              >
                0.25 ETH
              </button>
            </div>
            <Divider colorScheme="gray" className="my-4" />
            <div className="flex">
              <h1 className="ml-4 text-lg text-left font-semibold mr-5 mt-1">
              {searchValue.replace("cool", "xyz") + ".emn"}
              </h1>
              <div className="relative inline-block mr-24">
                <button
                  onMouseEnter={() => setShowOwner4(true)}
                  onMouseLeave={() => setShowOwner4(false)}
                >
                  <BsFillPersonFill className="text-3xl text-black mr-16" />
                </button>
                {showOwner4 && (
                  <div className="absolute z-10 top-0 left-0 -mt-44 -ml-16">
                    <OwnerCard
                      domainName={searchValue.replace("cool", "xyz") + ".emn"}
                      ownerAddress="0xu769ghgk89hpp"
                      expiryDate="19/10/2024"
                    />
                  </div>
                )}
              </div>
              <button
                className="w-1/6 ml-64 px-3 p-2 text-md font-medium text-white text-center bg-slate-500 rounded-lg"
              >
                0.19 ETH
              </button>
            </div>
            <Divider colorScheme="gray" className="my-4" />
          </Card>
        )}
      </div>
    </div>
  );
}

export default RegisterDomain;
