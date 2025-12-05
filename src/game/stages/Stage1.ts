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

// 第一个关卡：悟空遇布玛
export class Stage1 extends Stage {
  // 关卡是否完成
  private completed: boolean = false;
  
  // 对话状态
  private dialogueState: number = 0;
  
  // 构造函数
  constructor(world: World) {
    super(
      'stage1',
      '悟空遇布玛 - 教学关卡',
      world
    );
  }
  
  // 初始化关卡
  init(): void {
    // 创建玩家实体（悟空）
    this.createPlayer();
    
    // 创建NPC实体（布玛）
    this.createBulma();
    
    // 创建场景实体（可选，例如地面、障碍物等）
    this.createScene();
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
  
  // 创建布玛实体
  private createBulma(): void {
    const bulma = new Entity('bulma');
    
    // 添加组件
    bulma.addComponent(new Transform({ x: 600, y: 400 }));
    bulma.addComponent(new Sprite('bulma', 64, 96));
    bulma.addComponent(new Collider(ColliderType.BOX, { width: 64, height: 96 }));
    bulma.addComponent(new Controller(ControllerType.NONE));
    bulma.addComponent(new Health(50));
    bulma.addComponent(new Animation('idle', 1, 4));
    bulma.addComponent(new Drawable(DrawType.CANVAS, 'bulma', 1));
    
    this.addEntity(bulma);
  }
  
  // 创建场景实体
  private createScene(): void {
    // 这里可以添加地面、障碍物等场景实体
    // 例如：创建一个地面实体
    const ground = new Entity('ground');
    ground.addComponent(new Transform({ x: 0, y: 550 }));
    ground.addComponent(new Collider(ColliderType.BOX, { width: 800, height: 50 }));
    ground.addComponent(new Drawable(DrawType.CANVAS, 'ground', 0));
    this.addEntity(ground);
  }
  
  // 更新关卡
  update(deltaTime: number): void {
    // 检查玩家是否与布玛相遇
    this.checkPlayerBulmaEncounter();
    
    // 更新对话状态
    this.updateDialogue();
  }
  
  // 检查玩家是否与布玛相遇
  private checkPlayerBulmaEncounter(): void {
    // 获取玩家和布玛实体
    const player = this.entities.find(e => e.name === 'goku');
    const bulma = this.entities.find(e => e.name === 'bulma');
    
    if (!player || !bulma) {
      return;
    }
    
    const playerTransform = player.getComponent<Transform>('transform');
    const bulmaTransform = bulma.getComponent<Transform>('transform');
    
    if (!playerTransform || !bulmaTransform) {
      return;
    }
    
    // 检查距离，小于100像素则触发相遇事件
    const distance = Math.abs(playerTransform.position.x - bulmaTransform.position.x);
    if (distance < 100 && this.dialogueState === 0) {
      this.dialogueState = 1; // 开始对话
    }
  }
  
  // 更新对话状态
  private updateDialogue(): void {
    // 根据对话状态执行不同的逻辑
    switch (this.dialogueState) {
      case 1:
        // 显示悟空的对话
        console.log('悟空: 你是谁？为什么来包子山？');
        this.dialogueState = 2;
        break;
      case 2:
        // 显示布玛的对话
        console.log('布玛: 我是布玛，来找龙珠的！你知道龙珠在哪里吗？');
        this.dialogueState = 3;
        break;
      case 3:
        // 显示悟空的对话
        console.log('悟空: 龙珠？我家里有一颗四星龙珠！');
        this.dialogueState = 4;
        break;
      case 4:
        // 显示布玛的对话
        console.log('布玛: 真的吗？太好了！我们一起去找其他龙珠吧！');
        this.dialogueState = 5;
        break;
      case 5:
        // 对话结束，关卡完成
        console.log('关卡完成！悟空和布玛一起踏上了寻找龙珠的旅程！');
        this.completed = true;
        break;
    }
  }
  
  // 检查关卡是否完成
  isComplete(): boolean {
    return this.completed;
  }
}
