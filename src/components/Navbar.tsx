import { ConnectButton } from "@rainbow-me/rainbowkit";
import Link from "next/link";
import router, { useRouter } from "next/router";
import { useAccount } from "wagmi";

const Navbar = () => {
  const handleHomeRoute = () => {
    router.push("/");
  };
  const handleRegisterRoute = () => {
    router.push("/RegisterDomain");
  };
  const handleMarketplaceRoute = () => {
    router.push("/Marketplace");
  };
  const handleProfileRoute = () => {
    router.push("/Profile");
  };

  return (
    <div className="h-[70px] flex justify-between items-center bg-gradient-to-r from-blue-100 via-pink-100 to-purple-100">
      <Link href={"/"} className="ml-[30px]">
        {/* <Image src={logo} alt="" width={130} height={100} /> */}
      </Link>
      <div className="flex items-center gap-4 mr-[30px]">
        <button
          className="w-[100px] bg-green-main hover:bg-green-main text-black font-semibold py-2 px-4 rounded-full"
          onClick={handleHomeRoute}
        >
          Home
        </button>
        <button
          className="w-[180px] bg-green-main hover:bg-green-main text-black font-semibold py-2 px-4 rounded-full"
          onClick={handleRegisterRoute}
        >
          Register a Domain
        </button>

        <button
          className="w-[130px] bg-green-main hover:bg-green-main text-black font-semibold py-2 px-4 rounded-full"
          onClick={handleMarketplaceRoute}
        >
          Marketplace
        </button>
        <button
          className="w-[100px] bg-green-main hover:bg-green-main text-black font-semibold py-2 px-4 rounded-full"
          onClick={handleProfileRoute}
        >
          Profile
        </button>
        <ConnectButton />
      </div>
    </div>
  );
};

export default Navbar;
