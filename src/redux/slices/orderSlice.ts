import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { createOrder, getOrders, assignOrder, deleteOrder } from '../../services/orderService';

interface Order {
  _id: string;
  productName: string;
  deliveryAddress: string;
  status: string;
  assignedTo?: { _id: string; name: string };
}

interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
}

const initialState: OrderState = {
  orders: [],
  loading: false,
  error: null,
};

// 🔹 Thunks
export const fetchOrders = createAsyncThunk('orders/fetchOrders', async (_, thunkAPI) => {
  try {
    const res = await getOrders();
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
  }
});

export const createNewOrder = createAsyncThunk(
  'orders/createOrder',
  async (orderData: { productName: string; deliveryAddress: string }, thunkAPI) => {
    try {
      const res = await createOrder(orderData);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to create order');
    }
  }
);

export const assignOrderToPartner = createAsyncThunk(
  'orders/assignOrder',
  async ({ orderId, partnerId }: { orderId: string; partnerId: string }, thunkAPI) => {
    try {
      const res = await assignOrder(orderId, partnerId);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to assign order');
    }
  }
);

export const deleteOrderById = createAsyncThunk(
  'orders/deleteOrder',
  async (orderId: string, thunkAPI) => {
    try {
      await deleteOrder(orderId);
      return orderId;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to delete order');
    }
  }
);

// 🔹 Slice
const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchOrders.fulfilled, (state, action: PayloadAction<Order[]>) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchOrders.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(createNewOrder.fulfilled, (state, action: PayloadAction<Order>) => {
        state.orders.push(action.payload);
      })
      .addCase(assignOrderToPartner.fulfilled, (state, action: PayloadAction<Order>) => {
        const index = state.orders.findIndex((o) => o._id === action.payload._id);
        if (index !== -1) state.orders[index] = action.payload;
      })
      .addCase(deleteOrderById.fulfilled, (state, action: PayloadAction<string>) => {
        state.orders = state.orders.filter((o) => o._id !== action.payload);
      });
  },
});

export default orderSlice.reducer;

