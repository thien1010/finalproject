import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { FaBookmark } from "react-icons/fa";
import { savedService } from "services";
import { useAuth } from "hooks";

interface Post {
  userId: number;
  postId: number;
}

export const Saved = ({ userId, postId }: Post) => {
  const [isSaving, setIsSaving] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const { user } = useAuth();

  const handleSavePost = async () => {
    if (isSaving || isSaved) return;

    setIsSaving(true);

    try {
      await savedService.createSavedPost(postId, userId);
      setIsSaved(true);
      toast.success("Post saved successfully!");
    } catch (error) {
      console.error("Failed to save the post:", error);
      toast.error("Failed to perform save operation.");
    } finally {
      setIsSaving(false);
    }
  };

  useEffect(() => {
    const checkSavedStatus = async () => {
      try {
        const savedPosts = await savedService.getSavedByPostId(postId);
        const saved = savedPosts.some(
          (savedPost) => savedPost.user_id === user.user_id
        );
        setIsSaved(saved);
      } catch (error) {
        console.error("Fail", error);
      }
    };

    checkSavedStatus();
  }, [userId, postId]);

  return (
    <FaBookmark
      onClick={handleSavePost}
      color={isSaved ? "blue" : "gray"}
      size={20}
      style={{ cursor: isSaving ? "default" : "pointer" }}
    />
  );
};

export default Saved;
