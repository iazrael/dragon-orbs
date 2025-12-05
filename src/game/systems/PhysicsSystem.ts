import { System } from '../../ecs/System';
import { Transform } from '../components/Transform';
import { Collider, ColliderType } from '../components/Collider';

// 物理系统，负责处理游戏中的物理效果
export class PhysicsSystem extends System {
  // 重力加速度
  private gravity: number = 0.5;
  
  // 最大下落速度
  private maxFallSpeed: number = 10;
  
  // 构造函数
  constructor(world: any) {
    super(world, 'physics');
  }
  
  // 更新物理系统
  update(deltaTime: number): void {
    // 获取所有具有Transform和Collider组件的实体
    const entities = this.world.getEntitiesWithComponents(['transform', 'collider']);
    
    // 应用重力和更新位置
    entities.forEach(entity => {
      const transform = entity.getComponent<Transform>('transform');
      const collider = entity.getComponent<Collider>('collider');
      
      if (!transform || !collider || !collider.enabled) {
        return;
      }
      
      // 应用重力（简化版，只考虑y轴）
      transform.position.y += this.gravity;
      
      // 限制最大下落速度
      if (transform.position.y > this.maxFallSpeed) {
        transform.position.y = this.maxFallSpeed;
      }
      
      // 边界检测（防止实体离开屏幕）
      this.handleBoundaryCollision(transform, collider);
    });
    
    // 检测实体间碰撞
    this.detectCollisions(entities);
  }
  
  // 处理边界碰撞
  private handleBoundaryCollision(transform: Transform, collider: Collider): void {
    const canvasHeight = 600; // 假设画布高度为600
    const canvasWidth = 800; // 假设画布宽度为800
    
    // 获取碰撞体尺寸
    const colliderWidth = collider.colliderType === ColliderType.BOX ? collider.params.width : collider.params.radius * 2;
    const colliderHeight = collider.colliderType === ColliderType.BOX ? collider.params.height : collider.params.radius * 2;
    
    // 底部边界
    if (transform.position.y + colliderHeight > canvasHeight) {
      transform.position.y = canvasHeight - colliderHeight;
    }
    
    // 顶部边界
    if (transform.position.y < 0) {
      transform.position.y = 0;
    }
    
    // 左侧边界
    if (transform.position.x < 0) {
      transform.position.x = 0;
    }
    
    // 右侧边界
    if (transform.position.x + colliderWidth > canvasWidth) {
      transform.position.x = canvasWidth - colliderWidth;
    }
  }
  
  // 检测实体间碰撞
  private detectCollisions(entities: any[]): void {
    // 简单的O(n²)碰撞检测，实际项目中可以优化
    for (let i = 0; i < entities.length; i++) {
      for (let j = i + 1; j < entities.length; j++) {
        const entityA = entities[i];
        const entityB = entities[j];
        
        const transformA = entityA.getComponent<Transform>('transform');
        const colliderA = entityA.getComponent<Collider>('collider');
        const transformB = entityB.getComponent<Transform>('transform');
        const colliderB = entityB.getComponent<Collider>('collider');
        
        if (!transformA || !colliderA || !transformB || !colliderB || !colliderA.enabled || !colliderB.enabled) {
          continue;
        }
        
        // 检查碰撞层和掩码
        if ((colliderA.layer & colliderB.mask) === 0 || (colliderB.layer & colliderA.mask) === 0) {
          continue;
        }
        
        // 检测碰撞
        if (this.checkCollision(transformA, colliderA, transformB, colliderB)) {
          // 处理碰撞事件（这里只是简单打印，实际项目中可以触发回调或事件）
          console.log(`Collision between ${entityA.id} and ${entityB.id}`);
        }
      }
    }
  }
  
  // 检查两个实体是否碰撞
  private checkCollision(
    transformA: Transform,
    colliderA: Collider,
    transformB: Transform,
    colliderB: Collider
  ): boolean {
    // 简化版碰撞检测，只处理矩形碰撞
    if (colliderA.colliderType === ColliderType.BOX && colliderB.colliderType === ColliderType.BOX) {
      return this.checkBoxCollision(
        transformA.position,
        colliderA.params,
        transformB.position,
        colliderB.params
      );
    }
    
    return false;
  }
  
  // 检查矩形碰撞
  private checkBoxCollision(
    posA: { x: number; y: number; z: number },
    sizeA: { width: number; height: number },
    posB: { x: number; y: number; z: number },
    sizeB: { width: number; height: number }
  ): boolean {
    return (
      posA.x < posB.x + sizeB.width &&
      posA.x + sizeA.width > posB.x &&
      posA.y < posB.y + sizeB.height &&
      posA.y + sizeA.height > posB.y
    );
  }
}
