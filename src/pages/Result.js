// 추천 결과 페이지
import React, { useState } from "react";
import { useSelector } from "react-redux";
import styled from "styled-components";

import { Grid } from "../elements";
import ResultSlider from "../components/ResultSlider";
import PercentResult from "../components/PercentResult";
import ResultTip from "../components/ResultTip";

import { history } from "../redux/configureStore";

import FoodTip from "../image/FoodTip.svg";

const Result = () => {
  const [openTip, setOpenTip] = useState(true);

  // 랭킹 데이터
  const data = useSelector((state) => state.food.result);

  return (
    <React.Fragment>
      <Container>
        <ResultContainer>
          <Grid padding="2.5rem 2rem 1.5rem">
            <Title>오늘은 이거 어때?</Title>
          </Grid>
          {openTip ? (
            <TipWrap>
              <div>
                <img src={FoodTip} alt="my pick tip" />
              </div>
              <div>
                <span>음식 하단에 있는 아이콘을 누르면 기록장에 저장돼요!</span>
              </div>
            </TipWrap>
          ) : (
            <TipWrap>
              <div>
                <img src={FoodTip} alt="my pick tip" />
              </div>
              <div>
                <span>
                  음식 하단 아이콘을 한번 더 누르면 기록장으로 이동해요!
                </span>
              </div>
            </TipWrap>
          )}
          {/* 결과 페이지 슬라이더 */}
          <ResultSlider data={data} setOpenTip={setOpenTip} />
        </ResultContainer>
        <PercentContainer>
          <Grid is_flex padding="0 2rem">
            <SubText>밥씨가 알려주는 퍼센트!</SubText>
            <ToolTipWrap>
              <ResultTip />
            </ToolTipWrap>
          </Grid>
          <PercentWrap>
            <PercentResult data={data} />
          </PercentWrap>
          <div
            style={{
              color: "#C4C4C4",
              padding: "0 2rem 0 2.5rem",
              fontSize: "1.2rem",
              lineHeight: "1.6rem",
            }}
          >
            밥씨는 AI 기반 추천 알고리즘으로 여러분의 음식 결정을 도와드리고
            있어요. 결과에 대한 자세한 설명은 툴팁을 확인해 주세요.
          </div>
        </PercentContainer>
        <ButtonContainer>
          <SubText>더 많은 음식 보러 가기</SubText>
          <SearchButton
            onClick={() => {
              history.push("/search");
            }}
          >
            직접 검색하러 가기
          </SearchButton>
          <SubText>원하는 결과가 아니신가요?</SubText>
          <ReTryButton
            onClick={() => {
              window.location.replace("/recommendation");
            }}
          >
            테스트 다시하기
          </ReTryButton>
        </ButtonContainer>
      </Container>
    </React.Fragment>
  );
};

const TipWrap = styled.div`
  display: flex;
  justify-content: flex-start;
  margin: 0rem 2rem 2rem;
  background-color: #f4f0ea;
  padding: 1.2rem 2rem;
  & img {
    height: 1.3rem;
    padding: 0 1rem 0 0;
    vertical-align: top;
  }
  & span {
    font-size: 11px;
    line-height: 14px;
  }
`;

const ToolTipWrap = styled.div`
  cursor: pointer;
`;

const PercentWrap = styled.div`
  background-color: #f6f6f6;
  padding: 1.4rem 1.2rem;
  margin: 0.5rem 2rem 1rem;
  border-radius: 1rem;
`;

const Title = styled.h2`
  font-size: 2.4rem;
  font-weight: 700;
`;

const ReTryButton = styled.button`
  font-weight: 700;
  color: #ffffff;
  background-color: #ffa012;
  border: none;
  border-radius: 1rem;
  width: 32rem;
  cursor: pointer;
  padding: 1.7rem 0;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const SearchButton = styled.button`
  font-weight: 700;
  color: #ffa012;
  background-color: white;
  border: 1px solid #ffa012;
  border-radius: 1rem;
  width: 32rem;
  cursor: pointer;
  padding: 1.7rem 0;
  margin: 0 0 2rem 0;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const Container = styled.div`
  width: 100%;
`;

const ResultContainer = styled.div`
  margin: 0 auto;
  width: 36rem;
  @media ${(props) => props.theme.mobile} {
    width: 100vw;
  }
`;

const PercentContainer = styled.div`
  margin: 4rem auto;
  width: 36rem;
  @media ${(props) => props.theme.mobile} {
    width: 100vw;
  }
`;

const ButtonContainer = styled.div`
  margin: 4rem auto 4rem auto;
  width: 36rem;
  text-align: center;
  @media ${(props) => props.theme.mobile} {
    width: 90vw;
    padding: 0 5vw;
  }
`;

const SubText = styled.div`
  font-weight: 700;
  font-size: 1.8rem;
  padding: 0.5rem;
`;

export default Result;
