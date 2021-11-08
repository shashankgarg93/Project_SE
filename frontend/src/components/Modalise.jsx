import React from 'react';
const Modalise=(props)=>{
    return (
      <div className="modal">
        <div className="modal-content">
          <div className="modal-header">
            <h4>Modal Title</h4>
          </div>
          <div className="modal-body">
            Modlal Body
          </div>
          <div className="modal-footer">
            <button className="close">Close</button>
          </div>
        </div>
      </div>
    )
  }
  export default Modalise