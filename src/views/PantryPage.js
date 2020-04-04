import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faPlus,
  faMinus,
  faTrashAlt,
  faEdit,
  faShoppingCart,
  faArrowAltCircleDown,
  faArrowAltCircleUp,
} from '@fortawesome/free-solid-svg-icons';
import PageTemplate from '../templates/PageTemplate';
import ButtonAdd from '../components/moleculs/ButtonAdd';

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

const ButtonPink = styled.button`
  width: 31px;
  height: 31px;
  background-color: ${({ theme }) => theme.pink};
  border: none;

  transition: transform 0.15s ease-out;
  &:hover {
    transform: scale(1.2);
  }

  ${({ type }) =>
    type === 'default' &&
    css`
      position: relative;
      border-radius: 50%;
    `}

  ${({ type }) =>
    type === 'minus' &&
    css`
      position: absolute;
      bottom: -15px;
      border-radius: 0 50% 50% 0;
      right: 104px;
    `}

		${({ type }) =>
      type === 'plus' &&
      css`
        position: absolute;
        bottom: -15px;
        border-radius: 50% 0 0 50%;
        left: 104px;
      `}

`;

const ButtonHeading = styled.button`
  width: 50px;
  height: 50px;
  color: ${({ theme }) => theme.blac};
  border: none;
  background-color: inherit;
  transition: transform 0.15s ease-out;
  justify-self: center;
  &:hover {
    transform: scale(1.2);
  }
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

const ProductCard = () => {
  const minValue = 5;
  const maxValue = 30;
  const actualValue = 28;
  const unit = 'kg';
  let valueInPercent = (actualValue * 100) / maxValue;
  const isTooHigh = valueInPercent > 100 ? true : false;
  valueInPercent = valueInPercent >= 130 ? '200px' : `${valueInPercent}%`;

  return (
    <StyledWrapperCard>
      <CardHeader>
        Mąka
        <StyledWrapperButtons>
          <ButtonPink type="default">
            <FontAwesomeIcon color="white" icon={faShoppingCart} />
          </ButtonPink>
          <ButtonPink type="default">
            <FontAwesomeIcon color="white" icon={faEdit} />
          </ButtonPink>
          <ButtonPink type="default">
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
        <ButtonPink type="minus">
          <FontAwesomeIcon color="white" icon={faMinus} />
        </ButtonPink>
        <ButtonPink type="plus">
          <FontAwesomeIcon color="white" icon={faPlus} />
        </ButtonPink>
      </CardFooter>
    </StyledWrapperCard>
  );
};

const PantryPage = () => (
  <PageTemplate>
    <StyledWrapperPage>
      <StyledHeadingPage>
        PantryPage
        <ButtonHeading>
          <FontAwesomeIcon size="3x" icon={faArrowAltCircleDown} />
        </ButtonHeading>
        <ButtonHeading>
          <FontAwesomeIcon size="3x" icon={faArrowAltCircleUp} />
        </ButtonHeading>
      </StyledHeadingPage>

      <StyledContent>
        <ProductCard />
      </StyledContent>
    </StyledWrapperPage>
    <ButtonAdd>
      <FontAwesomeIcon size="3x" color="white" icon={faPlus} />
    </ButtonAdd>
  </PageTemplate>
);

export default PantryPage;
