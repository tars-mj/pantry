import styled, { css } from 'styled-components';
import PropTypes from 'prop-types';

const ButtonPink = styled.button`
  width: 31px;
  height: 31px;
  background-color: ${({ theme }) => theme.pink};
  border: none;

  transition: transform 0.15s ease-out;
  &:hover {
    transform: scale(1.2);
  }

  ${({ type }) =>
    type === 'default' &&
    css`
      position: relative;
      border-radius: 50%;
      border: 2px solid ${({ theme }) => theme.white};
    `}

  ${({ type }) =>
    type === 'minus' &&
    css`
      position: absolute;
      bottom: -15px;
      border-radius: 0 50% 50% 0;
      right: 104px;
    `}

		${({ type }) =>
      type === 'plus' &&
      css`
        position: absolute;
        bottom: -15px;
        border-radius: 50% 0 0 50%;
        left: 104px;
      `}

`;

ButtonPink.propTypes = {
  type: PropTypes.oneOf(['default', 'minus', 'plus']).isRequired,
};

ButtonPink.defaultProps = {
  type: 'default',
};

export default ButtonPink;
