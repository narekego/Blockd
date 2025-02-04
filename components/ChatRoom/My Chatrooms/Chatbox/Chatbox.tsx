import React, { useState, useEffect, useRef } from "react";
import Navbar from "./Navbar";
import Chat from "./Chat";
import Footer from "./Footer";
import { isEmpty } from "lodash";
import { useAppDispatch, useAppSelector } from "../../../../stores/hooks";
import { fetchChatroomMessages, fetchMessages } from "../../../../stores/chat/ChatActions";
import { useChannel } from "@ably-labs/react-hooks";
import { fetchAuthUser } from "../../../../stores/authUser/AuthUserActions";
import { toast } from "react-hot-toast";

function Chatbox({ receiver, chats, setReceiver, room, chatrooms, setRoom, fetchRooms }: any) {
  const dispatch = useAppDispatch();
  const { authUser } = useAppSelector((state) => state.authUserReducer);
  const elementRef = useRef<any>(null);
  let [atTop, setAtTop] = useState<boolean>(false);
  const [endCount, setEndCount] = useState<number>(4);
  const [endTotal, setEndTotal] = useState<number>(4);
  const [messages, setMessages] = useState<any>();
  const { isFetchingMessages, error } = useAppSelector((state) => state.chatReducer);
  const ref = useRef<any>(null);

  useEffect(() => {
    dispatch(fetchAuthUser());
  }, []);

  useEffect(() => {
    if (!isEmpty(receiver)) {
      getMessages();
      ref.current = receiver;
    }
    if (!isEmpty(room)) {
      fetchRoomMessages();
      ref.current = room;
    }
  }, [receiver, room]);

  // const [message] = useChannel(
  //   `messageNotifications-${authUser.id}`,
  //   (message) => {
  //     updateMessages();
  //   }
  // );

  const getMessages = async () => {
    if (!isEmpty(receiver)) {
      await dispatch(
        fetchMessages({
          receiver_id: receiver?.id,
          start: 0,
          end: 20,
        })
      ).then((result: any) => {
        setEndTotal(10);
        setEndCount(10);
        setMessages(result?.messages);
      });
    }
  };

  const fetchRoomMessages = async () => {
    if (!isEmpty(room)) {
      await dispatch(
        fetchChatroomMessages(room?.roomId, {
          start: 0,
          end: 20
        })
      ).then((result: any) => {
        setEndTotal(10);
        setEndCount(10);
        setMessages(result?.messages);
      })
    }
  }

  const updateRoomMessages = async () => {
    await dispatch(
      fetchChatroomMessages(room?.roomId, {
        start: 0,
        end: 20
      })
    ).then((result: any) => {
      setMessages(result?.messages);
    });
  }

  const updateMessages = async () => {
    await dispatch(
      fetchMessages({
        receiver_id: ref.current?.id,
        start: 0,
        end: 20,
      })
    ).then((result: any) => {
      setMessages(result?.messages);
    });
  };

  const handleScroll = async (e: any) => {
    // console.log(e);
    // if (elementRef.current) {
    //   const { scrollTop, scrollHeight, clientHeight } = elementRef.current;
    //   console.log('scrollTop: ', scrollTop);
    //   console.log('clientHeight: ', clientHeight);
    //   if (scrollTop === 0) {
    //     if (!isFetchingMessages) {
    //       if (endTotal < 10) {
    //         return;
    //       } else {
    //         updateMessages(endCount + 1, endCount + 10);
    //         setEndCount(endCount + 10);
    //       }
    //     }
    //   }
    // }
  };

  return (
    <div className="flex flex-col col-span-8 md:col-span-7 lg:col-span-5 relative border-r dark:border-lightgray overflow-scroll scrollbar-hide">
      <Chat
        receiver={receiver}
        room={room}
        messages={messages}
        elementRef={elementRef}
        chats={chats}
        setReceiver={setReceiver}
        setRoom={setRoom}
        handleScroll={handleScroll}
        chatrooms={chatrooms}
        fetchRooms={fetchRooms}
        getMessages={getMessages}
      />
    </div>
  );
}

export default Chatbox;
