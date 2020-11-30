import React from 'react';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';

import { shallow, mount } from 'enzyme';

import Header from '.';
import { BrowserRouter } from 'react-router-dom';
import { wrap } from 'module';

describe('<Header />', () => {
  const mockStore = configureStore();
 
  let store = mockStore({
    clubs: [],
    message: "",
  });

  let mockProps = {
    campusName: "snu",
    username: "zig",
  }

  it('renders properly', () => {
    const wrapper = shallow(
      <Provider store={store}>
        <BrowserRouter>
          <Header {...mockProps} />
        </BrowserRouter>
      </Provider>
    )
    expect(wrapper).toMatchSnapshot();
  })

  it('search function working', () => {
    window.alert = jest.fn();
    const searchMockFn = jest.spyOn(console, 'log');

    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <Header {...mockProps} />
        </BrowserRouter>
      </Provider>
    )

    // console.log(wrapper.debug());
    wrapper.find("#search-box").hostNodes().simulate('change', { target: { value: "day6" } });
    wrapper.find("#search-icon").hostNodes().simulate('click');
    expect(searchMockFn).toBeCalledTimes(1);
    expect(searchMockFn).toBeCalledWith("day6");
  });

  afterEach(() => {
    jest.clearAllMocks();
  });
});
