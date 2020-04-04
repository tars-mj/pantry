import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import styled, { keyframes } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCoffee,
  faArrowAltCircleDown,
  faArrowAltCircleUp,
  faCartArrowDown,
  faShoppingCart,
  faEdit,
  faCheck,
  faBars,
  faTrashAlt,
  faTh,
  faList,
} from '@fortawesome/free-solid-svg-icons';

// eslint-disable-next-line no-lone-blocks
{
  /* <FontAwesomeIcon color="green" icon={faCoffee} />    
<FontAwesomeIcon color="green" icon={faArrowAltCircleDown} />
<FontAwesomeIcon color="green" icon={faArrowAltCircleUp} />
<FontAwesomeIcon color="green" icon={faCartArrowDown} />
<FontAwesomeIcon color="green" icon={faShoppingCart} />
<FontAwesomeIcon color="green" icon={faEdit} />
<FontAwesomeIcon color="green" icon={faCheck} />
<FontAwesomeIcon color="green" icon={faBars} />
<FontAwesomeIcon color="green" icon={faTrashAlt} />
<FontAwesomeIcon color="green" icon={faTh} />
<FontAwesomeIcon color="green" icon={faList} /> */
}

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
  overflow: hidden;
  will-change: grid-template-columns;
  transition: grid-template-columns 0.25s ease-in;

  /* @media only screen and (min-device-width: 375px) and (max-device-width: 800px) and (-webkit-min-device-pixel-ratio: 2) and (orientation: portrait) {
    background-color: red;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 100px;
  } */

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
  overflow: hidden;
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
    grid-template-columns: 1fr 60px 2fr 60px 1fr;
    grid-template-rows: auto;
    grid-template-areas: '. btn1 btnAdd btn2 .';
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

const PageTemplate = ({ children }) => (
  <StyledBoardLayout>
    <StyledSideBar>
      <ButtonSideBar area="btn1">
        <Badge>20</Badge>
        <FontAwesomeIcon icon={faList} />
      </ButtonSideBar>

      <ButtonSideBar area="btn2">
        <Badge>10</Badge>
        <FontAwesomeIcon icon={faTh} />
      </ButtonSideBar>
    </StyledSideBar>
    {children}
  </StyledBoardLayout>
);

PageTemplate.propTypes = {
  children: PropTypes.element.isRequired,
};

export default PageTemplate;
