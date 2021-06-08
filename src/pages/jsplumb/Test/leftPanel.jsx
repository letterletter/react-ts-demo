import React, {useEffect, useState} from 'react'
import  update from 'immutability-helper'
import leftConfig from './config'
import IconFont from '../../../font/newfont'
import Draggable, {DraggableCore} from 'react-draggable'; // Both at the same time
import './style.scss'
function  LeftPanel(params) {
  const [leftContent, setLeftContent] = useState(leftConfig)
  const [ddd, setddd] = useState(1)
  const changeShow = (index, type, value) => {
    console.log(index, type, value)
    // update(leftContent, {[index]: {[type]: {$set: false}}})
    let ddd = leftContent
    ddd[index][type] = value
    setLeftContent(ddd)
    console.log('dff')
  }
  useEffect(() => {
    console.log('ddd',ddd, leftContent)
  })
  const handleStart = (e) => {
    console.log('start', e)
  }
  const handleDrag = (e) => {
    console.log('drag', e)
  }
  const handleStop = (e) => {
    console.log('drop', e)
  }
  return (
    <div className='leftpanel'>
      {
        leftContent.map((item, index) => <div >
          <span onClick={e => changeShow(index, 'open', !item.open)}>{item.name}</span>
          {item.open && <ul className='left-node-menu'>
            {item.children.map(ite => <Draggable
              onStart={handleStart}
              onDrag={handleDrag}
              onStop={handleStop}
            >
              <li className='left-node-li' key={ite.key}><IconFont type={ite.icon} />{ite.label}</li>
              </Draggable>)}
            </ul>}
        </div>)
      }
    </div>
  )
}

export default LeftPanel