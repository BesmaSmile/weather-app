import React from 'react';
import { shallow } from 'enzyme';
import Map from './Map';

describe('<Map />', () => {
  test('renders', () => {
    const wrapper = shallow(<Map />);
    expect(wrapper).toMatchSnapshot();
  });
});
