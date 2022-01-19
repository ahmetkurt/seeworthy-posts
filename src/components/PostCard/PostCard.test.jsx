import React from 'react';
import { fireEvent, render, screen, within } from '../../testUtils';
import PostCard from './PostCard';

describe('PostCard', () => {
  const propValues = {
    id: 1,
    title:
      'sunt aut facere repellat provident occaecati excepturi optio reprehenderit',
    body: 'quia et suscipit suscipit recusandae consequuntur expedita et cum reprehenderit molestiae ut ut quas totam nostrum rerum est autem sunt rem eveniet architecto',
    topRatedSelectionDate: '18/01/2022, 09:54:46',
    topRatedActionText: 'Select as top rated post',
    topRatedActionActive: true,
    topRated: true,
    showCheckbox: true,
    checked: true,
  };

  const {
    id,
    title,
    body,
    topRatedSelectionDate,
    topRatedActionText,
    topRatedActionActive,
    topRated,
    showCheckbox,
    checked,
  } = propValues;

  it('should render the component with required props successfully', () => {
    render(<PostCard id={id} title={title} body={body} />);
    expect(screen.getByTestId('postCard_id')).toHaveTextContent(`#${id}`);
    expect(screen.getByTestId('postCard_title')).toHaveTextContent(title);
    expect(screen.getByTestId('postCard_body')).toHaveTextContent(body);
  });

  it('should show date when "topRated" prop is true and "topRatedSelectionDate" prop is not empty', () => {
    render(
      <PostCard
        id={id}
        title={title}
        body={body}
        topRatedSelectionDate={topRatedSelectionDate}
        topRated={topRated}
      />
    );
    expect(screen.getByTestId('postCard_header')).toHaveTextContent(
      `Selected as top rated post ${topRatedSelectionDate}`
    );
  });

  it('should show button with its text when "topRatedActionActive" prop is true and "topRatedActionText" prop is not empty', () => {
    render(
      <PostCard
        id={id}
        title={title}
        body={body}
        topRatedActionText={topRatedActionText}
        topRatedActionActive={topRatedActionActive}
      />
    );

    const button = screen.getByTestId('postCard_button');
    expect(button).toBeInTheDocument();
    expect(within(button).getByText(topRatedActionText)).toBeInTheDocument();
  });

  it('should have clickable button when "topRatedActionActive" prop is true and "topRatedActionText" prop is not empty', () => {
    render(
      <PostCard
        id={id}
        title={title}
        body={body}
        topRatedActionText={topRatedActionText}
        topRatedActionActive={topRatedActionActive}
      />
    );
    fireEvent.click(screen.getByTestId('postCard_button'));
  });

  it('should show checkbox when "showCheckbox" prop is true', () => {
    render(
      <PostCard id={id} title={title} body={body} showCheckbox={showCheckbox} />
    );
    expect(screen.getByTestId('postCard_checkbox')).toBeInTheDocument();
  });

  it('should check checkbox when "showCheckbox" and "checked" props are true', () => {
    render(
      <PostCard
        id={id}
        title={title}
        body={body}
        showCheckbox={showCheckbox}
        checked={checked}
      />
    );
    expect(
      within(screen.getByTestId('postCard_checkbox')).getByRole('checkbox')
    ).toBeChecked();
  });

  it('should have clickable checkbox when "showCheckbox" and "checked" props are true', () => {
    render(
      <PostCard
        id={id}
        title={title}
        body={body}
        showCheckbox={showCheckbox}
        checked={checked}
      />
    );
    fireEvent.click(
      within(screen.getByTestId('postCard_checkbox')).getByRole('checkbox')
    );
  });
});
