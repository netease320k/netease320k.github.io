import React from 'react'

const IssueSateSettings = ({onButtonClick, issueState})=>(
    <div>
        {
            [['all', '全部'], ['open', '排队中'], ['closed', '已处理']]
                .map(
                    ([code,name])=>(code == issueState ?
                            <span disabled="disabled" className="button active" key={code}>{name}</span> :
                            <button className="button" key={code} onClick={()=>onButtonClick(code)}>{name}</button>
                    )
                )
        }
    </div>
);

export default IssueSateSettings