import React from 'react'
import { Button, Modal } from 'react-bootstrap';

function ModalComponent({ country, handleCloseModal, showMore}) {
  return (
    <div>
        <Modal show={showMore} onClose={handleCloseModal}>
            <Modal.Header closeButton>{country.name.official}</Modal.Header>
            <Modal.Body>
                <div>
                    <img src={country.flags.svg} alt={country.flags.alt} />
                    <p>Capital: {country.capital ? country.capital[0]: 'N/A'}</p>
                    {/* <p>Population: {country.population.toLocaleString()}</p> */}
                    <p>Region: {country.region}</p>
                    <p>Native Name: {country.name.nativeName ? Object.values(country.name.nativeName).map(n => n.common).join(',') : 'N/A'}</p>
                    <p>Currencies: {country.currencies ? Object.values(country.currencies).map(c => c.name).join(','): 'n/a'}</p>
                    <p>Languages: {country.languages ? Object.values(country.languages).join(','): 'n/a'}</p>
                    <p>Border Countries: {country.borders ? country.borders.join(','): 'none'}</p>
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleCloseModal}>Close</Button>
            </Modal.Footer>
        </Modal>
    </div>
  )
}

export default ModalComponent;