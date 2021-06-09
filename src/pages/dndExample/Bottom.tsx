import { CSSProperties, FC, useCallback, useState } from 'react'

import { Box } from './Box2'
import { snapToGrid as doSnapToGrid } from './snapToGrid'
import update from 'immutability-helper'
import { DragItem } from './interfaces'

const styles: CSSProperties = {
  width: '100%',
  height: 300,
  border: '1px solid black',
  position: 'relative',
}

export interface ContainerProps {
  snapToGrid: boolean
}

interface BoxMap {
  [key: string]: { top: number; left: number; title: string }
}


export const Bottom: FC<ContainerProps> = ({ snapToGrid }) => {
  // const [boxes1, setBoxes] = useState<BoxMap>({
  //   ggg: { top: 20, left: 80, title: 'Drag me test1' },
  //   ddd: { top: 180, left: 20, title: 'Drag me test2' },
  //   eee: { top: 180, left: 20, title: 'Drag me test3' },
  // })
  const boxes1:Readonly<BoxMap> =  {
    ggg: { top: 20, left: 80, title: 'Drag me test1' },
    ddd: { top: 180, left: 20, title: 'Drag me test2' },
    eee: { top: 180, left: 20, title: 'Drag me test3' },
  } 

  return (
    <div style={styles}>
      {Object.keys(boxes1).map((key) => (
        <Box key={key}   title={boxes1[key].title} />
      ))}
    </div>
  )
}
