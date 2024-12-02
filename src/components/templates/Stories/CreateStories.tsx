import { Avatar, Button, Image, Input} from "@chakra-ui/react";
import { TbLetterA } from "react-icons/tb";
import { useState, useRef } from "react";
import { storyService } from "services";
import { FaRegCircleXmark } from "react-icons/fa6";
import { sleep } from "utils";
import { toast } from "react-toastify";
import { useAuth, useLoading } from "hooks";
import { AiOutlineLoading, AiOutlinePlus } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
interface ImageFile extends File {
  preview: string;
}
export const CreateStories = () => {
  const { user } = useAuth();
  const [imgs, setImgs] = useState<ImageFile[]>([]);
  const { isLoading, startLoading, stopLoading } = useLoading();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  const handlePreviewImg = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const filesArray: ImageFile[] = Array.from(event.target.files).map(
        (file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
      );
      setImgs(filesArray);
    }
  };

  const handleStories = async (event) => {
    event.preventDefault();
    if (imgs.length === 0) {
      toast.error("Please select an image before posting.");
      return;
    }
    try {
      startLoading();
      if (user) {
        const formData = new FormData();
        imgs.forEach((img) => formData.append("file", img));
        formData.append("user_id_story", user.user_id.toString());
        await sleep();
        const response = await storyService.createStory(formData);
        if (response) {
          toast("Story created successfully");
          setImgs([]);
          document.dispatchEvent(new Event("storyCreated"));
          navigate("/");
        }
      } else {
        toast.error("User information is missing. Please try again later.");
      }
    } catch (error) {
      console.error("Error while posting:", error);
    } finally {
      stopLoading();
    }
  };
  const handleRemoveImage = (index) => {
    const newImgs = [...imgs];
    newImgs.splice(index, 1);
    setImgs(newImgs);
  };
  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  return (
    <form onSubmit={handleStories} className="relative">
      <div className="flex-grow flex justify-center items-center space-x-10 p-10">
        <div className="bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg shadow-xl p-8 flex flex-col items-center justify-center w-64 h-64">
          <div className="bg-white rounded-full p-2" onClick={triggerFileInput}>
            <Image src="/images/picture.png" alt="#" boxSize="30px" />
          </div>
          <Input
            ref={fileInputRef}
            type="file"
            name="content"
            id="file-input"
            onChange={handlePreviewImg}
            hidden
          />
          <p className="text-white text-lg font-semibold mt-3">
            Create a photo story
          </p>
        </div>
        <div className="bg-gradient-to-r from-pink-500 to-purple-700 rounded-lg shadow-xl p-8 flex flex-col items-center justify-center w-64 h-64">
          <div className="bg-white rounded-full p-2">
            <TbLetterA size={30} color="#6B46C1" />
          </div>
          <p className="text-white text-lg font-semibold mt-3">
            Create a text story
          </p>
        </div>
      </div>
      {imgs.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-75 z-50 flex justify-center items-center">
          <img
            src={imgs[0].preview}
            className="max-w-full max-h-full"
            alt="Selected"
          />
          <button
            onClick={() => handleRemoveImage(0)}
            className="absolute top-5 right-5 text-white bg-red-600 p-2 rounded-full"
          >
            <FaRegCircleXmark size="1.5em" />
          </button>
        </div>
      )}
      {imgs.length > 0 && (
        <Button
          type="submit"
          colorScheme="messenger"
          width="50%"
          className="absolute bottom-10 transform -translate-x-1/2 z-50 mt-[120px] ml-[120px]"
          isLoading={isLoading}
        >
          {isLoading ? (
            <>
              <AiOutlineLoading className="text-white animate-spin" />
              {" Posting..."}
            </>
          ) : (
            <>
              <AiOutlinePlus className="text-white" />
              {" Post"}
            </>
          )}
        </Button>
      )}
    </form>
  );
};
