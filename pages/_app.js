import "tailwindcss/tailwind.css";
import "../public/styles/global.style.css";
import Container from "../components/Container";
import { useEffect } from "react";
import { useRouter } from "next/router";
import GlobalContext from "../context/GlobalContext";

function MyApp({ Component, pageProps }) {
  const router = useRouter();

  const handleRouteChange = (url) => {
    window.gtag("config", "G-PBYZCF20MG", {
      page_path: url,
    });
  };

  useEffect(() => {
    router.events.on("routeChangeComplete", handleRouteChange);
    return () => {
      router.events.off("routeChangeComplete", handleRouteChange);
    };
  }, [router.events]);

  return (
    <GlobalContext props={pageProps}>
      <Container>
        <Component {...pageProps} />
      </Container>
    </GlobalContext>
  );
}

export default MyApp;
