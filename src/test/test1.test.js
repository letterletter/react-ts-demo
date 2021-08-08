'use strict';
import React from 'react'
// import jest from 'jest'
import Enzyme, { render } from 'enzyme';

import Foo from '../components/SimpleText'
import Adapter from 'enzyme-adapter-react-16'
const clickFn = jest.fn()
const {shallow}=Enzyme

Enzyme.configure({ adapter: new Adapter() })

// const wrapper = render(<Foo />);
// expect(wrapper.find('.foo-bar')).to.have.lengthOf(3);

describe('MyComponent', () => {
  it('button click should hide component', () => {
    const component = shallow(<Foo onClickFnc={clickFn} />)
    component.find('button#my-button-two')
      .simulate('click')  //模拟点击
    expect(clickFn).toHaveBeenCalled(); //判断函数被调用，以及被什么参数调用都可以
  })
})