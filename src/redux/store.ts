import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CartSlice from "./slices/CartSlice";
import LoginSlice from "./slices/LoginSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from "redux-persist";
import TopBrandsSlice from "./slices/TopBrandsSlice";
import PlacesNearYouSlice from "./slices/PlacesNearYouSlice";

const rootReducer = combineReducers({
    cart: CartSlice, 
    login: LoginSlice, 
    topBrands: TopBrandsSlice,
    place: PlacesNearYouSlice,
});

const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer<any, any>(persistConfig, rootReducer);

export const store = configureStore({
    reducer: persistedReducer 
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export default store;
