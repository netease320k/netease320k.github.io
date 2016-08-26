import React from "react";
import {connect} from "react-redux";
import Nav from "./Nav";
import IssueStateSettings from "./IssueStateSettings";
import * as Actions from "../actions";
import {bindActionCreators} from "redux";
import IssueList from "./IssueList";
import {concatIssueURL, labels_url} from "../constants";

const App = ({
    issues,
    issueLabels,
    caches,
    appState,
    actions:{changeAppState}
}) => {
    if (issueLabels.length == 0) {
        return <p>加载中...</p>
    }
    return (
        <div>
            <Nav labels={issueLabels}
                 issueLabel={appState.issueLabel}
                 onLabelClick={(issueLabel)=>changeAppState({
                     issueLabel,
                     appState,
                     caches
                 })}/>
            <IssueStateSettings issueState={appState.issueState}
                                onButtonClick={(issueState)=>changeAppState({
                                    issueState,
                                    appState,
                                    caches
                                })}/>
            {issues?<IssueList issues={issues}/>:<p>加载中...</p>}

        </div>
    )
};

const mapStateToProps = (state) => {
    const {appState, caches}=state;
    const issueLabels = state.caches[labels_url] ? state.caches[labels_url].data : [];
    const currentIndex = concatIssueURL(appState);
    const issues = state.caches[currentIndex] ? state.caches[currentIndex].data : undefined;

    return {
        issues,
        issueLabels,
        caches,
        appState
    }
};

const mapDispatchToProps = (dispatch)=> ({actions: bindActionCreators(Actions, dispatch)});

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(App)
