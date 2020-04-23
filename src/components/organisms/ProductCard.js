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

import ButtonPink from 'components/atoms/ButtonPink';
import { DataContext } from 'context/DataContext';
import Modal from 'components/moleculs/Modal';
import MainButton from 'components/atoms/MainButton';
import ProductForm from 'components/moleculs/ProductForm';
import AddToListForm from 'components/moleculs/AddToListForm';

const StyleContentModal = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
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
  border: 1px solid ${({ theme }) => theme.white};
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
    setQuantityProductPantry({ id: product.id, value: Number(actualValue) + 1 });
  };

  const decreaseQuantityProduct = () => {
    setQuantityProductPantry({ id: product.id, value: Number(actualValue) - 1 });
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

export default ProductCard;
