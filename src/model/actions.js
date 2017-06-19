
export const VIEW_ARTICLE = "VIEW_ARTICLE";
export const CONTENT_RECEIVED = "CONTENT_RECEIVED";

const createContentReceived = (id, contents) => {
  return {type: CONTENT_RECEIVED, id, contents};
};

const changeId = (id) => {
  return { type: VIEW_ARTICLE, id };
};

export const actions = {
  changeId,
  createContentReceived
};