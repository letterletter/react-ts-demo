function log(constructor: Function) {
  console.log(' ------------ start  -------------')
  console.log(' ------------ call constructor  -------------'+constructor.prototype.constructor.name)
  console.log(' ------------ end  -------------')
}

function writable(value:boolean) {
  return function(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    console.log('www ------------start')
    console.log('www ------------' ,propertyKey)  //greet
    console.log('www' ,target)  //原型
    descriptor.writable = value
    console.log('www----------------end')
  }
}
//log为类装饰器

@log
class Hello {
  greeting: string;
  constructor(message:string) {
    this.greeting = message;
  }
  @writable(false)
  greet() {
    return 'Hello '+this.greeting
  }
}


let hello = new Hello('你好啊')
hello.greet()
export {}