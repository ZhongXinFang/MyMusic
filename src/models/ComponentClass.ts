// 组件实体
export class ComponentClass {
  id: string = null!
  component: string = null!
  comobj: any = null!

  constructor(id: string, component: string) {
    this.id = id
    this.component = component
  }
}