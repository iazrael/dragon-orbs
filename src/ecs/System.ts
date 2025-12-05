import { World } from './World';

// 系统基类，负责处理具有特定组件的实体
export abstract class System {
  // 系统所属的世界
  protected world: World;
  
  // 系统名称，用于调试和识别
  readonly name: string;
  
  // 构造函数
  constructor(world: World, name: string) {
    this.world = world;
    this.name = name;
  }
  
  // 初始化系统，在系统被添加到世界时调用
  init(): void {
    // 空实现，子类可以重写
  }
  
  // 更新系统，每帧调用
  abstract update(deltaTime: number): void;
  
  // 销毁系统，在系统被从世界移除时调用
  destroy(): void {
    // 空实现，子类可以重写
  }
}
