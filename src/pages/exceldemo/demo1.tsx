import React, { Component} from 'react'
export default class Test extends Component {
  componentDidMount() {
   
  }
  handleChange = (e: MouseEvent):void => {
    const files = (e.target as HTMLInputElement).files
  }
  render() {
    return (
      <div>
        <input  type="file"
          accept=".xlsx, .xls, .csv"  />
      </div>
    )
  }
}