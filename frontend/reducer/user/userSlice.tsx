import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../store/store";

// Define the type for the user state
interface CartState {
  color: string;
  quantity: number;
  shoe: {
    _id: string;
    prices: any;
    image: any;
    name: string;
  };
  size: string | number;
}

interface UserState {
  username: string;
  preferredPaymentMethod: string[];
  cart: CartState[];
  favourite: { _id: string; prices: any; name: string; image: any }[];
  token: string;
  loading: boolean;
  error: string;
  id: string;
  region:string
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
  region:""
};

export const fetchUser = createAsyncThunk(
  "user/fetchUser",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const token = state.user.token;

    const response = await fetch("http://192.168.0.108:5000/api/get/getUser", {
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
    saveUserInformation: (
      state,
      action
    ) => {
      state.cart = action.payload.data.cart || [];
      state.preferredPaymentMethod =
      action.payload.data.preferredPaymentMethod || [];
      state.favourite = action.payload.data.favourite
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
      const object = {
        _id: action.payload.shoeId,
        name: action.payload.name,
        prices: action.payload.prices,
        image: action.payload.image,
      };
      if (!state.favourite.some((fav) => fav._id === object._id)) {
        state.favourite.push(object);
      }
    },
    removeFromFavouriteReducer: (
      state,
      action: PayloadAction<{ _id: string }>
    ) => {
      state.favourite = state.favourite.filter(
        (fav) => fav._id !== action.payload._id
      );
    },
    updateFavouriteReducer: (state, action) => {
      state.favourite = action.payload.data;
    },
    addNewCartReducer: (state, action) => {
      console.log("adding new item into the cart", action.payload);
      const object = {
        shoe: action.payload.shoe,
        color: action.payload.color,
        size: action.payload.size,
        quantity: action.payload.quantity,
      };
      if (
        !state.cart.some(
          (cartItem) =>
            cartItem.shoe._id === object.shoe._id &&
            cartItem.color === object.color &&
            cartItem.size === object.size
        )
      ) {
        state.cart.push(object);
        console.log("succesfully added");
      }
    },
    removeFromCartReducer: (state, action) => {
      state.cart = state.cart.filter(
        (cartItem) => !(cartItem.shoe._id === action.payload._id)
      );
    },
    updateCartReducer: (
      state,
      action: PayloadAction<{ data: CartState[] }>
    ) => {
      state.cart = action.payload.data;
    },
    setUserRegion : (state,action)=>{
      state.region = action.payload.region
    }
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
  addNewCartReducer,
  removeFromCartReducer,
  updateCartReducer,
  setUserRegion
} = userSlice.actions;
export default userSlice.reducer;
