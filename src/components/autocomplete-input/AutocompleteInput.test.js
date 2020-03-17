import React from 'react';
import { shallow } from 'enzyme';
import AutocompleteInput from './AutocompleteInput';

describe('<AutocompleteInput />', () => {
  test('renders', () => {
    const wrapper = shallow(<AutocompleteInput />);
    expect(wrapper).toMatchSnapshot();
  });
});
