import { FaBell } from "react-icons/fa";
import { useAuth } from "hooks";
import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { Popover, Image } from "@chakra-ui/react";
import {
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { PiDotsNineBold } from "react-icons/pi";
import { HiOutlineXMark } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

export const HeaderStories = () => {
  const { user } = useAuth();
  const navigate = useNavigate();

  const handleNavigateHome = () => {
    navigate("/");
  };
  return (
    <form>
      <div className="p-4 flex items-center justify-between border-b lg:px-10 ">
        <div className="flex items-center mr-4 space-x-4">
          <button
            className="w-10 h-10 bg-gray-200 focus:outline-none hover:bg-gray-300 rounded-full flex items-center justify-center"
            onClick={handleNavigateHome}
          >
            <HiOutlineXMark className="text-4xl" />
          </button>
          <div className="w-10 h-10 sm:h-10 sm:w-10">
            <Image src="/images/logo.png" alt="#" />
          </div>
        </div>
        <div className="flex space-x-5 items-center ml-4">
          <div className="col-span-2 flex items-center justify-end">
            <div className="h-10 w-auto flex items-center space-x-3 pr-2 ">
              <button className="w-10 h-10 bg-gray-200 focus:outline-none hover:bg-gray-300 rounded-full">
                <PiDotsNineBold className="ml-3" />
              </button>
              <button className="w-10 h-10 bg-gray-200 focus:outline-none hover:bg-gray-300 rounded-full">
                <FaBell className="ml-3" />
              </button>
              <Popover>
                <PopoverTrigger>
                  <Avatar boxSize="9" src="https://random.imagecdn.app/250/250">
                    <AvatarBadge boxSize="0.75em" bg="green.500" />
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent maxWidth="150px" maxHeight="100px">
                  <PopoverArrow />
                  <PopoverHeader className="text-center">
                    {user?.fullname}
                  </PopoverHeader>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
