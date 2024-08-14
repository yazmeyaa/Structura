import { EventManager, IEventManager } from "../events";
import { IRenderer, Renderer } from "../renderer";
import { Timer } from "../timer";
import { IWorld, World } from "../world";

export class GameCore {
  public events: IEventManager;
  public timer: Timer;
  public renderer: IRenderer;
  public world: IWorld;

  constructor() {
    this.events = new EventManager()
    this.timer = new Timer();
    this.world = new World({
      timer: this.timer,
      eventManager: this.events,
    });
    this.renderer = new Renderer(this.world)
  }
}
