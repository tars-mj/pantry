import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faArrowAltCircleUp,
  faCheck,
  faEdit,
  faTrashAlt,
  faClipboardCheck,
  faTh,
  faTimes,
} from '@fortawesome/free-solid-svg-icons';
import PageTemplate from '../templates/PageTemplate';
import ButtonAdd from '../components/atoms/ButtonAdd';
import ButtonHeader from '../components/atoms/ButtonHeader';
import ButtonPink from '../components/atoms/ButtonPink';
import MainButton from '../components/atoms/MainButton';

const StyledWrapperPage = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 1fr;
`;

const StyledHeadingPage = styled.div`
  background-color: ${({ theme }) => theme.lightOrange};
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontBold};
  padding: 10px;
  display: grid;
  grid-template-columns: 1fr 220px;
  grid-template-rows: 1fr;
  align-items: center;
`;

const StyledContent = styled.div`
  padding: 30px;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr;
  grid-auto-rows: 70px;
  justify-items: center;
  align-items: center;
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const StyledProductToBuy = styled.div`
  cursor: pointer;
  width: 100%;
  height: 60px;
  padding: 0 10px;
  display: grid;
  grid-template-columns: auto 35px 35px;
  grid-template-rows: 1fr;
  grid-gap: 10px;
  justify-items: start;
  align-items: center;
  border: 0;
  border-radius: 20px;
  max-width: 1030px;
  font-size: ${({ theme }) => theme.fontSize.s};
  font-weight: ${({ theme }) => theme.fontBold};
  color: ${({ theme }) => theme.black};
  background-color: ${({ theme }) => theme.lightOrange};

  ${({ isSelected }) =>
    isSelected &&
    css`
      grid-template-columns: minmax(0, 60px) auto 35px 35px;
      background-color: ${({ theme }) => theme.orange};
      color: ${({ theme }) => theme.white};
    `}
`;

const ProductToBuy = () => {
  const [isSelected, setSelected] = useState(false);
  return (
    <StyledProductToBuy isSelected={isSelected}>
      {isSelected && (
        <StyledIconCheck>
          <FontAwesomeIcon color="white" size="2x" icon={faCheck} />
        </StyledIconCheck>
      )}
      Mąka
      <ButtonPink>
        <FontAwesomeIcon size="1x" color="white" icon={faEdit} />
      </ButtonPink>
      <ButtonPink>
        <FontAwesomeIcon size="1x" color="white" icon={faTrashAlt} />
      </ButtonPink>
    </StyledProductToBuy>
  );
};
const StyledIconCheck = styled.div`
  justify-self: center;
  align-self: center;
`;

const ShoppingListPage = () => (
  <PageTemplate>
    <>
      <StyledWrapperPage>
        <StyledHeadingPage>
          Shopping list
          <MainButton>
            Finish shopping
            <FontAwesomeIcon color="white" icon={faClipboardCheck} />
          </MainButton>
        </StyledHeadingPage>

        <StyledContent>
          <ProductToBuy />
        </StyledContent>
      </StyledWrapperPage>
      <ButtonAdd>
        <FontAwesomeIcon size="3x" color="white" icon={faPlus} />
      </ButtonAdd>
      {/* <Modal /> */}
    </>
  </PageTemplate>
);

export default ShoppingListPage;
