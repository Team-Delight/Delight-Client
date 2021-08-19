import React from "react";
import styled from "styled-components";

import mypage_1 from "../image/mypage_1.png";
import mypage_2 from "../image/mypage_2.png";

import { Grid, Text } from "../elements";
import { history } from "../redux/configureStore";


const MyPageNoData = () => {

    return (
        <Container>
            <Grid width="100%" height="15%" padding="2rem">
                <Title1 style={{
                    margin: "0 0 1rem 0",
                    fontSize: "2.4rem",
                    fontWeight: "bold",
                    lineHeight: "3.5rem",
                }}>
                    <p>회원님의 <br /> 음식 기록장</p> </Title1>
                <Box1 src={mypage_1} />
            </Grid>

            <Grid width="100%" height="15%" padding="2rem">
                <Title2>지난 PICK</Title2>

                <Box2 style={{
                    fontSize: "1rem",
                    lineHeight: "2rem",
                }}>
                    <Text padding="2rem 0 2rem 2rem" color="#717171" size="1.5rem">
                        회원님은 아직 데이터가 없어요!<br />
                    지금 추천받고 기록해 보세요 :)</Text>
                    <Button1
                        src={mypage_2}
                        onClick={() => {
                            return history.push("/recommendation");
                        }} />
                </Box2>
            </Grid>
        </Container >
    );
};

const Container = styled.div`
    width: 36rem;
    margin: 0 auto;
    flex-direction: column;
`;

const Box1 = styled.img`
`;

const Box2 = styled.div`
    margin: 0 auto;
    width: 32rem;
    height: 14.4rem;
    background-color: #f2f2f2;
    border-radius: 1.6rem;
`;

const Title1 = styled.h2`
    margin: 2rem 0 0 0;
    font-size: 2.4rem;
    font-weight: 700;
`;
const Title2 = styled.h2`
    margin: 0 0 2rem 0;
    font-size: 2rem;
    font-weight: bold;
`;

const Button1 = styled.img`
    margin: 0 0 0 2rem;
    width: 28rem;
    height: 4.8rem;
    cursor: pointer;
`;

export default MyPageNoData;