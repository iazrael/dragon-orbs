// 组件基类，所有游戏组件都继承自此类
export abstract class Component {
  // 组件所属的实体ID
  entityId: string = '';
  
  // 组件类型标识，用于系统查询
  abstract readonly type: string;
  
  // 初始化组件
  constructor() {
    // 空实现，子类可以重写
  }
  
  // 重置组件状态
  reset(): void {
    // 空实现，子类可以重写
  }
}
