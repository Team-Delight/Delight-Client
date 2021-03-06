import { createSlice } from "@reduxjs/toolkit";
import instance from "../../shared/api";
import FullAlert from "../../image/FullAlert.svg";
import ErrorAlert from "../../image/ErrorAlert.svg";
import Swal from "sweetalert2";

const food = createSlice({
  name: "food",
  initialState: {
    selectList: [],
    foodName: [],
    result: null,
    history: null,
    frequency: null,
  },
  reducers: {
    addFood: (state, action) => {
      if (state.selectList.length < 10) {
        state.selectList = [action.payload, ...state.selectList];
        state.foodName = [...state.foodName, action.payload.name];
      } else {
        Swal.fire({
          width: 240,
          padding: "0 0 20px 0",
          title: `10개 다 골랐어요!`,
          imageUrl: FullAlert,
          imageWidth: 240,
          imageHeight: 120,
          imageAlt: "음식을 골라주세요",
          showConfirmButton: false,
          timer: 1000,
        });
      }
    },
    deleteFood: (state, action) => {
      const foodList = state.selectList.filter(
        (food) => food.name !== action.payload.name
      );

      const nameList = state.foodName.filter(
        (food) => food !== action.payload.name
      );
      state.selectList = [...foodList];
      state.foodName = [...nameList];
    },
    // 결과 데이테 가져오고 골랐던 음식 리스트 초기화
    getResult: (state, action) => {
      state.result = action.payload.data;
      state.selectList = [];
    },
    // 마이픽 리스트 저장하기
    addHistory: (state, action) => {
      state.history = action.payload;
    },
    // 매니아카드 정보 저장
    addFrequency: (state, action) => {
      state.frequency = action.payload;
    },
    // 클린업을 위한 설정
    resetData: (state, action) => {
      state.selectList = [];
      state.foodName = [];
    },
  },
});

// 선택한 음식 머신 러닝 서버로 보내는 모듈
export const sendSelectFoodSV = ({ foods, setIsLoding }) => {
  return async (dispatch, getState, { history }) => {
    try {
      await instance.post("/api/ml-recommendations", { foods }).then((res) => {
        const data = res.data.data;
        dispatch(getResult({ data }));
        setTimeout(setIsLoding, 5000, true);
      });
    } catch (error) {
      Swal.fire({
        width: 240,
        padding: "0 0 20px 0",
        title: `죄송해요. 오류가 났어요`,
        text: `전 페이지로 이동할게요!`,
        imageUrl: ErrorAlert,
        imageWidth: 240,
        imageHeight: 120,
        imageAlt: "죄송해요. 오류가 났어요",
        showConfirmButton: true,
        confirmButtonColor: "#78C6FF",
        confirmButtonText: "알겠어요",
      }).then(() => {
        dispatch(resetData());
        console.log("sendSelectFood Error ::: ", error);
        window.location.replace("/recommendation");
      });
    }
  };
};

// 마이픽한 음식 데이터 서버로 보내는 모듈
export const sendMyPickSV = ({ foodName }) => {
  return async (dispatch, getState, { history }) => {
    try {
      await instance.post("/api/mypicks", { foodName }); // 주소, 보내는 data
    } catch (error) {
      Swal.fire({
        width: 240,
        padding: "0 0 20px 0",
        title: `죄송해요. 오류가 났어요`,
        text: `다시 시도해주실 수 있나요?`,
        imageUrl: ErrorAlert,
        imageWidth: 240,
        imageHeight: 120,
        imageAlt: "죄송해요. 오류가 났어요",
        showConfirmButton: true,
        confirmButtonColor: "#78C6FF",
        confirmButtonText: "알겠어요",
      }).then((result) => {
        if (result.value) {
          console.log("sendMyPickSV Error ::: ", error);
        }
      });
    }
  };
};

export const {
  addFood,
  deleteFood,
  getResult,
  addHistory,
  resetData,
  addFrequency,
} = food.actions;
export default food.reducer;
