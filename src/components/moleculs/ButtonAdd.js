import styled from 'styled-components';

const ButtonAdd = styled.button`
  width: 100px;
  height: 100px;
  background-color: ${({ theme }) => theme.pink};
  border: 5px solid #fff;
  border-radius: 50%;
  position: fixed;
  bottom: 20px;
  right: 20px;
  box-shadow: 0 0px 15px -2px hsla(0, 0%, 0%, 0.3);

  transition: transform 0.15s ease-out;
  &:hover {
    transform: scale(1.2);
  }
  @media (max-width: 768px) {
    right: calc(50% - 50px);
    bottom: 50px;
  }
`;

export default ButtonAdd;
