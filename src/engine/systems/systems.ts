import { IWorld } from "../world/types";
import { ISystemsManager, System } from "./types";

export class SystemManager implements ISystemsManager {
  private systems: System[];

  constructor() {
    this.systems = new Array<System>();
  }

  private sortSystems() {
    this.systems.sort((a, b) => {
      return b.priority - a.priority;
    });
  }

  public register(system: System): void {
    this.systems.push(system);
    this.sortSystems();
  }

  public compute(world: IWorld): void {
    for (const system of this.systems) {
      try {
        system.compute(world);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error(
            `[${system.name.toUpperCase()}] COMPUTE: ${error.message}`
          );
        }
      }
    }
  }
}
