import { Component } from '../../ecs/Component';

// 动画组件，用于管理角色的动画状态
export class Animation extends Component {
  // 组件类型标识
  readonly type: string = 'animation';
  
  // 当前动画名称
  currentAnimation: string;
  
  // 动画播放速度
  speed: number;
  
  // 当前动画帧
  currentFrame: number;
  
  // 动画帧总数
  totalFrames: number;
  
  // 是否循环播放
  loop: boolean;
  
  // 动画是否正在播放
  isPlaying: boolean;
  
  // 动画播放方向（1为正向，-1为反向）
  direction: number;
  
  // 动画完成回调
  onComplete?: () => void;
  
  // 构造函数
  constructor(
    currentAnimation: string = 'idle',
    speed: number = 1,
    totalFrames: number = 1,
    loop: boolean = true
  ) {
    super();
    this.currentAnimation = currentAnimation;
    this.speed = speed;
    this.totalFrames = totalFrames;
    this.currentFrame = 0;
    this.loop = loop;
    this.isPlaying = true;
    this.direction = 1;
  }
  
  // 播放动画
  play(animationName: string, loop: boolean = true, speed: number = 1): void {
    this.currentAnimation = animationName;
    this.loop = loop;
    this.speed = speed;
    this.currentFrame = 0;
    this.isPlaying = true;
    this.direction = 1;
  }
  
  // 暂停动画
  pause(): void {
    this.isPlaying = false;
  }
  
  // 继续播放动画
  resume(): void {
    this.isPlaying = true;
  }
  
  // 重置动画
  reset(): void {
    this.currentFrame = 0;
    this.isPlaying = true;
  }
  
  // 设置动画完成回调
  setOnComplete(callback: () => void): void {
    this.onComplete = callback;
  }
}
