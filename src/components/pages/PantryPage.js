import React, { useState, useContext } from 'react';
import styled from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import PageTemplate from 'components/templates/PageTemplate';
import ButtonAdd from 'components/atoms/ButtonAdd';
import { DataContext } from 'context/DataContext';
import Modal from 'components/moleculs/Modal';
import ProductForm from 'components/moleculs/ProductForm';
import ProductCard from 'components/organisms/ProductCard';
import withAuthentication from 'hoc/withAuthentication';

const StyledWrapperPage = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 1fr;
  height: 100vh;
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
  display: grid;
  grid-template-columns: repeat(auto-fit, 270px);
  grid-gap: 50px;
  grid-auto-rows: 270px;
  overflow-y: scroll;
  height: calc(100vh - 80px);
  @media (max-width: 768px) {
    overflow-y: scroll;
    height: calc(100vh - 100px - 80px);
  }
`;

const StyleContentModal = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-direction: column;
`;

const StyledMain = styled.div`
  grid-area: main;
  overflow: hidden;
  @media (max-width: 768px) {
    overflow: hidden;
  }
`;

const PantryPage = () => {
  const { pantry } = useContext(DataContext);
  const [isModalAdd, setModalAdd] = useState(false);

  return (
    <PageTemplate>
      <StyledMain>
        <StyledWrapperPage>
          <StyledHeadingPage>My pantry</StyledHeadingPage>

          <StyledContent>
            {pantry.length === 0
              ? 'The list is empty'
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
            </StyleContentModal>
          </Modal>
        )}
      </StyledMain>
    </PageTemplate>
  );
};

export default withAuthentication(PantryPage);
