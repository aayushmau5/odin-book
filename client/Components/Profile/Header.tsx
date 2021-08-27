import Image from "next/image";

import styles from "@/styles/Profile.module.scss";
import ProfilePic from "@/public/profile.png";

interface HeaderData {
  imageUrl?: string;
  name: string;
  email: string;
}

export default function Header({ data }: { data: HeaderData }) {
  return (
    <div className={styles.header}>
      <div className={styles.profile_picture}>
        <Image src={ProfilePic} alt={data.name} />
      </div>
      <div className={styles.container}>
        <div>{data.name}</div>
        <div className={styles.email}>{data.email}</div>
      </div>
    </div>
  );
}
