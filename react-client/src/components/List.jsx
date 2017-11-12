import React from 'react';
import ListItem from './ListItem.jsx';

const List = (props) => (
  <div>
    <h4> Enter Either a query term or a channel term</h4>
    There are { props.items.length } videos in your favorited playlist.
    {props.items.map((item,iter) => <ListItem item={item} key={iter}/>)}
  </div>
)

export default List;