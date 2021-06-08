import { FC } from 'react'
import { Dustbin } from './Dustbin'
import { Box } from './Box'

export const Container: FC = () => (
  <div>
    <div style={{ overflow: 'hidden', clear: 'both', margin: '-1rem' }}>
      <Dustbin greedy={true} id='1'>
        <Dustbin greedy={true} id='11'>
          <Dustbin greedy={true} id='12' />
        </Dustbin>
      </Dustbin>
      <Dustbin id='2'>
        <Dustbin id='21'>
          <Dustbin id='22' />
        </Dustbin>
      </Dustbin>
    </div>

    <div style={{ overflow: 'hidden', clear: 'both', marginTop: '1.5rem' }}>
      <Box />
    </div>
  </div>
)
