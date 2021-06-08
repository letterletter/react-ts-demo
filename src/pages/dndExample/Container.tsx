import { CSSProperties, FC, useCallback, useState } from 'react'
import { useDrop } from 'react-dnd'
import { ItemTypes } from './ItemTypes'
import { DraggableBox } from './DraggableBox'
import { snapToGrid as doSnapToGrid } from './snapToGrid'
import update from 'immutability-helper'
import { DragItem } from './interfaces'

const styles: CSSProperties = {
  width: '100%',
  height: 300,
  border: '1px solid black',
  position: 'relative',
}
var azlist = 'cdefghigklmn'
var index = 0
export interface ContainerProps {
  snapToGrid: boolean
}

interface BoxMap {
  [key: string]: { top: number; left: number; title: string }
}

export const Container: FC<ContainerProps> = ({ snapToGrid }) => {
  const [boxes, setBoxes] = useState<BoxMap>({
    a: { top: 20, left: 80, title: 'Drag me around' },
    b: { top: 180, left: 20, title: 'Drag me too' },
  })

  const moveBox = useCallback(
    (id: string, left: number, top: number) => {
      setBoxes(
        update(boxes, {
          [id]: {
            $merge: { left, top },
          },
        }),
      )
    },
    [boxes],
  )

  const addBox = (id: string, left: number, top: number, title: string) => {
    setBoxes(
      update(boxes, {
        $merge: {
          [id]: {left, top, title}
        }
      })
    )
  }

  const [, drop] = useDrop(
    () => ({
      accept: ItemTypes.BOX,
      drop(item: DragItem, monitor) {
        console.log('drop', item)
        if(!item.id) {
          item.id = azlist[index++]
          addBox(item.id, 40+index*10, 100+index*15, item.title)
          console.log('index', index, boxes)

        }else {
          const delta = monitor.getDifferenceFromInitialOffset() as {
            x: number
            y: number
          }
  
          let left = Math.round(item.left + delta.x)
          let top = Math.round(item.top + delta.y)
          if (snapToGrid) {
            ;[left, top] = doSnapToGrid(left, top)
          }
          console.log(item, left, top)
          moveBox(item.id, left, top)
        }
        // const delta = monitor.getDifferenceFromInitialOffset() as {
        //   x: number
        //   y: number
        // }

        // let left = Math.round(item.left + delta.x)
        // let top = Math.round(item.top + delta.y)
        // if (snapToGrid) {
        //   ;[left, top] = doSnapToGrid(left, top)
        // }
        // console.log(item, left, top)
        // moveBox(item.id, left, top)
        return {allowedDropEffect: 'copy', name: 'container'}
      },
    }),
    [moveBox],
  )

  return (
    <div ref={drop} style={styles}>
      {Object.keys(boxes).map((key) => (
        <DraggableBox key={key} id={key} {...boxes[key]} />
      ))}
    </div>
  )
}
