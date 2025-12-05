import { Component } from '../../ecs/Component';

// 变换组件，用于管理实体的位置、旋转和缩放
export class Transform extends Component {
  // 组件类型标识
  readonly type: string = 'transform';
  
  // 位置坐标
  position: { x: number; y: number; z: number };
  
  // 旋转角度（弧度）
  rotation: { x: number; y: number; z: number };
  
  // 缩放因子
  scale: { x: number; y: number; z: number };
  
  // 构造函数
  constructor(
    position: { x: number; y: number; z?: number } = { x: 0, y: 0, z: 0 },
    rotation: { x: number; y: number; z?: number } = { x: 0, y: 0, z: 0 },
    scale: { x: number; y: number; z?: number } = { x: 1, y: 1, z: 1 }
  ) {
    super();
    this.position = {
      x: position.x,
      y: position.y,
      z: position.z || 0
    };
    this.rotation = {
      x: rotation.x,
      y: rotation.y,
      z: rotation.z || 0
    };
    this.scale = {
      x: scale.x,
      y: scale.y,
      z: scale.z || 1
    };
  }
  
  // 重置变换组件
  reset(): void {
    this.position = { x: 0, y: 0, z: 0 };
    this.rotation = { x: 0, y: 0, z: 0 };
    this.scale = { x: 1, y: 1, z: 1 };
  }
}
