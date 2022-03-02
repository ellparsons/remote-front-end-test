import React from 'react';
import PropertyCard from '../PropertyCard';
import './PropertyListing.scss';
import { useState, useEffect } from 'react';
import FetchProperties from '../../PropertiesRequest';

const PropertyListing = () => {
    const [data, setData] = useState({
        properties: [],
        error: null
    });

    useEffect(() => {
        async function fetchData() {
            const result = await FetchProperties();
            setData({properties: result.properties, error: result.error})
        }
        fetchData();
    }, [])

    return (
        <div className="PropertyListing">
            {data.error && <h2>Error retrieving properties: {data.error}</h2>}
            {!data.error && data.properties.length === 0 ? (
                <h2>No properties</h2>
            ) : (
                data.properties.map((property, index) => <PropertyCard key={index} {...property} />)
            )}
        </div>
    )
};

export default PropertyListing;
