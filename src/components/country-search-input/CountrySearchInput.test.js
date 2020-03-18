import React from 'react';
import { shallow } from 'enzyme';
import CountrySearchInput from './CountrySearchInput';

describe('<CountrySearchInput />', () => {
  test('renders', () => {
    const wrapper = shallow(<CountrySearchInput />);
    expect(wrapper).toMatchSnapshot();
  });
});
