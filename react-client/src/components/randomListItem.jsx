import React from 'react';

const randomListItem = (props) => (
  <div>
    {props.item.title}
    <a href={props.item.fullVideoUrl}> Link to Video </a>
    <br/><br/>
  </div>
)

export default randomListItem;
    
