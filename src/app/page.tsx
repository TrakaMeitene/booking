'use client'
import React from "react"
import Nav from "./components/nav"

import 'moment/locale/lv'

import { Syne } from 'next/font/google';
import Footer from "./business/components/footer";
import Searchspecialist from "./components/search";

const syne = Syne({ subsets: ['latin'], weight: "700"});

export default function Home() {


  return (
    <>
      <Nav />

      <section id="homefirst" className="home">
        <h1 className={` ${syne.className}`}>Atrodiet savu labsajūtas speciālistu jebkurā laikā, jebkurā vietā!</h1>
       <Searchspecialist />
      </section>
      <Footer/>
    </>
  );
}
