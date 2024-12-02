import { Button, Divider, Image } from "@chakra-ui/react";
import { PATH } from "constant";
import { useAuth } from "hooks";
import { FaCamera, FaCameraRetro, FaPen, FaPlus } from "react-icons/fa6";
import { MdCameraEnhance, MdKeyboardArrowDown } from "react-icons/md";
import { TiArrowSortedDown } from "react-icons/ti";
import { useNavigate } from "react-router-dom";

export const InfoProfile = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  return (
    <div className="w-full h-auto shadow bg-white rounded-md">
      <div className="max-w-6xl h-full mx-auto bg-white p-2">
        <div
          className="h-96 max-h-96 w-full rounded-lg relative"
          style={{
            backgroundImage: `url('https://random.imagecdn.app/1920/1080')`,
            backgroundRepeat: "no-repeat",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="absolute w-full flex items-center justify-end bottom-5 right-5">
            <Button colorScheme="gray" className="bg-white flex items-center">
              <FaCamera className="mr-2" />
              Edit Cover Photo
            </Button>
          </div>
          <div
            className="absolute w-full flex items-center ml-10"
            style={{ bottom: "-120px" }}
          >
            <div className="w-44 h-44 rounded-full bg-gray-300 border-4 border-white relative">
              <Image
                className="w-full h-full rounded-full"
                src="https://random.imagecdn.app/250/250"
                alt="#"
              />
            </div>

            <div
              className="absolute flex items-center "
              style={{ bottom: 30, right: 30 }}
            >
              <div className="flex ml-96 space-x-2">
                <Button
                  colorScheme="messenger"
                  className="px-3 py-1.5 rounded-md0 text-white font-semibold focus:outline-none"
                  onClick={() => navigate(PATH.stories)}
                >
                  <FaPlus className="mr-2" />
                  Add to Story
                </Button>
                <Button
                  colorScheme="gray"
                  className=" flex px-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-md font-semibold focus:outline-none"
                >
                  <FaPen className="mr-2" />
                  Edit Profile
                </Button>
                <Button
                  colorScheme="gray"
                  className="px-3 py-1.5 rounded-md bg-gray-100 hover:bg-gray-200 font-semibold focus:outline-none"
                >
                  <MdKeyboardArrowDown />
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-5xl h-full mx-auto">
          <div className="flex flex-col space-y-2 mt-3 items-start pb-3 ml-48">
            <p className="text-4xl font-bold">{user?.fullname}</p>
            <p className="text-sm text-gray-500">306 friends</p>
          </div>

          <Divider orientation="horizontal" className="mt-12" />
          <div className="mt-1 flex items-center justify-between text-gray-600">
            <div className="flex mb-2 items-center space-x-4">
              <p className="py-3 px-2 hover:bg-gray-100 rounded-md font-semibold focus:outline-none border-b border-blue-700">
                <span className="text-blue-700">Posts</span>
              </p>

              <p className="py-3 px-2 hover:bg-gray-100 rounded-md font-semibold focus:outline-none">
                About
              </p>
              <p className="py-3 px-2 hover:bg-gray-100 rounded-md font-semibold focus:outline-none">
                Friends
              </p>
              <p className="py-3 px-2 hover:bg-gray-100 rounded-md font-semibold focus:outline-none">
                Photos
              </p>
              <p className="py-3 px-2 hover:bg-gray-100 rounded-md font-semibold focus:outline-none">
                Videos
              </p>
              <p className="py-3 px-2 flex hover:bg-gray-100 rounded-md font-semibold focus:outline-none ">
                More
                <TiArrowSortedDown className="mt-1 ml-1" />
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
