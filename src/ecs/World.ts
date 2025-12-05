import { Entity } from './Entity';
import { Component } from './Component';
import { System } from './System';

// 世界类，用于管理实体和系统
export class World {
  // 实体映射，key为实体ID，value为实体实例
  private entities: Map<string, Entity> = new Map();
  
  // 系统列表
  private systems: System[] = [];
  
  // 组件映射，key为组件类型，value为实体ID到组件的映射
  private componentsByType: Map<string, Map<string, Component>> = new Map();
  
  // 构造函数
  constructor() {
    // 空实现
  }
  
  // 添加实体到世界
  addEntity(entity: Entity): Entity {
    this.entities.set(entity.id, entity);
    
    // 更新组件映射
    entity.getAllComponents().forEach(component => {
      this.addComponentToMap(component);
    });
    
    return entity;
  }
  
  // 从世界移除实体
  removeEntity(entityId: string): void {
    const entity = this.entities.get(entityId);
    if (entity) {
      // 移除所有组件映射
      entity.getAllComponents().forEach(component => {
        this.removeComponentFromMap(component);
      });
      
      this.entities.delete(entityId);
    }
  }
  
  // 获取世界中的实体
  getEntity(entityId: string): Entity | undefined {
    return this.entities.get(entityId);
  }
  
  // 获取世界中的所有实体
  getAllEntities(): Entity[] {
    return Array.from(this.entities.values());
  }
  
  // 添加系统到世界
  addSystem(system: System): System {
    this.systems.push(system);
    system.init();
    return system;
  }
  
  // 从世界移除系统
  removeSystem(systemName: string): void {
    const index = this.systems.findIndex(s => s.name === systemName);
    if (index !== -1) {
      this.systems[index].destroy();
      this.systems.splice(index, 1);
    }
  }
  
  // 更新所有系统
  update(deltaTime: number): void {
    this.systems.forEach(system => {
      system.update(deltaTime);
    });
  }
  
  // 获取具有特定组件类型的所有实体的组件
  getComponentsByType<T extends Component>(type: string): Map<string, T> {
    const components = this.componentsByType.get(type);
    if (!components) {
      return new Map();
    }
    return components as Map<string, T>;
  }
  
  // 获取具有特定组件组合的所有实体
  getEntitiesWithComponents(componentTypes: string[]): Entity[] {
    if (componentTypes.length === 0) {
      return this.getAllEntities();
    }
    
    // 获取第一个组件类型的所有实体ID
    const firstComponentType = componentTypes[0];
    const firstComponentMap = this.componentsByType.get(firstComponentType);
    if (!firstComponentMap) {
      return [];
    }
    
    const entityIds = Array.from(firstComponentMap.keys());
    
    // 过滤出具有所有组件类型的实体
    return entityIds
      .filter(entityId => {
        const entity = this.entities.get(entityId);
        if (!entity) return false;
        return componentTypes.every(type => entity.hasComponent(type));
      })
      .map(entityId => this.entities.get(entityId)!) as Entity[];
  }
  
  // 添加组件到映射
  private addComponentToMap(component: Component): void {
    if (!this.componentsByType.has(component.type)) {
      this.componentsByType.set(component.type, new Map());
    }
    const componentMap = this.componentsByType.get(component.type)!;
    componentMap.set(component.entityId, component);
  }
  
  // 从映射移除组件
  private removeComponentFromMap(component: Component): void {
    const componentMap = this.componentsByType.get(component.type);
    if (componentMap) {
      componentMap.delete(component.entityId);
      
      // 如果该组件类型没有更多组件，移除整个映射
      if (componentMap.size === 0) {
        this.componentsByType.delete(component.type);
      }
    }
  }
  
  // 清空世界
  clear(): void {
    // 销毁所有系统
    this.systems.forEach(system => system.destroy());
    this.systems = [];
    
    // 移除所有实体
    this.entities.clear();
    this.componentsByType.clear();
  }
}
