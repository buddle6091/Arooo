import React from "react";
import Link from "next/link";
import styled from "styled-components";

function Header() {
  return (
    <Head>
      <Link href="/">
        <div className="icon"> Header (Home)</div>
      </Link>
    </Head>
  );
}

export default Header;

const Head = styled.div`
  width: 100%;
  height: 5vh;
  background-color: #cccccc;
  user-select: none;
  .icon {
    font-size: ${(props) => props.theme.pixelToRem(30)};
  }
`;
