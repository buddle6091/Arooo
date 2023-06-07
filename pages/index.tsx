import { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";

import { InContent } from "@/Interface/content";

export default function Home() {
  const [content, setContent] = useState<InContent[]>([]);

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

  useEffect(() => {
    getApi();
  }, []);
  return (
    <MainContainer>
      <MainTitle>인기 급상승 컨텐츠</MainTitle>
      <ItemContainer>
        {/* // 콘텐츠 타이틀, 좋아요 버튼, 좋아요 */}
        {content?.map((item) => (
          <Item key={item.id}>
            {item.title}
            {item.likes}
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
