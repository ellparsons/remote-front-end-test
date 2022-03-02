import React from 'react';
import { shallow, mount } from 'enzyme';
import PropertyListing from '../PropertyListing';
import axios from 'axios';

const DUMMY_PROPERTY = {
    id: 73864112,
    bedrooms: 3,
    summary: 'Property 1 Situated moments from the River Thames in Old Chelsea...',
    displayAddress: '1 CHEYNE WALK, CHELSEA, SW3',
    propertyType: 'Flat',
    price: 1950000,
    branchName: 'M2 Property, London',
    propertyUrl: '/property-for-sale/property-73864112.html',
    contactUrl: '/property-for-sale/contactBranch.html?propertyId=73864112',
    propertyTitle: '3 bedroom flat for sale',
    mainImage: 'https://media.rightmove.co.uk/dir/crop/10:9-16:9/38k/37655/53588679/37655_CAM170036_IMG_01_0000_max_476x317.jpg'
};

jest.mock("axios");
describe('PropertyListing', () => {
    it('should render without crashing', () => {
        const wrapper = shallow(<PropertyListing />);
        expect(wrapper.find('.PropertyListing')).toHaveLength(1);
    });

    it('should render no properties text', async () => {
        
        axios.get.mockImplementation(() => Promise.resolve({ data: [] }));
        const wrapper = mount(<PropertyListing />);
        await new Promise(setImmediate);
        wrapper.update(); 

        expect(axios.get).toHaveBeenCalledTimes(1);
        expect(wrapper.find('PropertyCard')).toHaveLength(0);
        expect(wrapper.find('h2')).toHaveLength(1);
        expect(wrapper.find('h2').at(0).props().children).toEqual('No properties');
    });

    it('should render 2 property cards', async () => {

        axios.get.mockImplementation(() => Promise.resolve({ data: [DUMMY_PROPERTY,DUMMY_PROPERTY] }));
        const wrapper = mount(<PropertyListing />);
        await new Promise(setImmediate);
        wrapper.update(); 

        expect(axios.get).toHaveBeenCalledTimes(2);
        expect(wrapper.find('PropertyCard')).toHaveLength(2);
        expect(wrapper.find('PropertyCard').at(0).props()).toEqual(DUMMY_PROPERTY);
        expect(wrapper.find('PropertyCard').at(1).props()).toEqual(DUMMY_PROPERTY);
    });
});
