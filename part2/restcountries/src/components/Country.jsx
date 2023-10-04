import Weather from "./Weather";

// Country component
const Country = ({ country }) => {
    console.log('Country: country:', country)

    // conditional rendering, return null if the country is null
    if (!country) {
      return null;
    }
    
    // render the country's name, capital, population, languages, flag and the weather of the capital
    // the languages are rendered as an unordered list, some countries don't have languages (Antartica)
    // therefore we first check if the country has languages and render an unordered list of the languages 
    // if the number of languages is greater than 0
    // if the country has no languages, we render a message 
    // Weather is rendered as an own component with the capital as a parameter
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