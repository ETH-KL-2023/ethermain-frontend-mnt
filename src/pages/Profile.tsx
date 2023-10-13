import Navbar from "@/components/Navbar";

export default function Profile() {
  return (
    <div>
        <Navbar/>
      <div className=" h-screen flex justify-center items-center">
        <div className="w-[1000px] h-[700px] bg-gray-200 rounded-xl">
          <div className="h-[300px]">
            <h1 className=" text-xl m-3">Active Domains</h1>
          </div>
          <div className="h-[300px]">
            <h1 className=" text-xl m-3">Listed Domains</h1>
          </div>
        </div>
      </div>
    </div>
  );
}
