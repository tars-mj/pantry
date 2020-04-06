import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTh, faList, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { NavLink } from 'react-router-dom';
import { routes } from '../routes';
import { DataContext } from '../context/DataContext';
import { auth } from '../services/firebase';

const StyledBoardLayout = styled.div`
  margin: 0;
  padding: 0 0 0 0;
  width: 100vw;
  height: 100vh;
  display: grid;

  grid-template-columns: 100px 1fr;
  grid-template-rows: auto;
  grid-template-areas: 'menu main';

  background-color: ${({ theme }) => theme.white};

  will-change: grid-template-columns;
  transition: grid-template-columns 0.25s ease-in;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 100px;
    grid-template-areas:
      'main'
      'menu';
  }
`;

const StyledSideBar = styled.div`
  grid-area: menu;

  background-color: ${({ theme }) => theme.black};
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100px 1fr repeat(2, 60px) 1fr 100px;
  grid-template-areas:
    'logo'
    '.'
    'btn1'
    'btn2'
    '.'
    'user';

  @media (max-width: 768px) {
    grid-template-columns: 60px 60px 1fr 60px;
    grid-template-rows: auto;
    grid-template-areas: 'btn1 btn2 . user';
  }
`;

const ButtonSideBar = styled.div`
  grid-area: ${({ area }) => area || 'logo'};
  width: 100%;
  height: 100%;
  display: grid;
  font-size: 3rem;
  grid-template-columns: 45px 155px;
  grid-template-rows: 60px;
  transition: all 0.25s ease-in-out;
  border-left: 5px solid rgba(0, 0, 0, 0);
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  color: ${({ theme }) => theme.white};
  cursor: pointer;
  &:hover {
    transition: all 0.5s;
    background-color: ${({ theme }) => theme.blackHover};
  }
`;

const badgeKeys = keyframes`
	0% {
    transform: scale(1);
  }

	50% {
		transform: scale(2);
	}

  100% {
    transform: scale(1);
  }
`;

const Badge = styled.div`
  position: absolute;
  width: 25px;
  height: 20px;
  border-radius: 20px;
  background-color: ${({ theme }) => theme.pink};
  top: 5px;
  left: 20px;
  font-size: 1.1rem;
  font-weight: ${({ theme }) => theme.fontBold};
  color: ${({ theme }) => theme.white};
  border: 1px solid ${({ theme }) => theme.white};
  text-align: center;
  line-height: 1.7;
  animation: ${badgeKeys} 0.3s ease-in-out;

  @media (max-width: 768px) {
    top: 24px;
    left: 0px;
  }
`;

const UserIcon = styled.div`
  width: 100%;
  height: 100%;
  grid-area: user;
`;

const PageTemplate = ({ children }) => {
  const { pantry, shoppingList } = useContext(DataContext);

  const signOut = () => {
    auth.signOut();
  };
  return (
    <StyledBoardLayout>
      <StyledSideBar>
        <ButtonSideBar
          as={NavLink}
          to={routes.shoppingList}
          activeClassName="activeBtn"
          area="btn1"
        >
          <Badge>{shoppingList.length}</Badge>
          <FontAwesomeIcon color="white" icon={faList} />
        </ButtonSideBar>

        <ButtonSideBar as={NavLink} to={routes.pantry} activeClassName="activeBtn" area="btn2">
          <Badge>{pantry.length}</Badge>
          <FontAwesomeIcon color="white" icon={faTh} />
        </ButtonSideBar>
        <ButtonSideBar area="user" onClick={() => signOut()}>
          <FontAwesomeIcon color="white" icon={faSignOutAlt} />
        </ButtonSideBar>
      </StyledSideBar>
      {children}
    </StyledBoardLayout>
  );
};

PageTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PageTemplate;
