import { Button, Divider, Image } from "@chakra-ui/react";
import { IoSettingsSharp } from "react-icons/io5";
import { TfiGallery } from "react-icons/tfi";
import { TbLetterW } from "react-icons/tb";
import { FaPlus } from "react-icons/fa6";

export const LeftSideSaved = () => {
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-black">Saved</h1>
        <IoSettingsSharp className="text-xl" />
      </div>
      <div className="flex items-center rounded-full space-x-4">
        <div className="bg-blue-500 p-1.5 rounded-full flex items-center justify-center">
          <TfiGallery className="w-6 h-6 text-white" />
        </div>
        <div className="whitespace-nowrap font-semibold ">Saved Items</div>
      </div>
      <Divider className="mt-5" />
      <h1 className="text-lg font-semibold text-gray-900 mt-2">
        My collections
      </h1>
      <div className="flex items-center rounded-full space-x-4 mt-2">
        <div className="bg-blue-500 p-1.5 rounded-lg flex items-center justify-center">
          <TbLetterW className="w-6 h-6 text-white" />
        </div>
        <div className="whitespace-nowrap font-semibold ">Wishlist</div>
      </div>
      <div className="flex items-center space-x-4 mt-3 rounded-lg">
        <div className=" flex items-center justify-center">
          <Image
            className="w-9 h-9 "
            src="https://random.imagecdn.app/250/250"
            alt="#"
          />
        </div>
        <div className="whitespace-nowrap font-semibold ">Some Things</div>
      </div>
      <Button colorScheme="gray" className="w-full mt-4">
        <FaPlus className="mr-2" color="blue" />
        <p className="text-blue-700">Create New Collection</p>
      </Button>
    </div>
  );
};
