import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoggedIn: false,
  email: "",
  username: "",
  fullname: "",
  followers: 0,
  following: 0,
  images: [],
  videos: [],
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
    setUsername: (state, action) => {
      state.username = action.payload;
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
    setImages: (state, action) => {
      state.images = action.payload;
    },
    setVideos: (state, action) => {
      state.videos = action.payload;
    },
  },
});

export const {
  reset,
  setIsLoggedIn,
  setUserEmail,
  setUsername,
  setFullname,
  setFollowers,
  setFollowing,
  setImages,
  setVideos,
} = userSlice.actions;

export default userSlice.reducer;
