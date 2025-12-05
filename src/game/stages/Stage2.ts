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

// 第二个关卡：包子山冒险
export class Stage2 extends Stage {
  // 关卡是否完成
  private completed: boolean = false;
  
  // 龙珠是否被找到
  private dragonBallFound: boolean = false;
  
  // 构造函数
  constructor(world: World) {
    super(
      'stage2',
      '包子山冒险 - 寻找第一颗龙珠',
      world
    );
  }
  
  // 初始化关卡
  init(): void {
    // 创建玩家实体（悟空）
    this.createPlayer();
    
    // 创建场景实体（地面、障碍物等）
    this.createScene();
    
    // 创建敌人实体（野兽、小喽啰）
    this.createEnemies();
    
    // 创建龙珠实体
    this.createDragonBall();
  }
  
  // 创建玩家实体
  private createPlayer(): void {
    const player = new Entity('goku');
    
    // 添加组件
    player.addComponent(new Transform({ x: 100, y: 400 }));
    player.addComponent(new Sprite('goku', 64, 96));
    player.addComponent(new Collider(ColliderType.BOX, { width: 64, height: 96 }));
    player.addComponent(new Controller(ControllerType.PLAYER));
    player.addComponent(new Health(100));
    player.addComponent(new Animation('idle', 1, 4));
    player.addComponent(new Drawable(DrawType.CANVAS, 'goku', 1));
    
    this.addEntity(player);
  }
  
  // 创建场景实体
  private createScene(): void {
    // 创建地面
    const ground = new Entity('ground');
    ground.addComponent(new Transform({ x: 0, y: 550 }));
    ground.addComponent(new Collider(ColliderType.BOX, { width: 1200, height: 50 }));
    ground.addComponent(new Drawable(DrawType.CANVAS, 'ground', 0));
    this.addEntity(ground);
    
    // 创建树木障碍物
    this.createTree(200, 450);
    this.createTree(400, 450);
    this.createTree(700, 450);
    this.createTree(900, 450);
    
    // 创建石头障碍物
    this.createStone(300, 500);
    this.createStone(800, 500);
    
    // 创建平台
    this.createPlatform(500, 350, 150);
    this.createPlatform(1000, 400, 120);
  }
  
  // 创建树木实体
  private createTree(x: number, y: number): void {
    const tree = new Entity(`tree-${Math.random()}`);
    tree.addComponent(new Transform({ x, y }));
    tree.addComponent(new Collider(ColliderType.BOX, { width: 60, height: 120 }));
    tree.addComponent(new Drawable(DrawType.CANVAS, 'tree', 0));
    this.addEntity(tree);
  }
  
  // 创建石头实体
  private createStone(x: number, y: number): void {
    const stone = new Entity(`stone-${Math.random()}`);
    stone.addComponent(new Transform({ x, y }));
    stone.addComponent(new Collider(ColliderType.BOX, { width: 40, height: 30 }));
    stone.addComponent(new Drawable(DrawType.CANVAS, 'stone', 0));
    this.addEntity(stone);
  }
  
  // 创建平台实体
  private createPlatform(x: number, y: number, width: number): void {
    const platform = new Entity(`platform-${Math.random()}`);
    platform.addComponent(new Transform({ x, y }));
    platform.addComponent(new Collider(ColliderType.BOX, { width, height: 20 }));
    platform.addComponent(new Drawable(DrawType.CANVAS, 'platform', 0));
    this.addEntity(platform);
  }
  
  // 创建敌人实体
  private createEnemies(): void {
    // 创建野兽敌人
    for (let i = 0; i < 3; i++) {
      const beast = new Entity(`beast-${i}`);
      beast.addComponent(new Transform({ x: 300 + i * 200, y: 400 }));
      beast.addComponent(new Sprite('beast', 50, 50));
      beast.addComponent(new Collider(ColliderType.BOX, { width: 50, height: 50 }));
      beast.addComponent(new Controller(ControllerType.AI));
      beast.addComponent(new Health(30));
      beast.addComponent(new Animation('idle', 1, 3));
      beast.addComponent(new Drawable(DrawType.CANVAS, 'beast', 1));
      this.addEntity(beast);
    }
    
    // 创建小喽啰敌人
    for (let i = 0; i < 2; i++) {
      const goon = new Entity(`goon-${i}`);
      goon.addComponent(new Transform({ x: 400 + i * 300, y: 400 }));
      goon.addComponent(new Sprite('goon', 60, 80));
      goon.addComponent(new Collider(ColliderType.BOX, { width: 60, height: 80 }));
      goon.addComponent(new Controller(ControllerType.AI));
      goon.addComponent(new Health(40));
      goon.addComponent(new Animation('idle', 1, 4));
      goon.addComponent(new Drawable(DrawType.CANVAS, 'goon', 1));
      this.addEntity(goon);
    }
  }
  
  // 创建龙珠实体
  private createDragonBall(): void {
    const dragonBall = new Entity('dragon-ball-1');
    dragonBall.addComponent(new Transform({ x: 1000, y: 300 }));
    dragonBall.addComponent(new Sprite('dragon-ball', 40, 40));
    dragonBall.addComponent(new Collider(ColliderType.CIRCLE, { radius: 20 }));
    dragonBall.addComponent(new Animation('spin', 1, 8)); // 旋转动画
    dragonBall.addComponent(new Drawable(DrawType.CANVAS, 'dragon-ball', 2)); // 优先级更高，显示在前面
    this.addEntity(dragonBall);
  }
  
  // 更新关卡
  update(_deltaTime: number): void {
    // 检查玩家是否找到龙珠
    this.checkDragonBallFound();
  }
  
  // 检查玩家是否找到龙珠
  private checkDragonBallFound(): void {
    // 获取玩家和龙珠实体
    const player = this.entities.find(e => e.name === 'goku');
    const dragonBall = this.entities.find(e => e.name === 'dragon-ball-1');
    
    if (!player || !dragonBall || this.dragonBallFound) {
      return;
    }
    
    const playerTransform = player.getComponent<Transform>('transform');
    const dragonBallTransform = dragonBall.getComponent<Transform>('transform');
    
    if (!playerTransform || !dragonBallTransform) {
      return;
    }
    
    // 检查距离，小于50像素则触发找到龙珠事件
    const dx = playerTransform.position.x - dragonBallTransform.position.x;
    const dy = playerTransform.position.y - dragonBallTransform.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 50) {
      this.dragonBallFound = true;
      console.log('恭喜！你找到了第一颗龙珠！');
      this.completed = true;
    }
  }
  
  // 检查关卡是否完成
  isComplete(): boolean {
    return this.completed;
  }
}