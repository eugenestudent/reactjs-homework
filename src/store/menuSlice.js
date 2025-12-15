import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

const INITIAL_ITEMS_COUNT = 6;
const ITEMS_INCREMENT = 6;

export const fetchMenuItems = createAsyncThunk(
  'menu/fetchMenuItems',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch('https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals');
      
      const logEntry = {
        url: 'https://65de35f3dccfcd562f5691bb.mockapi.io/api/v1/meals',
        method: 'GET',
        payloadBody: null,
        responseStatus: response.status
      };
      const existingLogs = JSON.parse(localStorage.getItem('apiCallLogs') || '[]');
      existingLogs.push(logEntry);
      localStorage.setItem('apiCallLogs', JSON.stringify(existingLogs));

      if (!response.ok) {
        throw new Error(`HTTP Error: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const initialState = {
  items: [],
  loading: false,
  error: null,
  selectedCategory: 'Dessert',
  visibleCount: INITIAL_ITEMS_COUNT,
};

const menuSlice = createSlice({
  name: 'menu',
  initialState,
  reducers: {
    setSelectedCategory: (state, action) => {
      state.selectedCategory = action.payload;
      state.visibleCount = INITIAL_ITEMS_COUNT;
    },
    showMoreItems: (state) => {
      state.visibleCount += ITEMS_INCREMENT;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMenuItems.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMenuItems.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload;
      })
      .addCase(fetchMenuItems.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setSelectedCategory, showMoreItems } = menuSlice.actions;

export const selectMenuItems = (state) => state.menu.items;
export const selectMenuLoading = (state) => state.menu.loading;
export const selectMenuError = (state) => state.menu.error;
export const selectSelectedCategory = (state) => state.menu.selectedCategory;
export const selectVisibleCount = (state) => state.menu.visibleCount;

export const selectFilteredItems = (state) => {
  const items = state.menu.items;
  const category = state.menu.selectedCategory;
  return items.filter(item => item.category === category);
};

export const selectVisibleItems = (state) => {
  const filteredItems = selectFilteredItems(state);
  const visibleCount = state.menu.visibleCount;
  return filteredItems.slice(0, visibleCount);
};

export const selectHasMoreItems = (state) => {
  const filteredItems = selectFilteredItems(state);
  const visibleCount = state.menu.visibleCount;
  return visibleCount < filteredItems.length;
};

export default menuSlice.reducer;