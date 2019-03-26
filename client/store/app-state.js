import {observable,computed,autorun,action} from 'mobx'
import axios from 'axios'
export default class AppState{
    constructor({count,name}={count:0,name:"liujing"}){
        this.count = count
        this.name = name
    }
    @observable count
    @observable name
    @computed get msg(){
        return `${this.name} say count is ${this.count}`
    }
    @action add(){
        this.count += 1
    }
    @action changeName(name){
        this.name = name
    }
    toJson(){
        return {
            count:this.count,
            name:this.name
        }
    }
}



