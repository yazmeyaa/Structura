import { PositionComponent } from "@/src/components/position";
import { BaseEntity, Component } from "./entities";
import { GameCore } from "../core";

class ExampleEntnty extends BaseEntity {
  @Component(PositionComponent)
  public position!: PositionComponent;
}

describe("Entities creation", () => {
  test("Create and modify entities", () => {
    const core = new GameCore();
    core.world.components.registerStorage(
      PositionComponent,
      () => new PositionComponent()
    );

    const entity = new ExampleEntnty();
    const entity2 = new ExampleEntnty();
    entity.init(core.world);
    entity2.init(core.world);

    expect(entity.initiated).toBe(true);
    expect(entity2.initiated).toBe(true);

    expect(entity.position).not.toBeUndefined();
    expect(entity2.position).not.toBeUndefined();

    const position2 = core.world.components
      .getStorage<PositionComponent>(PositionComponent)
      .get(entity2.id);
    const position = core.world.components
      .getStorage<PositionComponent>(PositionComponent)
      .get(entity.id);

    entity.position.x = 25;
    entity2.position.x = 666;

    expect(position?.x).toBe(25);
    expect(position2?.x).toBe(666);
  });
});
