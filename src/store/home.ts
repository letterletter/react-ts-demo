import { observable, computed, action, makeObservable } from "mobx";

export default class OrderLine {
    @observable price = 0;
    @observable amount = 1;
    @observable name = 'ddd'

    constructor(initialState: any = { name: 'home-store', }) {
        this.name = initialState.name;
        makeObservable(this)
    }

    @action setName = (name: string) => {
        console.log('eee',name)
        this.name = name
    }
    @action incre = () => {
        console.log('incre')
        this.amount++;
        this.price++;
    }
    @computed get total() {
        return this.price * this.amount;
    }
}