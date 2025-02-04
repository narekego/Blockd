import React, {
  HtmlHTMLAttributes,
  useEffect,
  useRef,
  useState,
  useLayoutEffect,
} from "react";
import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { ChevronDoubleUpIcon } from "@heroicons/react/24/solid";
import TweetBox from "./TweetBox";
import toast from "react-hot-toast";
import PostTest from "./Post";
import {
  fetchTrendingPosts,
  fetchFilteredPosts,
} from "../../stores/post/PostActions";
import { useAppDispatch, useAppSelector } from "../../stores/hooks";
import { isEmpty } from "lodash";
import { fetchAuthUser } from "../../stores/authUser/AuthUserActions";
import { useRouter } from "next/router";
import Slider from "./Slider";

interface Post {
  id: number;
  content: string;
  createdAt: string;
  likes: number;
  comments: number;
  hasImg: boolean;
  userId: number;
  gif: string;
}

interface Filtered {
  posts: Post[];
}

function Feed() {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { isRegistered } = router.query;

  const { isFetchingFilteredPosts, error } = useAppSelector(
    (state) => state.postReducer
  );
  const [showModal1, setShowModal1] = useState(true);
  const [showModal2, setShowModal2] = useState(false);
  const [isPosting, setisPosting] = useState<boolean>();
  const [endCount, setEndCount] = useState<number>(4);
  const [endTotal, setEndTotal] = useState<number>(4);
  const [filtered, setFiltered] = useState<Filtered | any>([]);

  let [atTop, setAtTop] = useState<boolean>(false);
  const elementRef = useRef<any>(null);

  // useEffect(() => {
  //   if (!isEmpty(error)) {
  //     toast.error(error);
  //   }
  // }, [error]);

  useEffect(() => {
    const handleScroll = () => {
      if (elementRef?.current?.scrollTop !== 0) {
        atTop = true;
        setAtTop(atTop);
      } else {
        atTop = false;
        setAtTop(atTop);
      }
    };
    elementRef?.current?.addEventListener("scroll", handleScroll);
    return () => {
      elementRef?.current?.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    dispatch(fetchAuthUser());
    setFiltered(undefined);
    fetchFiltered();
  }, []);

  const fetchFiltered = async () => {
    await dispatch(
      fetchFilteredPosts({
        start: 0,
        end: 8,
      })
    ).then((result: any) => {
      setEndTotal(8);
      setEndCount(8);
      setFiltered(result?.posts);
    });
  };

  const updateFiltered = async (start: number, end: number) => {
    await dispatch(
      fetchFilteredPosts({
        start: start,
        end: end,
      })
    ).then((result: any) => {
      const newPosts = filtered?.concat(result?.posts);
      setEndTotal(result?.total);
      setFiltered(newPosts);
    });
  };

  const goToTopOfPage = () => {
    const element = document.getElementById("top-page");
    if (element) {
      // 👇 Will scroll smoothly to the top of the next section
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleRefresh = async () => {
    const refreshToast = toast.loading("Refreshing...");
    await fetchFiltered();
    await new Promise((f) => setTimeout(f, 1000));
    toast.success("Feed Updated!", {
      id: refreshToast,
    });
  };

  const handleScroll = async () => {
    if (elementRef.current) {
      const { scrollTop, scrollHeight, clientHeight } = elementRef.current;
      if (
        scrollTop + clientHeight === scrollHeight ||
        scrollTop + clientHeight === scrollHeight - 0.5
      ) {
        if (!isFetchingFilteredPosts) {
          if (endTotal == 0) {
            return;
          } else {
            await updateFiltered(endCount + 0, endCount + 10);
            setEndCount(endCount + 10);
          }
        }
      }
    }
  };

  return (
    <div
      onScrollCapture={() => handleScroll()}
      ref={elementRef}
      className="relative max-h-screen scrollbar-hide overflow-scroll col-span-9 md:col-span-5 pb-14"
    >
      <div id="top-page"></div>

      <Slider />
      
      <div
        className={`flex items-center z-[30] ${
          atTop === false ? "justify-end" : "justify-between"
        } sticky top-0 p-3 md:p-4 backdrop-blur-md bg-white/30 dark:bg-darkgray/30`}
      >
        {atTop && (
          <ChevronDoubleUpIcon
            onClick={() => goToTopOfPage()}
            className="w-6 h-6 cursor-pointer"
          />
        )}
        <ArrowPathIcon
          onClick={handleRefresh}
          className="flex items-center justify-end w-6 h-6 cursor-pointer text-black dark:text-white transition-all duration-500 ease-out hover:rotate-180 active-scale"
        />
      </div>

      <div>
        <TweetBox refetchFiltered={fetchFiltered} />
        <div className="p-4">
          {filtered &&
            filtered?.map((post: Post, index: number) => (
              // @ts-ignore
              <PostTest
                key={`${index}-post`}
                // @ts-ignore
                mainPost={post}
                refetch={handleRefresh}
              />
            ))}
          {isFetchingFilteredPosts && (
            <p className="flex items-center justify-center space-x-3 p-4">
              Loading ...
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Feed;
