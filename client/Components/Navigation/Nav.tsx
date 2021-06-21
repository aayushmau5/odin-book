import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { FaBook } from "react-icons/fa";

import { Desktop, Tablet, Mobile } from "../Responsive/DeviceWidth";
import MobileNav from "./Mobile";
import styles from "../../styles/Nav.module.scss";

/**
 * Breakpoints
 * Small - 544px
 * Medium - 768px
 * Large - 1012px
 */

export default function Nav() {
  const [mounted, setMounted] = useState(false);
  const router = useRouter();

  useEffect(() => {
    /* 
    This will cause to render this component only on the client side.
    Reason: Because of SSR, `react-responsive` cannot determine the width/type of device on the server
    there by causing difference between Client and Server output.

    Why use? Because for the time being, this component is pretty lightweight and I suspect it will not cause any performance issues.

    Think about alternatives: https://github.com/artsy/fresnel
    */
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <div className={styles.Nav}>
          <FaBook className={styles.Nav__logo} />
          <Desktop> Desktop things</Desktop>
          <Tablet>
            <MobileNav pageRoute={router.route} />
          </Tablet>
          <Mobile>
            <MobileNav pageRoute={router.route} />
          </Mobile>
        </div>
      )}
    </>
  );
}
