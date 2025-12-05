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

// 第三个关卡：沙漠之旅
export class Stage3 extends Stage {
  // 关卡是否完成
  private completed: boolean = false;
  
  // 龙珠是否被找到
  private dragonBallFound: boolean = false;
  
  // 是否遇到雅木茶
  private metYamcha: boolean = false;
  
  // 沙尘暴效果状态
  private sandstormActive: boolean = false;
  private sandstormTimer: number = 0;
  
  // 构造函数
  constructor(world: World) {
    super(
      'stage3',
      '沙漠之旅 - 寻找第二颗龙珠',
      world
    );
  }
  
  // 初始化关卡
  init(): void {
    // 创建玩家实体（悟空）
    this.createPlayer();
    
    // 创建场景实体（沙漠地形、沙丘等）
    this.createScene();
    
    // 创建敌人实体（沙漠土匪、沙虫）
    this.createEnemies();
    
    // 创建雅木茶实体
    this.createYamcha();
    
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
    
    // 创建沙丘
    for (let i = 0; i < 10; i++) {
      const x = 150 + i * 150;
      const y = 550 - Math.random() * 100;
      const width = 100 + Math.random() * 100;
      this.createDune(x, y, width);
    }
    
    // 创建仙人掌
    for (let i = 0; i < 8; i++) {
      const x = 200 + i * 180;
      const y = 500;
      this.createCactus(x, y);
    }
    
    // 创建岩石
    for (let i = 0; i < 5; i++) {
      const x = 250 + i * 200;
      const y = 520;
      this.createRock(x, y);
    }
  }
  
  // 创建沙丘实体
  private createDune(x: number, y: number, width: number): void {
    const dune = new Entity(`dune-${Math.random()}`);
    dune.addComponent(new Transform({ x, y }));
    dune.addComponent(new Collider(ColliderType.BOX, { width, height: 50 }));
    dune.addComponent(new Drawable(DrawType.CANVAS, 'dune', 0));
    this.addEntity(dune);
  }
  
  // 创建仙人掌实体
  private createCactus(x: number, y: number): void {
    const cactus = new Entity(`cactus-${Math.random()}`);
    cactus.addComponent(new Transform({ x, y }));
    cactus.addComponent(new Collider(ColliderType.BOX, { width: 30, height: 80 }));
    cactus.addComponent(new Drawable(DrawType.CANVAS, 'cactus', 0));
    this.addEntity(cactus);
  }
  
  // 创建岩石实体
  private createRock(x: number, y: number): void {
    const rock = new Entity(`rock-${Math.random()}`);
    rock.addComponent(new Transform({ x, y }));
    rock.addComponent(new Collider(ColliderType.BOX, { width: 40, height: 30 }));
    rock.addComponent(new Drawable(DrawType.CANVAS, 'rock', 0));
    this.addEntity(rock);
  }
  
  // 创建敌人实体
  private createEnemies(): void {
    // 创建沙漠土匪
    for (let i = 0; i < 4; i++) {
      const x = 400 + i * 250;
      const y = 450;
      this.createDesertBandit(x, y);
    }
    
    // 创建沙虫
    for (let i = 0; i < 2; i++) {
      const x = 500 + i * 300;
      const y = 520;
      this.createSandworm(x, y);
    }
  }
  
  // 创建沙漠土匪实体
  private createDesertBandit(x: number, y: number): void {
    const bandit = new Entity(`desert-bandit-${Math.random()}`);
    bandit.addComponent(new Transform({ x, y }));
    bandit.addComponent(new Sprite('desert-bandit', 60, 90));
    bandit.addComponent(new Collider(ColliderType.BOX, { width: 60, height: 90 }));
    bandit.addComponent(new Controller(ControllerType.AI));
    bandit.addComponent(new Health(50));
    bandit.addComponent(new Animation('idle', 1, 4));
    bandit.addComponent(new Drawable(DrawType.CANVAS, 'desert-bandit', 1));
    this.addEntity(bandit);
  }
  
  // 创建沙虫实体
  private createSandworm(x: number, y: number): void {
    const sandworm = new Entity(`sandworm-${Math.random()}`);
    sandworm.addComponent(new Transform({ x, y }));
    sandworm.addComponent(new Sprite('sandworm', 80, 40));
    sandworm.addComponent(new Collider(ColliderType.BOX, { width: 80, height: 40 }));
    sandworm.addComponent(new Controller(ControllerType.AI));
    sandworm.addComponent(new Health(60));
    sandworm.addComponent(new Animation('move', 1, 6));
    sandworm.addComponent(new Drawable(DrawType.CANVAS, 'sandworm', 1));
    this.addEntity(sandworm);
  }
  
  // 创建雅木茶实体
  private createYamcha(): void {
    const yamcha = new Entity('yamcha');
    yamcha.addComponent(new Transform({ x: 1200, y: 450 }));
    yamcha.addComponent(new Sprite('yamcha', 70, 100));
    yamcha.addComponent(new Collider(ColliderType.BOX, { width: 70, height: 100 }));
    yamcha.addComponent(new Controller(ControllerType.AI));
    yamcha.addComponent(new Health(80));
    yamcha.addComponent(new Animation('idle', 1, 4));
    yamcha.addComponent(new Drawable(DrawType.CANVAS, 'yamcha', 1));
    this.addEntity(yamcha);
  }
  
  // 创建龙珠实体
  private createDragonBall(): void {
    const dragonBall = new Entity('dragon-ball-2');
    dragonBall.addComponent(new Transform({ x: 1000, y: 400 }));
    dragonBall.addComponent(new Sprite('dragon-ball', 40, 40));
    dragonBall.addComponent(new Collider(ColliderType.CIRCLE, { radius: 20 }));
    dragonBall.addComponent(new Animation('spin', 1, 8)); // 旋转动画
    dragonBall.addComponent(new Drawable(DrawType.CANVAS, 'dragon-ball', 2)); // 优先级更高，显示在前面
    this.addEntity(dragonBall);
  }
  
  // 更新关卡
  update(deltaTime: number): void {
    // 更新沙尘暴效果
    this.updateSandstorm(deltaTime);
    
    // 检查玩家是否找到龙珠
    this.checkDragonBallFound();
    
    // 检查是否遇到雅木茶
    this.checkYamchaEncounter();
  }
  
  // 更新沙尘暴效果
  private updateSandstorm(deltaTime: number): void {
    this.sandstormTimer += deltaTime;
    
    // 每10秒切换一次沙尘暴状态
    if (this.sandstormTimer >= 10) {
      this.sandstormActive = !this.sandstormActive;
      this.sandstormTimer = 0;
      
      if (this.sandstormActive) {
        console.log('沙尘暴来了！视野变差！');
      } else {
        console.log('沙尘暴过去了！视野恢复！');
      }
    }
  }
  
  // 检查玩家是否找到龙珠
  private checkDragonBallFound(): void {
    if (this.dragonBallFound) return;
    
    // 获取玩家和龙珠实体
    const player = this.entities.find(e => e.name === 'goku');
    const dragonBall = this.entities.find(e => e.name === 'dragon-ball-2');
    
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
      console.log('恭喜！你找到了第二颗龙珠！');
      
      // 检查是否遇到了雅木茶，如果都完成则关卡完成
      if (this.metYamcha) {
        this.completed = true;
      }
    }
  }
  
  // 检查是否遇到雅木茶
  private checkYamchaEncounter(): void {
    if (this.metYamcha) return;
    
    // 获取玩家和雅木茶实体
    const player = this.entities.find(e => e.name === 'goku');
    const yamcha = this.entities.find(e => e.name === 'yamcha');
    
    if (!player || !yamcha) return;
    
    const playerTransform = player.getComponent<Transform>('transform');
    const yamchaTransform = yamcha.getComponent<Transform>('transform');
    
    if (!playerTransform || !yamchaTransform) return;
    
    // 检查距离，小于100像素则触发遇到雅木茶事件
    const dx = playerTransform.position.x - yamchaTransform.position.x;
    const dy = playerTransform.position.y - yamchaTransform.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 100) {
      this.metYamcha = true;
      console.log('你遇到了雅木茶！他看起来很强！');
      
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
  
  // 获取沙尘暴状态
  getSandstormActive(): boolean {
    return this.sandstormActive;
  }
}