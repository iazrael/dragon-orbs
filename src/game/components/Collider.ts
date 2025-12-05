import { Component } from '../../ecs/Component';

// 碰撞体类型枚举
export enum ColliderType {
  BOX = 'box',
  CIRCLE = 'circle',
  POLYGON = 'polygon'
}

// 碰撞体组件，用于管理实体的碰撞检测
export class Collider extends Component {
  // 组件类型标识
  readonly type: string = 'collider';
  
  // 碰撞体类型
  colliderType: ColliderType;
  
  // 碰撞体参数
  params: any;
  
  // 是否为触发器（只检测碰撞，不产生物理效果）
  isTrigger: boolean;
  
  // 碰撞层
  layer: number;
  
  // 碰撞掩码（与哪些层碰撞）
  mask: number;
  
  // 是否启用碰撞
  enabled: boolean;
  
  // 构造函数
  constructor(
    colliderType: ColliderType = ColliderType.BOX,
    params: any = { width: 32, height: 32 },
    isTrigger: boolean = false,
    layer: number = 1,
    mask: number = -1
  ) {
    super();
    this.colliderType = colliderType;
    this.params = params;
    this.isTrigger = isTrigger;
    this.layer = layer;
    this.mask = mask;
    this.enabled = true;
  }
  
  // 重置碰撞体组件
  reset(): void {
    this.enabled = true;
  }
}
