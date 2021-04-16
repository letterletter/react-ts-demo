//detail.ts
import { action, observable, makeObservable } from 'mobx'

interface Cat {
    name: string;
    age?: number | string;
    color?: string;
}
export default class DetailStore {

    @observable name: string = 'Clint'
    @observable arr: Cat[] = []

    constructor(initialState: any = { name: 'detail-store', arr: [{ name: 'Tom', color: 'red' },{ name: 'Jerry',age:'3', color: 'blue' }] }) {
        this.name = initialState.name;
        this.arr = initialState.arr;
        makeObservable(this)
    }

    @action
    public setName = (name: string) => {
        this.name = name
    }
    public changeArray = (item: Cat) => {
        this.arr.push(item)
    }
}
