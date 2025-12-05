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

// 第四个关卡：火焰山
export class Stage4 extends Stage {
  // 关卡是否完成
  private completed: boolean = false;
  
  // 龙珠是否被找到
  private dragonBallFound: boolean = false;
  
  // 是否遇到牛魔王
  private metOxKing: boolean = false;
  
  // 熔岩陷阱状态
  private lavaTraps: Array<{active: boolean, timer: number}> = [];
  
  // 构造函数
  constructor(world: World) {
    super(
      'stage4',
      '火焰山 - 寻找第三颗龙珠',
      world
    );
    
    // 初始化熔岩陷阱状态
    this.lavaTraps = Array(5).fill(null).map(() => ({
      active: false,
      timer: 0
    }));
  }
  
  // 初始化关卡
  init(): void {
    // 创建玩家实体（悟空）
    this.createPlayer();
    
    // 创建场景实体（火山地形、熔岩、岩石等）
    this.createScene();
    
    // 创建敌人实体（火焰怪兽、红缎带军团士兵）
    this.createEnemies();
    
    // 创建牛魔王实体
    this.createOxKing();
    
    // 创建龙珠实体
    this.createDragonBall();
  }
  
  // 创建玩家实体
  private createPlayer(): void {
    const player = new Entity('goku');
    
    // 添加组件
    player.addComponent(new Transform({ x: 100, y: 450 }));
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
    ground.addComponent(new Collider(ColliderType.BOX, { width: 1500, height: 50 }));
    ground.addComponent(new Drawable(DrawType.CANVAS, 'ground', 0));
    this.addEntity(ground);
    
    // 创建火山岩石
    for (let i = 0; i < 8; i++) {
      const x = 150 + i * 180;
      const y = 500;
      this.createVolcanicRock(x, y);
    }
    
    // 创建熔岩池
    for (let i = 0; i < 5; i++) {
      const x = 200 + i * 250;
      const y = 530;
      this.createLavaPool(x, y, i);
    }
    
    // 创建火山平台
    for (let i = 0; i < 3; i++) {
      const x = 300 + i * 400;
      const y = 400 - i * 50;
      this.createVolcanicPlatform(x, y);
    }
    
    // 创建火焰柱
    for (let i = 0; i < 4; i++) {
      const x = 250 + i * 350;
      const y = 450;
      this.createFirePillar(x, y);
    }
  }
  
  // 创建火山岩石实体
  private createVolcanicRock(x: number, y: number): void {
    const rock = new Entity(`volcanic-rock-${Math.random()}`);
    rock.addComponent(new Transform({ x, y }));
    rock.addComponent(new Collider(ColliderType.BOX, { width: 50, height: 50 }));
    rock.addComponent(new Drawable(DrawType.CANVAS, 'volcanic-rock', 0));
    this.addEntity(rock);
  }
  
  // 创建熔岩池实体
  private createLavaPool(x: number, y: number, index: number): void {
    const lavaPool = new Entity(`lava-pool-${index}`);
    lavaPool.addComponent(new Transform({ x, y }));
    lavaPool.addComponent(new Collider(ColliderType.BOX, { width: 100, height: 20 }));
    lavaPool.addComponent(new Drawable(DrawType.CANVAS, 'lava-pool', 0));
    this.addEntity(lavaPool);
  }
  
  // 创建火山平台实体
  private createVolcanicPlatform(x: number, y: number): void {
    const platform = new Entity(`volcanic-platform-${Math.random()}`);
    platform.addComponent(new Transform({ x, y }));
    platform.addComponent(new Collider(ColliderType.BOX, { width: 150, height: 20 }));
    platform.addComponent(new Drawable(DrawType.CANVAS, 'volcanic-platform', 0));
    this.addEntity(platform);
  }
  
  // 创建火焰柱实体
  private createFirePillar(x: number, y: number): void {
    const firePillar = new Entity(`fire-pillar-${Math.random()}`);
    firePillar.addComponent(new Transform({ x, y }));
    firePillar.addComponent(new Collider(ColliderType.BOX, { width: 30, height: 80 }));
    firePillar.addComponent(new Drawable(DrawType.CANVAS, 'fire-pillar', 1));
    this.addEntity(firePillar);
  }
  
  // 创建敌人实体
  private createEnemies(): void {
    // 创建火焰怪兽
    for (let i = 0; i < 3; i++) {
      const x = 400 + i * 300;
      const y = 450;
      this.createFireMonster(x, y);
    }
    
    // 创建红缎带军团士兵
    for (let i = 0; i < 4; i++) {
      const x = 500 + i * 250;
      const y = 450;
      this.createRedRibbonSoldier(x, y);
    }
  }
  
  // 创建火焰怪兽实体
  private createFireMonster(x: number, y: number): void {
    const fireMonster = new Entity(`fire-monster-${Math.random()}`);
    fireMonster.addComponent(new Transform({ x, y }));
    fireMonster.addComponent(new Sprite('fire-monster', 70, 80));
    fireMonster.addComponent(new Collider(ColliderType.BOX, { width: 70, height: 80 }));
    fireMonster.addComponent(new Controller(ControllerType.AI));
    fireMonster.addComponent(new Health(70));
    fireMonster.addComponent(new Animation('burn', 1, 6));
    fireMonster.addComponent(new Drawable(DrawType.CANVAS, 'fire-monster', 1));
    this.addEntity(fireMonster);
  }
  
  // 创建红缎带军团士兵实体
  private createRedRibbonSoldier(x: number, y: number): void {
    const soldier = new Entity(`red-ribbon-soldier-${Math.random()}`);
    soldier.addComponent(new Transform({ x, y }));
    soldier.addComponent(new Sprite('red-ribbon-soldier', 60, 90));
    soldier.addComponent(new Collider(ColliderType.BOX, { width: 60, height: 90 }));
    soldier.addComponent(new Controller(ControllerType.AI));
    soldier.addComponent(new Health(50));
    soldier.addComponent(new Animation('idle', 1, 4));
    soldier.addComponent(new Drawable(DrawType.CANVAS, 'red-ribbon-soldier', 1));
    this.addEntity(soldier);
  }
  
  // 创建牛魔王实体
  private createOxKing(): void {
    const oxKing = new Entity('ox-king');
    oxKing.addComponent(new Transform({ x: 1200, y: 420 }));
    oxKing.addComponent(new Sprite('ox-king', 100, 120));
    oxKing.addComponent(new Collider(ColliderType.BOX, { width: 100, height: 120 }));
    oxKing.addComponent(new Controller(ControllerType.AI));
    oxKing.addComponent(new Health(120));
    oxKing.addComponent(new Animation('idle', 1, 4));
    oxKing.addComponent(new Drawable(DrawType.CANVAS, 'ox-king', 1));
    this.addEntity(oxKing);
  }
  
  // 创建龙珠实体
  private createDragonBall(): void {
    const dragonBall = new Entity('dragon-ball-3');
    dragonBall.addComponent(new Transform({ x: 1000, y: 350 }));
    dragonBall.addComponent(new Sprite('dragon-ball', 40, 40));
    dragonBall.addComponent(new Collider(ColliderType.CIRCLE, { radius: 20 }));
    dragonBall.addComponent(new Animation('spin', 1, 8)); // 旋转动画
    dragonBall.addComponent(new Drawable(DrawType.CANVAS, 'dragon-ball', 2)); // 优先级更高，显示在前面
    this.addEntity(dragonBall);
  }
  
  // 更新关卡
  update(deltaTime: number): void {
    // 更新熔岩陷阱
    this.updateLavaTraps(deltaTime);
    
    // 检查玩家是否找到龙珠
    this.checkDragonBallFound();
    
    // 检查是否遇到牛魔王
    this.checkOxKingEncounter();
  }
  
  // 更新熔岩陷阱
  private updateLavaTraps(deltaTime: number): void {
    this.lavaTraps.forEach((trap, index) => {
      trap.timer += deltaTime;
      
      // 每5秒切换一次熔岩陷阱状态
      if (trap.timer >= 5) {
        trap.active = !trap.active;
        trap.timer = 0;
        
        if (trap.active) {
          console.log(`熔岩陷阱 ${index + 1} 激活！`);
        } else {
          console.log(`熔岩陷阱 ${index + 1} 冷却！`);
        }
      }
    });
  }
  
  // 检查玩家是否找到龙珠
  private checkDragonBallFound(): void {
    if (this.dragonBallFound) return;
    
    // 获取玩家和龙珠实体
    const player = this.entities.find(e => e.name === 'goku');
    const dragonBall = this.entities.find(e => e.name === 'dragon-ball-3');
    
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
      console.log('恭喜！你找到了第三颗龙珠！');
      
      // 检查是否遇到了牛魔王，如果都完成则关卡完成
      if (this.metOxKing) {
        this.completed = true;
      }
    }
  }
  
  // 检查是否遇到牛魔王
  private checkOxKingEncounter(): void {
    if (this.metOxKing) return;
    
    // 获取玩家和牛魔王实体
    const player = this.entities.find(e => e.name === 'goku');
    const oxKing = this.entities.find(e => e.name === 'ox-king');
    
    if (!player || !oxKing) return;
    
    const playerTransform = player.getComponent<Transform>('transform');
    const oxKingTransform = oxKing.getComponent<Transform>('transform');
    
    if (!playerTransform || !oxKingTransform) return;
    
    // 检查距离，小于120像素则触发遇到牛魔王事件
    const dx = playerTransform.position.x - oxKingTransform.position.x;
    const dy = playerTransform.position.y - oxKingTransform.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 120) {
      this.metOxKing = true;
      console.log('你遇到了牛魔王！他看起来非常愤怒！');
      
      // 检查是否找到了龙珠，如果都完成则关卡完成
      if (this.dragonBallFound) {
        this.completed = true;
      }
    }
  }
  
  // 检查关卡是否完成
  isComplete(): boolean {
    return this.completed;
  }
  
  // 获取熔岩陷阱状态
  getLavaTrapActive(index: number): boolean {
    return this.lavaTraps[index]?.active || false;
  }
}