import {observable,computed,autorun,action} from 'mobx'

class AppState{
    @observable count1 =1
    @observable count2 =10
    @observable count3 =100
    @observable name = "liu"
    @computed get total(){
        return this.count1+this.count2+this.count3
    }
    @computed get msg(){
        return `${this.name} say count is ${this.count}`
    }
    @action add1(){
        this.count1 += 1
    }
    @action add2(){
        this.count2 += 1
    }
    @action add3(){
        this.count3 += 1
    }
    @action changeName(name){
        this.name = name
    }
    @action reset(){
        this.count1 = 0
        this.count2 = 0
        this.count3 = 0
    }
}


const appState = new AppState()

autorun(()=>{
    console.log(appState.msg)
})


export default appState