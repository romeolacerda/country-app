import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom'; 
import { CartesianGrid, Legend, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';
import CountrysService from '../../services/CountrysService';

const Country = () => {
  const { id } = useParams(); 
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const getCountryDetails = async () => {
      try {
        const data = await CountrysService.getCountry(id); 
        setCountry(data); 
      } catch (error) {
        console.error('Erro ao carregar os dados do país', error);
      }
    };

    getCountryDetails();
  }, [id]);

  if (!country) return <div>Loading...</div>; 

  const populationData = country.population.map(entry => ({
    year: entry.year,
    population: entry.value,
  }));

  return (
    <div className="country-details">
      <h1>{country.name} <img src={country.flag} alt={`${country.name} flag`} width="50" /></h1>

      <div className="borders">
        <h3>Border Countries:</h3>
        <ul>
          {country.borders.map((border) => (
            <li key={border.countryCode}>
              <Link to={`/${border.countryCode}`}>{border.countryName}</Link>
            </li>
          ))}
        </ul>
      </div>

      <div className="population-chart">
        <h3>Population Over Time:</h3>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart data={populationData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="year" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="population" stroke="#8884d8" activeDot={{ r: 8 }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Country;
