import { Button } from "@chakra-ui/react";
import { CreatePost } from "../../ui/Post/CreatePost";
import { InfoProfile } from "./InfoProfile";
import { IntroProfile } from "./IntroProfile";
import { useState } from "react";
import { PostView } from "types";
import { IoGrid } from "react-icons/io5";
import { HiBars3 } from "react-icons/hi2";
import { PiSlidersHorizontalLight } from "react-icons/pi";
import { IoSettingsSharp } from "react-icons/io5";
import { PostsView } from "../../containers";

export const AccountTemplate = () => {
  const [postView, setPostView] = useState<PostView>("listView");

  return (
    <div className="w-full h-full">
      <InfoProfile />
      <div className="max-w-6xl h-full mx-auto my-3">
        <div className="grid grid-cols-5 gap-4">
          <IntroProfile />
          <div className="col-span-3">
            <CreatePost />
            <div className="bg-white rounded-md shadow p-2 mt-4 px-3 text-sm">
              <div className="flex items-center justify-between pb-2 border-b">
                <div>
                  <p className="text-xl text-gray-700 font-bold">Posts</p>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    colorScheme="gray"
                    className="flex-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-md font-semibold focus:outline-none"
                  >
                    <PiSlidersHorizontalLight /> Filters
                  </Button>
                  <Button
                    colorScheme="gray"
                    className="flex-3 py-1.5 bg-gray-200 hover:bg-gray-300 rounded-md font-semibold focus:outline-none"
                  >
                    <IoSettingsSharp /> Manage Posts
                  </Button>
                </div>
              </div>
              <div className="flex space-x-3 text-gray-500 mt-1 -mb-1">
                <Button
                  colorScheme="gray"
                  className={`font-semibold flex-1 h-8 focus:outline-none justify-center  hover:bg-gray-100 rounded-md ${
                    postView === "listView" ? "bg-gray-200" : undefined
                  }`}
                  onClick={() => setPostView("listView")}
                >
                  <HiBars3 className="ml-8" />
                  List View
                </Button>
                <Button
                  colorScheme="gray"
                  className={`font-semibold flex-1 h-8 focus:outline-none justify-center space-x-2 hover:bg-gray-100 rounded-md  ${
                    postView === "gridView" ? "bg-gray-200" : undefined
                  }`}
                  onClick={() => setPostView("gridView")}
                >
                  <IoGrid />
                  Grid View
                </Button>
              </div>
            </div>
            <div
              className={
                postView === "gridView" ? "grid grid-cols-2 gap-4" : ""
              }
            >
              <PostsView />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
