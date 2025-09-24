import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { getMyOrders, updateOrderStatus, updateAvailability, getAllAvailablePartnerList } from '../../services/partnerService';

interface PartnerOrder {
  _id: string;
  productName: string;
  deliveryAddress: string;
  status: string;
  location?: { coordinates: [number, number] };
}

interface PartnerState {
  myOrders: PartnerOrder[];
  availability: boolean;
  loading: boolean;
  error: string | null;
  allpartnerDetails: Partner[]; 
}


interface Partner {
  _id: string;
  name: string;
  email: string;
  availability: boolean;
}

const initialState: PartnerState = {
  myOrders: [],
  availability: true,
  loading: false,
  error: null,
  allpartnerDetails: []
};

// 🔹 Thunks
export const fetchMyOrders = createAsyncThunk('partner/fetchMyOrders', async (_, thunkAPI) => {
  try {
    const res = await getMyOrders();
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
  }
});

export const fetchPartner = createAsyncThunk('partner/fetchPartner', async (_, thunkAPI) => {
  try {
    const res = await getAllAvailablePartnerList();
    return res.data;
  } catch (err: any) {
    return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to fetch orders');
  }
});


export const changeOrderStatus = createAsyncThunk(
  'partner/changeOrderStatus',
  async ({ orderId, status }: { orderId: string; status: string }, thunkAPI) => {
    try {
      const res = await updateOrderStatus(orderId, status);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update status');
    }
  }
);

export const changeAvailability = createAsyncThunk(
  'partner/changeAvailability',
  async (availability: boolean, thunkAPI) => {
    try {
      const res = await updateAvailability(availability);
      return res.data;
    } catch (err: any) {
      return thunkAPI.rejectWithValue(err.response?.data?.message || 'Failed to update availability');
    }
  }
);



// 🔹 Slice
const partnerSlice = createSlice({
  name: 'partner',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMyOrders.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchMyOrders.fulfilled, (state, action: PayloadAction<PartnerOrder[]>) => {
        state.loading = false;
        state.myOrders = action.payload;
      })
      .addCase(fetchMyOrders.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })

      .addCase(fetchPartner.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchPartner.fulfilled, (state, action: PayloadAction<Partner[]>) => {
        state.loading = false;
        state.allpartnerDetails = action.payload
      
      })
      .addCase(fetchPartner.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false;
        state.error = action.payload;
      })
      .addCase(changeOrderStatus.fulfilled, (state, action: PayloadAction<PartnerOrder>) => {
        const index = state.myOrders.findIndex((o) => o._id === action.payload._id);
        if (index !== -1) state.myOrders[index] = action.payload;
      })
      .addCase(changeAvailability.fulfilled, (state, action: PayloadAction<any>) => {
        state.availability = action.payload.availability;
      });
  },
});

export default partnerSlice.reducer;

