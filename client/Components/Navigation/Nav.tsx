import { useEffect, useState } from "react";
import { Desktop, Tablet, Mobile } from "../Responsive/DeviceWidth";

/**
 * Breakpoints
 * Small - 544px
 * Medium - 768px
 * Large - 1012px
 */

export default function Nav() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    /* 
    This will cause to render this component only on the client side.
    Reason: Because of SSR, `react-responsive` cannot determine the width/type of device on the server
    there by causing difference between Client and Server output.

    Why use? Because for the time being, this component will not cause any performance issues.

    Think about alternatives: https://github.com/artsy/fresnel
    */
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <div>
          <Desktop>Full Nav</Desktop>
          <Tablet>Nav with hamburger menu</Tablet>
          <Mobile>Nav with hamburger menu</Mobile>
        </div>
      )}
    </>
  );
}
