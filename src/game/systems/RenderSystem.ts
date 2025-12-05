import { System } from '../../ecs/System';
import { Transform } from '../components/Transform';
import { Drawable } from '../components/Drawable';
import { CharacterDrawer } from '../drawing/CharacterDrawer';
import { SceneDrawer } from '../drawing/SceneDrawer';

// 渲染系统，负责将游戏实体绘制到屏幕上
export class RenderSystem extends System {
  // Canvas上下文
  private ctx: CanvasRenderingContext2D;
  
  // 画布尺寸
  private width: number;
  private height: number;
  
  // 绘制器
  private characterDrawer: CharacterDrawer;
  private sceneDrawer: SceneDrawer;
  
  // 构造函数
  constructor(
    world: any,
    ctx: CanvasRenderingContext2D,
    width: number,
    height: number
  ) {
    super(world, 'render');
    this.ctx = ctx;
    this.width = width;
    this.height = height;
    this.characterDrawer = new CharacterDrawer(ctx);
    this.sceneDrawer = new SceneDrawer(ctx);
  }
  
  // 更新渲染系统
  update(_deltaTime: number): void {
    // 清空画布
    this.ctx.clearRect(0, 0, this.width, this.height);
    
    // 绘制背景
    this.sceneDrawer.drawBackground(this.width, this.height);
    
    // 获取所有具有Transform和Drawable组件的实体
    const entities = this.world.getEntitiesWithComponents(['transform', 'drawable']);
    
    // 按zIndex排序实体
    entities.sort((a, b) => {
      const aDrawable = a.getComponent<Drawable>('drawable');
      const bDrawable = b.getComponent<Drawable>('drawable');
      return (aDrawable?.zIndex || 0) - (bDrawable?.zIndex || 0);
    });
    
    // 绘制每个实体
    entities.forEach(entity => {
      const transform = entity.getComponent<Transform>('transform');
      const drawable = entity.getComponent<Drawable>('drawable');
      
      if (!transform || !drawable || !drawable.visible) {
        return;
      }
      
      // 根据实体类型绘制
      const entityName = entity.name || '';
      if (entityName.includes('goku')) {
        this.characterDrawer.drawGoku(
          transform.position.x,
          transform.position.y,
          64,
          96,
          true // 默认朝右
        );
      } else if (entityName.includes('bulma')) {
        this.characterDrawer.drawBulma(
          transform.position.x,
          transform.position.y,
          64,
          96,
          false // 默认朝左
        );
      } else if (entityName.includes('beast')) {
        this.characterDrawer.drawEnemy(
          transform.position.x,
          transform.position.y,
          50,
          50,
          'beast',
          false // 默认朝左
        );
      } else if (entityName.includes('goon')) {
        this.characterDrawer.drawEnemy(
          transform.position.x,
          transform.position.y,
          60,
          80,
          'goon',
          false // 默认朝左
        );
      } else if (entityName.includes('dragon-ball')) {
        this.characterDrawer.drawDragonBall(
          transform.position.x,
          transform.position.y,
          40,
          40
        );
      } else if (entityName.includes('ground')) {
        this.sceneDrawer.drawGround(
          transform.position.x,
          transform.position.y,
          800,
          50
        );
      } else if (entityName.includes('tree')) {
        this.sceneDrawer.drawTree(
          transform.position.x,
          transform.position.y,
          60,
          120
        );
      } else if (entityName.includes('stone')) {
        this.sceneDrawer.drawStone(
          transform.position.x,
          transform.position.y,
          40,
          30
        );
      } else if (entityName.includes('platform')) {
        const width = entityName.includes('platform-') ? 150 : 120;
        this.sceneDrawer.drawPlatform(
          transform.position.x,
          transform.position.y,
          width,
          20
        );
      } else if (entityName.includes('enemy')) {
        this.characterDrawer.drawEnemy(
          transform.position.x,
          transform.position.y,
          64,
          96,
          'basic',
          false // 默认朝左
        );
      } else if (entityName.includes('boss')) {
        this.characterDrawer.drawEnemy(
          transform.position.x,
          transform.position.y,
          80,
          120,
          'boss',
          false // 默认朝左
        );
      }
    });
  }
  
  // 更新画布尺寸
  updateCanvasSize(width: number, height: number): void {
    this.width = width;
    this.height = height;
  }
}
