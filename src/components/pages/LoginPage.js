import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import LoginForm from 'components/moleculs/LoginForm';
import { routes } from 'routes';

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

const LoginPage = () => (
  <>
    <StyledWrapper>
      <StyledLoginCard>
        <StyledHeader>Login to app</StyledHeader>
        <LoginForm />
        <StyledCreateAcc as={Link} to={routes.register}>
          Don't have an account? Sign up here!
        </StyledCreateAcc>
      </StyledLoginCard>
    </StyledWrapper>
  </>
);

export default LoginPage;
