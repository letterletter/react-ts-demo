import  React, { MouseEvent} from "react";
import { Input, Select, Radio, Checkbox, Divider } from 'antd'
export interface HelloProps { compiler?: string; framework?: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export interface HelloState {indeterminate: boolean, checkAll: boolean, checkedList: Array<string>}

interface MouseEventDEF extends MouseEvent<HTMLDivElement> {
  [propName:string]: any
}
const CheckboxGroup = Checkbox.Group;

const plainOptions = ['Apple', 'Pear', 'Orange'];
const defaultCheckedList = ['Apple', 'Orange'];
export default class Hello extends React.Component<HelloProps, HelloState> {
  constructor(props: HelloProps) {
    super(props)
    this.state={
      checkedList: [],
      checkAll: false,
      indeterminate: true,
    }
  }
  handleChange = (value:string, type:string) => {
    console.log(value, type)
  }
  clickP = (e:MouseEvent<HTMLDivElement>) => {
    console.log(e)
  }
  onCheckAllChange = (e: any) => {
    console.log(e, typeof e)
    this.setState({
      checkAll: e.target.checked,
      indeterminate: false,
      checkedList: e.target.checked ? plainOptions: []
    })
  };
  ckboxonChange = (list: Array<any>) => {
    this.setState({
      checkedList: list,
      indeterminate: !!list.length && list.length < plainOptions.length,
      checkAll: list.length === plainOptions.length
    })
  }
    render() {
      const { checkAll, checkedList, indeterminate} = this.state
      return <>
        <p onClick={this.clickP}>click me</p>
        <Input placeholder='input' onChange={e => this.handleChange(e.target.value, 'input')} />
        <br />
        <Radio.Group onChange={e => this.handleChange(e.target.value, 'radio')}>
          <Radio value={1}>A</Radio>
          <Radio value={2}>B</Radio>
          <Radio value={3}>C</Radio>
          <Radio value={4}>D</Radio>
        </Radio.Group>
        <br />
        <Checkbox indeterminate={indeterminate} onChange={this.onCheckAllChange} checked={checkAll}>
            Check all
          </Checkbox>
          <Divider />
          <CheckboxGroup options={plainOptions} value={checkedList} onChange={this.ckboxonChange} />
        </>;
    }
}