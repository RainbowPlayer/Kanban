import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Issue } from '../../types/types';

interface IssuesState {
  entities: Issue[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

const initialState: IssuesState = {
  entities: [],
  loading: 'idle',
};

export const fetchIssues = createAsyncThunk(
  'issues/fetchIssues',
  async () => {
    const response = await fetch('https://api.github.com/repos/facebook/react/issues');
    if (!response.ok) {
      throw new Error('Failed to fetch issues');
    }
    const issues = await response.json();
    return issues as Issue[];
  }
);

const issuesSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchIssues.pending, (state) => {
        state.loading = 'pending';
      })
      .addCase(fetchIssues.fulfilled, (state, action) => {
        state.entities = action.payload;
        state.loading = 'succeeded';
      })
      .addCase(fetchIssues.rejected, (state) => {
        state.loading = 'failed';
      });
  },
});

export default issuesSlice.reducer;
