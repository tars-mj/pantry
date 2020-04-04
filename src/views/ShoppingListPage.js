import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faArrowAltCircleUp } from '@fortawesome/free-solid-svg-icons';
import PageTemplate from '../templates/PageTemplate';
import ButtonAdd from '../components/moleculs/ButtonAdd';
import ButtonHeader from '../components/moleculs/ButtonHeader';

const StyledWrapperPage = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 80px 1fr;
`;

const StyledHeadingPage = styled.div`
  background-color: ${({ theme }) => theme.lightOrange};
  font-size: ${({ theme }) => theme.fontSize.l};
  font-weight: ${({ theme }) => theme.fontBold};
  padding: 20px;
  display: grid;
  grid-template-columns: 1fr 60px 60px;
  grid-template-rows: 1fr;
  align-items: center;
`;

const StyledContent = styled.div`
  padding: 30px;
`;

const ShoppingListPage = () => (
  <PageTemplate>
    <StyledWrapperPage>
      <StyledHeadingPage>
        Shopping list
        <ButtonHeader>
          <FontAwesomeIcon size="3x" icon={faArrowAltCircleUp} />
        </ButtonHeader>
      </StyledHeadingPage>

      <StyledContent>xxx</StyledContent>
    </StyledWrapperPage>
    <ButtonAdd>
      <FontAwesomeIcon size="3x" color="white" icon={faPlus} />
    </ButtonAdd>
  </PageTemplate>
);

export default ShoppingListPage;
