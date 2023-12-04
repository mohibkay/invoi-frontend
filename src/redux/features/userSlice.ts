import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "../store";

interface UserState {
  user: null | UserTypes;
}

const initialState: UserState = {
  user: null,
};

export const userSlice = createSlice({
  name: "toolbar",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserTypes>) => {
      state.user = action.payload;
    },
  },
});

export const { setUser } = userSlice.actions;

export const user = (state: RootState) => state.user;

export default userSlice.reducer;
