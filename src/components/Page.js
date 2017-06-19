import React from 'react';
import Layout from './Layout';
import {connect} from 'react-redux';
import {getContentsById} from '../model';

function Page({menu, title, contents}) {
  return (
    <Layout nav={menu}
            content={<div dangerouslySetInnerHTML={{__html: contents}}/>}
            headerContent={title}/>
  );
}

const mapStateToProps = ({currentTitle:title, id, ...state}, own) => {

  const foundContents = getContentsById(id, state);
  const contents = foundContents ? foundContents : 'Loading...';

  return {menu: own.menu, title, contents};
};

export default connect(mapStateToProps)(Page);

export {Page, mapStateToProps};
