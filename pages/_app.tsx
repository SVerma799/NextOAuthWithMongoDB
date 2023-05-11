import "@/styles/globals.css";
import { SessionProvider } from "next-auth/react";
import { ChakraProvider, Grid } from "@chakra-ui/react";

import type { AppProps } from "next/app";

export default function App({
  Component,
  pageProps: { session, ...pageProps },
}: AppProps) {
  return (
    <SessionProvider>
      <ChakraProvider>
        <Grid
          sx={{
            h: "100vh",
            placeItems: "center",
            px: "5rem",
            textAlign: "center",
          }}
        >
          <Component {...pageProps} />
        </Grid>
      </ChakraProvider>
    </SessionProvider>
  );
}
