import { Button } from "@chakra-ui/react";
import {
  FaClock,
  FaLocationDot,
  FaHeart,
  FaGithub,
  FaSpotify,
} from "react-icons/fa6";
import { IoIosSchool, IoLogoRss } from "react-icons/io";
import { HiOutlineMail } from "react-icons/hi";
import { IoHome } from "react-icons/io5";
import { LuInstagram } from "react-icons/lu";
import { useAuth } from "hooks";
import { FaBirthdayCake } from "react-icons/fa";
import { formatDate } from "utils";
import { StoriesView } from "../../containers";

export const IntroProfile = () => {
  const { user } = useAuth();

  return (
    <div className="col-span-2">
      <div className="bg-white rounded-lg p-3 text-sm text-gray-600 shadow">
        <div className="mb-2 ">
          <p className="font-bold text-xl text-gray-800">Intro</p>
        </div>
        <div className="flex flex-col space-y-3 text-center">
          <span className="">19:04 ━━●━━─────── 29:04</span>
          <span> ⇆ㅤㅤㅤㅤ ◁ㅤㅤ❚❚ㅤㅤ▷ㅤㅤㅤㅤ↻</span>
          <Button colorScheme="gray" size="sm" className="">
            Edit Bio
          </Button>
          <div className="flex items-center space-x-2">
            <IoIosSchool />
            <p>Studies IT at</p>
            <p className="font-semibold">Greenwich University Vietnam</p>
          </div>
          <div className="flex items-center space-x-2">
            <IoIosSchool />
            <p>Wents to</p>
            <p className="font-semibold">Nguyen Cong Tru High School</p>
          </div>
          <div className="flex items-center space-x-2">
            <IoHome />
            <p>Live in</p>
            <p className="font-semibold">Ho Chi Minh City, Vietnam</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaLocationDot />
            <p>From</p>
            <p className="font-semibold">Ho Chi Minh City, Vietnam</p>
          </div>
          <div className="flex items-center space-x-2">
            <IoLogoRss />
            <p>Followed by</p>
            <p className="font-semibold">229 people</p>
          </div>
          <div className="flex items-center space-x-2">
            <HiOutlineMail />
            <p className="font-semibold">{user?.email}</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaBirthdayCake />
            <a
              target="_blank"
              rel="noopener noreferrer"
              className=" font-semibold"
            >
              {formatDate(user?.date_of_birth)}
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <LuInstagram />
            <p className="text-blue-700 font-semibold">{user.fullname}</p>
          </div>

          <div className="flex items-center space-x-2">
            <FaSpotify />
            <a
              href="https://open.spotify.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 font-semibold"
            >
              {user?.fullname}
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <FaGithub />
            <a
              href="https://github.com/April-nnma"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-700 font-semibold"
            >
              April-nnma
            </a>
          </div>
          <div className="flex items-center space-x-2">
            <FaClock />
            <p>Joined March 2016</p>
          </div>
          <div className="flex items-center space-x-2">
            <FaHeart />
            <p>Single</p>
          </div>
          <Button colorScheme="gray">Edit details</Button>
        </div>
        <StoriesView />
        <Button colorScheme="gray" className="w-full mt-0">
          Edit featured
        </Button>
      </div>
    </div>
  );
};
