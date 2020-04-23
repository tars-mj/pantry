import React, { useState, useContext } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheck, faEdit, faTrashAlt, faClipboardCheck } from '@fortawesome/free-solid-svg-icons';
import { DataContext } from 'context/DataContext';
import Modal from 'components/moleculs/Modal';
import PageTemplate from 'components/templates/PageTemplate';
import ButtonPink from 'components/atoms/ButtonPink';
import MainButton from 'components/atoms/MainButton';
import AddToListForm from 'components/moleculs/AddToListForm';
import withAuthentication from 'hoc/withAuthentication';

const StyledWrapperPage = styled.div`
  display: grid;
  grid-template-columns: minmax(0, 1fr);
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

const StyleContentModal = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const ProductToBuy = (props) => {
  const [isModalRemoveProduct, setModalRemoveProduct] = useState(false);
  const [isModalBuy, setModalBuy] = useState(false);
  const { data, isSelected, removeFromShoppingList } = props;

  const remove = (e) => {
    e.stopPropagation();
    setModalRemoveProduct(true);
  };

  const edit = (e) => {
    e.stopPropagation();
    setModalBuy(true);
  };

  return (
    <>
      <StyledProductToBuy isSelected={isSelected} {...props}>
        {isSelected && (
          <StyledIconCheck>
            <FontAwesomeIcon color="white" size="2x" icon={faCheck} />
          </StyledIconCheck>
        )}
        {`${data.productName} - ${data.quantity}${data.unit}`}
        <ButtonPink onClick={(e) => edit(e)}>
          <FontAwesomeIcon size="1x" color="white" icon={faEdit} />
        </ButtonPink>
        <ButtonPink onClick={(e) => remove(e)}>
          <FontAwesomeIcon size="1x" color="white" icon={faTrashAlt} />
        </ButtonPink>
      </StyledProductToBuy>
      {isModalRemoveProduct && (
        <Modal
          title="Remove product"
          closeModalFn={() => setModalRemoveProduct(false)}
          btn={<MainButton onClick={() => removeFromShoppingList({ id: data.id })}>Yes</MainButton>}
        >
          <StyleContentModal>
            Are you sure want to remove existing product from shopping list?
          </StyleContentModal>
        </Modal>
      )}
      {isModalBuy && (
        <Modal title="Edit quantity" closeModalFn={() => setModalBuy(false)}>
          <AddToListForm isEdit productToEdit={data} onCloseModal={() => setModalBuy(false)} />
        </Modal>
      )}
    </>
  );
};
const StyledIconCheck = styled.div`
  justify-self: center;
  align-self: center;
`;

const StyledMain = styled.div`
  grid-area: main;
  height: 100vh;
  overflow: hidden;

  @media (max-width: 768px) {
    height: calc(100vh - 100px);
  }
`;

const ShoppingListPage = () => {
  const {
    selectedProducts,
    setSelectedProducts,
    shoppingList,
    updatePantryWithShoppingList,
    clearShoppingList,
    removeFromShoppingList,
  } = useContext(DataContext);
  const [isModalFinish, setModalFinish] = useState(false);

  const addToSelected = (product) => {
    if (!selectedProducts.find((x) => x.id === product.id)) {
      setSelectedProducts({ products: [...selectedProducts, product] });
    } else {
      setSelectedProducts({ products: selectedProducts.filter((x) => x.id !== product.id) });
    }
  };

  const checkSelected = (id) => {
    return selectedProducts.find((x) => x.id === id);
  };

  const finishShopping = () => {
    updatePantryWithShoppingList({
      productsToUpdate: selectedProducts,
    });
    setModalFinish(false);
    clearShoppingList();
  };

  return (
    <PageTemplate>
      <StyledMain>
        <StyledWrapperPage>
          <StyledHeadingPage>
            Shopping list
            <MainButton isIcon onClick={() => setModalFinish(true)}>
              Finish shopping
              <FontAwesomeIcon color="white" icon={faClipboardCheck} />
            </MainButton>
          </StyledHeadingPage>

          <StyledContent>
            {shoppingList.length === 0
              ? 'The list is empty'
              : shoppingList.map((product) => (
                  <ProductToBuy
                    key={product.id}
                    data={product}
                    isSelected={checkSelected(product.id)}
                    onClick={() => addToSelected({ id: product.id, quantity: product.quantity })}
                    removeFromShoppingList={removeFromShoppingList}
                  />
                ))}
          </StyledContent>
        </StyledWrapperPage>

        {isModalFinish && (
          <Modal
            title="Finish shopping"
            closeModalFn={() => setModalFinish(false)}
            btn={<MainButton onClick={() => finishShopping()}>Yes</MainButton>}
          >
            <StyleContentModal>Are you sure want to finish shopping?</StyleContentModal>
          </Modal>
        )}
      </StyledMain>
    </PageTemplate>
  );
};

export default withAuthentication(ShoppingListPage);
