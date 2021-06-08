import { FC, useState, useCallback } from 'react'
import { Container } from './Container'
import { CustomDragLayer } from './CustomDragLayer'
import { Bottom} from './Bottom'
export const Example: FC = () => {
  const [snapToGridAfterDrop, setSnapToGridAfterDrop] = useState(false)
  const [snapToGridWhileDragging, setSnapToGridWhileDragging] = useState(false)

  const handleSnapToGridAfterDropChange = useCallback(() => {
    setSnapToGridAfterDrop(!snapToGridAfterDrop)
  }, [snapToGridAfterDrop])

  const handleSnapToGridWhileDraggingChange = useCallback(() => {
    setSnapToGridWhileDragging(!snapToGridWhileDragging)
  }, [snapToGridWhileDragging])

  return (
    <div>
      <Container snapToGrid={snapToGridAfterDrop} />
      {/* <CustomDragLayer snapToGrid={snapToGridWhileDragging} /> */}
      <div style={{height: '300px', border: '1px solid red'}}>
        <Bottom snapToGrid={snapToGridAfterDrop}  />
      </div>
    </div>
  )
}
