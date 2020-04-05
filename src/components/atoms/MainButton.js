import styled, { css } from 'styled-components';

const MainButton = styled.button`
  width: 220px;
  height: 40px;
  color: ${({ theme }) => theme.white};
  font-weight: ${({ theme }) => theme.fontBold};
  font-size: ${({ theme }) => theme.fontSize.m};
  background-color: ${({ theme }) => theme.pink};
  display: flex;
  justify-content: ${({ isIcon }) => (isIcon ? 'space-between' : 'center')};
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  border: none;
  border-radius: 20px;
  &:focus {
    outline: 0;
  }
`;

export default MainButton;
