import React from 'react';
import styled from 'styled-components';

const HeaderContainer = styled.header`
  background-color: #f8f9fa;
  padding: 20px;
  text-align: center;
`;

const HeaderTitle = styled.h1`
  font-size: 24px;
  color: #333;
`;

const Header = () => {
  return (
    <HeaderContainer>
      <HeaderTitle>Salary Calculator</HeaderTitle>
    </HeaderContainer>
  );
};

export default Header;
