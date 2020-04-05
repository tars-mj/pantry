import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import {
  faPlus,
  faMinus,
  faTrashAlt,
  faEdit,
  faShoppingCart,
} from '@fortawesome/free-solid-svg-icons';
import PageTemplate from '../templates/PageTemplate';
import ButtonAdd from '../components/atoms/ButtonAdd';
import ButtonPink from '../components/atoms/ButtonPink';
import { DataContext } from '../context/DataContext';
import Modal from '../components/moleculs/Modal';
import MainButton from '../components/atoms/MainButton';
import ProductForm from '../components/moleculs/ProductForm';
import AddToListForm from '../components/moleculs/AddToListForm';

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
  grid-template-columns: 1fr 60px 60px;
  grid-template-rows: 1fr;

  align-items: center;
`;

const StyledContent = styled.div`
  padding: 30px;
  max-width: 100%;
  height: calc(100vh-80px);
  display: grid;
  grid-template-columns: repeat(auto-fit, 270px);
  grid-gap: 50px;
  grid-auto-rows: 270px;
  overflow: scroll;

  @media (max-width: 768px) {
    height: calc(100vh - 100px - 80px);
  }
`;

const StyledWrapperCard = styled.div`
  width: 270px;
  height: 270px;
  background-color: ${({ theme }) => theme.white};
  box-shadow: 0 15px 30px -20px hsla(0, 0%, 0%, 0.2);
  border-radius: 20px 20px 50px 50px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 72px auto 50px;
`;

const CardHeader = styled.div`
  border-radius: 20px 20px 5px 5px;
  background-color: ${({ theme }) => theme.orange};
  display: flex;
  align-items: center;
  padding: 10px;
  color: ${({ theme }) => theme.white};
  font-weight: ${({ theme }) => theme.fontBold};
  font-size: ${({ theme }) => theme.fontSize.m};

  position: relative;
`;

const CardContent = styled.div`
  background-color: ${({ theme }) => theme.white};
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 10px;
  color: ${({ theme }) => theme.black};
  font-weight: ${({ theme }) => theme.fontBold};
  font-size: ${({ theme }) => theme.fontSize.m};
  overflow: hidden;
`;

const CardFooter = styled.div`
  background-color: ${({ theme }) => theme.white};
  border-radius: 0 0 50px 50px;
  display: flex;
  align-items: center;
  padding: 10px;
  color: ${({ theme }) => theme.black};
  font-weight: ${({ theme }) => theme.fontBold};
  font-size: ${({ theme }) => theme.fontSize.m};

  position: relative;
`;

const StyledWrapperButtons = styled.div`
  width: 120px;
  height: 44px;
  padding: 5px;
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-items: center;
  align-items: center;
  position: absolute;
  border-radius: 31px;
  top: -22px;
  right: 20px;
  background-color: ${({ theme }) => theme.white};
`;

const ProductBar = styled.div`
  margin: 0 auto;
  width: 200px;
  max-width: 200px;
  height: 70px;
  background-color: ${({ theme }) => theme.lightGreen};
  position: relative;
`;

const StateWrapper = styled.div`
  margin: 0 auto;
  width: 70%;
  height: 100%;
  position: absolute;
`;

const ActualState = styled.div`
  margin: 0 auto;
  width: ${({ position }) => position};

  height: 100%;
  background-color: ${({ theme, isTooHigh }) => (isTooHigh ? theme.red : theme.green)};
  position: absolute;
`;

const LineStatus = styled.div`
  position: absolute;
  height: 100%;
  border: 2px dotted ${({ theme }) => theme.black};
  top: 0;
  left: ${({ side }) => (side === 'min' ? '30%' : '70%')};
`;

const DescriptionStatus = styled.div`
  font-size: ${({ theme }) => theme.fontSize.xs};
  position: absolute;
  color: ${({ theme }) => theme.black};
  height: 100%;
  bottom: -90px;
  left: ${({ side }) => `calc(${side === 'min' ? '30%' : '70%'} - 1.2rem)`};
`;

const StyleContentModal = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const ProductCard = ({ product }) => {
  const { setQuantityProductPantry, removeProductPantry } = useContext(DataContext);
  const [isModalRemoveProduct, setModalRemoveProduct] = useState(false);
  const [isModalEditProduct, setModalEditProduct] = useState(false);
  const [isModalBuy, setModalBuy] = useState(false);

  const minValue = product.min;
  const maxValue = product.max;
  const actualValue = product.quantity;
  const { unit } = product;
  let valueInPercent = (actualValue * 100) / maxValue;
  const isTooHigh = valueInPercent > 100 ? true : false;
  valueInPercent = valueInPercent >= 130 ? '200px' : `${valueInPercent}%`;

  const increaseQuantityProduct = () => {
    setQuantityProductPantry({ id: product.id, value: actualValue + 1 });
  };

  const decreaseQuantityProduct = () => {
    setQuantityProductPantry({ id: product.id, value: actualValue - 1 });
  };

  return (
    <StyledWrapperCard>
      <CardHeader>
        {product.productName}
        <StyledWrapperButtons>
          <ButtonPink onClick={() => setModalBuy(true)} type="default">
            <FontAwesomeIcon color="white" icon={faShoppingCart} />
          </ButtonPink>
          <ButtonPink onClick={() => setModalEditProduct(true)} type="default">
            <FontAwesomeIcon color="white" icon={faEdit} />
          </ButtonPink>
          <ButtonPink onClick={() => setModalRemoveProduct(true)} type="default">
            <FontAwesomeIcon color="white" icon={faTrashAlt} />
          </ButtonPink>
        </StyledWrapperButtons>
      </CardHeader>
      <CardContent>
        <span>
          {actualValue} {unit}
        </span>
        <ProductBar>
          <StateWrapper>
            <ActualState isTooHigh={isTooHigh} position={valueInPercent} />
          </StateWrapper>
          <LineStatus side="min" />
          <DescriptionStatus side="min">min {minValue}</DescriptionStatus>
          <LineStatus side="max" />
          <DescriptionStatus side="max">max {maxValue}</DescriptionStatus>
        </ProductBar>
      </CardContent>
      <CardFooter>
        <ButtonPink onClick={() => increaseQuantityProduct()} type="plus">
          <FontAwesomeIcon color="white" icon={faPlus} />
        </ButtonPink>
        <ButtonPink onClick={() => decreaseQuantityProduct()} type="minus">
          <FontAwesomeIcon color="white" icon={faMinus} />
        </ButtonPink>
      </CardFooter>
      {isModalBuy && (
        <Modal title="Add product to list" closeModalFn={() => setModalBuy(false)}>
          <AddToListForm productToEdit={product} onCloseModal={() => setModalBuy(false)} />
        </Modal>
      )}
      {isModalRemoveProduct && (
        <Modal
          title="Remove product"
          closeModalFn={() => setModalRemoveProduct(false)}
          btn={<MainButton onClick={() => removeProductPantry({ id: product.id })}>Yes</MainButton>}
        >
          <StyleContentModal>Are you sure want to remove existing</StyleContentModal>
        </Modal>
      )}
      {isModalEditProduct && (
        <Modal title="Edit product" closeModalFn={() => setModalEditProduct(false)}>
          <StyleContentModal>
            <ProductForm productToEdit={product} onCloseModal={() => setModalEditProduct(false)} />
          </StyleContentModal>
        </Modal>
      )}
    </StyledWrapperCard>
  );
};

const PantryPage = () => {
  const { pantry } = useContext(DataContext);
  const [isModalAdd, setModalAdd] = useState(false);

  return (
    <PageTemplate>
      <>
        <StyledWrapperPage>
          <StyledHeadingPage>My pantry</StyledHeadingPage>

          <StyledContent>
            {pantry.length === 0
              ? 'Lista jest pusta'
              : pantry.map((product) => <ProductCard key={product.id} product={product} />)}
          </StyledContent>
        </StyledWrapperPage>
        <ButtonAdd onClick={() => setModalAdd(true)}>
          <FontAwesomeIcon size="3x" color="white" icon={faPlus} />
        </ButtonAdd>
        {isModalAdd && (
          <Modal closeModalFn={() => setModalAdd(false)} title="Add product to pantry">
            <StyleContentModal>
              <ProductForm addNewProduct onCloseModal={setModalAdd} />
              {/* {Object.keys(product).map((x) => x !== 'id' && <MainInput onChange={()} title={x} />)} */}
            </StyleContentModal>
          </Modal>
        )}
      </>
    </PageTemplate>
  );
};

export default PantryPage;
