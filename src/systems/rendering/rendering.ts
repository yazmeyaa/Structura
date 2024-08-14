import { System } from "@/engine/systems";
import { PriorityCategories } from "../../engine/systems/consts";
import { IRenderer } from "../../engine/renderer";
import { IWorld } from "../../engine/world";


export class RenderSystem extends System {
    name: string = "render_system";
    public priority: number = PriorityCategories.RENDER;
    private renderer: IRenderer;

    constructor(world: IWorld) {
        super();
        this.renderer = world.renderer;
    }

    public compute(): void {
        this.renderer.render();
    }
}
