import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

const Header = () => {
  return (
    <header className='flex justify-between bg-white py-4 px-8 rounded-lg'>
      <p className='uppercase'>Kontorkollektiv</p>
      <Link href='#'>Kontakt</Link>
    </header>
  );
};

export default Header;
