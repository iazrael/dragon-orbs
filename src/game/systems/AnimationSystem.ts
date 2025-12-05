import { System } from '../../ecs/System';
import { Animation } from '../components/Animation';
import { Controller } from '../components/Controller';

// 动画系统，负责更新角色的动画状态
export class AnimationSystem extends System {
  // 动画帧计数器
  private frameCount: number = 0;
  
  // 构造函数
  constructor(world: any) {
    super(world, 'animation');
  }
  
  // 更新动画系统
  update(_deltaTime: number): void {
    // 增加帧计数器
    this.frameCount++;
    
    // 获取所有具有Animation组件的实体
    const entities = this.world.getEntitiesWithComponents(['animation']);
    
    // 更新每个实体的动画状态
    entities.forEach(entity => {
      const animation = entity.getComponent<Animation>('animation');
      const controller = entity.getComponent<Controller>('controller');
      
      if (!animation || !animation.isPlaying) {
        return;
      }
      
      // 根据控制器输入更新动画
      if (controller) {
        this.updateAnimationFromController(animation, controller);
      }
      
      // 更新动画帧
      this.updateAnimationFrame(animation);
    });
  }
  
  // 根据控制器输入更新动画
  private updateAnimationFromController(animation: Animation, controller: Controller): void {
    // 检测当前动作状态
    const isMoving = controller.inputs.left || controller.inputs.right;
    const isJumping = controller.inputs.jump;
    const isAttacking = controller.inputs.attack;
    const isUsingSkill = controller.inputs.skill;
    
    // 根据动作状态选择动画
    if (isUsingSkill) {
      if (animation.currentAnimation !== 'skill') {
        animation.play('skill', false, 1.5); // 技能动画不循环
      }
    } else if (isAttacking) {
      if (animation.currentAnimation !== 'attack') {
        animation.play('attack', false, 1.2); // 攻击动画不循环
      }
    } else if (isJumping) {
      if (animation.currentAnimation !== 'jump') {
        animation.play('jump', false, 1); // 跳跃动画不循环
      }
    } else if (isMoving) {
      if (animation.currentAnimation !== 'run') {
        animation.play('run', true, 1); // 奔跑动画循环
      }
    } else {
      if (animation.currentAnimation !== 'idle') {
        animation.play('idle', true, 0.8); //  idle动画循环
      }
    }
  }
  
  // 更新动画帧
  private updateAnimationFrame(animation: Animation): void {
    // 每5帧更新一次动画帧（简化版，实际项目中应该根据deltaTime计算）
    if (this.frameCount % 5 !== 0) {
      return;
    }
    
    // 更新当前帧
    animation.currentFrame += animation.speed * animation.direction;
    
    // 检查动画是否完成
    if (animation.currentFrame >= animation.totalFrames) {
      if (animation.loop) {
        // 循环播放，重置到第一帧
        animation.currentFrame = 0;
      } else {
        // 不循环，停留在最后一帧并触发完成回调
        animation.currentFrame = animation.totalFrames - 1;
        animation.isPlaying = false;
        
        if (animation.onComplete) {
          animation.onComplete();
        }
      }
    } else if (animation.currentFrame < 0) {
      // 反向播放时检查是否到第一帧
      if (animation.loop) {
        animation.currentFrame = animation.totalFrames - 1;
      } else {
        animation.currentFrame = 0;
        animation.isPlaying = false;
        
        if (animation.onComplete) {
          animation.onComplete();
        }
      }
    }
  }
}
