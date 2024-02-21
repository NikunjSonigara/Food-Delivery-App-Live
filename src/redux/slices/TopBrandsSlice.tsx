import { createSlice } from "@reduxjs/toolkit";
import { showTopBrandData } from "../thunk/TopBrands";
import { TopBrandsData } from "../../data";

export interface InitialStateProps{
    TopBrandsSlice: TopBrandsData[],
    loading: boolean,
    error: string,
}

export const TopBrandsSlice = createSlice({
    name: 'topBrands',
    initialState: {
        TopBrandsSlice: [],
        loading: false,
        error: "",
    } as InitialStateProps,
    reducers: {
        showAllData: (state, action) => {
            console.log("state.TopBrandsSlice:", state.TopBrandsSlice);
        }
    },
    extraReducers: (builder) => {
        builder
        .addCase(showTopBrandData.pending, (state) => {
            // console.log("pending start");
            state.loading = true;
            // console.log("pending end");
        })
        .addCase(showTopBrandData.fulfilled, (state, action) => {
            // console.log("fulfilled start");
            state.loading = false;
            state.TopBrandsSlice = (action.payload);
            // console.log("fulfilled end");
        })
        .addCase(showTopBrandData.rejected, (state, action) => {
            // console.log("reject start");
            state.loading = false;
            state.error = action.payload as string;
            // console.log("reject end");
        })
    }
});

export const {showAllData} = TopBrandsSlice.actions;
export default TopBrandsSlice.reducer;