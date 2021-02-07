/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';

// Libs
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const PPButton = withStyles({
  root: {
    padding: '8px 40px',
    borderRadius: '99px',
    marginTop: '9px',
    marginBottom: '24px',
    fontFamily: 'Poppins',
    fontSize: (props) => props.fontSize,
    fontWeight: 600,
    boxShadow: 'none',
    textTransform: 'none',
    width: (props) => props.width,
    whiteSpace: 'nowrap',
  },
})(Button);

function CustomButton(props) {
  const {
    text, type, variant, color, onClick, ...rest
  } = props;

  return (
    <PPButton
      type={type}
      variant={variant}
      color={color}
      onClick={onClick}
      {...rest}
    >
      {text}
    </PPButton>
  );
}

export default CustomButton;
