import { Avatar, Button, Input, useToast } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BiSmile } from "react-icons/bi";
import {
  AiOutlineCamera,
  AiOutlineGif,
  AiOutlineLoading,
} from "react-icons/ai";
import { FaPen } from "react-icons/fa";
import { TiDeleteOutline } from "react-icons/ti";
import { commentService } from "services";
import { sleep } from "utils";
import { useLoading } from "hooks";

interface PostComment {
  comment_id: number;
  user_id: number;
  fullname_comment: string;
  message: string;
}

interface CommentProps {
  postId: number;
  userId: number;
  fullname: string;
  setNumberOfComments: Function;
}

export const Comment = ({
  postId,
  userId,
  fullname,
  setNumberOfComments,
}: CommentProps) => {
  const [comments, setComments] = useState([]);
  const [message, setMessage] = useState("");
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editedMessage, setEditedMessage] = useState("");
  const toast = useToast();
  const { isLoading, startLoading, stopLoading } = useLoading();

  useEffect(() => {
    loadComments();
  }, [postId]);

  const loadComments = async () => {
    try {
      const fetchedComments = await commentService.getCommentsByPostId(postId);
      setComments(fetchedComments ?? []);
      setNumberOfComments(fetchedComments?.length ?? 0);
    } catch (error) {
      console.error("Error getting comments:", error);
      toast({
        title: "Error loading comments.",
        description: "Failed to load comments due to an error.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    }
  };

  const handleCommentPost = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    startLoading();
    try {
      await sleep();
      await commentService.createComment(postId, userId, {
        user_id: userId,
        post_id: postId,
        message: message,
        fullname_comment: fullname,
      });
      setMessage("");
      toast({
        title: "Comment Created",
        description: "Your comment was successfully created.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      loadComments();
    } catch (error) {
      console.error("Error posting comment:", error);
      toast({
        title: "Error",
        description: "Failed to post comment.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      stopLoading();
    }
  };

  const handleUpdateComment = async (commentId: number) => {
    if (!editedMessage.trim()) {
      toast({
        title: "Invalid Comment",
        description: "Comment text cannot be empty.",
        status: "warning",
        duration: 3000,
        isClosable: true,
        position: "top",
      });
      return;
    }
    startLoading();
    try {
      await commentService.updateComment(commentId, { message: editedMessage });
      setEditingCommentId(null);
      setEditedMessage("");
      toast({
        title: "Comment Updated",
        description: "Your comment was successfully updated.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      loadComments();
    } catch (error) {
      console.error("Error updating comment:", error);
      toast({
        title: "Error Updating Comment",
        description: "There was a problem updating your comment.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      stopLoading();
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    startLoading();
    try {
      await commentService.deleteComment(commentId);
      toast({
        title: "Comment Deleted",
        description: "The comment was successfully deleted.",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      loadComments();
    } catch (error) {
      console.error("Error deleting comment:", error);
      toast({
        title: "Error Deleting Comment",
        description: "Failed to delete the comment.",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
    } finally {
      stopLoading();
    }
  };

  const startEditing = (comment: PostComment) => {
    setEditingCommentId(comment.comment_id);
    setEditedMessage(comment.message);
  };

  return (
    <div className="max-h-60 overflow-y-auto">
      <form onSubmit={handleCommentPost}>
        <div className="flex items-center mt-5">
          <Avatar size="sm" className="ml-5 mt-0" />
          <div className="w-full ml-5 bg-[#f2f3f7] rounded-full flex items-center relative">
            <input
              type="text"
              name="message"
              value={message}
              onChange={(e) => {
                setMessage(e.target.value);
              }}
              placeholder="Write a comment"
              className="outline-none p-2 rounded-full w-full bg-[#f2f3f7]"
            />
            <div className="flex absolute right-[4.5rem] space-x-2 text-[#8e8d8d]">
              <BiSmile />
              <AiOutlineCamera />
              <AiOutlineGif />
            </div>

            <Button
              type="submit"
              colorScheme="twitter"
              borderRadius="full"
              size="xs"
              className="mr-5"
            >
              {isLoading ? (
                <>
                  <AiOutlineLoading className="text-white animate-spin" />
                </>
              ) : (
                <>
                  <p className="text-white"></p> {" Post"}
                </>
              )}
            </Button>
          </div>
        </div>
        <div className="mt-4 ml-5 space-y-2">
          {comments.map((comment) => (
            <div
              key={comment.comment_id}
              className="flex items-center space-x-4"
            >
              <Avatar size="sm" />
              <div className="flex-1">
                {editingCommentId === comment.comment_id ? (
                  <>
                    <Input
                      value={editedMessage}
                      onChange={(e) => setEditedMessage(e.target.value)}
                      size="sm"
                      className="mb-2"
                    />
                    <Button
                      size="xs"
                      colorScheme="green"
                      onClick={() => handleUpdateComment(comment.comment_id)}
                    >
                      Save
                    </Button>
                    <Button
                      size="xs"
                      colorScheme="red"
                      onClick={() => setEditingCommentId(null)}
                    >
                      Cancel
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="font-bold">{comment.fullname_comment}</div>
                    <p>{comment.message}</p>
                  </>
                )}
              </div>
              {comment.user_id === userId && (
                <div className="flex space-x-2">
                  {editingCommentId !== comment.comment_id && (
                    <FaPen onClick={() => startEditing(comment)} />
                  )}
                  <TiDeleteOutline
                    onClick={() => handleDeleteComment(comment.comment_id)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </form>
    </div>
  );
};
