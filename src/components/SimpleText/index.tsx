import React from 'react';
import { FC } from 'react'
export interface ContainerProps {
  onClickFnc: () => {}
}
const SimpleText: FC <ContainerProps> = (props) => {
  const { onClickFnc} = props
  return (
    <div>
      <div className='foo-bar' onClick={onClickFnc}>111</div>
      <div className='foo-bar'>222</div>
      <div className='foo-bar'>333</div>
      <button id='my-button-one' onClick={onClickFnc}>button1</button>
      <button id='my-button-two' onClick={onClickFnc}>button2</button>
      SimpleText
    </div>
  );
}

export default SimpleText;
