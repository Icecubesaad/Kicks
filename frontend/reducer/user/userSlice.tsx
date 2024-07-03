import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";
// Define the type for the user state
interface cartState {
  color: string;
  quantity: number;
  shoeId: String;
  size: string | number;
}
interface UserState {
  username: string;
  preferredPaymentMethod: string[];
  cart: cartState[];
  favourite: any[];
  token: string;
  loading: boolean;
  error: string;
  id: String;
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
  id: "",
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const token = state.user.token;

    const response = await fetch("http://192.168.0.104:5000/api/get/getUser", {
      method: "GET",
      headers: {
        token: token,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user");
    }

    const data = await response.json();
    return data;
  }
);
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUserInformation: (state, action) => {
      state.cart = action.payload.data.cart || [];
      state.preferredPaymentMethod =
        action.payload.data.preferredPaymentMethod || [];
      state.favourite = action.payload.data.favourite || [];
      state.username = action.payload.data.username || "";
      state.token = action.payload.token;
      state.id = action.payload.data._id;
    },
    cleanUserInformation: (state) => {
      state.cart = [];
      state.preferredPaymentMethod = [];
      state.favourite = [];
      state.username = "";
      state.token = "";
    },
    addNewFavouriteReducer: (state, action) => {
      const object = { shoeId: action.payload.shoeId };
      if (!state.favourite.includes(object)) {
        state.favourite.push(object);
      }
    },
    removeFromFavouriteReducer: (state, action) => {
      const object = { shoeId: action.payload.shoeId };
      if (state.favourite.includes(object)) {
        state.favourite = state.favourite.filter(
          (e) => e.shoeId != action.payload.shoeId
        );
      }
    },
    updateFavouriteReducer: (state, action) => {
      state.favourite = action.payload.data.favourite;
    },
    addNewCartReducer: (state, action) => {
      const object = {
        shoeId: action.payload.shoeId,
        color: action.payload.color,
        size: action.payload.size,
        quantity: action.payload.quantity,
      };
      if (!state.cart.includes(object)) {
        state.cart.push(object);
      }
    },
    removeFromCartReducer: (state, action) => {
      const object = {
        shoeId: action.payload.shoeId,
        color: action.payload.color,
        size: action.payload.size,
        quantity: action.payload.quantity,
      };
      if (state.cart.includes(object)) {
        state.cart = state.cart.filter(
          (e) => e.shoeId !== action.payload.shoeId
        );
      }
    },
    updateCartReducer: (state, action) => {
      state.cart = action.payload.data;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUser.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchUser.fulfilled,
        (state, action: PayloadAction<UserState>) => {
          state.cart = action.payload.cart;
          state.preferredPaymentMethod = action.payload.preferredPaymentMethod;
          state.favourite = action.payload.favourite;
          state.username = action.payload.username;
          state.loading = false;
          state.id = action.payload.id;
          state.error = ""; // Clear error on successful fetch
        }
      )
      .addCase(fetchUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch user";
      });
  },
});

export const {
  saveUserInformation,
  cleanUserInformation,
  addNewFavouriteReducer,
  removeFromFavouriteReducer,
  updateFavouriteReducer,
} = userSlice.actions;
export default userSlice.reducer;
