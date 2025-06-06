import React from 'react'
import { Button, Card } from 'react-bootstrap';

function CountryCard({country, handleViewMore}) {
  return (
    <div>
        <Card>
            <Card.Img src={country.flags.svg} alt={country.flags.alt} style={{objectFit:'cover', width:'100px'}}/>
            <Card.Body>
                <Card.Title>{country.name.official}<span>{country.flag}</span></Card.Title>
                <Card.Text>
                    <ul>
                        <li key={country.name.official}>
                            <p>Capital: {country.capital ? country.capital[0]:'N/A'}</p>
                            <p>Population: {country.population.toLocaleString()}</p>
                            <p>Region: {country.region}</p>
                        </li>
                    </ul>
                </Card.Text>
                <Button variant='primary' onClick={() => handleViewMore(country)}>View More</Button>
            </Card.Body>
        </Card>
    </div>
  )
}

export default CountryCard;