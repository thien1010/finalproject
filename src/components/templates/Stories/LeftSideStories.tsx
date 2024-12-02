import { Avatar } from "@chakra-ui/avatar";
import { useAuth } from "hooks";
import { IoSettingsSharp } from "react-icons/io5";

export const LeftSideStories = () => {
  const { user } = useAuth();
  return (
    <div className="bg-white p-4 rounded-lg shadow w-full">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-semibold text-gray-900">Your story</h1>
        <IoSettingsSharp className="text-xl" />
      </div>
      <div className="flex items-center">
        <div className="flex-shrink-0">
          <Avatar size="lg" src="https://random.imagecdn.app/250/250" />
        </div>
        <div className="flex-1 min-w-0 ml-4">
          <p className="text-xl font-medium text-gray-900 truncate">
            {user.fullname}
          </p>
        </div>
      </div>
    </div>
  );
};
