import React from 'react';
import PropTypes from 'prop-types';
import { styled, Box, Typography } from '@mui/material';

const SectionBar = ({ title, countIndicator, className }) => (
  <StyledBox className={className}>
    <StyledTitleTypography variant="h2" data-testid="sectionBar_title">
      {title}
    </StyledTitleTypography>
    {countIndicator && (
      <StyledCountIndicatorTypography data-testid="sectionBar_countIndicator">
        {countIndicator}
      </StyledCountIndicatorTypography>
    )}
  </StyledBox>
);

const StyledBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  height: '2rem',
  padding: theme.spacing(1, 2),
  backgroundColor: theme.palette.secondary.main,
}));

const StyledTitleTypography = styled(Typography)({
  overflow: 'hidden',
  flexGrow: 1,
  whiteSpace: 'nowrap',
  textOverflow: 'ellipsis',
});

const StyledCountIndicatorTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 0,
  marginLeft: theme.spacing(2),
  whiteSpace: 'nowrap',
}));

SectionBar.propTypes = {
  title: PropTypes.string.isRequired,
  countIndicator: PropTypes.element,
  className: PropTypes.string,
};

SectionBar.defaultProps = {
  countIndicator: null,
  className: '',
};

export default SectionBar;
