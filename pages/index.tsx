import { useState, useEffect, MouseEventHandler } from "react";
import { useRouter } from "next/router";
import styled from "styled-components";
import axios from "axios";

import { InContent } from "@/Interface/content";

export default function Home() {
  const [content, setContent] = useState<InContent[]>([]);
  /* 현재 타겟팅 되는 아이템의 likes를 확인해보자 */
  const [likes, setLikes] = useState(0);

  const router = useRouter();
  console.log(router);

  useEffect(() => {
    getApi();
  }, []);

  const routeDetail = (id: string) => {
    router.push({
      pathname: `/detail/${id}`,
    });
  };

  /* get the contents 
  likes 요소가 변경 될때마다, rerendering => 의존성 배열
  */
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

  /* 아이템이 찍히는지 확인 */
  const testApi = async (contentId: string) => {
    try {
      const res = await axios.get(`http://localhost:3001/content/${contentId}`);
      const data2 = res.data;
      console.log(data2);
    } catch (err) {
      console.log(err);
    }
  };

  /* :contentId/like 로 post를 활용하여 likes를 증가 => 즉, 백엔드 like 라우터가 { id } 로 엮여있고,
  백엔드의 로직 상으로 해당 라우터에 요청이 가해지면 +1이 되도록 설계 
  에측된 바로는 params로 넘기면 body로 payload 값을 보내지 않아도 요청이 온다면 likes에 계속해서 증가되도록 설계가 되어 있을듯
  */
  const postLike = async (contentId: string) => {
    axios
      .post(`http://localhost:3001/content/${contentId}/likes`)
      .then((res) => {
        /* like 값을 받음 */
        setLikes(res.data);
        console.log(likes);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <MainContainer>
      <MainTitle>인기 급상승 컨텐츠</MainTitle>
      <ItemContainer>
        {/* // 콘텐츠 타이틀, 좋아요 버튼, 좋아요 */}
        {content?.map((item) => (
          <Item key={item.id} onClick={() => routeDetail(item.id)}>
            <Info>
              <ContentTitle>{item.title}</ContentTitle>
              <TotalLike>♥️ {item.likes}</TotalLike>
            </Info>
            <LikeBtn
              onClick={(e) => {
                e.stopPropagation();
                postLike(item.id);
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
  padding: 10px;
  margin-top: 10px;
  border-radius: 25px;
  background-color: #cdcdcc;
  position: relative;
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

const ContentTitle = styled.h3`
  /* margin-top: 40%;
  margin-left: 20px; */
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
