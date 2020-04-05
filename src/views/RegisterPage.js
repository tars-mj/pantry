import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoginForm from '../components/moleculs/LoginForm';
import { routes } from '../routes';

const StyledWrapper = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.black};
`;

const StyledLoginCard = styled.div`
  width: 400px;
  height: 300px;
  background-color: ${({ theme }) => theme.lightOrange};
  border-radius: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 20px;
`;

const StyledCreateAcc = styled.div`
  margin: 20px;
  font-size: ${({ theme }) => theme.fontSize.s};
`;
const StyledHeader = styled.div`
  margin: 20px;
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontBold};
`;

const RegisterPage = () => (
  <>
    <StyledWrapper>
      <StyledLoginCard>
        <StyledHeader>Register</StyledHeader>
        <LoginForm isRegister />
        <StyledCreateAcc as={Link} to={routes.login}>
          You have an account? Sign in here!
        </StyledCreateAcc>
      </StyledLoginCard>
    </StyledWrapper>
  </>
);

export default RegisterPage;
