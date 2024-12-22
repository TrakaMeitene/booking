'use client'
import Navigation from './components/nav';
import Home from './components/home';
import Features from './components/features';
import Item from './components/item';
import Pricing from './components/pricing';


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


