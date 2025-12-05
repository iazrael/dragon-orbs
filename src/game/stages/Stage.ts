import { World } from '../../ecs/World';
import { Entity } from '../../ecs/Entity';

// 关卡基类，作为所有关卡的父类
export abstract class Stage {
  // 关卡名称
  readonly name: string;
  
  // 关卡描述
  readonly description: string;
  
  // 游戏世界
  protected world: World;
  
  // 关卡实体列表
  protected entities: Entity[] = [];
  
  // 构造函数
  constructor(name: string, description: string, world: World) {
    this.name = name;
    this.description = description;
    this.world = world;
  }
  
  // 初始化关卡
  abstract init(): void;
  
  // 更新关卡
  abstract update(deltaTime: number): void;
  
  // 销毁关卡
  destroy(): void {
    // 移除所有关卡实体
    this.entities.forEach(entity => {
      this.world.removeEntity(entity.id);
    });
    this.entities = [];
  }
  
  // 添加实体到关卡
  protected addEntity(entity: Entity): Entity {
    this.world.addEntity(entity);
    this.entities.push(entity);
    return entity;
  }
  
  // 检查关卡是否完成
  abstract isComplete(): boolean;
}
