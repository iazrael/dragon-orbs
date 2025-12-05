import { Stage } from './Stage';
import { World } from '../../ecs/World';
import { Entity } from '../../ecs/Entity';
import { Transform } from '../components/Transform';
import { Sprite } from '../components/Sprite';
import { Collider, ColliderType } from '../components/Collider';
import { Controller, ControllerType } from '../components/Controller';
import { Health } from '../components/Health';
import { Animation } from '../components/Animation';
import { Drawable, DrawType } from '../components/Drawable';

// 第五个关卡：海底探险
export class Stage5 extends Stage {
  // 关卡是否完成
  private completed: boolean = false;
  
  // 龙珠是否被找到
  private dragonBallFound: boolean = false;
  
  // 水下浮力系统参数
  private buoyancyForce: number = 0.5;
  
  // 水流方向和强度
  private currentDirection: {x: number, y: number} = {x: 0.1, y: 0};
  private currentIntensity: number = 1;
  
  // 构造函数
  constructor(world: World) {
    super(
      'stage5',
      '海底洞穴 - 寻找第四颗龙珠',
      world
    );
  }
  
  // 初始化关卡
  init(): void {
    // 创建玩家实体（悟空）
    this.createPlayer();
    
    // 创建场景实体（海底洞穴、珊瑚、水草等）
    this.createScene();
    
    // 创建敌人实体（海怪、水下机器人）
    this.createEnemies();
    
    // 创建龙珠实体
    this.createDragonBall();
  }
  
  // 创建玩家实体
  private createPlayer(): void {
    const player = new Entity('goku');
    
    // 添加组件
    player.addComponent(new Transform({ x: 100, y: 300 }));
    player.addComponent(new Sprite('goku', 64, 96));
    player.addComponent(new Collider(ColliderType.BOX, { width: 64, height: 96 }));
    player.addComponent(new Controller(ControllerType.PLAYER));
    player.addComponent(new Health(100));
    player.addComponent(new Animation('swim', 1, 6)); // 游泳动画
    player.addComponent(new Drawable(DrawType.CANVAS, 'goku', 1));
    
    this.addEntity(player);
  }
  
  // 创建场景实体
  private createScene(): void {
    // 创建海底地面
    this.createSeabed();
    
    // 创建洞穴墙壁
    this.createCaveWalls();
    
    // 创建珊瑚和水草
    this.createCoralAndSeaweed();
    
    // 创建水下岩石
    this.createUnderwaterRocks();
    
    // 创建气泡效果
    this.createBubbles();
  }
  
  // 创建海底地面
  private createSeabed(): void {
    const seabed = new Entity('seabed');
    seabed.addComponent(new Transform({ x: 750, y: 580 }));
    seabed.addComponent(new Collider(ColliderType.BOX, { width: 1500, height: 40 }));
    seabed.addComponent(new Drawable(DrawType.CANVAS, 'seabed', 0));
    this.addEntity(seabed);
  }
  
  // 创建洞穴墙壁
  private createCaveWalls(): void {
    // 创建左侧墙壁
    const leftWall = new Entity('left-wall');
    leftWall.addComponent(new Transform({ x: 20, y: 300 }));
    leftWall.addComponent(new Collider(ColliderType.BOX, { width: 40, height: 600 }));
    leftWall.addComponent(new Drawable(DrawType.CANVAS, 'cave-wall', 0));
    this.addEntity(leftWall);
    
    // 创建右侧墙壁
    const rightWall = new Entity('right-wall');
    rightWall.addComponent(new Transform({ x: 1480, y: 300 }));
    rightWall.addComponent(new Collider(ColliderType.BOX, { width: 40, height: 600 }));
    rightWall.addComponent(new Drawable(DrawType.CANVAS, 'cave-wall', 0));
    this.addEntity(rightWall);
    
    // 创建顶部墙壁
    const topWall = new Entity('top-wall');
    topWall.addComponent(new Transform({ x: 750, y: 20 }));
    topWall.addComponent(new Collider(ColliderType.BOX, { width: 1500, height: 40 }));
    topWall.addComponent(new Drawable(DrawType.CANVAS, 'cave-wall', 0));
    this.addEntity(topWall);
  }
  
  // 创建珊瑚和水草
  private createCoralAndSeaweed(): void {
    // 创建珊瑚
    for (let i = 0; i < 10; i++) {
      const x = 100 + i * 140;
      const y = 520 + Math.random() * 40;
      this.createCoral(x, y);
    }
    
    // 创建水草
    for (let i = 0; i < 15; i++) {
      const x = 50 + i * 100;
      const y = 500 + Math.random() * 60;
      this.createSeaweed(x, y);
    }
  }
  
  // 创建珊瑚实体
  private createCoral(x: number, y: number): void {
    const coral = new Entity(`coral-${Math.random()}`);
    coral.addComponent(new Transform({ x, y }));
    coral.addComponent(new Collider(ColliderType.BOX, { width: 40, height: 80 }));
    coral.addComponent(new Drawable(DrawType.CANVAS, 'coral', 0));
    this.addEntity(coral);
  }
  
  // 创建水草实体
  private createSeaweed(x: number, y: number): void {
    const seaweed = new Entity(`seaweed-${Math.random()}`);
    seaweed.addComponent(new Transform({ x, y }));
    seaweed.addComponent(new Collider(ColliderType.BOX, { width: 30, height: 100 }));
    seaweed.addComponent(new Drawable(DrawType.CANVAS, 'seaweed', 0));
    this.addEntity(seaweed);
  }
  
  // 创建水下岩石
  private createUnderwaterRocks(): void {
    for (let i = 0; i < 8; i++) {
      const x = 200 + i * 160;
      const y = 400 + Math.random() * 100;
      this.createUnderwaterRock(x, y);
    }
  }
  
  // 创建水下岩石实体
  private createUnderwaterRock(x: number, y: number): void {
    const rock = new Entity(`underwater-rock-${Math.random()}`);
    rock.addComponent(new Transform({ x, y }));
    rock.addComponent(new Collider(ColliderType.BOX, { width: 60, height: 60 }));
    rock.addComponent(new Drawable(DrawType.CANVAS, 'underwater-rock', 0));
    this.addEntity(rock);
  }
  
  // 创建气泡效果
  private createBubbles(): void {
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * 1500;
      const y = Math.random() * 600;
      this.createBubble(x, y);
    }
  }
  
  // 创建气泡实体
  private createBubble(x: number, y: number): void {
    const bubble = new Entity(`bubble-${Math.random()}`);
    bubble.addComponent(new Transform({ x, y }));
    bubble.addComponent(new Collider(ColliderType.CIRCLE, { radius: 10 }));
    bubble.addComponent(new Animation('rise', 1, 4)); // 上升动画
    bubble.addComponent(new Drawable(DrawType.CANVAS, 'bubble', 1));
    this.addEntity(bubble);
  }
  
  // 创建敌人实体
  private createEnemies(): void {
    // 创建海怪
    for (let i = 0; i < 3; i++) {
      const x = 400 + i * 300;
      const y = 350 + Math.random() * 100;
      this.createSeaMonster(x, y);
    }
    
    // 创建水下机器人
    for (let i = 0; i < 5; i++) {
      const x = 500 + i * 250;
      const y = 400 + Math.random() * 150;
      this.createUnderwaterRobot(x, y);
    }
  }
  
  // 创建海怪实体
  private createSeaMonster(x: number, y: number): void {
    const seaMonster = new Entity(`sea-monster-${Math.random()}`);
    seaMonster.addComponent(new Transform({ x, y }));
    seaMonster.addComponent(new Sprite('sea-monster', 80, 90));
    seaMonster.addComponent(new Collider(ColliderType.BOX, { width: 80, height: 90 }));
    seaMonster.addComponent(new Controller(ControllerType.AI));
    seaMonster.addComponent(new Health(80));
    seaMonster.addComponent(new Animation('swim', 1, 6));
    seaMonster.addComponent(new Drawable(DrawType.CANVAS, 'sea-monster', 1));
    this.addEntity(seaMonster);
  }
  
  // 创建水下机器人实体
  private createUnderwaterRobot(x: number, y: number): void {
    const robot = new Entity(`underwater-robot-${Math.random()}`);
    robot.addComponent(new Transform({ x, y }));
    robot.addComponent(new Sprite('underwater-robot', 65, 75));
    robot.addComponent(new Collider(ColliderType.BOX, { width: 65, height: 75 }));
    robot.addComponent(new Controller(ControllerType.AI));
    robot.addComponent(new Health(60));
    robot.addComponent(new Animation('float', 1, 4));
    robot.addComponent(new Drawable(DrawType.CANVAS, 'underwater-robot', 1));
    this.addEntity(robot);
  }
  
  // 创建龙珠实体
  private createDragonBall(): void {
    const dragonBall = new Entity('dragon-ball-4');
    dragonBall.addComponent(new Transform({ x: 1200, y: 300 }));
    dragonBall.addComponent(new Sprite('dragon-ball', 40, 40));
    dragonBall.addComponent(new Collider(ColliderType.CIRCLE, { radius: 20 }));
    dragonBall.addComponent(new Animation('spin', 1, 8)); // 旋转动画
    dragonBall.addComponent(new Drawable(DrawType.CANVAS, 'dragon-ball', 2)); // 优先级更高，显示在前面
    this.addEntity(dragonBall);
  }
  
  // 更新关卡
  update(deltaTime: number): void {
    // 应用水下浮力
    this.applyBuoyancy(deltaTime);
    
    // 应用水流效果
    this.applyCurrent(deltaTime);
    
    // 更新气泡位置
    this.updateBubbles(deltaTime);
    
    // 检查玩家是否找到龙珠
    this.checkDragonBallFound();
  }
  
  // 应用水下浮力
  private applyBuoyancy(deltaTime: number): void {
    // 遍历所有实体，应用浮力效果
    this.entities.forEach(entity => {
      const transform = entity.getComponent<Transform>('transform');
      const health = entity.getComponent<Health>('health');
      
      // 只对有生命值的实体应用浮力（玩家和敌人）
      if (transform && health) {
        // 应用向上的浮力
        transform.velocity.y += this.buoyancyForce * deltaTime;
      }
    });
  }
  
  // 应用水流效果
  private applyCurrent(deltaTime: number): void {
    // 遍历所有实体，应用水流效果
    this.entities.forEach(entity => {
      const transform = entity.getComponent<Transform>('transform');
      const health = entity.getComponent<Health>('health');
      
      // 只对有生命值的实体应用水流（玩家和敌人）
      if (transform && health) {
        // 应用水流力
        transform.velocity.x += this.currentDirection.x * this.currentIntensity * deltaTime;
        transform.velocity.y += this.currentDirection.y * this.currentIntensity * deltaTime;
      }
    });
  }
  
  // 更新气泡位置
  private updateBubbles(deltaTime: number): void {
    this.entities.forEach(entity => {
      if (entity.name && entity.name.startsWith('bubble-')) {
        const transform = entity.getComponent<Transform>('transform');
        if (transform) {
          // 气泡上升
          transform.position.y -= 50 * deltaTime;
          
          // 气泡随机横向移动
          transform.position.x += (Math.random() - 0.5) * 20 * deltaTime;
          
          // 气泡超出屏幕顶部则重新生成
          if (transform.position.y < 0) {
            transform.position.y = 600;
            transform.position.x = Math.random() * 1500;
          }
        }
      }
    });
  }
  
  // 检查玩家是否找到龙珠
  private checkDragonBallFound(): void {
    if (this.dragonBallFound) return;
    
    // 获取玩家和龙珠实体
    const player = this.entities.find(e => e.name === 'goku');
    const dragonBall = this.entities.find(e => e.name === 'dragon-ball-4');
    
    if (!player || !dragonBall) return;
    
    const playerTransform = player.getComponent<Transform>('transform');
    const dragonBallTransform = dragonBall.getComponent<Transform>('transform');
    
    if (!playerTransform || !dragonBallTransform) return;
    
    // 检查距离，小于50像素则触发找到龙珠事件
    const dx = playerTransform.position.x - dragonBallTransform.position.x;
    const dy = playerTransform.position.y - dragonBallTransform.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 50) {
      this.dragonBallFound = true;
      console.log('恭喜！你找到了第四颗龙珠！');
      this.completed = true;
    }
  }
  
  // 检查关卡是否完成
  isComplete(): boolean {
    return this.completed;
  }
  
  // 获取浮力强度
  getBuoyancyForce(): number {
    return this.buoyancyForce;
  }
  
  // 获取水流方向
  getCurrentDirection(): {x: number, y: number} {
    return this.currentDirection;
  }
  
  // 获取水流强度
  getCurrentIntensity(): number {
    return this.currentIntensity;
  }
}
