import { useSelector, useDispatch } from "react-redux";
import { Box, Image, Spinner } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useAuth } from "hooks";
import { RootState } from "store";

export const StoriesView = () => {
  const { user } = useAuth();
  const { storiesList, isFetchingStories } = useSelector(
    (state: RootState) => state.storyService
  );

  const filteredStories = storiesList.filter(
    (story) => story.user_id_story === user.user_id
  );

  if (isFetchingStories) {
    return (
      <div className="text-center justify-center ml-[234px] mt-20">
        <Spinner size="md" />
      </div>
    );
  }

  return (
    <Swiper
      breakpoints={{
        800: {
          slidesPerView: 3,
          spaceBetween: 4,
        },
      }}
      navigation={true}
      modules={[Navigation]}
      className="max-m-[90%] lg:max-w-[80%]"
    >
      {filteredStories
        ?.slice()
        .reverse()
        .map((story, index) => (
          <SwiperSlide key={story.story_id}>
            <div className="pb-5 flex">
              <Box className="w-full h-50 flex items-center justify-center space-x-2 overflow-hidden cursor-pointer my-6">
                <Box className="w-28 h-48 relative rounded-xl shadow overflow-hidden">
                  <Image
                    className="w-full h-full object-cover"
                    src={story.content_story}
                    alt="#"
                  />
                </Box>
              </Box>
            </div>
          </SwiperSlide>
        ))}
    </Swiper>
  );
};
