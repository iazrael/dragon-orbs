import { Component } from '../../ecs/Component';

// 绘制类型枚举
export enum DrawType {
  CANVAS = 'canvas',
  SVG = 'svg',
  THREEJS = 'threejs'
}

// 可绘制组件，用于支持Canvas/SVG绘制
export class Drawable extends Component {
  // 组件类型标识
  readonly type: string = 'drawable';
  
  // 绘制类型
  drawType: DrawType;
  
  // 绘制函数或标识符
  drawData: any;
  
  // 绘制顺序（值越小，绘制越靠前）
  zIndex: number;
  
  // 是否可见
  visible: boolean;
  
  // 构造函数
  constructor(
    drawType: DrawType = DrawType.CANVAS,
    drawData: any = null,
    zIndex: number = 0
  ) {
    super();
    this.drawType = drawType;
    this.drawData = drawData;
    this.zIndex = zIndex;
    this.visible = true;
  }
  
  // 重置可绘制组件
  reset(): void {
    this.visible = true;
  }
}
