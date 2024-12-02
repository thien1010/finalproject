import { Button, Image } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { PATH } from "constant";

export const CreateStory = () => {
  const navigate = useNavigate();
  return (
    <div className="w-28 h-48 relative overflow-hidden cursor-pointer my-6 rounded-md ">
      <Image
        className="w-full h-full"
        src="https://random.imagecdn.app/250/250"
        alt="#"
      />
      <div
        className="w-full absolute flex justify-center items-center"
        style={{ bottom: "13%" }}
      >
        <Button
          colorScheme="messenger"
          size="md"
          borderRadius="full"
          className="z-50"
          p={2}
          border="4px solid white"
          iconSpacing={3}
          onClick={() => navigate(PATH.stories)}
        >
          <FaPlus className="text-white" />
        </Button>
      </div>
      <div className="bg-white z-30 absolute text-center bottom-0 p-2 pt-4 w-full h-auto ">
        <p className="text-gray-500 text-sm font-semibold">Create Story</p>
      </div>
    </div>
  );
};
