import { Component } from '../../ecs/Component';

// 生命值组件，用于管理实体的生命值
export class Health extends Component {
  // 组件类型标识
  readonly type: string = 'health';
  
  // 当前生命值
  currentHealth: number;
  
  // 最大生命值
  maxHealth: number;
  
  // 是否无敌
  isInvulnerable: boolean;
  
  // 无敌时间（毫秒）
  invulnerabilityTime: number;
  
  // 最后受伤时间（用于无敌帧计算）
  lastHitTime: number;
  
  // 是否死亡
  isDead: boolean;
  
  // 构造函数
  constructor(
    maxHealth: number = 100,
    invulnerabilityTime: number = 500
  ) {
    super();
    this.maxHealth = maxHealth;
    this.currentHealth = maxHealth;
    this.invulnerabilityTime = invulnerabilityTime;
    this.isInvulnerable = false;
    this.lastHitTime = 0;
    this.isDead = false;
  }
  
  // 受到伤害
  takeDamage(amount: number, timestamp: number = Date.now()): void {
    // 检查是否无敌或已死亡
    if (this.isDead || this.isInvulnerable || timestamp - this.lastHitTime < this.invulnerabilityTime) {
      return;
    }
    
    this.currentHealth -= amount;
    this.lastHitTime = timestamp;
    
    // 检查是否死亡
    if (this.currentHealth <= 0) {
      this.currentHealth = 0;
      this.isDead = true;
    }
  }
  
  // 恢复生命值
  heal(amount: number): void {
    if (this.isDead) return;
    
    this.currentHealth += amount;
    if (this.currentHealth > this.maxHealth) {
      this.currentHealth = this.maxHealth;
    }
  }
  
  // 设置无敌状态
  setInvulnerable(isInvulnerable: boolean): void {
    this.isInvulnerable = isInvulnerable;
  }
  
  // 重置生命值组件
  reset(): void {
    this.currentHealth = this.maxHealth;
    this.isInvulnerable = false;
    this.lastHitTime = 0;
    this.isDead = false;
  }
}
