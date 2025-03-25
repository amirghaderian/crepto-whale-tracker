import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const walletAddress = "0x742d35Cc6634C0532925a3b844Bc454e4438f44e";
const apiKey = "5DPV55YBPCQKAF2CW2SE86R9SWXTVR8GKP";

export const fetchTransactions = createAsyncThunk(
  'transactions/fetchTransactions',
  async () => {
    const response = await axios.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${walletAddress}&startblock=0&endblock=99999999&sort=desc&apikey=${apiKey}`
    );
    return response.data.result;
  }
);

const transactionSlice = createSlice({
  name: 'transactions',
  initialState: { data: [], loading: false, error: null },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.loading = false;
        state.data = action.payload;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  },
});

export default transactionSlice.reducer;