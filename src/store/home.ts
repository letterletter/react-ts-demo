import { observable, computed, action } from "mobx";

export default class OrderLine {
    @observable price = 0;
    @observable amount = 1;
    @observable name = '薛新瑞'
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