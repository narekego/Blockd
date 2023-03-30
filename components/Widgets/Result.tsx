import React, { useState, useEffect } from "react";
import Link from "next/link";
import { fetchPostImage } from "../../stores/post/PostActions";
import { useAppDispatch } from "../../stores/hooks";
import { config } from "../../constants";
import { encodeQuery } from "../../utils";
import { isEmpty } from "lodash";

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

function Result({ result }: any) {
  const dispatch = useAppDispatch();
  const [image, setImage] = useState<any>();
  
  return (
    <Link
      href={{
        pathname: "/dashboard/profile",
        query: { user_id: result?.id },
      }}
      as={`/dashboard/profile?${encodeQuery(result?.id, 'profile')}`}
      className="w-full"
    >
      <div
        key={result?.id}
        className="flex items-center justify-start space-x-2 hover:rounded-t-md hover:bg-gray-200 dark:hover:bg-lightgray p-2 w-full cursor-pointer"
      >
        <img
          src={
            !isEmpty(result?.profilePic)
              ? `${config.url.PUBLIC_URL}/${result?.profilePic?.name}`
              : "/images/placeholder.png"
          }
          className="rounded-md w-8 h-8 lg:w-10 lg:h-10 bg-blockd"
        />
        <p className="font-semibold text-sm">@{result?.name}</p>
      </div>
    </Link>
  );
}

export default Result;