import React from "react";
import "./App.css";
import "@cjdev/visual-stack/lib/global";
import { VIEW_ARTICLE } from "./model/actions";
import { SideNav } from "@cjdev/visual-stack/lib/components/SideNav";
import { ActionLink } from "routedux";
import { Panel, Body, Header } from "@cjdev/visual-stack/lib/components/Panel";
import ApplicationLayout from "@cjdev/visual-stack/lib/layouts/ApplicationLayout";
import { connect } from "react-redux";
import { getContentsById } from "./model";

function App({ title, contents, tableOfContents }) {
  const menu = (
    <SideNav onClick={() => {}}>
      {tableOfContents.map(item => {
        return (
          <ActionLink
            key={item.id}
            action={{ type: VIEW_ARTICLE, id: item.id }}
          >
            {item.title}
          </ActionLink>
        );
      })}
    </SideNav>
  );

  return (
    <ApplicationLayout sideNav={menu}>
      <Panel>
        <Header>{title}</Header>
        <div className="article-body">
          <Body>
            <div dangerouslySetInnerHTML={{ __html: contents }} />
          </Body>
        </div>
      </Panel>
    </ApplicationLayout>
  );
}

const mapStateToProps = (
  { currentTitle: title, id, ...state },
  { tableOfContents }
) => {
  const foundContents = getContentsById(id, state);
  const contents = foundContents ? foundContents : "Loading...";

  return { title, contents, tableOfContents };
};

export default connect(mapStateToProps)(App);

export { App, mapStateToProps };
