import React, { useRef, useEffect } from 'react';
import { World } from '../ecs/World';
import { RenderSystem } from '../game/systems/RenderSystem';
import { PhysicsSystem } from '../game/systems/PhysicsSystem';
import { InputSystem } from '../game/systems/InputSystem';
import { AISystem } from '../game/systems/AISystem';
import { AnimationSystem } from '../game/systems/AnimationSystem';
import { Stage1 } from '../game/stages/Stage1';

const GameCanvas: React.FC = () => {
  // Canvas引用
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // 游戏世界
  const worldRef = useRef<World | null>(null);
  
  // 游戏循环ID
  const animationIdRef = useRef<number>(0);
  
  // 初始化游戏
  const initGame = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // 设置画布尺寸
    canvas.width = 800;
    canvas.height = 600;
    
    // 创建游戏世界
    const world = new World();
    worldRef.current = world;
    
    // 创建并添加系统
    const renderSystem = new RenderSystem(world, ctx, canvas.width, canvas.height);
    const physicsSystem = new PhysicsSystem(world);
    const inputSystem = new InputSystem(world);
    const aiSystem = new AISystem(world);
    const animationSystem = new AnimationSystem(world);
    
    world.addSystem(renderSystem);
    world.addSystem(physicsSystem);
    world.addSystem(inputSystem);
    world.addSystem(aiSystem);
    world.addSystem(animationSystem);
    
    // 创建并初始化第一个关卡
    const stage1 = new Stage1(world);
    stage1.init();
    
    // 开始游戏循环
    let lastTime = Date.now();
    const gameLoop = () => {
      const currentTime = Date.now();
      const deltaTime = currentTime - lastTime;
      lastTime = currentTime;
      
      // 更新关卡
      stage1.update(deltaTime);
      
      // 更新世界（所有系统）
      world.update(deltaTime);
      
      // 检查关卡是否完成
      if (stage1.isComplete()) {
        console.log('关卡1完成！进入下一关');
        // 这里可以切换到下一个关卡
      }
      
      // 继续游戏循环
      animationIdRef.current = requestAnimationFrame(gameLoop);
    };
    
    gameLoop();
  };
  
  // 组件挂载时初始化游戏
  useEffect(() => {
    initGame();
    
    // 组件卸载时清理游戏
    return () => {
      cancelAnimationFrame(animationIdRef.current);
      
      // 清理游戏世界
      if (worldRef.current) {
        worldRef.current.clear();
      }
    };
  }, []);
  
  return (
    <div className="flex justify-center items-center h-screen bg-black">
      <canvas
        ref={canvasRef}
        className="border-2 border-white"
        style={{ width: '800px', height: '600px' }}
      />
    </div>
  );
};

export default GameCanvas;
