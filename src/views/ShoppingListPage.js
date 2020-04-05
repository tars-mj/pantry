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

const MainButton = styled.button`
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
  &:focus {
    outline: 0;
  }
`;

const StyledModalWrapper = styled.div`
  background-color: white;
  padding: 10px;
  position: fixed;
  top: 0;
  right: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(255, 255, 255, 0.9);
  backdrop-filter: grayscale(1) blur(2px);

  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledModalCard = styled.div`
  width: 800px;
  height: 80vh;
  background-color: ${({ theme }) => theme.white};
  border-radius: 50px;
  box-shadow: 0 30px 60px -5px hsla(0, 0%, 0%, 0.2);
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 100px auto 80px;
  justify-items: center;
`;

const StyledModalHeader = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${({ theme }) => theme.lightOrange};
  border-radius: 50px;
  padding: 20px;
  display: grid;
  grid-template-columns: auto 40px;
  align-items: center;
  color: ${({ theme }) => theme.black};
  font-weight: ${({ theme }) => theme.fontBold};
  font-size: ${({ theme }) => theme.fontSize.m};
`;

const StyledContentModal = styled.div`
  width: 90%;

  height: 100%;
  padding: 20px;
`;

const MainInput = styled.input.attrs((props) => ({
  type: props.type || 'text',
  placeholder: props.title,
}))`
  font-size: ${({ theme }) => theme.fontSize.s};
  color: ${({ theme }) => theme.black};
  width: ${({ width }) => width || '100%'};
  height: ${({ height }) => height || '35px'};
  border: 0px;
  border-radius: 5px;
  caret-color: ${({ theme }) => theme.black};
  padding-left: 10px;
  background-color: ${({ theme }) => theme.white};
  justify-self: self-start;
  box-shadow: 0px 5px 10px -5px hsla(0, 0%, 0%, 0.2);
  &:hover::placeholder {
    color: ${({ theme }) => theme.black};
    transition: opacity 0.5s ease-out;
  }
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

const Modal = ({ closeModalFn }) => (
  <StyledModalWrapper>
    {/* <button className={styles.closeButton} onClick={closeModalFn} /> */}
    <StyledModalCard>
      <StyledModalHeader>
        Dodaj do spiarnii
        <ButtonPink>
          <FontAwesomeIcon size="1x" color="white" icon={faTimes} />
        </ButtonPink>
      </StyledModalHeader>
      <StyledContentModal>
        <MainInput title="Nazwa produktu" />
      </StyledContentModal>

      <MainButton>
        Add to pantry
        <FontAwesomeIcon color="white" icon={faTh} />
      </MainButton>
    </StyledModalCard>
  </StyledModalWrapper>
);

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
