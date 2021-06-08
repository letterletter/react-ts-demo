import React from 'react';
import { useDrag} from 'react-dnd';
const Item = ({
  name,  type, label, icon, imgURL, children, ...props
}) => {
  const [{ opacity }, drag] = useDrag({
    item: { name, label ,type, imgURL},
    collect: monitor => ({
      opacity: monitor.isDragging() ? 0 : 1,
    }),
    // end: (item, monitor) => {
    //   const dropResult = monitor.getDropResult();
    //   if (item && dropResult) {
    //     alert(`You dropped into ${dropResult}!`);
    //   }
    // },
  })
  return (
      <div ref={drag} {...props} style={{width: '5em',textAlign:'center', marginLeft: '20px', opacity}}>
      {/* <img src={imgURL} style={{width: '3em', height: '3em'}} alt="未知"></img> */}
        {icon}
        <p style={{textAlign: 'center', marginTop: '2px'}}>{label}</p>
      </div>
  );
};

export default Item;

