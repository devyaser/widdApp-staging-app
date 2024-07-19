import { TOPICS_AUDIENCE, TOPICS_CATEGORIES, TOPIC_STATUS } from "utils/common";
import { string } from "yup";

declare global {
  type ReactNode =
    | React.ReactElement<unknown>
    | FunctionComponent<unknown>
    | React.ComponentClass<unknown>
    | null;

  type KeyValuePair = {
    [key: string]: any;
  };

  interface IBase extends Record<string, unknown> {
    _id: string;
    id?: string;
    createdAt?: string;
    updatedAt?: string;
  }

  interface IPagination {
    page: number | string;
    pageSize: number | string;
  }

  interface ISignUpBody {
    email?: string;
    phoneNo?: string;
    password: string;
    confirmPassword: string;
    userName: string;
    dob: string;
  }

  interface ILoginBody {
    userName: string;
    password: string;
  }

  interface IUser extends IBase {
    isVerified: boolean;
    isDisabled: boolean;
    userName: string;
    dob: string;
    phoneNo: string;
    displayName?: string;
    profileImageUrl: string;
  }

  interface IUserToBeVerified {
    userId: string;
    sendOn: string;
  }

  interface IMember extends IBase {
    userId: string;
    topicId: string;
    topicCreatedBy: string;
  }

  interface ITopic extends IBase {
    type: string[];
    thumbnailUrl: string;
    topicName: string;
    topicRules: string;
    mainDescription: string;
    uploadImagesUrl: string[];
    audience: TOPICS_AUDIENCE;
    status: TOPIC_STATUS;
    createdAt: string;
    createdBy: Partial<IUser>[];
    members: IMember[];
    isPinned?: boolean;
    isJoined?: boolean;
    isOwned?: boolean;
    isPrivate?: boolean
  }

  interface IMessage extends IBase {
    context: string;
    sender: Partial<IUser>;
  }

  interface IChat {
    topicId: string;
    messages: IMessage[];
  }

  interface IList extends IBase {
    name: string;
  }

  interface IFollowedUser {
    _id: string
    followedBy: IUser
  }
  
}

export {};
