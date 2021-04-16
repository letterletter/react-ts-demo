import * as React from "react";

export interface HelloProps { compiler: string; framework: string; }

// 'HelloProps' describes the shape of props.
// State is never set so we use the '{}' type.
export interface HelloState {name: string, age: number, hobby: Array<string>}
export class Hello extends React.Component<HelloProps, HelloState> {
  state={
    name: '小五',
    age: 18,
    hobby: ['read', 'swim']
  }
    render() {
        return <>
        <h1>Hello from {this.props.compiler} and {this.props.framework}!</h1>
        <h2>{this.state.name} --- {this.state.age}--- {this.state.hobby.join(';')}</h2>
        </>;
    }
}