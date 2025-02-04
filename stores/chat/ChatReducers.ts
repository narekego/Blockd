// Action types
import {
  IS_CREATING_MESSAGE,
  CREATE_MESSAGE_SUCCESS,
  CREATE_MESSAGE_FAILURE,
  IS_FETCHING_MESSAGES,
  FETCH_MESSAGES_SUCCESS,
  FETCH_MESSAGES_FAILURE,
  IS_CREATING_CHAT,
  CREATE_CHAT_SUCCESS,
  CREATE_CHAT_FAILURE,
  IS_DELETING_CHAT,
  DELETE_CHAT_SUCCESS,
  DELETE_CHAT_FAILURE,
  IS_FETCHING_CHAT,
  FETCH_CHAT_SUCCESS,
  FETCH_CHAT_FAILURE,
  IS_MUTING_CHAT,
  MUTE_CHAT_SUCCESS,
  MUTE_CHAT_FAILURE,
  IS_CREATING_CHATROOM,
  CREATE_CHATROOM_SUCCESS,
  CREATE_CHATROOM_FAILURE,
  IS_DELETING_CHATROOM,
  DELETE_CHATROOM_SUCCESS,
  DELETE_CHATROOM_FAILURE,
  IS_ADDING_MEMBER,
  ADD_MEMBER_SUCCESS,
  ADD_MEMBER_FAILURE,
  IS_REMOVING_MEMBER,
  REMOVE_MEMBER_SUCCESS,
  REMOVE_MEMBER_FAILURE,
  IS_CREATING_CHATROOM_MESSAGE,
  CREATE_CHATROOM_MESSAGE_SUCCESS,
  CREATE_CHATROOM_MESSAGE_FAILURE,
  IS_FETCHING_USER_CHATROOMS,
  FETCH_USER_CHATROOMS_SUCCESS,
  FETCH_USER_CHATROOMS_FAILURE,
  IS_FETCHING_CHATROOM_MEMBERS,
  FETCH_CHATROOM_MEMBERS_SUCCESS,
  FETCH_CHATROOM_MEMBERS_FAILURE,
  IS_FETCHING_CHATROOM_MESSAGES,
  FETCH_CHATROOM_MESSAGES_SUCCESS,
  FETCH_CHATROOM_MESSAGES_FAILURE,
  IS_FETCHING_ALL_ROOMS,
  FETCH_ALL_ROOMS_SUCCESS,
  FETCH_ALL_ROOMS_FAILURE,
  IS_JOINING_ROOM,
  JOIN_ROOM_SUCCESS,
  JOIN_ROOM_FAILURE,
  IS_SEARCHING_ROOM_MEMBERS,
  SEARCH_ROOM_MEMBERS_SUCCESS,
  SEARCH_ROOM_MEMBERS_FAILURE,
  IS_CHECKING_BALANCE,
  CHECK_BALANCE_SUCCESS,
  CHECK_BALANCE_FAILURE,
  IS_FETCHING_MESSAGE,
  FETCH_MESSAGE_SUCCESS,
  FETCH_MESSAGE_FAILURE,
  IS_FETCHING_ROOM_MESSAGE,
  FETCH_ROOM_MESSAGE_SUCCESS,
  FETCH_ROOM_MESSAGE_FAILURE,
  IS_LEAVING_ROOM,
  LEAVE_ROOM_SUCCESS,
  LEAVE_ROOM_FAILURE
} from './ChatActionTypes';

const initialState = {
  isCreatingMessage: false,
  isFetchingMessages: false,
  isCreatingChat: false,
  isDeletingChat: false,
  isFetchingChat: false,
  isMutingChat: false,
  isCreatingChatroom: false,
  isDeletingChatroom: false,
  isAddingMember: false,
  isRemovingMember: false,
  isCreatingChatroomMessage: false,
  isFetchingUserChatrooms: false,
  isFetchingChatroomMembers: false,
  isFetchingChatroomMessages: false,
  isFetchingAllRooms: false,
  isJoiningRoom: false,
  isSearchingRoomMembers: false,
  isCheckingBalance: false,
  isFetchingMessage: false,
  isFetchingRoomMessage: false,
  isLeavingRoom: false,
  roomMessage: {},
  message: {},
  balance: {},
  balanceError: '',
  roomMembersResult: [],
  allRooms: [],
  chatroomMessages: [],
  chatrooms: [],
  members: [],
  chats: [],
  messages: [],
  error: '',
};

export function chatReducer(state = initialState, action: any) {
  switch (action.type) {
    case IS_CREATING_MESSAGE: {
      return {
        ...state,
        isCreatingMessage: true,
        error: ''
      };
    }
    case CREATE_MESSAGE_SUCCESS: {
      return {
        ...state,
        isCreatingMessage: false
      };
    }
    case CREATE_MESSAGE_FAILURE: {
      return {
        ...state,
        isCreatingMessage: false,
        error: action.error
      };
    }
    case IS_FETCHING_MESSAGES: {
      return {
        ...state,
        isFetchingMessages: true,
        error: ''
      };
    }
    case FETCH_MESSAGES_SUCCESS: {
      return {
        ...state,
        isFetchingMessages: false,
        // messages: action.messages
      };
    }
    case FETCH_MESSAGES_FAILURE: {
      return {
        ...state,
        isFetchingMessages: false,
        error: action.error
      };
    }
    case IS_CREATING_CHAT: {
      return {
        ...state,
        isCreatingChat: true,
        error: ''
      };
    }
    case CREATE_CHAT_SUCCESS: {
      return {
        ...state,
        isCreatingChat: false
      };
    }
    case CREATE_CHAT_FAILURE: {
      return {
        ...state,
        isCreatingChat: false,
        error: action.error
      };
    }
    case IS_DELETING_CHAT: {
      return {
        ...state,
        isDeletingChat: true,
        error: ''
      };
    }
    case DELETE_CHAT_SUCCESS: {
      return {
        ...state,
        isDeletingChat: false
      };
    }
    case DELETE_CHAT_FAILURE: {
      return {
        ...state,
        isDeletingChat: false,
        error: action.error
      };
    }
    case IS_FETCHING_CHAT: {
      return {
        ...state,
        isFetchingChat: true,
        error: ''
      };
    }
    case FETCH_CHAT_SUCCESS: {
      return {
        ...state,
        isFetchingChat: false,
        chats: action.chat
      };
    }
    case FETCH_CHAT_FAILURE: {
      return {
        ...state,
        isFetchingChat: false,
        error: action.error
      };
    }
    case IS_MUTING_CHAT: {
      return {
        ...state,
        isMutingChat: true,
        error: ''
      };
    }
    case MUTE_CHAT_SUCCESS: {
      return {
        ...state,
        isMutingChat: false
      };
    }
    case MUTE_CHAT_FAILURE: {
      return {
        ...state,
        isMutingChat: false,
        error: action.error
      };
    }
    case IS_CREATING_CHATROOM: {
      return {
        ...state,
        isCreatingChatroom: true,
        error: ''
      };
    }
    case CREATE_CHATROOM_SUCCESS: {
      return {
        ...state,
        isCreatingChatroom: false
      };
    }
    case CREATE_CHATROOM_FAILURE: {
      return {
        ...state,
        isCreatingChatroom: false,
        error: action.error
      };
    }
    case IS_DELETING_CHATROOM: {
      return {
        ...state,
        isDeletingChatroom: true,
        error: ''
      };
    }
    case DELETE_CHATROOM_SUCCESS: {
      return {
        ...state,
        isDeletingChatroom: false
      };
    }
    case DELETE_CHATROOM_FAILURE: {
      return {
        ...state,
        isDeletingChatroom: false,
        error: action.error
      };
    }
    case IS_ADDING_MEMBER: {
      return {
        ...state,
        isAddingMember: true,
        error: ''
      };
    }
    case ADD_MEMBER_SUCCESS: {
      return {
        ...state,
        isAddingMember: false,
      };
    }
    case ADD_MEMBER_FAILURE: {
      return {
        ...state,
        isAddingMember: false,
        error: action.error
      };
    }
    case IS_REMOVING_MEMBER: {
      return {
        ...state,
        isRemovingMember: true,
        error: ''
      };
    }
    case REMOVE_MEMBER_SUCCESS: {
      return {
        ...state,
        isRemovingMember: false
      };
    }
    case REMOVE_MEMBER_FAILURE: {
      return {
        ...state,
        isRemovingMember: false,
        error: action.error
      };
    }
    case IS_CREATING_CHATROOM_MESSAGE: {
      return {
        ...state,
        isCreatingChatroomMessage: true,
        error: ''
      };
    }
    case CREATE_CHATROOM_MESSAGE_SUCCESS: {
      return {
        ...state,
        isCreatingChatroomMessage: false
      };
    }
    case CREATE_CHATROOM_MESSAGE_FAILURE: {
      return {
        ...state,
        isCreatingChatroomMessage: false,
        error: action.error
      };
    }
    case IS_FETCHING_USER_CHATROOMS: {
      return {
        ...state,
        isFetchingUserChatrooms: true,
        error: ''
      };
    }
    case FETCH_USER_CHATROOMS_SUCCESS: {
      return {
        ...state,
        isFetchingUserChatrooms: false,
        chatrooms: action.chatrooms
      };
    }
    case FETCH_USER_CHATROOMS_FAILURE: {
      return {
        ...state,
        isFetchingUserChatrooms: false,
        error: action.error
      };
    }
    case IS_FETCHING_CHATROOM_MEMBERS: {
      return {
        ...state,
        isFetchingChatroomMembers: true,
        error: ''
      };
    }
    case FETCH_CHATROOM_MEMBERS_SUCCESS: {
      return {
        ...state,
        isFetchingChatroomMembers: false,
        members: action.members
      };
    }
    case FETCH_CHATROOM_MEMBERS_FAILURE: {
      return {
        ...state,
        isFetchingChatroomMembers: false,
        error: action.error
      };
    }
    case IS_FETCHING_CHATROOM_MESSAGES: {
      return {
        ...state,
        isFetchingChatroomMessages: true,
        error: ''
      };
    }
    case FETCH_CHATROOM_MESSAGES_SUCCESS: {
      return {
        ...state,
        isFetchingChatroomMessages: false,
        chatroomMessages: action.chatroomMessages
      };
    }
    case FETCH_CHATROOM_MESSAGES_FAILURE: {
      return {
        ...state,
        isFetchingChatroomMessages: false,
        error: action.error
      };
    }
    case IS_FETCHING_ALL_ROOMS: {
      return {
        ...state,
        isFetchingAllRooms: true,
        error: ''
      };
    }
    case FETCH_ALL_ROOMS_SUCCESS: {
      return {
        ...state,
        isFetchingAllRooms: false,
        allRooms: action.allRooms 
      };
    }
    case FETCH_ALL_ROOMS_FAILURE: {
      return {
        ...state,
        isFetchingAllRooms: false,
        error: action.error
      };
    }
    case IS_JOINING_ROOM: {
      return {
        ...state,
        isJoiningRoom: true,
        error: ''
      };
    }
    case JOIN_ROOM_SUCCESS: {
      return {
        ...state,
        isJoiningRoom: false
      };
    }
    case JOIN_ROOM_FAILURE: {
      return {
        ...state,
        isJoiningRoom: false,
        error: action.error
      };
    }
    case IS_SEARCHING_ROOM_MEMBERS: {
      return {
        ...state,
        isSearchingRoomMembers: true,
        error: ''
      };
    }
    case SEARCH_ROOM_MEMBERS_SUCCESS: {
      return {
        ...state,
        isSearchingRoomMembers: false,
        roomMembersResult: action.roomMembersResult
      };
    }
    case SEARCH_ROOM_MEMBERS_FAILURE: {
      return {
        ...state,
        isSearchingRoomMembers: false,
        error: action.error
      };
    }
    case IS_CHECKING_BALANCE: {
      return {
        ...state,
        isCheckingBalance: true,
        balanceError: ''
      };
    }
    case CHECK_BALANCE_SUCCESS: {
      return {
        ...state,
        isCheckingBalance: false,
        balance: action.balance,
        balanceError: ''
      };
    }
    case CHECK_BALANCE_FAILURE: {
      return {
        ...state,
        isCheckingBalance: false,
        balanceError: action.error
      };
    }
    case IS_FETCHING_MESSAGE: {
      return {
        ...state,
        isFetchingMessage: true,
        error: ''
      };
    }
    case FETCH_MESSAGE_SUCCESS: {
      return {
        ...state,
        isFetchingMessage: false,
        message: action.message
      };
    }
    case FETCH_MESSAGE_FAILURE: {
      return {
        ...state,
        isFetchingMessage: false,
        error: action.error
      };
    }

    case IS_FETCHING_ROOM_MESSAGE: {
      return {
        ...state,
        isFetchingRoomMessage: true,
        error: ''
      };
    }
    case FETCH_ROOM_MESSAGE_SUCCESS: {
      return {
        ...state,
        isFetchingRoomMessage: false,
        roomMessage: action.message
      };
    }
    case FETCH_ROOM_MESSAGE_FAILURE: {
      return {
        ...state,
        isFetchingRoomMessage: false,
        error: action.error
      };
    }
    case IS_LEAVING_ROOM: {
      return {
        ...state,
        isLeavingRoom: true
      };
    }
    case LEAVE_ROOM_SUCCESS: {
      return {
        ...state,
        isLeavingRoom: false
      };
    }
    case LEAVE_ROOM_FAILURE: {
      return {
        ...state,
        isLeavingRoom: false,
        error: action.error
      };
    }
    default: {
      return state;
    }
  }
}
