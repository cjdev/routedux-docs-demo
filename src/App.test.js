"use strict";
import 'raf/polyfill';
import React from 'react';
import {shallow} from 'enzyme';
import ezJson from 'enzyme-to-json';
import {App, mapStateToProps} from './App';

import Enzyme from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
Enzyme.configure({ adapter: new Adapter() });

const tableOfContents = [{"contentsUrl":"/pages/bar.html","id":"bar","title":"A Bar's Life"},{"contentsUrl":"/pages/foo.html","id":"foo","title":"Foo"},{"contentsUrl":"/pages/home.html","id":"home","title":"Our Doc Site"}];

it('renders side nav with correct links, and a header and content passed in', () => {
  // given

  // when
  const wrapper = shallow(
    <App tableOfContents={tableOfContents} title="Hello World" contents="<div>Some html</div>" />
  );

  // then
  expect(ezJson(wrapper)).toMatchSnapshot();

});

it("mapStateToProps returns expected props from store", () => {

  // given
  const id = "woo";
  const title = "A great title";
  const state = {
    currentTitle: title,
    id: id,
    contentMap: {
      "woo": "Woo's Contents",
    }
  };
  const dflt = "Loading...";

  // when
  const {
    title: actualTitle,
    contents: actualContents,
    tableOfContents: actualTableOfContents,
  } = mapStateToProps({currentTitle: title, id, ...state}, {tableOfContents});

  const {
    contents: actualFailContents,
  } = mapStateToProps({...state, currentTitle: title, id: id+"-missing"}, {tableOfContents});

  // then
  expect(actualTitle).toEqual(title);
  expect(actualContents).toEqual(state.contentMap[id]);
  expect(actualFailContents).not.toEqual(state.contentMap[id]);
  expect(actualTableOfContents).toEqual(tableOfContents);
});