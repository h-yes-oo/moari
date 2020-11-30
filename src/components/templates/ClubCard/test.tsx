import React from 'react';
import { BrowserRouter, Router } from 'react-router-dom';
import configureStore from 'redux-mock-store';
import { Provider } from 'react-redux';
import { createMemoryHistory } from 'history';

import { mount } from 'enzyme';

import ClubCard from '.';

describe('<ClubCard />', () => {
  const mockStore = configureStore();
  let store = mockStore({
    clubs: [],
    message: "",
  });

  let mockProps = {
    key: "1",
    id: "1",
    name: "mock",
    description: "mocking",
  };

  it('renders properly', () => {
    const context = { store };
    const wrapper = mount(
      <Provider store={store}>
        <BrowserRouter>
          <ClubCard {...mockProps} />
        </BrowserRouter>
      </Provider>
    );
  });

  it('go detail page when clicked', () => {  
    const history = createMemoryHistory();
    const wrapper = mount(
      <Provider store={store}>
        <Router history={history}>
          <ClubCard {...mockProps} />
        </Router> 
      </Provider>
    );

    wrapper.find("#clubcard-root").hostNodes().simulate("click");
    expect(history.entries[history.entries.length-1].pathname).toBe('/club/1');
  })
})
