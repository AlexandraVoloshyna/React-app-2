import { createSlice, } from "@reduxjs/toolkit";

interface SidebarState {
  isOpen: boolean
}

const initialState: SidebarState = {
  isOpen: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState,
  reducers: {
    openSidebar (state) {
      state.isOpen = true;

    },
    closeSidebar (state) {
      state.isOpen = false
    },
  },
});

export const { closeSidebar, openSidebar } = sidebarSlice.actions;

export default sidebarSlice.reducer;