import { useAuth } from "hooks";
import { useSelector } from "react-redux";
import { BiWorld } from "react-icons/bi";
import { Avatar } from "@chakra-ui/avatar";
import { FaRegCommentAlt } from "react-icons/fa";
import { Divider, Image, Card } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { postService } from "services";
import { CreatePost } from "types";
import { getPostsThunk, postServiceActions } from "store/postService";
import { RootState, useAppDispatch } from "store";
import { HiXMark } from "react-icons/hi2";
import { Like } from "../ui/Like";
import { Comment } from "../ui/Comment";
import { formatDate } from "utils";

interface PostsViewProps {
  postsView?: CreatePost;
}
export const PostsView: React.FC<PostsViewProps> = () => {
  const { user } = useAuth();
  const [comments, setComments] = useState([]);
  const [numberOfComments, setNumberOfComments] = useState(0);

  const dispatch = useAppDispatch();

  const { postsList, isFetchingPosts } = useSelector(
    (state: RootState) => state.postService
  );
  const filteredPosts = postsList.filter(
    (post) => post.user_id_create === user.user_id
  );
  useEffect(() => {
    const handlePostCreated = () => {
      dispatch(getPostsThunk());
    };
    document.addEventListener("postCreated", handlePostCreated);
    return () => {
      document.removeEventListener("postCreated", handlePostCreated);
    };
  }, [dispatch]);
  if (isFetchingPosts) {
    return <div className="text-center">Loading...</div>;
  }
  if (!filteredPosts || filteredPosts.length === 0) {
    return <div className="text-center">No posts to display</div>;
  }

  const handleDeletePost = async (postId: number) => {
    try {
      await postService.deletePost(postId);
      dispatch(postServiceActions.deletePost(postId));
      console.log("Post deleted successfully!");
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  return (
    <>
      {filteredPosts
        .slice()
        .reverse()
        .map((post) => (
          <Card
            key={post.post_id}
            className="bg-white flex flex-col rounded-[1rem] px-5 py-4 mt-4 "
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center ml-5">
                <Avatar size="sm" src="https://random.imagecdn.app/250/250" />
                <div className="ml-3">
                  <p className="font-bold">{post?.fullname_create}</p>
                  <div className="flex">
                    <p className="text-xs">{formatDate(post?.created_at)}</p>
                    <BiWorld className="ml-1" />
                  </div>
                </div>
              </div>
              <div className="flex">
                <Image src="/images/dots.png" alt="#" className="w-9 h-10" />
                <HiXMark
                  className="mt-3 w-full h-full"
                  onClick={() => {
                    handleDeletePost(post.post_id);
                  }}
                />
              </div>
            </div>
            <div className="m-3">
              <p>{post.caption}</p>
            </div>
            {post.content ? (
              <Image src={post.content} alt="#" className="h-auto w-full" />
            ) : (
              ""
            )}
            <div className="flex justify-between text-[#8e8d8d] mt-3 ml-4">
              <div className="flex items-center ">
                <div className=" w-[1.1rem] h-[1.1rem]">
                  <Image src="/images/like.png" />
                </div>
                <div className="ml-[2px] w-5 h-5">
                  <Image src="/images/heart.png" />
                </div>
                <p className="pl-2 whitespace-nowrap text-[15px] sm:text-[16px]"></p>
              </div>
              <p className="whitespace-nowrap text-[15px] sm:text-[16px]">
                {`${comments.length} Comments`}
              </p>
            </div>
            <Divider orientation="horizontal" mt={3} borderColor="gray.300" />
            <div className="flex justify-between mx-6 mt-1 font-medium cursor-pointer">
              <Like userId={user.user_id} postId={post.post_id} />
              <div className="flex items-center">
                <FaRegCommentAlt className="w-5 h-5" />
                <p className="pl-2">Comment</p>
              </div>
              <div className="flex items-center">
                <Image
                  src="/images/share.png"
                  alt="Share"
                  className="w-6 h-6"
                />
                <p className="pl-2">Share</p>
              </div>
            </div>
            <Divider orientation="horizontal" mt={3} borderColor="gray.300" />
            <Comment
              fullname={user.fullname}
              postId={post.post_id}
              userId={user.user_id}
              setNumberOfComments={setNumberOfComments}
            />
          </Card>
        ))}
    </>
  );
};
