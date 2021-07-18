import Image from "next/image";

import ProfilePic from "../public/profile.png";
import { SmallButton } from "./StyledComponents";
import styles from "@/styles/Suggestion.module.scss";

interface People {
  image: string;
  username: string;
  name: string;
}

const suggestedPeople: People[] = [
  {
    image: "image-url",
    username: "firstname",
    name: "First name",
  },
  {
    image: "image-url",
    username: "secondname",
    name: "Second name",
  },
  {
    image: "image-url",
    username: "thirdname",
    name: "Third Name",
  },
  {
    image: "image-url",
    username: "fourthname",
    name: "Fourth Name",
  },
];

export default function Suggestions() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>People you may know</div>
      <div className={styles.suggestions}>
        {suggestedPeople.map((user) => (
          <div key={user.username} className={styles.individualContainer}>
            <Image src={ProfilePic} alt={user.username} />
            <div className={styles.nameContainer}>
              {user.name}
              <SmallButton>Add friend</SmallButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
