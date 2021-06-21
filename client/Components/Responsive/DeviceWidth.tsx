import { useMediaQuery } from "react-responsive";

export function Desktop({ children }) {
  const useDesktopMediaQuery = () =>
    useMediaQuery({
      minWidth: 769,
    });

  return useDesktopMediaQuery() ? children : null;
}

export function Tablet({ children }) {
  const useTabletMediaQuery = () =>
    useMediaQuery({
      minWidth: 545,
      maxWidth: 768,
    });
  return useTabletMediaQuery() ? children : null;
}

export function Mobile({ children }) {
  const useMobileMediaQuery = () =>
    useMediaQuery({
      maxWidth: 544,
    });

  return useMobileMediaQuery() ? children : null;
}
