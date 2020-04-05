import styled from 'styled-components';

const MainInput = styled.input.attrs((props) => ({
  type: props.type || 'search',
  placeholder: 'props.title',
  autoComplete: 'off',
}))`
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.black};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '35px'};
  border: 1px solid ${({ theme, isError }) => (isError ? theme.red : theme.lightOrange)};
  border-radius: 5px;
  caret-color: ${({ theme }) => theme.black};
  padding-left: 10px;
  margin-bottom: 5px;
  background-color: ${({ theme }) => theme.white};
  justify-self: self-start;
  box-shadow: 0px 5px 10px -5px hsla(0, 0%, 0%, 0.2);
  /* &:hover::placeholder {
    color: ${({ theme }) => theme.black};
    transition: opacity 0.5s ease-out;
  } */
  &::placeholder {
    opacity: 1;
    color: ${({ theme }) => '#ccc'};
    transition: opacity 0.5s ease-out;
  }
  &:focus {
    outline: none;
  }
  &:focus::placeholder {
    opacity: 0;
  }
`;

export default MainInput;
