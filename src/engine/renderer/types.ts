import { Application, Container, ContainerChild } from "pixi.js";
import { IWorld } from "../world";
import { BaseEntity } from "../entities";

export interface IRenderer {
  app: Application
  scenes: ISceneManager;
  render(): void;
  appendTo(target: HTMLElement): Promise<void>;
}

export interface ISceneManager {
  addScene(scene: BasicScene): void;
  removeScene(name: string): void;
  changeScene(name: string): void;
  activeScene(): BasicScene | null;
}

export abstract class BasicScene {
  public container: Container<ContainerChild> = new Container();
  public abstract name: string;
  public abstract onMount(world: IWorld): void;
  public abstract onUnmount(world: IWorld): void;
  public entities: Map<BaseEntity["id"], BaseEntity> = new Map();

  public addEntity(entity: BaseEntity, world: IWorld): void {
    this.entities.set(entity.id, entity);
    entity.init(world);
  }

  public removeEntity(entity: BaseEntity, world: IWorld): void;
  public removeEntity(entityId: BaseEntity["id"], world: IWorld): void;
  public removeEntity(entityOrId: BaseEntity | BaseEntity["id"], world: IWorld): void {
    let entity: BaseEntity | null | undefined = null;
    entity = entityOrId instanceof BaseEntity ? this.entities.get(entityOrId.id) : this.entities.get(entityOrId);
    if (!entity) return;
    entity.destroy(world)
    this.entities.delete(entity.id)
  }
}

export type SceneChangedEventPayload = {
  prev: null | BasicScene;
  current: null | BasicScene;
};
