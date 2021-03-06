import React from "react";
import styled from "styled-components";

import InstagramIcon from "@material-ui/icons/Instagram";
import NotionIcon from "../image/notion.png";

// 메인 페이지 푸터 적용
const Footer = (props) => {
  return (
    <FooterStyle>
      <StarDiv>
        <svg // 별 모양 svg
          width="10"
          height="10"
          viewBox="0 0 10 10"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4.81385 0.866979C4.85692 0.666411 5.1431 0.666411 5.18617 0.866979V0.866979C5.61082 2.84451 7.15557 4.38926 9.1331 4.81391V4.81391C9.33367 4.85698 9.33367 5.14316 9.1331 5.18623V5.18623C7.15557 5.61088 5.61082 7.15563 5.18617 9.13316V9.13316C5.1431 9.33373 4.85692 9.33373 4.81385 9.13316V9.13316C4.3892 7.15563 2.84445 5.61088 0.866918 5.18623V5.18623C0.66635 5.14316 0.66635 4.85698 0.866918 4.81391V4.81391C2.84445 4.38926 4.3892 2.84451 4.81385 0.866979V0.866979Z"
            fill="white"
          />
        </svg>
      </StarDiv>

      <Div>
        <Content>
          당신에게 만족스러운 <br /> 한끼의 기쁨을 드려요
        </Content>
        <StarDiv>
          <svg // 별 모양 svg
            width="10"
            height="10"
            viewBox="0 0 10 10"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4.81385 0.866979C4.85692 0.666411 5.1431 0.666411 5.18617 0.866979V0.866979C5.61082 2.84451 7.15557 4.38926 9.1331 4.81391V4.81391C9.33367 4.85698 9.33367 5.14316 9.1331 5.18623V5.18623C7.15557 5.61088 5.61082 7.15563 5.18617 9.13316V9.13316C5.1431 9.33373 4.85692 9.33373 4.81385 9.13316V9.13316C4.3892 7.15563 2.84445 5.61088 0.866918 5.18623V5.18623C0.66635 5.14316 0.66635 4.85698 0.866918 4.81391V4.81391C2.84445 4.38926 4.3892 2.84451 4.81385 0.866979V0.866979Z"
              fill="white"
            />
          </svg>
        </StarDiv>
        <Icon>
          <A href="https://www.instagram.com/" target="_blank">
            <InstagramIcon // 인스타그램 아이콘
              style={{
                fontSize: "3.3rem",
                margin: "0.4rem 0.4rem 0 0",
                cursor: "pointer",
              }}
            ></InstagramIcon>
          </A>
          <A // 노션 아이콘
            href="https://www.notion.so/Delight-Crew-s-aa69ae261f404f6a8c58c48e669f02fd"
            target="_blank"
          >
            <Notion src={NotionIcon} />
          </A>
        </Icon>
        <span
          style={{ textAlign: "center", color: "black", fontSize: "1.1em" }}
        >
          Team Delight
        </span>
        <Sub>
          <br />본 프로젝트는 항해99 결과물입니다. 사용된 이미지 등은 양해를
          <br />
          구하지 못했으나, 필요한 경우 연락 주시면 교체하도록 하겠습니다.
        </Sub>
      </Div>
    </FooterStyle>
  );
};

const FooterStyle = styled.div`
  box-sizing: border-box;
  background-color: #d1cdc7;
  display: flex;
  flex-direction: column;
  bottom: 0;
  width: 100%;
  height: 18.1rem;
  justify-content: center;
  align-items: center;
  margin: 2rem 0 0 0;
`;

const Div = styled.div`
  display: flex;
  padding: 0.5rem;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const StarDiv = styled.div`
  display: flex;
`;

const Content = styled.a`
  font-size: 1.8rem;
  font-weight: bold;
  text-align: center;
  line-height: 2.3rem;
`;

const Icon = styled.div`
  display: flex;
  padding: 0.5rem;
`;

const Notion = styled.img`
  margin: 0.4rem 0 0 0.4rem;
  width: 3.3rem;
  height: 3.3rem;
`;

const Sub = styled.a`
  display: flex;
  text-align: center;
  font-size: 1em;
  line-height: 1.3rem;
  color: #a7a7a7;
  margin-top: -0.5rem;
`;

const A = styled.a`
  text-decoration-line: none;
  font-weight: bold;
  color: black;
`;

export default Footer;
