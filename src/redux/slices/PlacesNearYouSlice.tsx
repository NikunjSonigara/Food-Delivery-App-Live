import { createSlice } from "@reduxjs/toolkit";
import { placesNearYou } from "../thunk/PlacesNearYou";
import { MenuSec3Data } from "../../data";
import { deflate } from "zlib";

export interface initialPlacesProps {
    placesData: MenuSec3Data[],
    loading: boolean,
    error: string,
}

export const PlacesNearYouSlice = createSlice({
    name: 'place',
    initialState: {
        placesData: [],
        loading: false,
        error: "",
    } as initialPlacesProps,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(placesNearYou.pending, (state) => {
            state.loading = true;
        })
        .addCase(placesNearYou.fulfilled, (state, action) => {
            state.loading = false;
            state.placesData = (action.payload);
        })
        .addCase(placesNearYou.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload as string;
        })
    } 
});

export const {} = PlacesNearYouSlice.actions;
export default PlacesNearYouSlice.reducer;