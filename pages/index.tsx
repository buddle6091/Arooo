import { useState, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import axios from "axios";

import { InContent } from "@/Interface/content";

export default function Home() {
  const [content, setContent] = useState<InContent[]>([]);

  const router = useRouter();
  console.log(router);

  const routeDetail = (id: string) => {
    router.push({
      pathname: `/details/${id}`,
      query: {
        contentId: id,
      },
    });
  };

  /* get the contents */
  const getApi = async () => {
    try {
      const res = await axios.get("http://localhost:3001/content");
      const data = res.data;
      console.log(data);
      setContent(data);
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
    const res = await axios.post(
      `http://localhost:3001/content/${contentId}/likes`,
      {
        likes: 1,
      }
    );
    console.log(res.data);
  };

  /* const likeHandler = async (payload: any) => {
    const like = await axios.post(`http://localhost:3001/content/${contentId}/like`, payload.likes );
  }; */

  useEffect(() => {
    getApi();
  }, []);
  return (
    <MainContainer>
      <MainTitle>인기 급상승 컨텐츠</MainTitle>
      <ItemContainer>
        {/* // 콘텐츠 타이틀, 좋아요 버튼, 좋아요 */}
        {content?.map((item) => (
          <Item key={item.id} onClick={() => routeDetail(item.id)}>
            <div>
              <ContentTitle>{item.title}</ContentTitle>
              <TotalLike>♥️ {item.likes}</TotalLike>
            </div>
            <LikeBtn
              onClick={(e) => {
                e.stopPropagation();
                testApi(item.id);
              }}>
              🥰
            </LikeBtn>
          </Item>
        ))}
      </ItemContainer>
    </MainContainer>
  );
}

const MainContainer = styled.div`
  width: 100%;
  height: auto;
  margin-top: 10px;
`;

const MainTitle = styled.h3`
  margin-left: 5px;
  color: #000000;
`;

const ItemContainer = styled.div`
  width: 100%;
  height: auto;
  justify-content: center;
  flex-direction: column;
  display: flex;
`;

const Item = styled.div`
  width: 90%;
  height: 200px;
  margin-top: 10px;
  border-radius: 25px;
  background-color: #cdcdcc;
  position: relative;
`;

const ContentTitle = styled.h3`
  margin-top: 40%;
  margin-left: 20px;
  position: absolute;
`;

const TotalLike = styled.div``;

const LikeBtn = styled.button`
  width: 50px;
  height: 50px;
  font-size: ${(props) => props.theme.pixelToRem(30)};
  background-color: #efd666;
  float: right;
  display: flex;
`;
