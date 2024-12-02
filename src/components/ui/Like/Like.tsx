import { useEffect, useState } from "react";
import { BiLike } from "react-icons/bi";
import { toast } from "react-toastify";
import { likeService } from "services";
interface Post {
  userId: number;
  postId: number;
}
export const Like = ({ userId, postId }: Post) => {
  const [isLike, setIsLike] = useState(false);
  const handleLikePost = async (postId: number, userId: number) => {
    try {
      const response = await likeService.getLikesByUserAndPost(userId, postId);

      if (response.data && response.data.length > 0) {
        const likedPost = response.data;

        const userLikedPost = likedPost.some((like) => like.user_id === userId);

        if (userLikedPost) {
          await likeService.deletePostLike(likedPost[0].like_id);
          toast.success("Post unliked successfully");

          setIsLike(!isLike);
        } else {
          await likeService.createPostLike(userId, postId);
          toast.success("Post liked successfully");
          setIsLike(!isLike);
        }
      } else {
        await likeService.createPostLike(userId, postId);
        toast.success("Post liked successfully");

        setIsLike(!isLike);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    likeService.getLikesByUserAndPost(userId, postId).then((response) => {
      if (response.data && response.data.length > 0) {
        const likedPosts = response.data;

        const userLikedPost = likedPosts.some(
          (like) => like.user_id === userId
        );
        if (userLikedPost) {
          setIsLike(true);
        }
      }
    });
  }, [userId, postId]);

  return (
    <div
      className="flex items-center"
      onClick={() => handleLikePost(postId, userId)}
    >
      <BiLike
        className={`w-5 h-5 ${isLike ? "text-blue-700" : "text-black"}`}
      />
      <p
        className={`pl-2 text-[18px] ${
          isLike ? "text-blue-700 font-bold" : "text-black"
        }`}
      >
        {isLike ? "Like" : "Like"}
      </p>
    </div>
  );
};
