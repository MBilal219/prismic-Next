"use client";
import React, { useState } from "react";
import WordMark from "@/components/WordMark";
import { Content, asLink } from "@prismicio/client";
import Link from "next/link";
import { PrismicNextImage, PrismicNextLink } from "@prismicio/next";
import ButtonLink from "@/components/ButtonLink";
import { MdMenu, MdClose } from "react-icons/md";
import clsx from "clsx";
import { usePathname } from "next/navigation";

type NavbarProps = {
  navData: Content.MainDocument;
};

const Navbar = ({ navData }: NavbarProps) => {
  const [open, setOpen] = useState(false);

  const pathName = usePathname();
  return (
    <nav className="px-4 py-4 md:px-6 md:py-6" aria-label="Main">
      <div className="mx-auto flex max-w-6xl flex-col justify-between py-2 font-medium text-white md:flex-row md:items-center">
        <div className="flex items-center justify-between">
          <Link href={"/"} className="z-50">
            {navData.data.fallback_og_image.url ? (
              <PrismicNextImage
                field={navData.data.fallback_og_image}
                width={170}
                height={46}
              />
            ) : (
              <WordMark />
            )}
            <span className="sr-only">Glisten.ai Home Page</span>
          </Link>
          <button
            type="button"
            className="block p-2 text-3xl text-white md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(true)}
          >
            <MdMenu />
            <span className="sr-only">Open menu</span>
          </button>
        </div>
        {/* Mobile Nav */}

        <div
          className={clsx(
            "ga-4 fixed bottom-0 left-0 right-0 top-0 z-40 flex flex-col items-end gap-4 bg-[#070815] pr-4 pt-14 transition-transform duration-300 ease-in-out motion-reduce:transition-none md:hidden",
            open ? "translate-x-0" : "translate-x-[100%]",
          )}
        >
          <button
            type="button"
            className="fixed right-4 top-4 mb-8 block p-2 text-3xl text-white md:hidden"
            aria-expanded={open}
            onClick={() => setOpen(false)}
          >
            <MdClose />
            <span className="sr-only">Open menu</span>
          </button>

          <div className="mt-4 grid justify-items-end gap-8">
            {navData.data.navigation.map((item, idx) =>
              item.cta_button ? (
                <ButtonLink
                  key={idx}
                  field={item.link}
                  onClick={() => setOpen(false)}
                  aria-current={
                    pathName.includes(asLink(item.link) as string)
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </ButtonLink>
              ) : (
                <PrismicNextLink
                  key={idx}
                  field={item.link}
                  className="block px-3 text-3xl first:mt-8"
                  onClick={() => setOpen(false)}
                  aria-current={
                    pathName.includes(asLink(item.link) as string)
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </PrismicNextLink>
              ),
            )}
          </div>
        </div>

        {/* Desktop Nav */}
        <ul className="hidden gap-6 md:flex">
          {navData.data.navigation.map((item, idx) =>
            item.cta_button ? (
              <li key={idx}>
                <ButtonLink
                  field={item.link}
                  aria-current={
                    pathName.includes(asLink(item.link) as string)
                      ? "page"
                      : undefined
                  }
                >
                  {item.label}
                </ButtonLink>
              </li>
            ) : (
              <li key={idx + "label"}>
                {/* Prismic link only for specific links that are coming from prismic */}
                <PrismicNextLink
                  field={item.link}
                  className="inline-flex min-h-11 items-center"
                  aria-current={
                    pathName.includes(asLink(item.link) as string)
                      ? "page"
                      : undefined
                  }
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
