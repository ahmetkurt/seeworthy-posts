import React from 'react';
import { render, screen } from '../../testUtils';
import SectionBar from './SectionBar';

describe('SectionBar', () => {
  const propValues = {
    title: 'Posts',
    countIndicator: (
      <span>
        Selected <b>2</b> posts out of <b>100</b>
      </span>
    ),
  };
  const { title, countIndicator } = propValues;

  it('should render the component with required props successfully', () => {
    render(<SectionBar title={title} />);
    expect(screen.getByTestId('sectionBar_title')).toHaveTextContent(title);
  });

  it('should show count indicator when "countIndicator" prop is not empty', () => {
    render(
      <SectionBar
        title={title}
        countIndicator={<span>{countIndicator}</span>}
      />
    );
    expect(screen.getByTestId('sectionBar_countIndicator')).toHaveTextContent(
      'Selected 2 posts out of 100'
    );
  });
});
