import React from "react";
import { Button } from "./ui/button";

const Header = () => {
  return (
    <header className='flex justify-between items-end pt-24 pb-4'>
      <h1 className='uppercase text-4xl md:text-[8vw] md:tracking-wider leading-none'>
        kontorkollektiv
      </h1>
      <button>kontor@i-miljoet.com</button>
    </header>
  );
};

export default Header;
