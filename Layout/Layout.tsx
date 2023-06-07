import React from "react";
import styled from "styled-components";

import Header from "./Header";

function Layout(props: any) {
  return (
    <Root>
      <Template>
        <Header />
        <div> {props.children} </div>
      </Template>
    </Root>
  );
}

export default Layout;

const Root = styled.div``;

const Template = styled.div`
  width: ${(props) => props.theme.pixelToRem(440)};
  min-width: ${(props) => props.theme.pixelToRem(375)};
  height: 100vh;
  margin: 0 auto;

  background-color: #ffffff;
`;
