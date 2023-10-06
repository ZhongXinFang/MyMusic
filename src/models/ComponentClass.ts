// 组件实体
export class ComponentClass {
    id: string = null!
    component: any = null!
  
    constructor(id: string, component: any) {
      this.id = id
      this.component = component
    }
  }