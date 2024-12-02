import { Avatar } from "@chakra-ui/avatar";
import {
  Box,
  Button,
  Divider,
  Image,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  useDisclosure,
} from "@chakra-ui/react";
import { useAuth, useLoading } from "hooks";
import { useState, useEffect, useRef } from "react";
import { BiWorld } from "react-icons/bi";
import { toast } from "react-toastify";
import { postService } from "services";
import { FaRegCircleXmark } from "react-icons/fa6";
import { AiOutlineLoading, AiOutlinePlus } from "react-icons/ai";
import { sleep } from "utils";
interface ImageFile extends File {
  preview: string;
}
export const CreatePost = () => {
  const { user } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const finalRef = useRef(null);
  const [imgs, setImgs] = useState<ImageFile[]>([]);
  const [caption, setCaption] = useState<string>("");
  const { isLoading, startLoading, stopLoading } = useLoading();

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

  useEffect(() => {
    return () => imgs.forEach((img) => URL.revokeObjectURL(img.preview));
  }, [imgs]);

  const handlePost = async (event) => {
    try {
      startLoading();
      event.preventDefault();
      if (user) {
        const formData = new FormData();
        formData.append("user_id_create", user.user_id.toString());

        if (imgs.length > 0) {
          imgs.map((img) => formData.append("file", img));
        }

        formData.append("caption", caption);

        await sleep();
        const response = await postService.createPost(formData);
        if (response) {
          toast("Post created successfully");
          setImgs([]);
          setCaption("");
          document.dispatchEvent(new Event("postCreated"));
          onClose();
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

  return (
    <div className="rounded-lg bg-white flex flex-col p-3 px-4 shadow">
      <div className="flex items-center space-x-2 border-b pb-3 mb-2">
        <div className="shrink-0 ml-6">
          <Avatar
            size="sm"
            className="mr-2"
            src="https://random.imagecdn.app/250/250"
          />
        </div>

        <div className="flex-grow">
          <Button
            onClick={onOpen}
            justifyContent="flex-start"
            borderRadius="4xl"
            className="hover:bg-gray-200 focus:bg-gray-100 bg-gray-100 text-gray-400 rounded-full h-10 w-full"
          >
            What's on your mind, {user?.fullname}?
          </Button>
        </div>
        <Modal finalFocusRef={finalRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              Create post
            </ModalHeader>
            <Divider />
            <ModalCloseButton />
            <ModalBody>
              <form onSubmit={handlePost}>
                <div className="flex items-center ml-5">
                  <Avatar
                    size="sm"
                    src="https://random.imagecdn.app/250/250"
                    className="mt-0"
                  />
                  <div className="ml-3">
                    <p className="font-semibold">{user?.fullname}</p>
                    <Box
                      className="flex items-center justify-center"
                      as="button"
                      height="24px"
                      lineHeight="1.2"
                      transition="all 0.2s cubic-bezier(.08,.52,.52,1)"
                      border="1px"
                      px="8px"
                      borderRadius="2px"
                      fontSize="14px"
                      fontWeight="semibold"
                      bg="#f5f6f7"
                      borderColor="#ccd0d5"
                      color="#4b4f56"
                      _hover={{ bg: "#ebedf0" }}
                      _active={{
                        bg: "#dddfe2",
                        transform: "scale(0.98)",
                        borderColor: "#bec3c9",
                      }}
                      _focus={{
                        boxShadow:
                          "0 0 1px 2px rgba(88, 144, 255, .75), 0 1px 1px rgba(0, 0, 0, .15)",
                      }}
                    >
                      <BiWorld className="mr-1" />
                      <span className="">Public</span>
                    </Box>
                  </div>
                </div>
                <div>
                  <Input
                    id="caption"
                    name="caption"
                    value={caption}
                    variant="unstyled"
                    multiple
                    placeholder={`What's on your mind, ${user?.fullname}?`}
                    className="mb-10"
                    onChange={(e) => {
                      setCaption(e.target.value);
                    }}
                  />
                </div>
                <Input
                  className="flex justify-center items-center"
                  type="file"
                  name="content"
                  id="file-input"
                  // accept="video/*"
                  onChange={handlePreviewImg}
                  hidden
                />
                <div>
                  {imgs.map((img, index) => (
                    <div key={index} className="relative">
                      <img
                        className="flex"
                        src={URL.createObjectURL(img)}
                        alt="#"
                        style={{ maxWidth: "100%", height: "auto" }}
                      />
                      <button
                        className="absolute top-0 right-0 mt-1 mr-1 rounded-full bg-gray-200 text-gray-700 p-1"
                        onClick={() => handleRemoveImage(index)}
                      >
                        <FaRegCircleXmark />
                      </button>
                    </div>
                  ))}
                </div>
                <div className="flex items-center border bg-white p-2 rounded-lg border-black">
                  <Button
                    className="font-semibold text-black"
                    onClick={() =>
                      document.getElementById("file-input").click()
                    }
                  >
                    Add to your post
                  </Button>
                  <div className="ml-auto flex mr-3">
                    <div className="flex items-center mr-3">
                      <div className="w-7 h-7">
                        <Image src="/images/camera.png" alt="#" />
                      </div>
                    </div>
                    <div className="flex items-center mr-3">
                      <div className="w-7 h-7">
                        <Image
                          src="/images/picture.png"
                          alt="#"
                          onClick={() =>
                            document.getElementById("file-input").click()
                          }
                        />
                        <input type="file" className="hidden" />
                      </div>
                    </div>

                    <div className="flex items-center mr-2">
                      <div className="w-7 h-7">
                        <Image src="/images/smile.png" alt="#" />
                      </div>
                    </div>
                  </div>
                </div>
                <Button
                  type="submit"
                  colorScheme="messenger"
                  width="100%"
                  className="mt-4"
                >
                  {isLoading ? (
                    <>
                      <AiOutlineLoading className="text-white animate-spin" />
                      {" Posting"}
                    </>
                  ) : (
                    <>
                      <AiOutlinePlus className="text-white" />
                      {" Post"}
                    </>
                  )}
                </Button>
              </form>
            </ModalBody>
            <ModalFooter></ModalFooter>
          </ModalContent>
        </Modal>
      </div>
      <div className="flex justify-between px-3 sm:mx-9 pb-3 space-x-3 ml-96">
        <div className="flex items-center">
          <div className="w-7 h-7">
            <Image src="/images/camera.png" alt="#" />
          </div>
          <p className="pl-2 whitespace-nowrap text-[14px]">Live Video</p>
        </div>
        <div className="flex items-center">
          <div className="w-7 h-7">
            <Image src="/images/picture.png" alt="#" />
            <input type="file" className="hidden" />
          </div>
          <p className="pl-2 text-[14px]">Photo/Video</p>
        </div>

        <div className="flex items-center">
          <div className="w-7 h-7">
            <Image src="/images/smile.png" alt="#" />
          </div>
          <p className="pl-2 text-[14px]">Feeling/Activity</p>
        </div>
      </div>
    </div>
  );
};
