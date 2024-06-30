import { createSlice, createAsyncThunk,PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
// Define the type for the user state
interface UserState {
    username: string;
    preferredPaymentMethod: string[];
    cart: any[];
    favourite: any[];
    token: string;
    loading: boolean;
    error: string;
    id:String
}

// Define the initial state with the type
const initialState: UserState = {
    username: "",
    preferredPaymentMethod: [],
    cart: [],
    favourite: [],
    token: "",
    loading: false,
    error: "",
    id:""
};


export const fetchUser = createAsyncThunk('user/fetchUser', async (_, { getState }) => {
    const state = getState() as RootState;
    const token = state.user.token;
    
    const response = await fetch("http://192.168.0.104:5000/api/get/getUser", {
        method: "GET",
        headers: {
            "token": token
        }
    });

    if (!response.ok) {
        throw new Error("Failed to fetch user");
    }

    const data = await response.json();
    return data;
});
const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        saveUserInformation: (state, action) => {
            state.cart = action.payload.data.cart || [];
            state.preferredPaymentMethod = action.payload.data.preferredPaymentMethod || [];
            state.favourite = action.payload.data.favourite || [];
            state.username = action.payload.data.username || "";
            state.token = action.payload.token
        },
        cleanUserInformation: (state) => {
            state.cart = [];
            state.preferredPaymentMethod = [];
            state.favourite = [];
            state.username = "";
            state.token=""
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchUser.pending, (state) => {
                state.loading = true;
            })
            .addCase(fetchUser.fulfilled, (state, action: PayloadAction<UserState>) => {
                state.cart = action.payload.cart;
                state.preferredPaymentMethod = action.payload.preferredPaymentMethod;
                state.favourite = action.payload.favourite;
                state.username = action.payload.username;
                state.loading = false;
                state.id = action.payload.id;
                state.error = ""; // Clear error on successful fetch
            })
            .addCase(fetchUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message || "Failed to fetch user";
            });
    }
});

export const { saveUserInformation, cleanUserInformation } = userSlice.actions;
export default userSlice.reducer;

