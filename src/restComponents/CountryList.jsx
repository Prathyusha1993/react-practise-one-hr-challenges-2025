import React, { useEffect, useState } from 'react'
import CountryCard from './CountryCard';
import ModalComponent from './ModalComponent';
import {Row, Col} from 'react-bootstrap';

function CountryList() {
    const [countries, setCountries] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [searchType, setSearchType] = useState('name');

    const fetchCountries = async () => {
        try{
            setLoading(true);
            const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags,region, population,languages,currencies,borders');
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
    };

    // Filter countries based on search term by name
    const filteredCountries = countries.filter((country) => country.name.official.toLowerCase().includes(searchTerm.toLowerCase()));

    const fetchSearch = async () => {
        if(!searchTerm.trim()){
            fetchCountries();
            return;
        }
        const baseUrl = 'https://restcountries.com/v3.1';
        let url='';
        switch(searchType){
            case 'name':
                url = `${baseUrl}/name/${searchTerm.trim()}`;
                break;
            case 'region':
                url = `${baseUrl}/region/${searchTerm.trim()}`;
                break;
            case 'language':
                url = `${baseUrl}/lang/${searchTerm.trim()}`;
                break;
            case 'currency':
                url = `${baseUrl}/currency/${searchTerm.trim()}`;
                break;
            default:
                url='';
        }
        try {
            const response = await fetch(url);
            if(!response.ok) throw new Error('Network response was not ok');
            const data = await response.json();
            setCountries(data);
        }catch(err){
            setError(err.message);
        }
    }

    useEffect(() => {
        const debounce = setTimeout(() => {
            fetchSearch();
        }, 500)
        return () => clearTimeout(debounce);
    }, [searchTerm, searchType]);

  return (
    <div>
        <div>
            <input type='text' value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} placeholder='Search...' />
        </div>
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