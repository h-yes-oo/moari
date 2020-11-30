import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { shallow, mount, render } from 'enzyme';

import ClubList from '.';

describe('<ClubList />', () => {
  const mockStore = configureStore();
  let store = mockStore({
    clubs: [],
    message: "",
  });

  it('renders properly', () => {
    const context = { store };
    const component = shallow(
      <Provider store={store}>
        <ClubList />
      </Provider>
    );
  });

  it('matches snapshot', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <ClubList />
      </Provider>
    );
    expect(wrapper).toMatchSnapshot();
  });
})