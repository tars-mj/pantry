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
} from '@fortawesome/free-solid-svg-icons';
import PageTemplate from '../templates/PageTemplate';
import ButtonAdd from '../components/moleculs/ButtonAdd';
import ButtonHeader from '../components/moleculs/ButtonHeader';
import ButtonPink from '../components/moleculs/ButtonPink';

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
  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const StyledProductToBuy = styled.button`
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

const ButtonFinish = styled.button`
  width: 220px;
  height: 40px;
  color: ${({ theme }) => theme.white};
  font-weight: ${({ theme }) => theme.fontBold};
  font-size: ${({ theme }) => theme.fontSize.m};
  background-color: ${({ theme }) => theme.pink};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 15px;
  padding-right: 15px;
  border: none;
  border-radius: 20px;
`;

const ShoppingListPage = () => (
  <PageTemplate>
    <StyledWrapperPage>
      <StyledHeadingPage>
        Shopping list
        <ButtonFinish>
          Finish shopping
          <FontAwesomeIcon color="white" icon={faClipboardCheck} />
        </ButtonFinish>
      </StyledHeadingPage>

      <StyledContent>
        <ProductToBuy />
      </StyledContent>
    </StyledWrapperPage>
    <ButtonAdd>
      <FontAwesomeIcon size="3x" color="white" icon={faPlus} />
    </ButtonAdd>
  </PageTemplate>
);

export default ShoppingListPage;
