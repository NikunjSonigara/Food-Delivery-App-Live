import { createAsyncThunk } from "@reduxjs/toolkit";
import { top_brands_data } from "../../API/top_brands_data";

export const showTopBrandData = createAsyncThunk(
    'showTopBrandData',
    async (args, {rejectWithValue}) => { 
        try{
            const topBrandsResult = top_brands_data;
            // console.log(topBrandsResult);
            // await new Promise(resolve => setTimeout(resolve, 200));
            return topBrandsResult;
        }
        catch(e){
            return rejectWithValue(e);
        }
    }
);