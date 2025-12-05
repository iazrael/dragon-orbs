// 场景绘制器，用于绘制游戏场景

export class SceneDrawer {
  // 绘制上下文
  private ctx: CanvasRenderingContext2D;
  
  // 构造函数
  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx;
  }
  
  // 绘制背景
  drawBackground(width: number, height: number, stageType: string = 'forest'): void {
    // 根据场景类型绘制不同的背景
    switch (stageType) {
      case 'forest':
        this.drawForestBackground(width, height);
        break;
      case 'desert':
        this.drawDesertBackground(width, height);
        break;
      case 'volcano':
        this.drawVolcanoBackground(width, height);
        break;
      case 'underwater':
        this.drawUnderwaterBackground(width, height);
        break;
      case 'arena':
        this.drawArenaBackground(width, height);
        break;
      default:
        this.drawForestBackground(width, height);
    }
  }
  
  // 绘制森林背景
  private drawForestBackground(width: number, height: number): void {
    // 绘制天空
    this.ctx.fillStyle = '#87CEEB';
    this.ctx.fillRect(0, 0, width, height * 0.7);
    
    // 绘制草地
    this.ctx.fillStyle = '#32CD32';
    this.ctx.fillRect(0, height * 0.7, width, height * 0.3);
    
    // 绘制云朵
    this.ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height * 0.3;
      this.drawCloud(x, y, 50 + Math.random() * 50);
    }
    
    // 绘制树木
    for (let i = 0; i < 8; i++) {
      const x = Math.random() * width;
      const y = height * 0.7;
      const size = 30 + Math.random() * 40;
      this.drawTree(x, y, size, size * 2);
    }
  }
  
  // 绘制沙漠背景
  private drawDesertBackground(width: number, height: number): void {
    // 绘制天空
    this.ctx.fillStyle = '#FDB813';
    this.ctx.fillRect(0, 0, width, height * 0.5);
    
    // 绘制沙漠
    this.ctx.fillStyle = '#F4A460';
    this.ctx.fillRect(0, height * 0.5, width, height * 0.5);
    
    // 绘制沙丘
    this.ctx.fillStyle = '#DEB887';
    for (let i = 0; i < 10; i++) {
      const x = Math.random() * width;
      const y = height * 0.5 + Math.random() * height * 0.3;
      const size = 40 + Math.random() * 60;
      this.ctx.beginPath();
      this.ctx.arc(x, y, size, Math.PI, Math.PI * 2);
      this.ctx.fill();
    }
  }
  
  // 绘制火山背景
  private drawVolcanoBackground(width: number, height: number): void {
    // 绘制天空
    this.ctx.fillStyle = '#8B0000';
    this.ctx.fillRect(0, 0, width, height * 0.6);
    
    // 绘制火山地面
    this.ctx.fillStyle = '#696969';
    this.ctx.fillRect(0, height * 0.6, width, height * 0.4);
    
    // 绘制火山
    this.ctx.fillStyle = '#555555';
    this.ctx.beginPath();
    this.ctx.moveTo(width * 0.3, height * 0.6);
    this.ctx.lineTo(width * 0.5, height * 0.2);
    this.ctx.lineTo(width * 0.7, height * 0.6);
    this.ctx.closePath();
    this.ctx.fill();
    
    // 绘制熔岩
    this.ctx.fillStyle = '#FF4500';
    this.ctx.beginPath();
    this.ctx.arc(width * 0.5, height * 0.2, 30, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  // 绘制水下背景
  private drawUnderwaterBackground(width: number, height: number): void {
    // 绘制水
    this.ctx.fillStyle = '#1E90FF';
    this.ctx.fillRect(0, 0, width, height);
    
    // 绘制气泡
    this.ctx.fillStyle = '#FFFFFF';
    for (let i = 0; i < 20; i++) {
      const x = Math.random() * width;
      const y = Math.random() * height;
      const size = 5 + Math.random() * 15;
      this.ctx.beginPath();
      this.ctx.arc(x, y, size, 0, Math.PI * 2);
      this.ctx.globalAlpha = 0.5;
      this.ctx.fill();
      this.ctx.globalAlpha = 1;
    }
    
    // 绘制珊瑚
    for (let i = 0; i < 5; i++) {
      const x = Math.random() * width;
      const y = height * 0.7;
      this.drawCoral(x, y, 30 + Math.random() * 40);
    }
  }
  
  // 绘制竞技场背景
  private drawArenaBackground(width: number, height: number): void {
    // 绘制天空
    this.ctx.fillStyle = '#4682B4';
    this.ctx.fillRect(0, 0, width, height * 0.7);
    
    // 绘制观众席
    this.ctx.fillStyle = '#8B4513';
    this.ctx.fillRect(0, height * 0.7, width, height * 0.1);
    
    // 绘制擂台
    this.ctx.fillStyle = '#D2B48C';
    this.ctx.fillRect(width * 0.2, height * 0.5, width * 0.6, height * 0.3);
    
    // 绘制擂台边框
    this.ctx.strokeStyle = '#8B0000';
    this.ctx.lineWidth = 4;
    this.ctx.strokeRect(width * 0.2, height * 0.5, width * 0.6, height * 0.3);
  }
  
  // 绘制云朵
  private drawCloud(x: number, y: number, size: number): void {
    this.ctx.beginPath();
    this.ctx.arc(x, y, size * 0.4, 0, Math.PI * 2);
    this.ctx.arc(x + size * 0.3, y, size * 0.5, 0, Math.PI * 2);
    this.ctx.arc(x + size * 0.6, y, size * 0.4, 0, Math.PI * 2);
    this.ctx.fill();
  }
  

  
  // 绘制珊瑚
  private drawCoral(x: number, y: number, size: number): void {
    this.ctx.fillStyle = '#FF69B4';
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.lineTo(x - size * 0.3, y - size * 0.8);
    this.ctx.lineTo(x, y - size * 0.6);
    this.ctx.lineTo(x + size * 0.3, y - size * 0.8);
    this.ctx.closePath();
    this.ctx.fill();
    
    this.ctx.fillStyle = '#FF1493';
    this.ctx.beginPath();
    this.ctx.moveTo(x, y - size * 0.2);
    this.ctx.lineTo(x - size * 0.2, y - size * 0.9);
    this.ctx.lineTo(x, y - size * 0.7);
    this.ctx.lineTo(x + size * 0.2, y - size * 0.9);
    this.ctx.closePath();
    this.ctx.fill();
  }
  
  // 绘制地面
  drawGround(x: number, y: number, width: number, height: number): void {
    this.ctx.fillStyle = '#228B22';
    this.ctx.fillRect(x, y, width, height);
    
    // 绘制草地纹理
    this.ctx.fillStyle = '#32CD32';
    for (let i = 0; i < width; i += 10) {
      this.ctx.fillRect(x + i, y, 5, height * 0.2);
    }
  }
  
  // 绘制树木
  drawTree(x: number, y: number, width: number, height: number): void {
    // 绘制树干
    this.ctx.fillStyle = '#8B4513';
    this.ctx.fillRect(x + width * 0.25, y, width * 0.5, height * 0.4);
    
    // 绘制树叶
    this.ctx.fillStyle = '#228B22';
    this.ctx.beginPath();
    this.ctx.arc(x + width / 2, y - height * 0.2, width * 0.7, 0, Math.PI * 2);
    this.ctx.arc(x, y - height * 0.1, width * 0.5, 0, Math.PI * 2);
    this.ctx.arc(x + width, y - height * 0.1, width * 0.5, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  // 绘制石头
  drawStone(x: number, y: number, width: number, height: number): void {
    this.ctx.fillStyle = '#696969';
    this.ctx.beginPath();
    this.ctx.arc(x + width * 0.3, y + height * 0.3, width * 0.3, 0, Math.PI * 2);
    this.ctx.arc(x + width * 0.7, y + height * 0.4, width * 0.3, 0, Math.PI * 2);
    this.ctx.arc(x + width * 0.5, y + height * 0.7, width * 0.3, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  // 绘制平台
  drawPlatform(x: number, y: number, width: number, height: number): void {
    this.ctx.fillStyle = '#8B4513';
    this.ctx.fillRect(x, y, width, height);
    
    this.ctx.fillStyle = '#A0522D';
    this.ctx.fillRect(x, y, width, height * 0.2);
  }
  
  // 绘制沙丘
  drawDune(x: number, y: number, width: number, height: number): void {
    this.ctx.fillStyle = '#F4A460';
    this.ctx.beginPath();
    this.ctx.moveTo(x, y);
    this.ctx.quadraticCurveTo(x + width / 2, y - height * 2, x + width, y);
    this.ctx.closePath();
    this.ctx.fill();
    
    // 添加沙丘纹理
    this.ctx.fillStyle = '#DEB887';
    for (let i = 0; i < 5; i++) {
      const offsetX = (Math.random() - 0.5) * width * 0.8;
      const offsetY = (Math.random() - 0.5) * height;
      this.ctx.beginPath();
      this.ctx.arc(x + width / 2 + offsetX, y + offsetY, width * 0.1, 0, Math.PI * 2);
      this.ctx.fill();
    }
  }
  
  // 绘制仙人掌
  drawCactus(x: number, y: number, width: number, height: number): void {
    // 绘制仙人掌主体
    this.ctx.fillStyle = '#228B22';
    this.ctx.fillRect(x + width * 0.3, y, width * 0.4, height);
    
    // 绘制仙人掌的刺
    this.ctx.fillStyle = '#006400';
    for (let i = 0; i < height; i += 10) {
      // 左侧刺
      this.ctx.fillRect(x + width * 0.2, y + i, width * 0.1, 3);
      // 右侧刺
      this.ctx.fillRect(x + width * 0.7, y + i, width * 0.1, 3);
    }
    
    // 绘制仙人掌顶部
    this.ctx.beginPath();
    this.ctx.moveTo(x + width * 0.3, y);
    this.ctx.lineTo(x, y - height * 0.2);
    this.ctx.lineTo(x + width, y - height * 0.2);
    this.ctx.lineTo(x + width * 0.7, y);
    this.ctx.closePath();
    this.ctx.fill();
  }
  
  // 绘制岩石
  drawRock(x: number, y: number, width: number, height: number): void {
    this.ctx.fillStyle = '#696969';
    this.ctx.beginPath();
    this.ctx.moveTo(x + width * 0.5, y);
    this.ctx.lineTo(x + width * 0.8, y + height * 0.3);
    this.ctx.lineTo(x + width, y + height);
    this.ctx.lineTo(x, y + height);
    this.ctx.lineTo(x + width * 0.2, y + height * 0.3);
    this.ctx.closePath();
    this.ctx.fill();
    
    // 添加岩石纹理
    this.ctx.fillStyle = '#555555';
    this.ctx.beginPath();
    this.ctx.arc(x + width * 0.3, y + height * 0.5, width * 0.1, 0, Math.PI * 2);
    this.ctx.arc(x + width * 0.7, y + height * 0.6, width * 0.1, 0, Math.PI * 2);
    this.ctx.fill();
  }
  
  // 绘制障碍物
  drawObstacle(x: number, y: number, width: number, height: number, type: string = 'rock'): void {
    switch (type) {
      case 'rock':
        this.ctx.fillStyle = '#696969';
        this.ctx.beginPath();
        this.ctx.arc(x + width / 2, y + height / 2, width / 2, 0, Math.PI * 2);
        this.ctx.fill();
        break;
      case 'spike':
        this.ctx.fillStyle = '#FF4500';
        this.ctx.beginPath();
        this.ctx.moveTo(x, y + height);
        this.ctx.lineTo(x + width / 2, y);
        this.ctx.lineTo(x + width, y + height);
        this.ctx.closePath();
        this.ctx.fill();
        break;
      case 'water':
        this.ctx.fillStyle = '#1E90FF';
        this.ctx.fillRect(x, y, width, height);
        break;
    }
  }
}
