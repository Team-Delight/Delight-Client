import { createReducer, createAction, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import instance from "../../shared/api";

const food = createSlice({
  name: "food",
  initialState: {
    selectList: [],
    foodName: [],
    result: null,
  },
  reducers: {
    addFood: (state, action) => {
      if (state.selectList.length < 10) {
        state.selectList = [action.payload, ...state.selectList];
        state.foodName = [...state.foodName, action.payload.name];
      } else {
        return;
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
    getResult: (state, action) => {
      state.result = action.payload.data;
      state.selectList = [];
    },
  },
});

export const sendSelectFoodSV = ({ foods, setIsLoding }) => {
  return async (dispatch, getState, { history }) => {
    try {
      await instance.post("/api/ml-recommendations", { foods }).then((res) => {
        const data = res.data.data;
        dispatch(getResult({ data }));
        setTimeout(setIsLoding, 6000, true);
      });
    } catch (error) {
      console.log("post 오류", error);
    }
  };
};

export const { addFood, deleteFood, getResult } = food.actions;
export default food.reducer;
