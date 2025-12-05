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

// 第六个关卡：红缎带军团总部
export class Stage6 extends Stage {
  // 关卡是否完成
  private completed: boolean = false;
  
  // 龙珠是否被找到
  private dragonBallsFound: number = 0;
  private totalDragonBalls: number = 3; // 此关卡有3颗龙珠
  
  // 是否遇到黑元帅
  private metBlackMamba: boolean = false;
  
  // 机关陷阱状态
  private traps: Array<{active: boolean, timer: number, type: 'laser' | 'missile' | 'electric'}> = [];
  
  // 构造函数
  constructor(world: World) {
    super(
      'stage6',
      '红缎带军团总部 - 寻找剩余龙珠',
      world
    );
    
    // 初始化机关陷阱状态
    this.traps = Array(8).fill(null).map((_, index) => ({
      active: false,
      timer: 0,
      type: index % 3 === 0 ? 'laser' : index % 3 === 1 ? 'missile' : 'electric'
    }));
  }
  
  // 初始化关卡
  init(): void {
    // 创建玩家实体（悟空）
    this.createPlayer();
    
    // 创建场景实体（基地设施、机关、控制台等）
    this.createScene();
    
    // 创建敌人实体（红缎带士兵、机甲战士）
    this.createEnemies();
    
    // 创建黑元帅实体
    this.createBlackMamba();
    
    // 创建龙珠实体
    this.createDragonBalls();
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
    // 创建基地地面
    this.createBaseFloor();
    
    // 创建基地墙壁
    this.createBaseWalls();
    
    // 创建基地设施（控制台、门、升降台等）
    this.createBaseFacilities();
    
    // 创建机关陷阱
    this.createTraps();
  }
  
  // 创建基地地面
  private createBaseFloor(): void {
    const floor = new Entity('base-floor');
    floor.addComponent(new Transform({ x: 750, y: 550 }));
    floor.addComponent(new Collider(ColliderType.BOX, { width: 1500, height: 50 }));
    floor.addComponent(new Drawable(DrawType.CANVAS, 'base-floor', 0));
    this.addEntity(floor);
  }
  
  // 创建基地墙壁
  private createBaseWalls(): void {
    // 创建左侧墙壁
    const leftWall = new Entity('left-wall');
    leftWall.addComponent(new Transform({ x: 20, y: 300 }));
    leftWall.addComponent(new Collider(ColliderType.BOX, { width: 40, height: 600 }));
    leftWall.addComponent(new Drawable(DrawType.CANVAS, 'base-wall', 0));
    this.addEntity(leftWall);
    
    // 创建右侧墙壁
    const rightWall = new Entity('right-wall');
    rightWall.addComponent(new Transform({ x: 1480, y: 300 }));
    rightWall.addComponent(new Collider(ColliderType.BOX, { width: 40, height: 600 }));
    rightWall.addComponent(new Drawable(DrawType.CANVAS, 'base-wall', 0));
    this.addEntity(rightWall);
    
    // 创建顶部墙壁
    const topWall = new Entity('top-wall');
    topWall.addComponent(new Transform({ x: 750, y: 20 }));
    topWall.addComponent(new Collider(ColliderType.BOX, { width: 1500, height: 40 }));
    topWall.addComponent(new Drawable(DrawType.CANVAS, 'base-wall', 0));
    this.addEntity(topWall);
  }
  
  // 创建基地设施
  private createBaseFacilities(): void {
    // 创建控制台
    for (let i = 0; i < 5; i++) {
      const x = 200 + i * 250;
      const y = 500;
      this.createConsole(x, y);
    }
    
    // 创建门
    for (let i = 0; i < 3; i++) {
      const x = 350 + i * 400;
      const y = 450;
      this.createDoor(x, y);
    }
    
    // 创建升降台
    for (let i = 0; i < 2; i++) {
      const x = 500 + i * 500;
      const y = 480;
      this.createLift(x, y);
    }
  }
  
  // 创建控制台实体
  private createConsole(x: number, y: number): void {
    const console = new Entity(`console-${Math.random()}`);
    console.addComponent(new Transform({ x, y }));
    console.addComponent(new Collider(ColliderType.BOX, { width: 60, height: 40 }));
    console.addComponent(new Drawable(DrawType.CANVAS, 'base-console', 0));
    this.addEntity(console);
  }
  
  // 创建门实体
  private createDoor(x: number, y: number): void {
    const door = new Entity(`door-${Math.random()}`);
    door.addComponent(new Transform({ x, y }));
    door.addComponent(new Collider(ColliderType.BOX, { width: 80, height: 120 }));
    door.addComponent(new Drawable(DrawType.CANVAS, 'base-door', 0));
    this.addEntity(door);
  }
  
  // 创建升降台实体
  private createLift(x: number, y: number): void {
    const lift = new Entity(`lift-${Math.random()}`);
    lift.addComponent(new Transform({ x, y }));
    lift.addComponent(new Collider(ColliderType.BOX, { width: 100, height: 20 }));
    lift.addComponent(new Drawable(DrawType.CANVAS, 'base-lift', 0));
    this.addEntity(lift);
  }
  
  // 创建机关陷阱
  private createTraps(): void {
    this.traps.forEach((trap, index) => {
      const x = 150 + index * 170;
      const y = 300 + (index % 2) * 100;
      this.createTrap(x, y, trap.type, index);
    });
  }
  
  // 创建陷阱实体
  private createTrap(x: number, y: number, type: 'laser' | 'missile' | 'electric', index: number): void {
    const trap = new Entity(`trap-${type}-${index}`);
    trap.addComponent(new Transform({ x, y }));
    trap.addComponent(new Collider(ColliderType.BOX, { width: 40, height: 40 }));
    trap.addComponent(new Drawable(DrawType.CANVAS, `trap-${type}`, 1));
    this.addEntity(trap);
  }
  
  // 创建敌人实体
  private createEnemies(): void {
    // 创建红缎带士兵
    for (let i = 0; i < 6; i++) {
      const x = 300 + i * 200;
      const y = 450;
      this.createRedRibbonSoldier(x, y);
    }
    
    // 创建机甲战士
    for (let i = 0; i < 3; i++) {
      const x = 400 + i * 350;
      const y = 420;
      this.createMechWarrior(x, y);
    }
  }
  
  // 创建红缎带士兵实体
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
  
  // 创建机甲战士实体
  private createMechWarrior(x: number, y: number): void {
    const mech = new Entity(`mech-warrior-${Math.random()}`);
    mech.addComponent(new Transform({ x, y }));
    mech.addComponent(new Sprite('mech-warrior', 100, 120));
    mech.addComponent(new Collider(ColliderType.BOX, { width: 100, height: 120 }));
    mech.addComponent(new Controller(ControllerType.AI));
    mech.addComponent(new Health(150));
    mech.addComponent(new Animation('walk', 1, 6));
    mech.addComponent(new Drawable(DrawType.CANVAS, 'mech-warrior', 1));
    this.addEntity(mech);
  }
  
  // 创建黑元帅实体
  private createBlackMamba(): void {
    const blackMamba = new Entity('black-mamba');
    blackMamba.addComponent(new Transform({ x: 1200, y: 420 }));
    blackMamba.addComponent(new Sprite('black-mamba', 80, 100));
    blackMamba.addComponent(new Collider(ColliderType.BOX, { width: 80, height: 100 }));
    blackMamba.addComponent(new Controller(ControllerType.AI));
    blackMamba.addComponent(new Health(200));
    blackMamba.addComponent(new Animation('idle', 1, 4));
    blackMamba.addComponent(new Drawable(DrawType.CANVAS, 'black-mamba', 1));
    this.addEntity(blackMamba);
  }
  
  // 创建龙珠实体
  private createDragonBalls(): void {
    // 创建3颗龙珠
    for (let i = 0; i < this.totalDragonBalls; i++) {
      const x = 400 + i * 300;
      const y = 350 + (i % 2) * 100;
      this.createDragonBall(x, y, i + 5); // 第5-7颗龙珠
    }
  }
  
  // 创建龙珠实体
  private createDragonBall(x: number, y: number, number: number): void {
    const dragonBall = new Entity(`dragon-ball-${number}`);
    dragonBall.addComponent(new Transform({ x, y }));
    dragonBall.addComponent(new Sprite('dragon-ball', 40, 40));
    dragonBall.addComponent(new Collider(ColliderType.CIRCLE, { radius: 20 }));
    dragonBall.addComponent(new Animation('spin', 1, 8)); // 旋转动画
    dragonBall.addComponent(new Drawable(DrawType.CANVAS, 'dragon-ball', 2)); // 优先级更高，显示在前面
    this.addEntity(dragonBall);
  }
  
  // 更新关卡
  update(deltaTime: number): void {
    // 更新机关陷阱
    this.updateTraps(deltaTime);
    
    // 检查玩家是否找到龙珠
    this.checkDragonBallsFound();
    
    // 检查是否遇到黑元帅
    this.checkBlackMambaEncounter();
  }
  
  // 更新机关陷阱
  private updateTraps(deltaTime: number): void {
    this.traps.forEach((trap, index) => {
      trap.timer += deltaTime;
      
      // 不同类型的陷阱有不同的激活周期
      const cycle = trap.type === 'laser' ? 3 : trap.type === 'missile' ? 5 : 4;
      
      // 切换陷阱状态
      if (trap.timer >= cycle) {
        trap.active = !trap.active;
        trap.timer = 0;
        
        if (trap.active) {
          console.log(`${trap.type} trap ${index + 1} activated!`);
        } else {
          console.log(`${trap.type} trap ${index + 1} deactivated!`);
        }
      }
    });
  }
  
  // 检查玩家是否找到龙珠
  private checkDragonBallsFound(): void {
    const player = this.entities.find(e => e.name === 'goku');
    if (!player) return;
    
    const playerTransform = player.getComponent<Transform>('transform');
    if (!playerTransform) return;
    
    // 遍历所有龙珠，检查是否被找到
    this.entities.forEach(entity => {
      if (entity.name && entity.name.startsWith('dragon-ball-')) {
        const dragonBallTransform = entity.getComponent<Transform>('transform');
        if (!dragonBallTransform) return;
        
        // 检查距离，小于50像素则触发找到龙珠事件
        const dx = playerTransform.position.x - dragonBallTransform.position.x;
        const dy = playerTransform.position.y - dragonBallTransform.position.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 50) {
          // 标记龙珠为已找到（这里简化处理，实际项目中可以移除实体或添加标记）
          entity.name = `dragon-ball-found-${Math.random()}`; // 重命名实体，避免重复检测
          this.dragonBallsFound++;
          console.log(`恭喜！你找到了第${this.dragonBallsFound}颗龙珠！`);
          
          // 检查是否找到所有龙珠
          if (this.dragonBallsFound >= this.totalDragonBalls) {
            console.log('恭喜！你找到了所有龙珠！');
            // 检查是否遇到了黑元帅，如果都完成则关卡完成
            if (this.metBlackMamba) {
              this.completed = true;
            }
          }
        }
      }
    });
  }
  
  // 检查是否遇到黑元帅
  private checkBlackMambaEncounter(): void {
    if (this.metBlackMamba) return;
    
    // 获取玩家和黑元帅实体
    const player = this.entities.find(e => e.name === 'goku');
    const blackMamba = this.entities.find(e => e.name === 'black-mamba');
    
    if (!player || !blackMamba) return;
    
    const playerTransform = player.getComponent<Transform>('transform');
    const blackMambaTransform = blackMamba.getComponent<Transform>('transform');
    
    if (!playerTransform || !blackMambaTransform) return;
    
    // 检查距离，小于150像素则触发遇到黑元帅事件
    const dx = playerTransform.position.x - blackMambaTransform.position.x;
    const dy = playerTransform.position.y - blackMambaTransform.position.y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    
    if (distance < 150) {
      this.metBlackMamba = true;
      console.log('你遇到了黑元帅！准备战斗！');
      
      // 检查是否找到了所有龙珠，如果都完成则关卡完成
      if (this.dragonBallsFound >= this.totalDragonBalls) {
        this.completed = true;
      }
    }
  }
  
  // 检查关卡是否完成
  isComplete(): boolean {
    return this.completed;
  }
  
  // 获取陷阱状态
  getTrapActive(index: number): boolean {
    return this.traps[index]?.active || false;
  }
  
  // 获取陷阱类型
  getTrapType(index: number): 'laser' | 'missile' | 'electric' {
    return this.traps[index]?.type || 'laser';
  }
}