import { IComponentsManager, Id } from "../components/types";
import { IEventManager } from "../events";
import { IRenderer } from "../renderer";
import { ISystemsManager } from "../systems";
import { Timer } from "../timer";

export interface IWorld {
  components: IComponentsManager;
  renderer: IRenderer;
  systems: ISystemsManager;
  events: IEventManager;
  timer: Timer;
  newId(): Id;
  start(): void;
  update(): void;
  pause(): void;
  reset(): void;
  render(): void;
}
