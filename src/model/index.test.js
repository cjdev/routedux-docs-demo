import { getContentsById, reduce, createDefaultState, sagas } from "./index";
import { loadArticle } from "./api";
import { actions } from "./actions";
import { call, put } from "redux-saga/effects";

it("reduce should handle content success", () => {
    //given
    const state = Object.assign(createDefaultState(), {
        pages: [
            { id: "foo", title: "Foo Title" },
            { id: "bar", title: "Bar Title" },
        ],
    });
    const expectedState1 = Object.assign({}, state, {
        id: "foo",
        currentTitle: "Foo Title",
        contentMap: { foo: "Foo Contents" },
    });
    const expectedState2 = Object.assign({}, state, {
        id: "bar",
        currentTitle: "Bar Title",
        contentMap: { foo: "Foo Contents", bar: "Bar Contents" },
    });

    //when
    const newState1 = reduce(
        state,
        actions.createContentReceived("foo", "Foo Contents")
    );
    const newState2 = reduce(
        newState1,
        actions.createContentReceived("bar", "Bar Contents")
    );

    //then
    expect(newState1).toEqual(expectedState1);
    expect(newState2).toEqual(expectedState2);
});

it("getContentsById should return nothing when content isn't available", () => {
    //given
    let state = createDefaultState();

    //when
    const contents = getContentsById("foo", state);

    //then
    expect(contents).toEqual(null);
});

it("getContentsById should return article when content is available", () => {
    //given
    const state = Object.assign(createDefaultState(), {
        contentMap: { foo: "Foo Body" },
    });

    //when
    const contents = getContentsById("foo", state);

    //then
    expect(contents).toEqual("Foo Body");
});

it("fetchArticle saga calls loadArticle with correct url and fires action", () => {
    // given
    const fetchArticle = sagas.fetchArticle;
    //when / then
    const iterator = fetchArticle({ id: "foo" });

    const called = iterator.next();
    expect(called.value).toEqual(call(loadArticle, "/pages/foo.html"));

    const action = iterator.next("Stub content");

    expect(action.value).toEqual(
        put(actions.createContentReceived("foo", "Stub content"))
    );

    expect(iterator.next().done).toEqual(true);
});
