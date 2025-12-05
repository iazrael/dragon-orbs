import { Component } from './Component';

// 实体类，用于管理组件
export class Entity {
  // 实体唯一标识符
  readonly id: string;
  
  // 组件映射，key为组件类型，value为组件实例
  private components: Map<string, Component> = new Map();
  
  // 实体名称，可选
  name?: string;
  
  // 构造函数，生成唯一ID
  constructor(name?: string) {
    this.id = `${name || 'entity'}_${Math.random().toString(36).substr(2, 9)}`;
    this.name = name;
  }
  
  // 添加组件到实体
  addComponent<T extends Component>(component: T): T {
    component.entityId = this.id;
    this.components.set(component.type, component);
    return component;
  }
  
  // 从实体移除组件
  removeComponent(type: string): void {
    this.components.delete(type);
  }
  
  // 获取实体上的组件
  getComponent<T extends Component>(type: string): T | undefined {
    return this.components.get(type) as T | undefined;
  }
  
  // 检查实体是否有特定类型的组件
  hasComponent(type: string): boolean {
    return this.components.has(type);
  }
  
  // 获取实体上的所有组件
  getAllComponents(): Component[] {
    return Array.from(this.components.values());
  }
  
  // 获取实体上的所有组件类型
  getComponentTypes(): string[] {
    return Array.from(this.components.keys());
  }
}
