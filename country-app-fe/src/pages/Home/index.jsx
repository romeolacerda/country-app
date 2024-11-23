import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; 
import CustomSelect from '../../components/Select';
import CountrysService from '../../services/CountrysService';
import { Container } from './styles';

export default function Home() {
  const [countries, setCountries] = useState([]);  
  const [selectedCountry, setSelectedCountry] = useState(""); 
  const navigate = useNavigate(); 

  const fetchCountries = async () => {
    const data = await CountrysService.listCountries();
    setCountries(data);  
  };

  useEffect(() => {
    fetchCountries();
  }, []);  

  const handleCountrySelect = (country) => {
    setSelectedCountry(country);  
    const countryCode = countries.find(c => c.name === country)?.countryCode; 
    if (countryCode) {
      navigate(`/${countryCode}`); 
    }
  };

  return (
    <Container>
      <h1>Pick a Country</h1>
      <CustomSelect
        options={countries.map(country => country.name)} 
        value={selectedCountry}
        onSelect={handleCountrySelect} 
      />
    </Container>
  );
}  
