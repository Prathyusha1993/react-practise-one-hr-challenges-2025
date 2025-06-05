import React from 'react'
import { Card } from 'react-bootstrap';

function CountryCard({country}) {
  return (
    <div>
        <Card>
            {/* <Card.Img src={country}/> */}
            <Card.Body>
                <Card.Title>{country.name.official}</Card.Title>
                <Card.Text>

                </Card.Text>
            </Card.Body>
        </Card>
    </div>
  )
}

export default CountryCard;