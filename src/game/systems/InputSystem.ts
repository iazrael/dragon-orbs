import { System } from '../../ecs/System';
import { Controller } from '../components/Controller';

// 输入系统，负责处理游戏输入
export class InputSystem extends System {
  // 键盘按键状态映射
  private keys: Map<string, boolean> = new Map();
  
  // 构造函数
  constructor(world: any) {
    super(world, 'input');
    
    // 初始化按键状态
    this.initKeyListeners();
  }
  
  // 初始化键盘监听器
  private initKeyListeners(): void {
    // 按键按下事件
    window.addEventListener('keydown', (e) => {
      this.keys.set(e.key.toLowerCase(), true);
    });
    
    // 按键释放事件
    window.addEventListener('keyup', (e) => {
      this.keys.set(e.key.toLowerCase(), false);
    });
  }
  
  // 更新输入系统
  update(deltaTime: number): void {
    // 获取所有具有Controller组件的实体
    const entities = this.world.getEntitiesWithComponents(['controller']);
    
    // 更新每个实体的输入状态
    entities.forEach(entity => {
      const controller = entity.getComponent<Controller>('controller');
      
      if (!controller || controller.controllerType !== 'player') {
        return;
      }
      
      // 更新输入状态
      controller.inputs.up = this.keys.get('w') || this.keys.get('arrowup') || false;
      controller.inputs.down = this.keys.get('s') || this.keys.get('arrowdown') || false;
      controller.inputs.left = this.keys.get('a') || this.keys.get('arrowleft') || false;
      controller.inputs.right = this.keys.get('d') || this.keys.get('arrowright') || false;
      controller.inputs.attack = this.keys.get('j') || this.keys.get('z') || false;
      controller.inputs.jump = this.keys.get('k') || this.keys.get('x') || false;
      controller.inputs.skill = this.keys.get('l') || this.keys.get('c') || false;
    });
  }
  
  // 销毁输入系统
  destroy(): void {
    // 移除键盘监听器
    window.removeEventListener('keydown', () => {});
    window.removeEventListener('keyup', () => {});
  }
}
