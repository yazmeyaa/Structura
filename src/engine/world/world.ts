import { ComponentsManager } from "../components";
import { IComponentsManager, Id } from "../components/types";
import { IEventManager } from "../events";
import { SystemManager } from "../systems/systems";
import { ISystemsManager } from "../systems/types";
import { Timer } from "../timer";
import { IWorld, WorldConstructorProps } from "./types";

export class World implements IWorld {
  public components: IComponentsManager;
  public systems: ISystemsManager;
  public timer: Timer;
  public events: IEventManager;

  private idCount = 0;

  constructor(props: WorldConstructorProps) {
    this.components = new ComponentsManager();
    this.systems = new SystemManager();
    this.timer = props.timer
    this.events = props.eventManager;
  }

  public render(): void { }

  public newId(): Id {
    return ++this.idCount;
  }

  public update(): void {
    this.systems.compute(this);
  }

  public start(): void {
    this.timer.start();
  }

  public pause(): void {
    this.timer.stop();
  }

  public reset(): void {
    this.timer.reset();
  }
}
