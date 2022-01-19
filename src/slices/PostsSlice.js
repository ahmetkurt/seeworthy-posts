import { createSlice } from '@reduxjs/toolkit';

const postsSlice = createSlice({
  name: 'posts',
  initialState: {
    entities: {},
    checkedEntities: [],
    topRatedEntity: {
      id: -1,
      selectionDate: '',
    },
    loading: false,
    snackbar: {
      open: false,
      severity: 'info',
      message: '',
    },
  },
  reducers: {
    postsAddedOrUpdated: (state, { payload }) => {
      state.entities = {
        ...state.entities,
        ...payload.reduce(
          (accumulator, currentValue) => ({
            ...accumulator,
            [currentValue.id]: currentValue,
          }),
          {}
        ),
      };
    },
    postsDeleted: (state) => {
      state.entities = {};
    },
    checkedPostAdded: (state, { payload }) => {
      state.checkedEntities = [...state.checkedEntities, payload];
    },
    checkedPostDeleted: (state, { payload }) => {
      const deletedItem = state.checkedEntities.indexOf(payload);
      state.checkedEntities = [
        ...state.checkedEntities.slice(0, deletedItem),
        ...state.checkedEntities.slice(deletedItem + 1),
      ];
    },
    topRatedPostUpdated: (state, { payload }) => {
      state.topRatedEntity = payload;
    },
    snackbarUpdated: (state, { payload }) => {
      state.snackbar = {
        ...state.snackbar,
        ...payload,
      };
    },
    loadingStatusUpdated: (state, { payload }) => {
      state.loading = payload;
    },
  },
});

export const selectPosts = (state) => state.posts.entities;
export const selectCheckedPosts = (state) => state.posts.checkedEntities;
export const selectTopRatedPost = (state) => state.posts.topRatedEntity;
export const selectSnackbar = (state) => state.posts.snackbar;
export const selectLoading = (state) => state.posts.loading;

export const {
  postsAddedOrUpdated,
  postsDeleted,
  checkedPostAdded,
  checkedPostDeleted,
  topRatedPostUpdated,
  snackbarUpdated,
  loadingStatusUpdated,
} = postsSlice.actions;

export default postsSlice.reducer;
