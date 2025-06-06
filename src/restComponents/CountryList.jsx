import React, { useEffect, useState } from 'react'
import CountryCard from './CountryCard';
import ModalComponent from './ModalComponent';

function CountryList() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);

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

    const handleViewMore = (country) => {
        setShowMore(true);
        setSelectedCountry(country);
    };

    const handleCloseModal = () => {
        setShowMore(false);
        setSelectedCountry(null);
    }

  return (
    <div>
        {loading && <p>...Loading</p>}
        {error && <p>Error: {error}</p>}
        <Row>
        {countries.map((country) => (
            <Col md={3} sm={6} xs={12} key={country.name.official}>
                <CountryCard country={country} handleViewMore={handleViewMore} />
            </Col>
        ))}
        </Row>
        {selectedCountry && (
            <ModalComponent country={selectedCountry} showMore={showMore} handleCloseModal={handleCloseModal}/>
        )}
    </div>
  )
}

export default CountryList;