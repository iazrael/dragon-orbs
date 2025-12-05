import { Component } from '../../ecs/Component';

// 精灵组件，用于管理实体的精灵渲染
export class Sprite extends Component {
  // 组件类型标识
  readonly type: string = 'sprite';
  
  // 精灵名称或标识符
  spriteName: string;
  
  // 精灵宽度
  width: number;
  
  // 精灵高度
  height: number;
  
  // 当前动画帧
  currentFrame: number;
  
  // 动画播放速度
  frameRate: number;
  
  // 是否循环播放动画
  loop: boolean;
  
  // 是否可见
  visible: boolean;
  
  // 构造函数
  constructor(
    spriteName: string = 'default',
    width: number = 32,
    height: number = 32,
    frameRate: number = 10,
    loop: boolean = true
  ) {
    super();
    this.spriteName = spriteName;
    this.width = width;
    this.height = height;
    this.currentFrame = 0;
    this.frameRate = frameRate;
    this.loop = loop;
    this.visible = true;
  }
  
  // 重置精灵组件
  reset(): void {
    this.currentFrame = 0;
    this.visible = true;
  }
}
