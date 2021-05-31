class RandomIdClass {
  ids: Array<string>

  constructor() {
    this.ids = []
  }

  getRandom() :string {
    return Math.floor(Math.random()*30).toString()
    // return (Math.random()*50).toString(36).substr(0,8)
  }
  getNextIds():string {
    let b = this.getRandom()
    if(!this.ids.includes(b)) {
      this.ids.push(b)
      return b
    }else {
      while(this.ids.includes(b)) {
        b=this.getRandom()
      }
    }
    return b
  }
  clear():void {
    this.ids = []
  }
}
var randomIds:RandomIdClass = new RandomIdClass()
export default randomIds