import { FaBell, FaFacebookMessenger, FaStore } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { IoGameControllerOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { MdHome, MdOutlineOndemandVideo } from "react-icons/md";
import { Link, useLocation} from "react-router-dom";
import { useAuth } from "hooks";
import { Avatar, AvatarBadge } from "@chakra-ui/avatar";
import { Popover } from "@chakra-ui/react";
import { Image } from "@chakra-ui/react";
import {
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
} from "@chakra-ui/react";
import { useAppDispatch } from "store";
import { authServiceActions } from "store/authService";

export const Header = () => {

  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const location = useLocation();
  const pathName = location?.pathname.split("/")[1];
  const isActive = pathName === "" || pathName === undefined;

  return (
    <form>
      <div className="p-4 flex items-center justify-between border-b lg:px-10 ">
        {/* Left */}
        <div className="flex items-center mr-4">
          <div className="w-10 h-10 sm:h-10 sm:w-10">
            <Image src="/images/logo.png" alt="#" />
          </div>
          <div className="flex items-center bg-gray-200 rounded-full p-3 pl-5 ml-3 ">
            <input
              type="text"
              placeholder="Search Facebook"
              className="bg-transparent focus:outline-none placeholder-gray-500 text-sm w-full"
            />
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-gray-500 mr-2"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="2"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>
        <div className="col-span-3 flex items-center justify-center space-x-2">
          <Link
            to="/"
            className="relative group w-24 h-12 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100"
          >
            <div className="w-14 h-auto flex items-center justify-center">
              <MdHome
                className={`w-9 h-9 ${
                  isActive ? "text-blue-600" : "text-gray-400"
                } group`}
              />
            </div>
            <span className=" absolute inset-0 flex items-center justify-center bg-black text-white text-sm font-semibold opacity-0 group-hover:opacity-100 transition-opacity">
              Home
            </span>
            <div
              className={`absolute bottom-0 left-0 w-full border-b-4 ${
                isActive ? "border-blue-600" : "border-transparent"
              } group-hover:border-blue-600`}
            ></div>
          </Link>
          <Link to="/watch">
            <div className="w-24 h-12 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100">
              <div className="w-14 h-auto relative flex items-center justify-center">
                <div className="absolute bg-red-500 text-white text-xs font-bold px-1 rounded-lg top-0 right-0">
                  9+
                </div>
                <div
                  className={`${
                    pathName === "watch" ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  <MdOutlineOndemandVideo className="w-7 h-7" />
                </div>
              </div>
            </div>
          </Link>
          <Link to="/marketplace">
            <div className="w-24 h-12 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100">
              <div className="w-14 h-auto relative flex items-center justify-center">
                <div className="hidden absolute bg-red-500 text-white text-xs font-bold px-1 rounded-lg top-0 right-0">
                  9+
                </div>
                <div
                  className={`${
                    pathName === "marketplace"
                      ? "text-blue-600"
                      : "text-gray-400"
                  }`}
                >
                  <FaStore className="w-7 h-7" />
                </div>
              </div>
            </div>
          </Link>
          <Link to="/groups">
            <div className="w-24 h-12 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100">
              <div className="w-14 h-auto relative flex items-center justify-center">
                <div className="absolute bg-red-500 text-white text-xs font-bold px-1 rounded-lg top-0 right-0">
                  2
                </div>
                <div
                  className={`${
                    pathName === "groups" ? "text-primary" : "text-gray-400"
                  }`}
                >
                  <GrGroup className="w-7 h-7" />
                </div>
              </div>
            </div>
          </Link>
          <Link to="/gaming">
            <div className="w-24 h-12 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-100">
              <div className="w-14 h-auto relative flex items-center justify-center">
                <div className="absolute bg-red-500 text-white text-xs font-bold px-1 rounded-lg top-0 right-0">
                  9+
                </div>
                <div
                  className={`${
                    pathName === "gaming" ? "text-blue-600" : "text-gray-400"
                  }`}
                >
                  <IoGameControllerOutline className="w-7 h-7" />
                </div>
              </div>
            </div>
          </Link>
        </div>

        {/* Right */}
        <div className="flex space-x-5 items-center ml-4">
          <div className="col-span-2 flex items-center justify-end">
            <div className="h-10 w-auto flex items-center space-x-3 pr-2 ">
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
              <button className="w-10 h-10 bg-gray-200 focus:outline-none hover:bg-gray-300 rounded-full">
                <FaFacebookMessenger className="ml-3" />
              </button>
              <button className="w-10 h-10 bg-gray-200 focus:outline-none hover:bg-gray-300 rounded-full">
                <FaBell className="ml-3" />
              </button>
              <button
                className="w-10 h-10 bg-gray-200 focus:outline-none hover:bg-gray-300 rounded-full"
                onClick={() => {
                  dispatch(authServiceActions.logOut("abc"));
                }}
              >
                <IoIosLogOut className="ml-3" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};
