import React, { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  styled,
  Alert,
  Box,
  CircularProgress,
  Container,
  Grid,
  Slide,
  Snackbar,
  Typography,
} from '@mui/material';
import {
  checkedPostAdded,
  checkedPostDeleted,
  loadingStatusUpdated,
  postsAddedOrUpdated,
  postsDeleted,
  selectCheckedPosts,
  selectLoading,
  selectPosts,
  selectSnackbar,
  selectTopRatedPost,
  snackbarUpdated,
  topRatedPostUpdated,
} from '../../slices/PostsSlice';
import SectionBar from '../../components/SectionBar/SectionBar';
import PostCard from '../../components/PostCard/PostCard';
import constants from '../../constants';
import helpers from '../../helpers';

const Posts = () => {
  const dispatch = useDispatch();

  const posts = useSelector(selectPosts);
  const checkedPosts = useSelector(selectCheckedPosts);
  const topRatedPost = useSelector(selectTopRatedPost);
  const snackbar = useSelector(selectSnackbar);
  const loading = useSelector(selectLoading);

  useEffect(() => {
    dispatch(loadingStatusUpdated(true));
    dispatch(
      snackbarUpdated({
        open: false,
        severity: 'info',
        message: '',
      })
    );

    const controller = new AbortController();
    const { signal } = controller;

    helpers
      .fetchData(
        `${constants.JSONPH_API_URL}${constants.JSONPH_POSTS_API_RESOURCE}`,
        {
          method: 'GET',
          signal,
        }
      )
      .then((data) => dispatch(postsAddedOrUpdated(data)))
      .catch((exception) => {
        if (exception.name === 'AbortError') {
          return 'Request aborted';
        }

        dispatch(postsDeleted());
        dispatch(
          snackbarUpdated({
            open: true,
            severity: 'error',
            message:
              'An error occurred while listing posts. Please, try again later.',
          })
        );

        return null;
      })
      .then(() => dispatch(loadingStatusUpdated(false)));

    return () => controller.abort();
  }, [dispatch]);

  const handlePostCardTopRatedActionOnClick = useCallback(
    (id) =>
      dispatch(
        topRatedPostUpdated({
          id,
          selectionDate: helpers.getDateLocalString(
            new Date(),
            'en-GB',
            'Europe/Riga'
          ),
        })
      ),
    [dispatch]
  );

  const handlePostCardCheckboxOnChange = useCallback(
    (event) => {
      const { checked, value } = event.target;
      dispatch(checked ? checkedPostAdded(value) : checkedPostDeleted(value));
    },
    [dispatch]
  );

  const handleSnackbarOnClose = useCallback(
    () => dispatch(snackbarUpdated({ open: false })),
    [dispatch]
  );

  const postsObjectValues = Object.values(posts);
  const postsLength = postsObjectValues.length;
  const checkedPostsLength = checkedPosts.length;
  let countIndicator = '';

  if (checkedPostsLength === 0) {
    countIndicator = <span>No posts selected</span>;
  } else if (checkedPostsLength === postsLength) {
    countIndicator = <span>All posts selected</span>;
  } else {
    countIndicator = (
      <span>
        Selected <b>{checkedPostsLength}</b> post
        {checkedPostsLength > 1 ? 's' : ''} out of <b>{postsLength}</b>
      </span>
    );
  }

  return (
    <>
      <Container maxWidth="md">
        <StyledSectionBar
          title="Posts"
          {...(postsLength > 0 && { countIndicator })}
        />
        <Grid container spacing={2}>
          {postsLength > 0
            ? postsObjectValues
                .sort((a, b) => a.title.localeCompare(b.title))
                .map((post) => {
                  const { id, title, body } = post;
                  const { id: topRatedPostId, selectionDate } = topRatedPost;
                  const topRated = topRatedPostId === id;
                  return (
                    <Grid key={id} item xs={12}>
                      <PostCard
                        id={id}
                        title={helpers.truncateText(title, 120)}
                        body={helpers.truncateText(body, 120)}
                        topRatedSelectionDate={topRated ? selectionDate : ''}
                        topRatedActionText="Select as top rated post"
                        topRated={topRated}
                        checked={checkedPosts.includes(id.toString())}
                        topRatedActionActive={!topRated}
                        showCheckbox
                        topRatedActionOnClick={() =>
                          handlePostCardTopRatedActionOnClick(id)
                        }
                        checkboxOnChange={handlePostCardCheckboxOnChange}
                      />
                    </Grid>
                  );
                })
            : !loading && (
                <Grid item xs={12} data-testid="posts_noData">
                  No posts found
                </Grid>
              )}
        </Grid>
        {loading && (
          <StyledLoadingBox data-testid="posts_loading">
            <StyledCircularProgress size="1.5rem" />
            <Typography>Loading...</Typography>
          </StyledLoadingBox>
        )}
      </Container>
      <Snackbar
        autoHideDuration={6000}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
        TransitionComponent={Slide}
        open={snackbar.open}
        onClose={handleSnackbarOnClose}
        data-testid="posts_snackbar"
      >
        <StyledAlert
          variant="filled"
          severity={snackbar.severity}
          onClose={handleSnackbarOnClose}
        >
          {snackbar.message}
        </StyledAlert>
      </Snackbar>
    </>
  );
};

const StyledSectionBar = styled(SectionBar)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const StyledLoadingBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  margin: theme.spacing(4, 0),
}));

const StyledCircularProgress = styled(CircularProgress)(({ theme }) => ({
  marginRight: theme.spacing(1),
}));

const StyledAlert = styled(Alert)({
  width: '100%',
});

export default Posts;
