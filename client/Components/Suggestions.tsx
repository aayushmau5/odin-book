import { SmallButton } from "./StyledComponents";
import styles from "@/styles/Suggestion.module.scss";

interface People {
  image: string;
  username: string;
  name: string;
}

const suggestPeople: People[] = [];

export default function Suggestions() {
  return (
    <div className={styles.container}>
      <div className={styles.heading}>People you may know</div>
      <div className={styles.suggestions}>
        {suggestPeople.map((user) => (
          <div key={user.username}>
            <div>image</div>
            <div>
              {user.name}
              <SmallButton>Add friend</SmallButton>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
