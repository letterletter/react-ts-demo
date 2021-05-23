import React, { useState,  useCallback, useEffect} from 'react'
import { withRouter} from 'react-router-dom'
 function Demo(props:any) {
  const [num, setNum] = useState(0)
  const addItem = () => {
    setNum(num+1)
  }
  const { match, location, history} = props
  return (
    <div>
      {num}
      <button onClick={addItem}>add</button>
      <textarea rows={10}>{JSON.stringify(props,null,  4)}</textarea>
    </div>
  )
}

export default withRouter(Demo)

