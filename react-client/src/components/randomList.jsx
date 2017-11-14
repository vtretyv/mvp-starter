import React from 'react';
import randomListItem from './randomListItem.jsx';

const randomList = (props) => (
  <div>
    There are { props.items.length } videos in your random video history. Here are the titles:
    <br/><br/>
    {props.items.map((item,iter) => <randomListItem item={item} key={iter}/>)}
  </div>
)

export default randomList;