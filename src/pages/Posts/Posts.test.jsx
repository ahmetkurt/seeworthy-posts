import React from 'react';
import { configureStore } from '@reduxjs/toolkit';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import {
  fireEvent,
  render,
  screen,
  waitForElementToBeRemoved,
  within,
} from '../../testUtils';
import Posts from './Posts';
import postsReducers from '../../slices/PostsSlice';
import constants from '../../constants';
import helpers from '../../helpers';

const data = [
  {
    userId: 1,
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto',
  },
  {
    userId: 1,
    id: 2,
    title:
      'proin nunc metus consectetur nec rutrum et semper nec dolor pellentesque eleifend sed dolor porta efficitur morbi tincidunt ex eget lectus interdum ullamcorper aenean vestibulum ex at viverra dignissim elit urna laoreet arcu et rutrum tortor nisi in lorem',
    body: 'est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla',
  },
  {
    userId: 1,
    id: 3,
    title: 'ea molestias quasi exercitationem repellat qui ipsa sit aut',
    body: 'et iusto sed quo iure\nvoluptatem occaecati omnis eligendi aut ad\nvoluptatem doloribus vel accusantium quis pariatur\nmolestiae porro eius odio et labore et velit aut',
  },
  {
    userId: 1,
    id: 4,
    title: 'eum et est occaecati',
    body: 'ullam et saepe reiciendis voluptatem adipisci\nsit amet autem assumenda provident rerum culpa\nquis hic commodi nesciunt rem tenetur doloremque ipsam iure\nquis sunt voluptatem rerum illo velit',
  },
  {
    userId: 1,
    id: 5,
    title: 'nesciunt quas odio',
    body: 'repudiandae veniam quaerat sunt sed\nalias aut fugiat sit autem sed est\nvoluptatem omnis possimus esse voluptatibus quis\nest aut tenetur dolor neque',
  },
];

const server = setupServer(
  rest.get(
    `${constants.JSONPH_API_URL}${constants.JSONPH_POSTS_API_RESOURCE}`,
    (_, res, ctx) => res(ctx.json(data), ctx.delay(150))
  )
);

let store = {};

beforeAll(() => server.listen());
beforeEach(() => {
  store = configureStore({ reducer: { posts: postsReducers } });
});
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

describe('Posts', () => {
  it('should render the component successfully', async () => {
    render(<Posts />, {
      store,
    });
  });

  it('should list all posts', async () => {
    render(<Posts />, {
      store,
    });
    expect(await screen.findAllByTestId('postCard')).toHaveLength(data.length);
  });

  it('should show "No posts found" text when there is no any posts', async () => {
    server.use(
      rest.get(
        `${constants.JSONPH_API_URL}${constants.JSONPH_POSTS_API_RESOURCE}`,
        (_, res, ctx) => res(ctx.json([]), ctx.delay(150))
      )
    );

    render(<Posts />, {
      store,
    });

    expect(await screen.findByTestId('posts_noData')).toHaveTextContent(
      'No posts found'
    );
  });

  it('should show snackbar when there is an error while listing posts', async () => {
    server.use(
      rest.get(
        `${constants.JSONPH_API_URL}${constants.JSONPH_POSTS_API_RESOURCE}`,
        (_, res, ctx) => res(ctx.status(500), ctx.delay(150))
      )
    );

    render(<Posts />, {
      store,
    });

    expect(await screen.findByTestId('posts_snackbar')).toHaveTextContent(
      'An error occurred while listing posts. Please, try again later.'
    );
  });

  it('should close snarbar when document clicked', async () => {
    server.use(
      rest.get(
        `${constants.JSONPH_API_URL}${constants.JSONPH_POSTS_API_RESOURCE}`,
        (_, res, ctx) => res(ctx.status(500), ctx.delay(150))
      )
    );

    render(<Posts />, {
      store,
    });

    const snackbar = await screen.findByTestId('posts_snackbar');
    fireEvent.click(document);

    await waitForElementToBeRemoved(snackbar);
    expect(snackbar).not.toBeInTheDocument();
  });

  it('should set maximum 120 characters of value for post title and body', async () => {
    render(<Posts />, {
      store,
    });

    const postCards = await screen.findAllByTestId('postCard');
    postCards.forEach((postCard) => {
      const withinPostCard = within(postCard);
      expect(
        withinPostCard.getByTestId('postCard_title').innerHTML.length
      ).toBeLessThanOrEqual(120);
      expect(
        withinPostCard.getByTestId('postCard_body').innerHTML.length
      ).toBeLessThanOrEqual(120);
    });
  });

  it('should show accurate count indicator when no post is selected', async () => {
    render(<Posts />, {
      store,
    });

    expect(
      await screen.findByTestId('sectionBar_countIndicator')
    ).toHaveTextContent('No posts selected');
  });

  it('should show accurate count indicator when all posts are selected', async () => {
    render(<Posts />, {
      store,
    });

    const checkboxes = await screen.findAllByTestId('postCard_checkbox');
    checkboxes.forEach((checkbox) => {
      fireEvent.click(within(checkbox).getByRole('checkbox'));
    });

    expect(
      await screen.findByTestId('sectionBar_countIndicator')
    ).toHaveTextContent('All posts selected');
  });

  it('should show accurate count indicator when several posts are selected', async () => {
    render(<Posts />, {
      store,
    });

    const checkboxes = await screen.findAllByTestId('postCard_checkbox');
    fireEvent.click(within(checkboxes[0]).getByRole('checkbox'));
    fireEvent.click(within(checkboxes[1]).getByRole('checkbox'));
    fireEvent.click(within(checkboxes[2]).getByRole('checkbox')); // checked
    fireEvent.click(within(checkboxes[2]).getByRole('checkbox')); // unchecked

    expect(
      await screen.findByTestId('sectionBar_countIndicator')
    ).toHaveTextContent(`Selected 2 posts out of ${data.length}`);
  });

  it('should select top rated post when top rated post selection button clicked', async () => {
    render(<Posts />, {
      store,
    });

    const postCards = await screen.findAllByTestId('postCard');
    const selectedPostCard = postCards[2];
    fireEvent.click(
      selectedPostCard.querySelector('[data-testid="postCard_button"]')
    );

    expect(
      selectedPostCard.querySelector('[data-testid="postCard_header"]')
    ).toHaveTextContent(
      `Selected as top rated post ${helpers.getDateLocalString(
        new Date(),
        'en-GB',
        'Europe/Riga'
      )}`
    );
  });
});
