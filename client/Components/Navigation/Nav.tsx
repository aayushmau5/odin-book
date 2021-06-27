import { useRouter } from "next/router";
import { FaBook } from "react-icons/fa";

import MobileNav from "./Mobile";
import DesktopNav from "./Desktop";
import { MediaContextProvider, Media } from "../Responsive/Media";
import styles from "../../styles/Nav.module.scss";

export default function Nav() {
  const router = useRouter();
  return (
    <>
      <div className={styles.Nav}>
        <FaBook className={styles.Nav__logo} />
        <MediaContextProvider>
          <Media className={styles.fresnel} greaterThanOrEqual="md">
            <DesktopNav />
          </Media>
          <Media lessThan="md">
            <MobileNav pageRoute={router.route} />
          </Media>
        </MediaContextProvider>
      </div>
    </>
  );
}
