export interface PostInput {
  text: string;
  image: string;
}

export interface PostComment {
  postId: string;
  data: string;
}

export interface CommentComment extends PostComment {
  commentId: string;
}

export interface SelectionsOnPost {
  author?: boolean;
  user?: boolean;
}
