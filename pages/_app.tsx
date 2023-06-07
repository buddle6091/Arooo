import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { theme } from "@/styles/Theme";
import { ThemeProvider } from "styled-components";
import Layout from "@/Layout/Layout";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ThemeProvider>
  );
}
