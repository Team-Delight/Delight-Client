import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import styled from "styled-components";

import RefreshImg from "../image/Refresh.png";
import BobAI from "../image/BobAi.svg";

import { Grid, Button } from "../elements";

import FoodCard from "../components/FoodCard";
import SelectedFoodSlider from "../components/SelectedFoodSlider";

import { sendSelectFoodSV } from "../redux/modules/food";

import { getFoodList } from "../shared/api";

const Recommand = (props) => {
  const dispatch = useDispatch();

  const [selectedFood, setSelectedFood] = useState([]);
  const [foodsList, setFoodsList] = useState([]);

  const list = useSelector((state) => state.food.selectList);
  const foods = useSelector((state) => state.food.foodName);

  const sendSelectedFood = () => {
    dispatch(sendSelectFoodSV(selectedFood));
  };

  const handleRecommendFood = () => {
    async function getFoods() {
      const { data } = await getFoodList();
      setFoodsList(data);
    }
    return getFoods();
  };

  useEffect(() => {
    handleRecommendFood();
  }, []);

  useEffect(() => {
    setSelectedFood({ foods });
  }, [foods]);

  return (
    <React.Fragment>
      <Container>
        <ContentsContainer>
          <WrapContent>
            <Grid width="100%" height="15%" padding="2rem 2rem 2rem">
              <Grid is_flex height="70%" width="32rem">
                <AiImgWrap>
                  <img src={BobAI} alt="AI" />
                </AiImgWrap>
                <TitleWrap className="chat">
                  <Title>최근에 먹은 음식, 최대 10개 골라주세요!</Title>
                </TitleWrap>
              </Grid>
            </Grid>
            <FoodList>
              {foodsList.map((data, idx) => {
                return <FoodCard data={data} id={idx} />;
              })}
            </FoodList>
            <RefreshButton
              onClick={() => {
                handleRecommendFood();
              }}
            >
              다른 음식도 볼래요
            </RefreshButton>
          </WrapContent>

          <WrapBottomBox>
            <SelectedBox>
              <SelectedFoodSlider />
              <Grid margin="0 auto">
                {list.length > 0 ? (
                  <Button
                    bg="#FFA012"
                    border="1px solid #FFA012"
                    color="#ffffff "
                    radius="1rem"
                    width="100%"
                    height="5rem"
                    cursor
                    _onClick={() => {
                      sendSelectedFood();
                    }}
                  >
                    선택완료 ( {list.length} / 10 )
                  </Button>
                ) : (
                  <Button
                    bg="#C8C8C8"
                    border="1px solid #C8C8C8"
                    color="#ffffff "
                    radius="1rem"
                    width="100%"
                    height="5rem"
                    _onClick={() => alert("음식을 선택해주세요")}
                  >
                    선택완료
                  </Button>
                )}
              </Grid>
            </SelectedBox>
          </WrapBottomBox>
        </ContentsContainer>
      </Container>
    </React.Fragment>
  );
};

const RefreshButton = styled.button`
  text-align: center;
  font-weight: 700;
  color: #ffa012;
  background-color: white;
  border: 1px solid #ffa012;
  border-radius: 1rem;
  min-width: 32rem;
  cursor: pointer;
  padding: 1.7rem 0;
  margin: 1.7rem auto 2rem;
`;

const SelectedBox = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-end;
  box-sizing: border-box;
  width: 36rem;
  background-color: #f4f0ea;
  padding: 1.4rem 2rem;
  box-shadow: 0 -0.4rem 0.4rem 0 rgba(0, 0, 0, 0.1);
`;

const FoodList = styled.div`
  position: relative;
  display: grid;
  justify-items: center;
  padding: 0 2rem;
  width: 90%;
  grid-template-columns: repeat(4, minmax(5em, auto));
  gap: 0.5rem 1.3rem;
  overflow-y: auto;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const AiImgWrap = styled.div`
  padding: 0.4rem 0 0 0;
  width: 5rem;
  height: 5rem;
  border-radius: 1rem;
  box-sizing: border-box;
  & img {
    width: 100%;
    height: 100%;
  }
`;

const Title = styled.h2`
  position: relative;
  top: 50%;
  font-size: 1.5rem;
  font-weight: 600;
`;

const Container = styled.div`
  width: 100%;
`;

const ContentsContainer = styled.div`
  width: 100%;
`;

const WrapContent = styled.div`
  margin: 0 auto;
  max-width: 36rem;
  text-align: center;
`;

const WrapBottomBox = styled.div`
  margin: 0 auto;
  max-width: 36rem;
`;

const TitleWrap = styled.div`
  border-radius: 2rem;
  padding: 1.5rem;
  background-color: #f6f6f6;
  &.chat {
    position: relative;
    background: #f6f6f6;
    border-radius: 0.8rem;
  }
  &.chat:after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 0;
    height: 0;
    border: 10px solid transparent;
    border-right-color: #f6f6f6;
    border-left: 0;
    margin-top: -10px;
    margin-left: -5px;
  }
`;

export default Recommand;