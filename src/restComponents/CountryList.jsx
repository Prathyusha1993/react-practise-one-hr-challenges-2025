import React, { useEffect, useState } from 'react'
import CountryCard from './CountryCard';

function CountryList() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchCountries = async () => {
        try{
            setLoading(true);
            const response = await fetch('https://restcountries.com/v3.1/all');
            if(!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            console.log('Countries data', data)
            setCountries(data);
        }catch(err){
            setError(err.message);
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCountries();
    }, []);

  return (
    <div>
        {loading && <p>...Loading</p>}
        {error && <p>Error: {error}</p>}
        {countries.map((country) => (
            <CountryCard country={country} />
        ))}
    </div>
  )
}

export default CountryList;