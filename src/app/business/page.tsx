'use client'
import Navigation from './components/nav';
import Home from './components/home';
import Features from './components/features';
import Item from './components/item';
import Pricing from './components/pricing';
import { Metadata } from 'next';

export default function Business() {
  return (
<div className='landing'>
<Navigation/>
<Home/>
<Features/>
<Item/>
<Pricing/>
</div>
  );
}

export const metadata: Metadata = {
  title: "Pieraksts Pie",
  description: "Rezervāciju sistēma pakalpojumu sniedzējiem Latvijā.",
  openGraph: {
    title: "Pieraksts Pie",
    description: "Rezervāciju sistēma pakalpojumu sniedzējiem Latvijā.",
    images: "/logo1.png",
  }
};

