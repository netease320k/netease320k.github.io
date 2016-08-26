import fetch from "isomorphic-fetch";
import {concatIssueURL, getRequest,labels_url} from "../constants";

export const changeAppState = ({issueLabel, issueState, issuePage = 1, appState, caches}) => (dispatch) => {

    const newAppState={
        issueLabel: issueLabel === undefined ? appState.issueLabel : issueLabel,
            issueState: issueState || appState.issueState,
            issuePage,
    };


    dispatch({
        type: 'CHANGE_APP_STATE',
        appState:newAppState
    });

    const url = concatIssueURL(newAppState);

    const etag = caches[url] ? caches[url].etag : '';

    return fetch(
        getRequest(url, etag),
        {timeout: 10000}
    ).then((response)=> {
        console.log(response);

        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        if (response.ok) {
            let new_etag = response.headers.get('etag');
            return response.json().then((data)=> {
                dispatch(updateCache(url, {etag: new_etag, data}))
            })
        }
        else {
            let {status, statusText} = response;
            return {status, statusText};
        }
    })

};

export const initApp = (caches)=> (dispatch) => {

    const url = labels_url;

    const etag = caches[url] ? caches[url].etag : '';

    return fetch(
        getRequest(url, etag),
        {timeout: 10000}
    ).then((response)=> {

        if (response.status >= 400) {
            throw new Error("Bad response from server");
        }
        if (response.ok) {
            let new_etag = response.headers.get('etag');
            return response.json().then((data)=> {
                dispatch(updateCache(url, {etag: new_etag, data}))
            })
        }
        else {
            let {status, statusText} = response;
            return {status, statusText};
        }
    })
};

export const updateCache = (url, cache)=> ({
    type: 'UPDATE_CACHE',
    cache,
    url
});