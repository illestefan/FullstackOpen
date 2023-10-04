import { useEffect, useState } from 'react'
import countryService from '../services/countries'
import Country from "./Country"

const Countries = ({ filter, country, setCountry }) => {
    const [countries, setCountries] = useState([])

    useEffect(() => {
        console.log('Countries: loading countries from server')
        countryService
            .getAll()
            .then(initialCountries => {
                console.log(`Countries: ${initialCountries.length} countries loaded`)
                setCountries(initialCountries)
            })
            .catch(error => {
                console.log('Countries: ERROR', error)
                setCountries([])
            })
    }, [])

    console.log('Countries: countries loaded:', countries)
    console.log('Countries: state filter:', filter)
    console.log('Countries: state country:', country)

    // first filter the countries by name
    const countriesToShow = countries.filter(country => country.name.common.toLowerCase().includes(filter.toLowerCase()));
    console.log(`Countries: ${countriesToShow.length} countriesToShow: `, countriesToShow)

    // now render:
    // render the list and the only country if filter matches exactly one country:
    //      if the number of countries to show is greater than 10, show a message
    //      else if the number of countries to show is between 2 and 10, show the list of countries 
    //          with the associated "show"-button
    //      else if the number of countries to show is 1, show that country
    // then show the country from the state variable country if it's not null 
    //    (i.e. if the user has clicked the "show"-button and therefore the state 
    //    variable country is not null, the state variable country is located in the 
    //    component App and is passed to the component Countries as a prop so that a change 
    //    of the filter in App clears the country state variable so that no country is shown
    //    when the filter chages))
    // if the number of countries to show is 0 and the state variable country is null, show a message
    return (
        <div>
            {countriesToShow.length > 10 ? (
                <div>Too many matches, specify another filter</div>
            ) : ( 
                countriesToShow.length > 1 ? ( 
                    countriesToShow.map(filteredCountry => (
                        <div key={filteredCountry.name.common}>
                            {filteredCountry.name.common}
                            <button onClick={() => setCountry(filteredCountry)}>show</button>
                        </div>
                    ))
                ) : (
                    <div><Country country={countriesToShow[0]} /></div>
                )     
            )}
            {country && <Country country={country} />}
            {countriesToShow.length === 0 && !country && <div>No matches, specify another filter</div>}
        </div>
    );
};


export default Countries;