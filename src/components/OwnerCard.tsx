import { Card, Divider, Input } from "@chakra-ui/react";

interface Props {
  domainName: string;
  ownerAddress: string;
  expiryDate: string;
}

const OwnerCard = ({ domainName, ownerAddress, expiryDate }: Props) => {
  return (
    <Card className="w-[300px] mt-8 p-4 mx-auto justify-center bg-white shadow-lg rounded-lg">
      <h1 className="text-lg font-semibold text-center justify-center">
        {domainName}
      </h1>
      <Divider colorScheme="gray" className="my-2" />
      <div className="flex mt-1">
        <text className="text-sm text-left font-semibold">Current Owner:</text>
        <text className="ml-2 text-sm text-left font-semibold">{ownerAddress}</text>
      </div>
      <div className="flex mt-1">
        <text className="text-sm text-left font-semibold">Domain Expiry:</text>
        <text className="ml-2 text-sm text-left font-semibold">{expiryDate}</text>
      </div>
    </Card>
  );
};

export default OwnerCard;
