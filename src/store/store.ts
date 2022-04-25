import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import AuthSlice from "../features/auth/authSlice";
// import postSlice from "../features/post/postSlice";
// import fileSlice from "../features/file/fileSlice";
// import customSettingSlice from "../features/custom/customSettingSlice";

export const store = configureStore({
    reducer: {
        auth: AuthSlice,
        // posts: postSlice,
        // files: fileSlice,
        // custom: customSettingSlice,
    },
});

export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
export type AppDispatch = typeof store.dispatch
