export interface CommentsInterface {
  _id: string;
  content: string;
  score: number;
  user: [UserInterface];
  replies: [RepliesInterface];
  createdAt: string;
}

export interface UserInterface {
  image: string;
  username: string;
}

export interface RepliesInterface {
  _id: string;
  content: string;
  score: number;
  replyingTo: string;
  user: [UserInterface];
  createdAt: string;
}
