import React from 'react';
import ezJson from 'enzyme-to-json';
import {shallow} from 'enzyme';
import {Page, mapStateToProps} from './Page';

it("should render menu and contents", () => {
  //given
  ;
  //when
  const wrapper = shallow(<Page title="Title!" contents="<div>Raw Html</div>" menu="Menu contents" />);

  //then
  expect(ezJson(wrapper)).toMatchSnapshot();

});

it("mapStateToProps loads correct props", () => {
  // given
  const state = {currentTitle: 'currentTitle', id: 'foo', contentMap: {'foo' : 'Foo Contents'}};
  const expectedProps = {title: 'currentTitle', contents: 'Foo Contents', menu: 'Menu'};

  // when
  const returnedProps = mapStateToProps(state, {menu: 'Menu'});

  //then
  expect(returnedProps).toEqual(expectedProps);

});