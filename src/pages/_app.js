import "@/styles/globals.css";
import Head from "next/head";
import { Toaster } from "sonner";

export default function App({ Component, pageProps }) {
  return <>
      <Head>
        <title>Multiverse Search Engine</title>
        <meta name="description" content="One search bar. Endless universes. Find characters, locations, and episodes instantly from the Rick & Morty multiverse." />
      </Head>
      <Component {...pageProps} />
      <Toaster position="top-right" richColors={true} expand={true} gap={5} />
    </>
}
