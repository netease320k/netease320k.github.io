import React from 'react'
import Issue from "./Issue";

const IssueList = ({issues}) => {
    if(issues.length==0){
        return <p>无数据</p>
    }
    return (
        <ul className="issue-list">{
            issues.map((issue)=> <Issue key={issue.id} issue={issue}/>)
        }
        </ul>
    );
};

export default IssueList