import Weather from "./Weather";

const Country = ({ country }) => {
    console.log('Country: country:', country)
    if (!country) {
      return null;
    }
    
    return ( 
      <div>
        <h1>{country.name.common}</h1>
        <div>capital: {country.capital}</div>
        <div>area: {country.area}</div>
        <div>population: {country.population}</div>
        <h3>languages:</h3>
        {
          country.languages && Object.keys(country.languages).length > 0 ? (
            <ul>
                {Object.entries(country.languages).map(([code, language]) => (
                    <li key={code}>{language}</li>
                ))}
            </ul>
          ) : (
            <p>Sorry, no languages available.</p>
          )
        }
        <img src={country.flags.svg} alt={country.name.common} width="100" />
        <Weather capital={country.capital} />
      </div>
    );
}

export default Country;