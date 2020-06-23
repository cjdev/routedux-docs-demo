import { ActionLink as _ActionLink, createNav } from "routedux";
import { createStore, applyMiddleware, compose } from "redux";

import createSagaMiddleware from "redux-saga";
import { call, put, takeEvery } from "redux-saga/effects";

import * as R from "ramda";

import pages from "../data/pages.json";

import {
    VIEW_ARTICLE,
    CONTENT_RECEIVED,
    actions as allActions,
} from "./actions";

import { loadArticle } from "./api";

import { installBrowserRouter } from "routedux";

const createContentReceived = allActions.createContentReceived;

const createDefaultState = () => {
    return {
        id: "home",
        currentTitle: false,
        pages: pages,
        contentMap: {},
    };
};

const defaultState = createDefaultState();

// pages = [{ id, contentUrl, title}]

const lookupPageFromDirectory = (state, id) => {
    const matcher = R.propEq("id", id);
    return R.find(matcher)(state.pages);
};

const lookupTitle = (state, id) => {
    const pageData = lookupPageFromDirectory(state, id);
    return (pageData && pageData.title) || null;
};

const doUpdateContent = (state, event) => {
    const id = event.id;
    const contents = event.contents;
    let newState = Object.assign({}, state);

    newState.id = id;
    newState.contentMap = Object.assign({}, state.contentMap, {
        [id]: contents,
    });
    newState.currentTitle = lookupTitle(state, id);

    return newState;
};

const reduce = (state = defaultState, event) => {
    let newState;
    switch (event.type) {
        case CONTENT_RECEIVED:
            newState = doUpdateContent(state, event);
            break;
        default:
            newState = state;
            break;
    }

    return newState;
};
const routesConfig = [
    ["/pages/:id", "VIEW_ARTICLE", {}],
    ["/", "VIEW_ARTICLE", { id: "home" }],
];
const { middleware, enhancer, init: handlePageLoad } = installBrowserRouter(routesConfig);

// create the saga middleware
const sagaMiddleware = createSagaMiddleware();

// redux debugging.
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// const composeEnhancers = compose;

// create store
const store = createStore(
    reduce,
    composeEnhancers(enhancer, applyMiddleware(middleware, sagaMiddleware))
);

const fetchArticle = function* ({ id }) {
    try {
        const content = yield call(loadArticle, `/pages/${id}.html`);
        yield put(createContentReceived(id, content));
    } catch (err) {
        console.error("Couldn't get article:", err);
    }
};

const sagas = { fetchArticle };

const saga = function* () {
    yield takeEvery(VIEW_ARTICLE, fetchArticle);
};

sagaMiddleware.run(saga);
// this needs to be after sagaMiddleware.run so that sagas can handle our route-dispatched actions.

const actions = {
    changeId: allActions.changeId,
};

export default store;

// store dependent helper function - thus defined after default export
const getContentsById = (id, state = null) => {
    return state.contentMap[id] || null;
};

class ActionLink extends _ActionLink {
    constructor(props) {
        super(props);
        this.store = store;
    }
}
console.log('before blowup')
const {Navigation, withNav } = createNav(routesConfig, window);
console.log('after blowup')
export {
    getContentsById,
    reduce,
    actions,
    createDefaultState,
    sagas,
    handlePageLoad, // we export this so we don't have to call it when running tests.
    ActionLink,
    Navigation,
    withNav
};
