import { Component } from '../../ecs/Component';

// 控制器类型枚举
export enum ControllerType {
  PLAYER = 'player',
  AI = 'ai',
  NONE = 'none'
}

// 控制器组件，用于管理实体的控制方式
export class Controller extends Component {
  // 组件类型标识
  readonly type: string = 'controller';
  
  // 控制器类型
  controllerType: ControllerType;
  
  // 控制输入状态
  inputs: {
    up: boolean;
    down: boolean;
    left: boolean;
    right: boolean;
    attack: boolean;
    jump: boolean;
    skill: boolean;
  };
  
  // AI难度（仅AI控制器使用）
  aiDifficulty: number;
  
  // 构造函数
  constructor(
    controllerType: ControllerType = ControllerType.NONE,
    aiDifficulty: number = 1
  ) {
    super();
    this.controllerType = controllerType;
    this.aiDifficulty = aiDifficulty;
    this.inputs = {
      up: false,
      down: false,
      left: false,
      right: false,
      attack: false,
      jump: false,
      skill: false
    };
  }
  
  // 重置控制器组件
  reset(): void {
    this.inputs = {
      up: false,
      down: false,
      left: false,
      right: false,
      attack: false,
      jump: false,
      skill: false
    };
  }
  
  // 设置输入状态
  setInput(inputName: keyof typeof this.inputs, value: boolean): void {
    this.inputs[inputName] = value;
  }
}
