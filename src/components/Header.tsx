import React from "react";
import WordMark from "@/components/WordMark";
import { createClient } from "@/prismicio";
import Navbar from "@/components/Navbar";

type Props = {};

const Header = async (props: Props) => {
  const client = createClient();
  const main = await client.getSingle("main");
  return (
    <header>
      <Navbar navData={main} />
    </header>
  );
};

export default Header;
