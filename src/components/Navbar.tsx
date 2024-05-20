"use client";
import React from "react";
import WordMark from "@/components/WordMark";
import { Content } from "@prismicio/client";
import Link from "next/link";
import { PrismicNextLink } from "@prismicio/next";
import ButtonLink from "@/components/ButtonLink";

type NavbarProps = {
  navData: Content.MainDocument;
};

const Navbar = ({ navData }: NavbarProps) => {
  return (
    <nav className="px-4 py-4 md:px-6 md:py-6" aria-label="Main">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <Link href={"/"}>
          <WordMark />
          <span className="sr-only">Glisten.ai Home Page</span>
        </Link>
        <ul className="flex gap-6">
          {navData.data.navigation.map((item, idx) =>
            item.cta_button ? (
              <li key={idx}>
                <ButtonLink field={item.link}>{item.label}</ButtonLink>
              </li>
            ) : (
              <li key={idx + "label"}>
                {/* Prismic link only for specific links that are coming from prismic */}
                <PrismicNextLink
                  field={item.link}
                  className="inline-flex min-h-11 items-center"
                >
                  {item.label}
                </PrismicNextLink>
              </li>
            ),
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
