import { Avatar } from "@chakra-ui/avatar";
import { useEffect, useState } from "react";
import { userService } from "services";
import { UserLogin } from "types";

export const RightSideBar = () => {
  const [users, setUsers] = useState<UserLogin[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await userService.getUser();
        if (response.data && response.data.content) {
          setUsers(response.data.content); 
        } else {
          throw new Error("No user data found");
        }
      } catch (error) {
        setError("Failed to fetch users");
        console.error("Failed to fetch users:", error);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);
  console.log("users: ", users);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="w-[20rem] h-auto py-3 pr-2">
      <div className="w-full text-gray-600 border-b-2 pb-2 mb-2 border-gray-300">
        <p className="font-semibold mb-2">Your Pages</p>
        <li className="h-12 mb-2 flex items-center -ml-3 justify-content cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200">
          <div>
            <img
              className="w-8 h-8 rounded-full"
              src="https://static.xx.fbcdn.net/rsrc.php/v3/yR/r/tInzwsw2pVX.png"
              alt="#"
            />
          </div>
          <div>
            <p className="text-sm font-semibold">Littlebit Programmer</p>
          </div>
        </li>
        <ul className="text-gray-500 text-sm">
          <li className="h-8 mb-2 flex items-center justify-content cursor-pointer space-x-3 p-2 rounded-md hover:bg-gray-200">
            <div>
              <i className="fas fa-bell"></i>
            </div>
            <div>
              <p className="text-xs">Notification</p>
            </div>
          </li>
          <li className="h-8 flex items-center justify-content cursor-pointer space-x-3 p-2 rounded-md hover:bg-gray-200">
            <div>
              <i className="fas fa-bullhorn"></i>
            </div>
            <div>
              <p className="text-xs">Create promotion</p>
            </div>
          </li>
        </ul>
      </div>
      <div>
        <div className="flex items-center justify-between text-gray-600">
          <div>
            <p className="text-sm font-semibold">Contacts</p>
          </div>
          <div className="flex items-center space-x-3 text-gray-500">
            <button className="w-8 h-8 focus:outline-none rounded-full hover:bg-gray-200">
              <i className="fab fa-youtube"></i>
            </button>
            <button className="w-8 h-8 focus:outline-none rounded-full hover:bg-gray-200">
              <i className="fas fa-search"></i>
            </button>
            <button className="w-8 h-8 focus:outline-none rounded-full hover:bg-gray-200">
              <i className="fas fa-ellipsis-h"></i>
            </button>
          </div>
        </div>
        <div className="-ml-2">
          <ul className="w-full text-gray-600">
            {users.map((user) => (
              <li
                key={user.user_id}
                className="h-12 mb-2 flex items-center cursor-pointer space-x-2 p-2 rounded-md hover:bg-gray-200"
              >
                <div>
                  <Avatar size="sm" />
                </div>
                <div>
                  <p className="text-sm font-semibold">{user.fullname}</p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
