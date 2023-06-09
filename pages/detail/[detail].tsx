import React, { useState, useEffect } from "react";
import Link from "next/link";
import axios from "axios";
import styled from "styled-components";

import { useRouter } from "next/router";
import { InContent } from "@/Interface/content";

function detail() {
  const [list, setList] = useState<InContent>();
  const [likes, setLikes] = useState(0);

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

  const testApi = async (contentId: string) => {
    try {
      const res = await axios.get(`http://localhost:3001/content/${contentId}`);
      const data2 = res.data;
      console.log(data2);
    } catch (err) {
      console.log(err);
    }
  };

  const postLike = async (contentId: string) => {
    axios
      .post(`http://localhost:3001/content/${contentId}/likes`)
      .then((res) => {
        /* like 값을 받음 */
        setLikes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  /* useEffect(() => {
    getApi();
  }, []); */

  return (
    <Thumbnail>
      {/* 콘텐츠 타이틀, 콘텐츠 본문, 좋아요 버튼, 좋아요 수 */}
      {/* <h2>{list.title}</h2>
      <h3>{list.content}</h3> */}
      <LikeBox>dd</LikeBox>
      <LikeBtn
        onClick={(e) => {
          e.stopPropagation();
          //testApi(item.id);
        }}>
        🥰
      </LikeBtn>
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
`;

const LikeBtn = styled.button`
  width: 50px;
  height: 50px;
  font-size: ${(props) => props.theme.pixelToRem(30)};
  background-color: #efd666;
  float: right;
  display: flex;
`;
