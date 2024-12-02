import { Avatar } from "@chakra-ui/avatar";
import { Box, Spinner, Image } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation } from "swiper/modules";
import { RootState, useAppDispatch } from "store";
import { useEffect, useState } from "react";
import { getStoriesThunk, storyServiceActions } from "store/storyService";
import { useSelector } from "react-redux";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/free-mode";
import { FaXmark } from "react-icons/fa6";
import { useAuth } from "hooks";
import { toast } from "react-toastify";
import { storyService } from "services";
import { CreateStory } from "types";
export const Story = () => {
  const { user } = useAuth();
  const dispatch = useAppDispatch();
  const [stories, setStories] = useState<CreateStory[]>([]);
  const { storiesList, isFetchingStories } = useSelector(
    (state: RootState) => state.storyService
  );

  useEffect(() => {
    dispatch(getStoriesThunk());
  }, [dispatch]);

  useEffect(() => {
    const handleStoryCreated = () => {
      dispatch(getStoriesThunk());
    };
    document.addEventListener("storyCreated", handleStoryCreated);
    return () => {
      document.removeEventListener("storyCreated", handleStoryCreated);
    };
  }, [dispatch]);

  if (isFetchingStories) {
    return (
      <div className="text-center justify-center ml-[234px] mt-20">
        <Spinner size="md" />
      </div>
    );
  }

  const handleDeleteStory = async (storyId: number) => {
    try {
      const story = storiesList.find((story) => story.story_id === storyId);
      if (story && story.user_id_story === user.user_id) {
        await storyService.deleteStory(storyId);
        dispatch(storyServiceActions.deleteStory(storyId));
        toast.success("Story deleted successfully!");
        setStories(storiesList.filter((s) => s.story_id !== storyId));
        console.log("Story deleted successfully!");
      } else {
        toast.error("Don't delete this story");
        console.log("not the owner");
      }
    } catch (error) {
      console.error("Error deleting story:", error);
    }
  };
  return (
    <Swiper
      breakpoints={{
        340: {
          slidesPerView: 4,
          spaceBetween: 0,
        },
      }}
      navigation={true}
      modules={[Navigation]}
      className="max-m-[90%] lg:max-w-[80%]"
    >
      {storiesList
        ?.slice()
        .reverse()
        .map((story) => (
          <SwiperSlide key={story.story_id}>
            <div className=" pb-5 flex">
              <div className="w-full h-50 flex items-center justify-center space-x-2 overflow-hidden cursor-pointer my-6">
                <Box className="w-28 h-48 relative rounded-xl shadow overflow-hidden">
                  <Image
                    className="w-full h-full object-cover"
                    src={story.content_story}
                    alt="#"
                  />
                  <Box
                    position="absolute"
                    left="0"
                    right="0"
                    top="0"
                    bottom="0"
                    display="flex"
                  >
                    <Spinner
                      className="mt-3 ml-[12px]"
                      thickness="17px"
                      speed="0.65s"
                      emptyColor="gray.200"
                      color="blue.500"
                      size="lg"
                      position="absolute"
                      left="0%"
                      transform="translate(-50%, -50%)"
                    />
                    <Avatar
                      size="sm"
                      className="ml-[29.4px] mt-[29px]"
                      position="absolute"
                      transform="translate(-50%, -50%)"
                    />
                    <p className="text-white text-sm ml-[54px] mt-[8px] justify-center">
                      {story.fullname_story}
                    </p>
                    <div className="absolute top-0 right-0 p-1 rounded-full cursor-pointer">
                      {story.user_id_story == user.user_id && (
                        <FaXmark
                          onClick={() => {
                            handleDeleteStory(story.story_id);
                          }}
                        />
                      )}
                    </div>
                  </Box>
                </Box>
              </div>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
