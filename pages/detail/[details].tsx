import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import styled from "styled-components";

import { useRouter } from "next/router";
import { InContent } from "@/Interface/content";

function detail() {
  const [list, setList] = useState<InContent>();

  const router = useRouter();
  const contentId = router.query;
  console.log(contentId);

  const getApi = async () => {
    try {
      const res = await axios.get(`http://localhost:3001/content/${contentId}`);
      const data = res.data;
      setList(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getApi();
  }, []);

  return (
    <Thumbnail>
      {/* 콘텐츠 타이틀, 콘텐츠 본문, 좋아요 버튼, 좋아요 수 */}
      {/* <h2>{list.title}</h2>
      <h3>{list.content}</h3> */}
      <LikeBox>dd</LikeBox>
    </Thumbnail>
  );
}

export default detail;

const Thumbnail = styled.div`
  width: 100%;
  height: 65vh;
  background-color: #ffcccc;
  border-radius: 0px 0px 25px 25px;

  h2 {
  }

  h3 {
  }
`;

const LikeBox = styled.div`
  width: 100px;
  height: 50px;

  float: right;

  button {
    width: 50px;
    height: 50px;
    font-size: ${(props) => props.theme.pixelToRem(30)};
    background-color: #efd666;
    float: right;
    display: flex;
  }
`;
