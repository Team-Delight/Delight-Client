import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { Text } from "../elements";
import Swal from "sweetalert2";

import { getTags, getTagThunk } from "../redux/modules/tag";
import { getTagResultThunk } from "../redux/modules/tagresult";
import { useDispatch, useSelector } from "react-redux";

const Tag = ({ tagOpen, setTagOpen, setSelectedTag }) => {
  const dispatch = useDispatch();
  const [tagIndex, setTagIndex] = useState(1);
  const [nowCate, setNowCate] = useState("COUNTRY");
  const [selectedTag2, setSelectedTag2] = useState([]);
  const tags = useSelector(getTags);

  const category_types = [
    { type: "COUNTRY", category: "나라" },
    { type: "INGREDIENT", category: "재료" },
    { type: "SITUATION", category: "상황" },
    { type: "PLACE", category: "장소" },
  ];

  // 기본값(COUNTRY) 설정
  useEffect(() => {
    dispatch(getTagThunk("COUNTRY"));
  }, []);

  // 중복 태그 제거, 카테고리 하나 당 태그 하나만 선택가능하게
  const handleClickCategory = (id, name) => {
    let hasThisCate = selectedTag2.findIndex((tag) => tag.id === id);
    let hasNowCate = selectedTag2.findIndex((tag) => tag.nowCate === nowCate);
    if (hasThisCate === -1 && hasNowCate === -1) {
      setSelectedTag2([...selectedTag2, { id, name, nowCate }]);
    } else if (hasThisCate !== -1) {
      alert("이미 선택된 태그에요");
    } else {
      alert("하나만 선택 가능해요");
    }
  };

  // 태그 삭제를 위해
  // filter 함수 사용
  const handleDeleteSelectedTag = (id) => {
    const newTags = selectedTag2.filter((tag) => {
      return tag.id !== id;
    });
    setSelectedTag2(newTags);
  };

  // 선택하기 버튼을 눌렀을 때 실행되는 함수
  const handleSubmitTags = () => {
    const tagIdArray = [];
    const tagNameArray = [];

    setTagOpen(false);

    for (let i in selectedTag2) {
      tagIdArray.push(selectedTag2[i]["id"]);
      tagNameArray.push(selectedTag2[i]["name"]);
    }
    dispatch(getTagResultThunk(tagIdArray));
    setSelectedTag(tagNameArray);
  };
  return (
    <>
      {/* 태그 선택 화면 띄움 */}
      <BackGround
        onClick={() => setTagOpen(false)}
      ></BackGround>
      <DIV tagOpen={tagOpen}>
        <div>
          <Layout>
            <Text size="1.7rem" bold>
              1. 카테고리 선택
            </Text>
            <Box>
              {category_types.map(({ type, category }, index) => (
                <SelectTag
                  tagIndex={tagIndex}
                  onClick={() => {
                    setTagIndex(index + 1);
                    setNowCate(type);
                    dispatch(getTagThunk(type));
                  }}
                  style={{ cursor: "pointer" }}
                >
                  {category}
                </SelectTag>
              ))}
            </Box>
            <Text size="1.7rem" bold>
              2. 태그 선택
            </Text>
            <Box1>
              {tags.map(({ id, name }) => (
                <SelectTag1
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    handleClickCategory(id, name);
                  }}
                >
                  {name}
                </SelectTag1>
              ))}
            </Box1>
            <Text size="1.7rem" bold>
              3. 선택한 태그
            </Text>
            <Box2>
              {selectedTag2?.map(({ id, name }) => (
                <SelectTag2
                  style={{ cursor: "pointer" }}
                  onClick={() => handleDeleteSelectedTag(id)}
                >
                  {name}&nbsp;&nbsp;X
                </SelectTag2>
              ))}
            </Box2>
          </Layout>
        </div>
        {selectedTag2.length > 0 ? (
          <TagBtn onClick={() => handleSubmitTags()}>선택하기</TagBtn>
        ) : (
          <TagBtn
            onClick={() => {
              Swal.fire({
                width: "210",
                height: "90",
                position: "top-center",
                icon: "info",
                title: "선택된 태그가 없어요",
                showConfirmButton: false,
                timer: 2000,
              });
            }}
          >
            선택하기
          </TagBtn>
        )}
      </DIV>
    </>
  );
};

const boxShow = keyframes`
    from {
        bottom: -100%;
    }
    to {
        bottom: 0;
    }
`;

// 태그 선택하기 버튼을 눌렀을 때 백그라운드 배경을 어둡게 함 
// BackGround div를 position fixed로 고정
const BackGround = styled.div`
  position: fixed;
  width: 36rem;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.6);
  height: 100%;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

// 태그 선택하기 버튼을 눌렀을 때 보이는 Tag div 컴포넌트를
// 화면 아래에 고정하기 위하여 position:fixed로 고정
const DIV = styled.div`
  background-color: #ffffff;
  position: fixed;
  width: 36rem;
  animation: ${boxShow} 0.9s ease-in-out;
  bottom: 0;
  border-top-left-radius: 3rem;
  border-top-right-radius: 3rem;
  padding-top: 1.5rem;
  @media ${(props) => props.theme.mobile} {
    width: 100%;
  }
`;

const Layout = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  bottom: 0;
  width: 100%;
  height: auto;
  margin: 0 0 1rem 1.3rem;
  align-items: flex-start;
  justify-content: flex-start;
  line-height: 6rem;
`;

const Box = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

const Box1 = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  height: auto;
  width: 89%;
  padding: 0.5rem 0 0.5rem 1rem;
  background-color: #f2f2f2;
  border-radius: 1.6rem;
  @media ${(props) => props.theme.mobile} {
    width: 89%;
  }
`;

const Box2 = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 80%;
`;

const SelectTag = styled.div`
  margin: 0 1.6rem 1rem 0;
  font-size: 1.4rem;
  font-family: sans-serif;
  height: 2rem;
  padding: 0.5rem 1.5rem;
  line-height: 2rem;
  background-color: #f2f2f2;
  border-radius: 1.6rem;
  ${(props) =>
    props.tagIndex &&
    `  &:nth-child(${props.tagIndex}) {
    color: #ffffff;
    background-color: #FFA012;
    transition: 0.3s ease;
  }`}
`;

const SelectTag1 = styled.div`
  background-color: #ffffff;
  margin: 0.5rem 1rem 1rem 0;
  font-size: 1.4rem;
  font-family: sans-serif;
  height: 2rem;
  padding: 0.5rem 1.5rem;
  line-height: 2rem;
  border-radius: 1.6rem;
  &:hover {
    color: #ffa012;
  }
`;

const SelectTag2 = styled.div`
  background-color: #ffa012;
  color: #ffffff;
  margin: 0 1rem 0.8rem 0;
  font-size: 1.4rem;
  font-family: sans-serif;
  height: 2rem;
  line-height: 2rem;
  padding: 0.5rem 1.5rem;
  border-radius: 1.6rem;
`;

const TagBtn = styled.button`
  width: 100%;
  height: 6.3rem;
  background-color: #ffa012;
  border: none;
  color: #ffffff;
  font-size: 1.5rem;
  cursor: pointer;
  margin-top: 2rem;
`;

export default Tag;
