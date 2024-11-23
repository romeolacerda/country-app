import PropTypes from 'prop-types';
import { useState } from 'react';
import styled from 'styled-components';

export const CustomSelectContainer = styled.div`
  width: 100%;
  border: 2px solid #fff;
  background-color: #FFF;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  height: 52px;
  border-radius: 4px;
  margin-top: 16px;
  padding-top: 16px;
  font-size: 20px;
  align-items: center;
  position: relative;
  cursor: pointer;
`;

export const OptionsList = styled.ul`
  position: absolute;
  top: 100%;
  left: 0;
  width: 100%;
  max-height: 300px;
  overflow-y: auto;
  background-color: white;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.4);
  border-radius: 4px;
  list-style: none;
  padding: 0;
  margin: 0;
  background-color: none;
  border: 2px solid #fff;
  display: ${props => (props.isOpen ? 'block' : 'none')};
`;

export const OptionItem = styled.li`
  cursor: pointer;

`;

export const CustomSelect = ({ options, onSelect, value }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (option) => {
    onSelect(option);
    setIsOpen(false);
  };

  return (
    <CustomSelectContainer onClick={toggleDropdown}>
      <span>{value || "Select a country"}</span>
      <OptionsList isOpen={isOpen}>
        {options.map((option, index) => (
          <OptionItem key={index} onClick={() => handleSelect(option)}>
            {option}
          </OptionItem>
        ))}
      </OptionsList>
    </CustomSelectContainer>
  );
};

CustomSelect.propTypes = {
  options: PropTypes.arrayOf(PropTypes.string).isRequired,  
  onSelect: PropTypes.func.isRequired, 
  value: PropTypes.string  
};

export default CustomSelect;
