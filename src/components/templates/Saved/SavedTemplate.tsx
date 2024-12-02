import { SavedView } from "../../containers";
import { LeftSideSaved } from "./LeftSideSaved";

export const SavedTemplate = () => {
  return (
    <div>
      <div className="flex-grow flex overflow-auto">
        <div className="hidden md:flex md:w-1/4 flex-col">
          <LeftSideSaved />
        </div>
        <div className="flex-grow flex justify-center items-center mt-4 md:mt-24">
          <SavedView />
        </div>
      </div>
    </div>
  );
};
