import { useState } from 'react'
import Countries from './components/Countries'

const App = () => {
    const [filter, setFilter] = useState('')
    const [country, setCountry] = useState(null)

    const handleCountryFilterChange = (event) => {
        // console.log(event.target.value)
        setFilter(event.target.value)
        setCountry(null)
    }

    return (
        <div>
            find countries <input value={filter} onChange={handleCountryFilterChange} />
            <Countries filter={filter} country={country} setCountry={setCountry} />
        </div>
    )
}

export default App
