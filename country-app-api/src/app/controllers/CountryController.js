require('dotenv').config();


class CountryController {
    async index(request, response) {
        const res = await fetch(`${process.env.COUNTRY_AVALIBLE_URL}`);
        const countries = await res.json();
        return response.json(countries); 
    }

    async show(request, response) {
        const { id } = request.params;  
    
        try {
            const flagsResponse = await fetch(`${process.env.COUNTRY_FLAGS_URL}`);
            const flagsData = await flagsResponse.json();
    
            if (!flagsResponse.ok || !flagsData || !flagsData.data) {
                return response.status(404).json({
                    error: true,
                    message: 'Flag data not found.',
                });
            }
    
            const flagData = flagsData.data.find(flag => flag.iso2 === id);
            if (!flagData) {
                return response.status(404).json({
                    error: true,
                    message: `Flag of code ${id} not found.`,
                });
            }
    
            const iso3 = flagData.iso3;  
            console.log(iso3)

            const apiResponse = await fetch(`${process.env.COUNTRY_POPULATION_URL}`);
            const populationData = await apiResponse.json();
    
            if (!apiResponse.ok || !populationData || !populationData.data) {
                return response.status(404).json({
                    error: true,
                    message: 'Population data not found.',
                });
            }
    
            const countryData = populationData.data.find(country => country.iso3 === iso3);
            if (!countryData) {
                return response.status(404).json({
                    error: true,
                    message: `Population data from code ${iso3} not found.`,
                });
            }
    
            const countryInfoResponse = await fetch(`${process.env.COUNTRY_INFO_URL}/${id}`);
            const countryInfo = await countryInfoResponse.json();
    
            if (!countryInfoResponse.ok || !countryInfo || !countryInfo.borders) {
                return response.status(404).json({
                    error: true,
                    message: `Country info from ${id} not found.`,
                });
            }
    
            const bordersData = countryInfo.borders.map(border => ({
                countryName: border.commonName,
                countryCode: border.countryCode
            }));
    
            const countryResult = {
                name: countryInfo.commonName,
                officialName: countryInfo.officialName,
                population: countryData.populationCounts,
                flag: flagData.flag,
                borders: bordersData
            };
    
            return response.json(countryResult);
    
        } catch (error) {
            console.error(error);
            return response.status(500).json({
                error: true,
                message: `Erro interno: ${error.message}`,
            });
        }
    }
}

module.exports = new CountryController();
