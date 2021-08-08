import React from 'react'
import Enzyme from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'
import Example from './Example'

const {shallow}=Enzyme

Enzyme.configure({ adapter: new Adapter() })

describe('Enzyme shallow', function () {
    it('Example component', function () {
        const name='按钮名'
        let app = shallow(<Example text={name} />)
       let btnName=app.find('button').text();
       console.log('button Name:'+btnName)
    })
})
