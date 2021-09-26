import Image from "next/image";
import { BiLike, BiComment } from "react-icons/bi";

import styles from "@/styles/Feed.module.scss";
import { SocialButton } from "../StyledComponents";
import ProfilePic from "@/public/profile.png";

interface PostData {
  id: string;
  image?: string;
  data?: string;
  createdAt: string;
  like: number;
  comments: number;
  author: {
    username: string;
    name: string;
    image?: string;
  };
}

export default function Post({
  postData,
  showLikeAndComment = true,
}: {
  postData: PostData;
  showLikeAndComment?: boolean;
}) {
  return (
    <div className={styles.feedContainer}>
      <div className={styles.userInfo}>
        <Image src={ProfilePic} alt={postData.author.username} />
        <div className={styles.nameContainer}>
          <div>{postData.author.name}</div>
          <div>{postData.createdAt}</div>
        </div>
      </div>
      <div className={styles.postContainer}>
        <div>{postData.data}</div>
        <div className={styles.postImageContainer}>
          <Image src={ProfilePic} alt={postData.author.username} />
        </div>
      </div>
      <div className={styles.socialInfo}>
        <div>{postData.like} likes</div>
        <div>{postData.comments} Comments</div>
        {showLikeAndComment ? (
          <>
            <div>
              <LikeButton />
            </div>
            <div>
              <CommentButton />
            </div>
          </>
        ) : null}
      </div>
    </div>
  );
}

function LikeButton() {
  return (
    <SocialButton>
      <BiLike />
      Like
    </SocialButton>
  );
}

function CommentButton() {
  return (
    <SocialButton>
      <BiComment />
      Comment
    </SocialButton>
  );
}
