import styled from "styled-components";
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
//image
import babssi from "../image/babssi.png";
import sushi from "../image/sushi.png";
import pizza from "../image/pizza.png";
import chinesefood from "../image/chinesefood.png";
import streetfood from "../image/streetfood.png";

import { getFrequencySV } from "../shared/api";
import { addFrequency } from "../redux/modules/food";

const catagoryImage = [
  { id: 1, title: "한식", imgUrl: babssi },
  { id: 2, title: "일식", imgUrl: sushi },
  { id: 3, title: "양식", imgUrl: pizza },
  { id: 4, title: "중식", imgUrl: chinesefood },
  { id: 6, title: "분식", imgUrl: streetfood },
];

const MainLogCard = (props) => {
  const dispatch = useDispatch();
  const maniaData = useSelector((state) => state.food.frequency);
  const [imgData, setImgData] = useState(null);

  useEffect(() => {
    async function getFrequency() {
      const { data } = await getFrequencySV();
      dispatch(addFrequency([data]));
    }
    return getFrequency();
  }, []);

  useEffect(() => {
    catagoryImage.map((i) => {
      if (maniaData && maniaData[0].name === i.title) {
        setImgData(i.imgUrl);
      }
    });
  }, [maniaData]);

  return (
    <>
      <GRID1>
        <Box>
          <span style={{ margin: "0 0 0 1.5rem" }}>
            회원님은 지난 주 <br />
            <span style={{ color: "#FF6B12", fontWeight: "bold" }}>
              {maniaData && maniaData[0].name}
            </span>
            &nbsp; 매니아!
          </span>
          <Img src={imgData} />
        </Box>
      </GRID1>
    </>
  );
};

const GRID1 = styled.div`
  display: flex;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const Box = styled.div`
  display: grid;
  grid-template-columns: 23rem 2fr;
  align-items: center;
  background-color: #f5f5f5;
  border-radius: 1.5rem;
  padding: 1rem 0 1rem 0;
  width: 35rem;
  height: 8rem;
  margin: 0 2rem;
  font-size: 2rem;
  line-height: 3rem;
  color: black;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const Img = styled.img`
  width: 7rem;
  height: 7rem;
`;

export default MainLogCard;
