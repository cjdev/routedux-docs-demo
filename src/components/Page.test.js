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

it("mapStateToProps uses its own title and contents preferentially", () => {
  // given
  const state = {currentTitle: 'currentTitle', id: 'foo', contentMap: {'foo' : 'Foo Contents'}};
  const ownProps = {title: 'Own Title', contents: 'Own Contents', menu: 'Menu'};
  const expectedProps = {title: 'Own Title', contents: 'Own Contents', menu: 'Menu'};

  // when
  const returnedProps = mapStateToProps(state, ownProps);

  //then
  expect(returnedProps).toEqual(expectedProps);

});