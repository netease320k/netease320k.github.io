import React from 'react'
import Label from './Label'

const IssueHeader = ({title, labels})=>(
    <header className="issue-header">
        {title}
        <ul className="tag-list">
            {labels.map((label)=>
                <Label
                    key={label.name}
                    className="label"
                    color={label.color}
                    active={true}
                    onClick={()=>undefined}
                >{label.name}</Label>
            )}
        </ul>
    </header>
);



const IssueFooter = ({children})=>(
    <footer className="issue-footer">
        {children}
    </footer>
);

const Issue = ({issue})=>(
    <section>
    <IssueHeader title={issue.title} labels={issue.labels} />
        <div  className="issue-body" dangerouslySetInnerHTML={{__html: issue.body_html}}></div>
        <IssueFooter>
            <a href={issue.user.html_url}>{issue.user.login}</a>
            <span> 提交于 {issue.created_at} </span>
            {issue.created_at==issue.updated_at?null :<span> 更新于 {issue.updated_at} </span>}
            {issue.closed_at?<span>处理于 {issue.closed_at}</span>:null}
        </IssueFooter>
    </section>
);

export default Issue