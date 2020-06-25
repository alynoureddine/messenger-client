import React from 'react';

export function Chat() {
  return(
    <div className="chat-wrapper" style={{display: 'flex', flexDirection: 'column', height: '100%'}} id="main">
      <div style={{height :'100%', position: 'relative'}} className="messages-wrapper">
        <div className="messages-container" style={{ height: '100%', position: 'absolute', overflow: 'hidden scroll', width: '100%', display: 'flex', flexDirection:'column-reverse'}}>
          {new Array(100).fill(null).map(() => <div>aaa</div>)}
        </div>
      </div>
      <div className="chat-footer">bbb</div>
    </div>
  )
}
