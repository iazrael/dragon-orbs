import { System } from '../../ecs/System';
import { Controller } from '../components/Controller';
import { Transform } from '../components/Transform';
import { Health } from '../components/Health';

// AI系统，负责处理敌人的AI行为
export class AISystem extends System {
  // 构造函数
  constructor(world: any) {
    super(world, 'ai');
  }
  
  // 更新AI系统
  update(deltaTime: number): void {
    // 获取所有具有Controller组件的实体
    const entities = this.world.getEntitiesWithComponents(['controller']);
    
    // 获取玩家实体（假设只有一个玩家）
    const playerEntity = entities.find(entity => {
      const controller = entity.getComponent<Controller>('controller');
      return controller?.controllerType === 'player';
    });
    
    if (!playerEntity) {
      return;
    }
    
    const playerTransform = playerEntity.getComponent<Transform>('transform');
    
    if (!playerTransform) {
      return;
    }
    
    // 更新每个AI实体的行为
    entities.forEach(entity => {
      const controller = entity.getComponent<Controller>('controller');
      const transform = entity.getComponent<Transform>('transform');
      const health = entity.getComponent<Health>('health');
      
      if (!controller || !transform || controller.controllerType !== 'ai' || (health && health.isDead)) {
        return;
      }
      
      // 根据AI难度选择行为
      switch (controller.aiDifficulty) {
        case 1: // 简单AI
          this.handleEasyAI(controller, transform, playerTransform);
          break;
        case 2: // 中等AI
          this.handleMediumAI(controller, transform, playerTransform);
          break;
        case 3: // 困难AI
          this.handleHardAI(controller, transform, playerTransform);
          break;
        default:
          this.handleEasyAI(controller, transform, playerTransform);
      }
    });
  }
  
  // 处理简单AI行为
  private handleEasyAI(
    controller: Controller,
    aiTransform: Transform,
    playerTransform: Transform
  ): void {
    // 简单AI：随机移动和偶尔攻击
    const distance = Math.abs(aiTransform.position.x - playerTransform.position.x);
    
    // 10%的概率改变行为
    if (Math.random() < 0.1) {
      controller.inputs.left = Math.random() < 0.5;
      controller.inputs.right = !controller.inputs.left;
      controller.inputs.attack = Math.random() < 0.3;
      controller.inputs.jump = Math.random() < 0.1;
    }
    
    // 如果玩家在攻击范围内，增加攻击概率
    if (distance < 100) {
      controller.inputs.attack = Math.random() < 0.5;
    }
  }
  
  // 处理中等AI行为
  private handleMediumAI(
    controller: Controller,
    aiTransform: Transform,
    playerTransform: Transform
  ): void {
    // 中等AI：追踪玩家并适时攻击
    const distance = aiTransform.position.x - playerTransform.position.x;
    
    // 追踪玩家
    if (distance > 50) {
      controller.inputs.left = true;
      controller.inputs.right = false;
    } else if (distance < -50) {
      controller.inputs.left = false;
      controller.inputs.right = true;
    } else {
      controller.inputs.left = false;
      controller.inputs.right = false;
    }
    
    // 在攻击范围内时攻击
    if (Math.abs(distance) < 100) {
      controller.inputs.attack = Math.random() < 0.3;
    } else {
      controller.inputs.attack = false;
    }
    
    // 偶尔跳跃
    controller.inputs.jump = Math.random() < 0.05;
  }
  
  // 处理困难AI行为
  private handleHardAI(
    controller: Controller,
    aiTransform: Transform,
    playerTransform: Transform
  ): void {
    // 困难AI：智能追踪、攻击和躲避
    const distance = aiTransform.position.x - playerTransform.position.x;
    const yDiff = aiTransform.position.y - playerTransform.position.y;
    
    // 智能追踪玩家
    if (distance > 80) {
      controller.inputs.left = true;
      controller.inputs.right = false;
    } else if (distance < -80) {
      controller.inputs.left = false;
      controller.inputs.right = true;
    } else {
      controller.inputs.left = false;
      controller.inputs.right = false;
    }
    
    // 智能攻击
    if (Math.abs(distance) < 120 && Math.abs(yDiff) < 50) {
      controller.inputs.attack = Math.random() < 0.4;
      controller.inputs.skill = Math.random() < 0.1; // 偶尔使用技能
    } else {
      controller.inputs.attack = false;
      controller.inputs.skill = false;
    }
    
    // 智能跳跃（如果玩家在上方）
    if (yDiff > 100 && Math.abs(distance) < 200) {
      controller.inputs.jump = Math.random() < 0.2;
    } else {
      controller.inputs.jump = false;
    }
  }
}
