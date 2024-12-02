import { Avatar } from "@chakra-ui/avatar";
import { Image } from "@chakra-ui/react";
import { PATH } from "constant";
import { useAuth } from "hooks";
import { MdKeyboardDoubleArrowDown } from "react-icons/md";
import { useNavigate } from "react-router-dom";

export const LeftSideBar = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="w-[22.5rem] h-auto py-4">
      <ul className="w-full text-gray-600 cursor-pointer ">
        <li className="h-12 mb-2 flex items-center justify-content space-x-2 p-2 rounded-md">
          <div
            className="flex items-center mb-4 rounded-md p-2 cursor-pointer"
            onClick={() => navigate(PATH.account)}
          >
            <Avatar size="sm" src="https://random.imagecdn.app/250/250" />
            <div className="whitespace-nowrap ml-2 font-medium">
              {user?.fullname}
            </div>
          </div>
        </li>
        <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
          <div className="flex items-center mb-4 rounded-md p-2 cursor-pointer">
            <Image
              src="/images/friend.png"
              alt="#"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div className="whitespace-nowrap font-semibold">Friends</div>
          </div>
        </li>
        <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
          <div className="flex items-center mb-4 rounded-md p-2 cursor-pointer">
            <Image
              src="/images/group.png"
              alt="#"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div className="whitespace-nowrap font-semibold">Groups</div>
          </div>
        </li>
        <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
          <div className="flex items-center mb-4 rounded-md p-2 cursor-pointer">
            <Image
              src="/images/save.jpg"
              alt="#"
              className="w-8 h-7 rounded-full mr-2"
            />
            <div
              className="whitespace-nowrap font-semibold"
              onClick={() => navigate(PATH.saved)}
            >
              Saved
            </div>
          </div>
        </li>
        <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
          <div className="flex items-center mb-4 rounded-md p-2 cursor-pointer">
            <Image
              src="/images/memorie.jpg"
              alt="#"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div className="whitespace-nowrap font-semibold">Memories</div>
          </div>
        </li>
        <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
          <div className="flex items-center mb-4 rounded-md p-2 cursor-pointer">
            <Image
              src="/images/video.png"
              alt="#"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div className="whitespace-nowrap font-semibold">Video</div>
          </div>
        </li>
        <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
          <div className="flex items-center mb-4 rounded-md p-2 cursor-pointer">
            <Image
              src="/images/marketplace.png"
              alt="#"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div className="whitespace-nowrap font-semibold">Marketplace</div>
          </div>
        </li>
        <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
          <div className="flex items-center mb-4 rounded-md p-2 cursor-pointer">
            <Image
              src="/images/event.png"
              alt="#"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div className="whitespace-nowrap font-semibold">Events</div>
          </div>
        </li>
        <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
          <div className="flex items-center mb-4 rounded-md p-2 cursor-pointer">
            <Image
              src="/images/frundaiser.png"
              alt="#"
              className="w-8 h-8 rounded-full mr-2"
            />
            <div className="whitespace-nowrap font-semibold">Frundaisers</div>
          </div>
        </li>
        <li className="h-12 mb-2 flex items-center justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
          <div className="flex items-center mb-4 rounded-md p-2 cursor-pointer">
            <MdKeyboardDoubleArrowDown className="w-8 h-8 rounded-full mr-2" />
            <div className="whitespace-nowrap font-semibold">See More</div>
          </div>
        </li>
      </ul>
    </div>
  );
};
