'use client'
import Nav from "./components/nav"

import 'moment/locale/lv'

import { Syne } from 'next/font/google';

import Searchspecialist from "./components/search";

const syne = Syne({ subsets: ['latin'], weight: "700" });
import Head from "next/head";

export default function Home() {


  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Nav />

      <section id="homefirst" className="home">
        <h1 className={` ${syne.className}`}>Atrodiet savu labsajūtas speciālistu jebkurā laikā, jebkurā vietā!</h1>
        <Searchspecialist />
      </section>
    </>
  );
}
