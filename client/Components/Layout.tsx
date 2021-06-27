import { useRouter } from "next/router";
import Nav from "./Navigation/Nav";

export default function Layout({ children }) {
  const { route } = useRouter();

  return (
    <>
      {route !== "/" && route !== "/_error" ? <Nav /> : null}
      {children}
    </>
  );
}
