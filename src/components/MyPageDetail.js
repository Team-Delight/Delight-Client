import React, { useState, useEffect } from "react";
import styled from "styled-components";
//components
import MyPagePickCard from "./MyPagePickCard";
import MyPageNoData from "./MyPageNoData";
import MainLogCard from "./MainLogCard";
import MainLogOutCard from "./MainLogOutCard";
//redux
import { useSelector, useDispatch } from "react-redux";
import { addHistory, addFrequency } from "../redux/modules/food";
//shared
import { getHistorySV, getFrequencySV } from "../shared/api";

const MyPageDetail = () => {
  const dispatch = useDispatch();
  const maniaData = useSelector((state) => state.food.frequency);
  const [historyList, setHistoryList] = useState(null);

  useEffect(() => {
    async function getHistory() {
      const { data } = await getHistorySV();
      setHistoryList(data);
      dispatch(addHistory(data)); //리덕스 저장
    }
    return getHistory();
  }, []);

  useEffect(() => {
    async function getFrequency() {
      const { data } = await getFrequencySV();
      dispatch(addFrequency([data])); //리덕스 저장
    }
    return getFrequency();
  }, []);

  return (
    <Container>
      <Grid1>
        <Title1>회원님의 음식 기록장</Title1>

        <LogOutBtn
          onClick={() => {
            return window.location.replace("/login");
          }}
        >
          logout
        </LogOutBtn>
      </Grid1>

      {maniaData && maniaData ? <MainLogCard /> : <MainLogOutCard />}

      <Title2>지난 PICK</Title2>

      {historyList ? (
        historyList.map((item) => {
          return <MyPagePickCard data={item} />;
        })
      ) : (
        <MyPageNoData />
      )}
    </Container>
  );
};

const Container = styled.div`
  flex-direction: column;
`;

const Grid1 = styled.div`
  display: flex;
  width: 100%;
  margin: 0 0 1rem;
`;

const Title1 = styled.h2`
  width: 30vw;
  height: 6.6rem;
  font-size: 2.4rem;
  font-weight: 700;
  line-height: 3rem;
  padding: 4rem 0 0 1rem;
  @media ${(props) => props.theme.mobile} {
    width: 43%;
  }
  @media ${(props) => props.theme.tablet} {
    width: 100%;
  }
`;

const Title2 = styled.h2`
  width: 350px;
  margin: 2rem auto;
  padding: 0 0 0 3rem;
  font-size: 2rem;
  font-weight: bold;
`;

const LogOutBtn = styled.button`
  display: absolute;
  padding: 0 0 0 10rem;
  font-size: 1.5rem;
  color: #c9c9c9;
  background-color: transparent;
  border: none;
  cursor: pointer;
`;

export default MyPageDetail;
