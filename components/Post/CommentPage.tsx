import React, { useEffect } from "react";
import { useRouter } from "next/router";
import { ArrowLeftCircleIcon } from "@heroicons/react/24/outline";
import MainComment from "./MainComment";
import CommentSection from './CommentSection';
import { useAppSelector, useAppDispatch } from '../../stores/hooks';
import { isEmpty } from "lodash";
import { fetchComment, fetchCommentReplies } from "../../stores/comment/CommentActions";
import { fetchPost } from "../../stores/post/PostActions";

interface Pic {
  name: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  profilePicId: number;
  bannerPicId: number;
  profilePic: Pic;
}

interface Comment {
  id: string;
  content: string;
  createdAt: string;
  userId: number;
  user: User;
  gif: string;
  imgName: string;
}

interface Post {
  id: number;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  hasImg: boolean;
  userId: number;
  gif: string;
  user: User;
}

function CommentPage() {
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { comment, commentReplies } = useAppSelector((state) => state.commentReducer);
  const { post } = useAppSelector((state) => state.postReducer);
  const { commentId, postId } = router.query;

  useEffect(() => {
    if (!isEmpty(router.query)) {
      fetchReplies();
      fetchCommentById();
      fetchPostById();
    }
  }, [router.query]);

  const fetchReplies = async () => {
    await dispatch(fetchCommentReplies(commentId as string));
  }

  const fetchCommentById = async () => {
    await dispatch(fetchComment(commentId as string));
  }

  const fetchPostById = async () => {
    await dispatch(fetchPost(postId as string));
  }

  return (
    <div className="relative min-h-screen scrollbar-hide overflow-scroll col-span-8 md:col-span-5 border-x pb-14">
      <div className="flex z-[1] flex-col items-start sticky top-0 w-full p-3 backdrop-blur-md bg-white/30 dark:bg-darkgray/30">
        <ArrowLeftCircleIcon
          onClick={() => router.back()}
          className="h-8 w-8 cursor-pointer text-black dark:text-white transition-all duration-100 ease-out hover:scale-125"
        />
      </div>

      <div className="z-0">
        {/* 
                // @ts-ignore */}
        <MainComment
          comment={comment as Comment}
          refetchReplies={fetchReplies}
        />
        {commentReplies &&
          commentReplies.map((comment: object, index: number) => (
            <CommentSection
              key={index}
              // @ts-ignore
              comment={comment as Comment}
              post={post as Post}
              type='reply'
            />
          ))}
      </div>
    </div>
  );
}

export default CommentPage;