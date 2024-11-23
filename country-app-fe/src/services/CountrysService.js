class CountrysService {
    async listCountries() {
      const url = `http://localhost:3001/countries`;
      
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Error searching countries');
        }
        
        return await response.json();
      } catch (error) {
        console.error('Error fetching:', error);
        return [];
      }
    }

    async getCountry(id){
      const url = `http://localhost:3001/countries/${id}`;
      
      try {
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error('Error searching country');
        }
        
        return await response.json();
      } catch (error) {
        return console.error('Error fetching:', error);
      }
    }
  }
  
  export default new CountrysService();
  