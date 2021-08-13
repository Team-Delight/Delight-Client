import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { useState } from "react";
import instance from "../../shared/api";

import Loader from "react-loader-spinner";

// 카테고리라는 함수 만들기
export const getCategoryThunk = createAsyncThunk(
  "category/getCategory",
  async (categoryId) => {
    const response = await instance.get(`/api/recommendations/${categoryId}`);
    console.log(response.data);
    return response.data;
  }
);

const initialState = {
  list: [
    {
      categoryId: "1",
      name: "수육백반",
      recommendedCnt: "62",
      imgUrl: "www.image.png",
    },
  ],
};

const categorySlice = createSlice({
  name: "food",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(getCategoryThunk.fulfilled, (state, action) => {
      console.log("action.payload : ", action.payload);
      state.list = action.payload;
    });
    builder.addCase(getCategoryThunk.rejected, (state, action) => {
      state.error = true;
      state.loading = false;
      alert("랭킹 데이터가 준비중이에요 조금만 기다려주세요 !");
    });
  },
});

export const getFoods = (state) => state.category.list;
export default categorySlice.reducer;
