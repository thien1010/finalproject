import { HeaderStories } from "./HeaderStories";
import { LeftSideStories } from "./LeftSideStories";
import { CreateStories } from "./CreateStories";
export const StoriesTemplate = () => {
  return (
    <div className="flex flex-col max-h-screen bg-gray-50 overflow-hidden">
      <div className="fixed top-0 w-full bg-white z-10 shadow">
        <HeaderStories />
      </div>
      <div className="flex-grow flex overflow-auto pt-16">
        <div className="hidden md:flex md:w-1/4 flex-col">
          <LeftSideStories />
        </div>
        <div className="flex-grow flex justify-center items-center mt-4 md:mt-24">
          <CreateStories />
        </div>
      </div>
    </div>
  );
};
