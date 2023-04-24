import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: "",
  currentusername: "",
  fullname: "",
  followers: [],
  following: [],
  fitcheckArray: [],
  listingArray: [{}],
  pageIndex: 0,
  pageRefresher: false,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    reset: () => initialState,
    setIsLoggedIn: (state, action) => {
      state.isLoggedIn = action.payload;
    },
    setUserEmail: (state, action) => {
      state.email = action.payload;
    },
    setCurrentUsername: (state, action) => {
      state.currentusername = action.payload;
    },
    setFullname: (state, action) => {
      state.fullname = action.payload;
    },
    setFollowers: (state, action) => {
      state.followers = action.payload;
    },
    setFollowing: (state, action) => {
      state.following = action.payload;
    },
    setFitcheckArray: (state, action) => {
      state.fitcheckArray = action.payload;
    },
    setListingArray: (state, action) => {
      state.listingArray = action.payload;
    },
    incrPageIndex: (state, action) => {
      state.pageIndex += 1;
    },
    decrPageIndex: (state, action) => {
      state.pageIndex -= 1;
    },
    setPageRefresher: (state, action) => {
      state.listingArray = action.payload;
    },
  },
});

export const {
  reset,
  setIsLoggedIn,
  setUserEmail,
  setCurrentUsername,
  setFullname,
  setFollowers,
  setFollowing,
  setFitcheckArray,
  setListingArray,
  incrPageIndex,
  decrPageIndex,
  setPageRefresher,
} = userSlice.actions;

export default userSlice.reducer;
