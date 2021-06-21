import { useRouter } from "next/router";
import { FaBook } from "react-icons/fa";

import MobileNav from "./Mobile";
import styles from "../../styles/Nav.module.scss";
import { MediaContextProvider, Media } from "../../utils/Media";

export default function Nav() {
  const router = useRouter();
  return (
    <>
      <div className={styles.Nav}>
        <FaBook className={styles.Nav__logo} />
        <MediaContextProvider>
          <Media greaterThanOrEqual="lg"> Desktop things</Media>
          <Media lessThan="md">
            <MobileNav pageRoute={router.route} />
          </Media>
        </MediaContextProvider>
      </div>
    </>
  );
}
