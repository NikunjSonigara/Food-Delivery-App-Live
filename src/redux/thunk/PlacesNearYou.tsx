import { createAsyncThunk } from "@reduxjs/toolkit";
import { menu_sec3 } from "../../API/menu_sec3";


export const placesNearYou = createAsyncThunk(
    "placesNearYou",
    async (args, {rejectWithValue}) => {
        try{
            const placesData = menu_sec3;
            return placesData;
        }
        catch(e){
            return rejectWithValue(e);
        }
    }
);