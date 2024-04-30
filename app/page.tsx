"use client";

import Hero from "@/components/Hero";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function Home() {
  const beboere = [
    {
      firma: "Green Survey",
    },
    {
      firma: "Rethink Event",
    },
    { firma: "Don't Waste It" },
    { firma: "Help2Comply" },
    { firma: "Four Squares" },
  ];

  return (
    <main className='page-wrap m-4'>
      <section
        id='hero'
        className='wide rounded-sm bg-two h-[98svh] md:h-[96svh] 2xl:h-[88svh] p-4 relative mb-16 md:mb-32 flex items-center justify-center'
      >
        <header className='wide absolute rounded-sm h-16 top-4 right-4 left-4 bg-white flex items-center justify-between px-4 py-2 '>
          <label className='uppercase max-md:mx-auto '>Kontorkolletiv</label>{" "}
          <Link className='hidden md:block' href='#'>
            <p className='uppercase text-base font-medium tracking-widest '>
              Kontakt
            </p>
          </Link>
        </header>
        <div className='block text-center'>
          <label className='uppercase text-white'>Velkommen I</label>
          <div className='relative max-w-3xl mx-auto'>
            <Image
              src={"/milj.svg"}
              width={768}
              height={500}
              alt={"Logo for I Miljøet"}
              className='mt-14'
            />
          </div>
        </div>
      </section>
      <section className='wide border-r-2 md:border-r-8 border-red-500 pr-2 md:pr-8 mb-16 md:mb-32'>
        <div>
          <p>
            Centralt placeret i Århus C finder du kontorkollektivet ”I miljøet”.
            Stedet blev skabt midt januar 2024, med en drøm og vision om, at
            skabe et hverdagsmiljø for grønne virksomheder og iværksættere.
            Målet er, at kunne spare, vidensdele og inspirere hinanden ud fra
            forskellige fagligheder og ekspertiser – med et fælles grønt
            omdrejningspunkt.
          </p>
        </div>
      </section>
      <section className='wide grid grid-cols-subgrid gap-4 border-r-8 border-yellow-500 pr-8 mb-16 md:mb-32'>
        <div className='flex flex-col lg:flex-row justify-between gap-8 lg:gap-16'>
          <div className='w-full max-w-lg'>
            <h4 className='border-b-2 border-orange-500'>Beboere</h4>
          </div>
          <ul className='space-y-4 group'>
            {beboere.map((beboer) => (
              <li
                key={beboer.firma}
                className='transition-opacity duration-300 ease-in-out'
              >
                <Link href='#'>
                  <h2 className='hover:scale-125 '>{beboer.firma}</h2>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
      <section className='col-span-12'>Gallery</section>
    </main>
  );
}
