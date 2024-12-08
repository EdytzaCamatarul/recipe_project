import React from 'react';
import './Button.css';
import { Link } from 'react-router-dom';

const STYLES = ['btn--primary', 'btn--outline', 'btn--test', 'btn--green', 'btn--red'];

const SIZES = ['btn--medium', 'btn--large'];

export const Button = ({
  children,
  type,
  onClick,
  buttonStyle,
  buttonSize,
  link,
  align
}) => {
  const checkButtonStyle = STYLES.includes(buttonStyle)
    ? buttonStyle
    : STYLES[0];

  const checkButtonSize = SIZES.includes(buttonSize) ? buttonSize : SIZES[0];
  const alignmentClass = align === 'right' ? 'btn--right' : align === 'center' ? 'btn--center' : '';

  if (link) {
    // Render as a link if the `link` prop is provided
    return (
      <Link
        to={link}
        className={`btn-mobile ${checkButtonStyle} ${checkButtonSize} ${alignmentClass}`}
        onClick={onClick}
      >
        {children}
      </Link>
    );
  }

  // Render as a button if no `link` prop is provided
  return (
    <button
      className={`btn ${checkButtonStyle} ${checkButtonSize} ${alignmentClass}`}
      onClick={onClick}
      type={type}
    >
      {children}
    </button>
  );
};