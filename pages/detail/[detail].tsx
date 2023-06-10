import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import { useRouter } from "next/router";
import { InDetail, InRouter } from "@/Interface/content";

function detail() {
  const [content, setContent] = useState<InDetail>();
  const [likes, setLikes] = useState(0);

  const router = useRouter();
  console.log(router.query.detail);

  const getApi = async () => {
    try {
      const res = await axios.get(
        `http://localhost:3001/content/${router.query.detail}`
      );
      const data = res.data;
      setContent(data);
      console.log(data);
    } catch (err) {
      console.log(err);
    }
  };

  /* 새로고침하면 상태를 초기화하여, params 값까지 소실. => useEffect에서 router값이 변경,
  즉 페이지가 로드되어 routing 됨을 인지하면 다시 params값을 받아와서 get 호출
    */
  useEffect(() => {
    getApi();
  }, [router, likes]);

  const postLike = async () => {
    axios
      .post(`http://localhost:3001/content/${router.query.detail}/likes`)
      .then((res) => {
        /* like 값을 받음 -> 최신화를 인지하기 위한 상태관리 */
        setLikes(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Thumbnail>
      {/* 콘텐츠 타이틀, 콘텐츠 본문, 좋아요 버튼, 좋아요 수 */}

      <ContentTitle>{content?.title}</ContentTitle>
      <Info>
        <ContentMain>{content?.content}</ContentMain>
        <TotalLike>♥️{content?.likes}</TotalLike>
      </Info>
      <LikeBtn
        onClick={() => {
          postLike();
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
  padding: 10px;
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

const Info = styled.section`
  width: 100%;
  height: 30%;
  bottom: 0;
  background-color: transparent;
  display: flex;
  position: relative;
  justify-content: space-between;
`;

const ContentTitle = styled.h2`
  /* margin-top: 40%;
  margin-left: 20px; */
`;

const ContentMain = styled.div``;

const TotalLike = styled.div``;

const LikeBtn = styled.button`
  width: 50px;
  height: 50px;
  font-size: ${(props) => props.theme.pixelToRem(30)};
  background-color: #efd666;
  float: right;
  display: flex;
`;
