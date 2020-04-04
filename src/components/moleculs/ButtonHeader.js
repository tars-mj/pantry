import styled from 'styled-components';

const ButtonHeader = styled.button`
  width: 50px;
  height: 50px;
  color: ${({ theme }) => theme.blac};
  border: none;
  background-color: inherit;
  transition: transform 0.15s ease-out;
  justify-self: center;
  &:hover {
    transform: scale(1.2);
  }
`;

export default ButtonHeader;
