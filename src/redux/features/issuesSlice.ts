import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Issue } from '../../types/types';

interface IssuesState {
  entities: Issue[];
  loading: 'idle' | 'pending' | 'succeeded' | 'failed';
}

interface UpdateIssuePayload {
  id: number;
  newState: 'open' | 'in progress' | 'closed';
}

const initialState: IssuesState = {
  entities: [],
  loading: 'idle',
};

export const fetchIssues = createAsyncThunk(
  'issues/fetchIssues',
  async ({owner, repo}: {owner: string, repo: string}) => {
    const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/issues`);
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
    updateIssueState: (state, action: PayloadAction<UpdateIssuePayload>) => {
      const { id, newState } = action.payload;
      const issue = state.entities.find(issue => issue.id === id);
      if (issue) {
        issue.state = newState;
      }
    },
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

export const { updateIssueState } = issuesSlice.actions;

export default issuesSlice.reducer;
