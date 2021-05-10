import React, { useState,  useCallback} from 'react'

export default function Demo() {
  const [num, setNum] = useState(0)
  const addItem = () => {
    setNum(num+1)
  }
  return (
    <div>
      {num}
      <button onClick={addItem}>add</button>
    </div>
  )
}