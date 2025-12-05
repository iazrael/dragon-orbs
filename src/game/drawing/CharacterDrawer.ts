// 角色绘制器，用于绘制游戏角色

export class CharacterDrawer {
  // 绘制上下文
  private ctx: CanvasRenderingContext2D;
  
  // 构造函数
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }
  
  // 绘制悟空
  drawGoku(x: number, y: number, width: number, height: number, facingRight: boolean = true): void {
    // 保存上下文状态
    this.ctx.save();
    
    // 设置绘制位置和翻转
    this.ctx.translate(x, y);
    if (!facingRight) {
      this.ctx.scale(-1, 1);
      this.ctx.translate(-width, 0);
    }
    
    // 绘制悟空的身体
    this.ctx.fillStyle = '#FF6B6B';
    this.ctx.fillRect(0, height * 0.4, width, height * 0.6);
    
    // 绘制悟空的头
    this.ctx.fillStyle = '#FFD93D';
    this.ctx.beginPath();
    this.ctx.arc(width / 2, height * 0.3, width * 0.3, 0, Math.PI * 2);
    this.ctx.fill();
    
    // 绘制悟空的眼睛
    this.ctx.fillStyle = '#333';
    this.ctx.beginPath();
    this.ctx.arc(width * 0.4, height * 0.25, width * 0.05, 0, Math.PI * 2);
    this.ctx.arc(width * 0.6, height * 0.25, width * 0.05, 0, Math.PI * 2);
    this.ctx.fill();
    
    // 绘制悟空的头发
    this.ctx.fillStyle = '#000';
    this.ctx.beginPath();
    this.ctx.moveTo(width * 0.1, height * 0.1);
    this.ctx.lineTo(width * 0.2, height * 0.05);
    this.ctx.lineTo(width * 0.3, height * 0.1);
    this.ctx.lineTo(width * 0.4, height * 0.05);
    this.ctx.lineTo(width * 0.5, height * 0.1);
    this.ctx.lineTo(width * 0.6, height * 0.05);
    this.ctx.lineTo(width * 0.7, height * 0.1);
    this.ctx.lineTo(width * 0.8, height * 0.05);
    this.ctx.lineTo(width * 0.9, height * 0.1);
    this.ctx.lineTo(width * 0.9, height * 0.2);
    this.ctx.lineTo(width * 0.1, height * 0.2);
    this.ctx.closePath();
    this.ctx.fill();
    
    // 绘制悟空的尾巴
    this.ctx.fillStyle = '#8B4513';
    this.ctx.beginPath();
    this.ctx.moveTo(width * 0.8, height * 0.7);
    this.ctx.lineTo(width * 1.1, height * 0.9);
    this.ctx.lineTo(width * 1.05, height * 0.95);
    this.ctx.lineTo(width * 0.75, height * 0.75);
    this.ctx.closePath();
    this.ctx.fill();
    
    // 恢复上下文状态
    this.ctx.restore();
  }
  
  // 绘制布玛
  drawBulma(x: number, y: number, width: number, height: number, facingRight: boolean = true): void {
    // 保存上下文状态
    this.ctx.save();
    
    // 设置绘制位置和翻转
    this.ctx.translate(x, y);
    if (!facingRight) {
      this.ctx.scale(-1, 1);
      this.ctx.translate(-width, 0);
    }
    
    // 绘制布玛的身体
    this.ctx.fillStyle = '#4ECDC4';
    this.ctx.fillRect(0, height * 0.4, width, height * 0.6);
    
    // 绘制布玛的头
    this.ctx.fillStyle = '#FFD93D';
    this.ctx.beginPath();
    this.ctx.arc(width / 2, height * 0.3, width * 0.3, 0, Math.PI * 2);
    this.ctx.fill();
    
    // 绘制布玛的眼睛
    this.ctx.fillStyle = '#333';
    this.ctx.beginPath();
    this.ctx.arc(width * 0.4, height * 0.25, width * 0.05, 0, Math.PI * 2);
    this.ctx.arc(width * 0.6, height * 0.25, width * 0.05, 0, Math.PI * 2);
    this.ctx.fill();
    
    // 绘制布玛的头发
    this.ctx.fillStyle = '#FF69B4';
    this.ctx.fillRect(width * 0.1, height * 0.1, width * 0.8, height * 0.2);
    
    // 绘制布玛的辫子
    this.ctx.beginPath();
    this.ctx.moveTo(width * 0.15, height * 0.1);
    this.ctx.lineTo(width * 0.1, height * 0.5);
    this.ctx.lineTo(width * 0.2, height * 0.5);
    this.ctx.closePath();
    this.ctx.fill();
    
    this.ctx.beginPath();
    this.ctx.moveTo(width * 0.85, height * 0.1);
    this.ctx.lineTo(width * 0.8, height * 0.5);
    this.ctx.lineTo(width * 0.9, height * 0.5);
    this.ctx.closePath();
    this.ctx.fill();
    
    // 恢复上下文状态
    this.ctx.restore();
  }
  
  // 绘制敌人
  drawEnemy(x: number, y: number, width: number, height: number, enemyType: string = 'basic', facingRight: boolean = true): void {
    // 保存上下文状态
    this.ctx.save();
    
    // 设置绘制位置和翻转
    this.ctx.translate(x, y);
    if (!facingRight) {
      this.ctx.scale(-1, 1);
      this.ctx.translate(-width, 0);
    }
    
    // 根据敌人类型绘制不同的敌人
    switch (enemyType) {
      case 'basic':
        // 绘制基本敌人
        this.ctx.fillStyle = '#8B0000';
        this.ctx.fillRect(0, height * 0.4, width, height * 0.6);
        
        this.ctx.fillStyle = '#FFA07A';
        this.ctx.beginPath();
        this.ctx.arc(width / 2, height * 0.3, width * 0.3, 0, Math.PI * 2);
        this.ctx.fill();
        break;
        
      case 'boss':
        // 绘制BOSS敌人
        this.ctx.fillStyle = '#6A0572';
        this.ctx.fillRect(0, height * 0.3, width, height * 0.7);
        
        this.ctx.fillStyle = '#FF6584';
        this.ctx.beginPath();
        this.ctx.arc(width / 2, height * 0.25, width * 0.35, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 绘制BOSS的角
        this.ctx.fillStyle = '#FFD700';
        this.ctx.beginPath();
        this.ctx.moveTo(width * 0.2, height * 0.1);
        this.ctx.lineTo(width * 0.1, height * -0.1);
        this.ctx.lineTo(width * 0.3, height * 0.05);
        this.ctx.closePath();
        this.ctx.fill();
        
        this.ctx.beginPath();
        this.ctx.moveTo(width * 0.8, height * 0.1);
        this.ctx.lineTo(width * 0.9, height * -0.1);
        this.ctx.lineTo(width * 0.7, height * 0.05);
        this.ctx.closePath();
        this.ctx.fill();
        break;
        
      case 'beast':
        // 绘制野兽敌人
        this.ctx.fillStyle = '#8B4513';
        this.ctx.fillRect(0, height * 0.4, width, height * 0.6);
        
        this.ctx.fillStyle = '#A0522D';
        this.ctx.beginPath();
        this.ctx.arc(width / 2, height * 0.3, width * 0.3, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 绘制野兽的眼睛
        this.ctx.fillStyle = '#333';
        this.ctx.beginPath();
        this.ctx.arc(width * 0.4, height * 0.25, width * 0.08, 0, Math.PI * 2);
        this.ctx.arc(width * 0.6, height * 0.25, width * 0.08, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 绘制野兽的牙齿
        this.ctx.fillStyle = '#FFF';
        this.ctx.fillRect(width * 0.4, height * 0.35, width * 0.05, height * 0.05);
        this.ctx.fillRect(width * 0.55, height * 0.35, width * 0.05, height * 0.05);
        break;
        
      case 'goon':
        // 绘制小喽啰敌人
        this.ctx.fillStyle = '#2F4F4F';
        this.ctx.fillRect(0, height * 0.4, width, height * 0.6);
        
        this.ctx.fillStyle = '#FFDAB9';
        this.ctx.beginPath();
        this.ctx.arc(width / 2, height * 0.3, width * 0.3, 0, Math.PI * 2);
        this.ctx.fill();
        
        // 绘制小喽啰的头巾
        this.ctx.fillStyle = '#DC143C';
        this.ctx.fillRect(width * 0.1, height * 0.15, width * 0.8, height * 0.1);
        this.ctx.fillRect(width * 0.4, height * 0.05, width * 0.2, height * 0.1);
        break;
    }
    
    // 恢复上下文状态
    this.ctx.restore();
  }
  
  // 绘制龙珠
  drawDragonBall(x: number, y: number, width: number, height: number): void {
    // 保存上下文状态
    this.ctx.save();
    
    // 设置绘制位置
    this.ctx.translate(x, y);
    
    // 绘制龙珠的金色外壳
    this.ctx.fillStyle = '#FFD700';
    this.ctx.beginPath();
    this.ctx.arc(width / 2, height / 2, width / 2, 0, Math.PI * 2);
    this.ctx.fill();
    
    // 绘制龙珠的高光
    this.ctx.fillStyle = '#FFF';
    this.ctx.beginPath();
    this.ctx.arc(width * 0.3, height * 0.3, width * 0.1, 0, Math.PI * 2);
    this.ctx.fill();
    
    // 绘制龙珠的星星
    this.ctx.fillStyle = '#FF0000';
    this.ctx.beginPath();
    // 绘制四星龙珠的星星
    this.ctx.moveTo(width / 2, height * 0.2);
    this.ctx.lineTo(width * 0.55, height * 0.4);
    this.ctx.lineTo(width * 0.7, height * 0.45);
    this.ctx.lineTo(width * 0.6, height * 0.6);
    this.ctx.lineTo(width * 0.65, height * 0.75);
    this.ctx.lineTo(width * 0.5, height * 0.7);
    this.ctx.lineTo(width * 0.35, height * 0.75);
    this.ctx.lineTo(width * 0.4, height * 0.6);
    this.ctx.lineTo(width * 0.3, height * 0.45);
    this.ctx.lineTo(width * 0.45, height * 0.4);
    this.ctx.closePath();
    this.ctx.fill();
    
    // 恢复上下文状态
    this.ctx.restore();
  }
}
