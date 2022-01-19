import React from 'react';
import PropTypes from 'prop-types';
import {
  styled,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Checkbox,
  Typography,
} from '@mui/material';

const PostCard = ({
  id,
  title,
  body,
  topRatedSelectionDate,
  topRatedActionText,
  topRatedActionActive,
  topRated,
  showCheckbox,
  checked,
  topRatedActionOnClick,
  checkboxOnChange,
}) => (
  <Card data-testid="postCard">
    <CardHeader
      title={
        <StyledBox>
          <StyledIdTypography data-testid="postCard_id">
            #{id}
          </StyledIdTypography>
          <StyledTitleTypography data-testid="postCard_title">
            {title}
          </StyledTitleTypography>
        </StyledBox>
      }
      {...(topRated && {
        subheader: `Selected as top rated post ${topRatedSelectionDate}`,
      })}
      {...(showCheckbox && {
        action: (
          <Checkbox
            value={id}
            checked={checked}
            onChange={checkboxOnChange}
            data-testid="postCard_checkbox"
          />
        ),
      })}
      data-testid="postCard_header"
    />
    <CardContent data-testid="postCard_body">{body}</CardContent>
    {topRatedActionActive && (
      <CardActions>
        <Button
          variant="contained"
          onClick={topRatedActionOnClick}
          data-testid="postCard_button"
        >
          {topRatedActionText}
        </Button>
      </CardActions>
    )}
  </Card>
);

const StyledBox = styled(Box)({
  display: 'flex',
  alignItems: 'center',
});

const StyledIdTypography = styled(Typography)(({ theme }) => ({
  marginRight: theme.spacing(1),
  fontStyle: 'italic',
}));

const StyledTitleTypography = styled(Typography)({
  fontWeight: 600,
});

PostCard.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  body: PropTypes.string.isRequired,
  topRatedSelectionDate: PropTypes.string,
  topRatedActionText: PropTypes.string,
  topRatedActionActive: PropTypes.bool,
  topRated: PropTypes.bool,
  showCheckbox: PropTypes.bool,
  checked: PropTypes.bool,
  topRatedActionOnClick: PropTypes.func,
  checkboxOnChange: PropTypes.func,
};

PostCard.defaultProps = {
  topRatedActionText: '',
  topRatedActionActive: false,
  topRated: false,
  showCheckbox: false,
  checked: false,
  topRatedSelectionDate: '',
  topRatedActionOnClick: () => null,
  checkboxOnChange: () => null,
};

export default PostCard;
