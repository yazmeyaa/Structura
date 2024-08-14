import { GameCore } from "../core";
import { BasicScene } from "./types";

jest.mock("pixi.js", () => {
  const actualPixi = jest.requireActual("pixi.js");
  return {
    ...actualPixi,
    Application: jest.fn().mockImplementation(() => ({
      stage: new actualPixi.Container(),
      render: jest.fn(),
      init: jest.fn(),
      canvas: document.createElement("canvas"),
    })),
  };
});

class TestScene extends BasicScene {
  public name = "test";
  public onMount() {
    /* mock implementation */
  }
  public onUnmount() {
    /* mock implementation */
  }
}

describe("Renderer", () => {
  let testScene: TestScene;
  let core: GameCore;

  beforeEach(() => {
    core = new GameCore();
    testScene = new TestScene();
    core.renderer.scenes.addScene(testScene);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should initialize with a SceneManager", () => {
    expect(core.renderer.scenes).toBeDefined();
  });

  it("should append child to target element", async () => {
    const target = document.createElement("div");
    await core.renderer.appendTo(target);
    expect(core.renderer["app"].init).toHaveBeenCalledWith({ resizeTo: target });
    expect(target.contains(core.renderer["app"].canvas)).toBe(true);
  });

  it("should render the active scene", () => {
    core.renderer.scenes.changeScene("test");
    core.renderer.render();
    expect(core.renderer["app"].stage).toBe(testScene.container);
  });

  it("should not render if there is no active scene", () => {
    core.renderer.render();
    expect(core.renderer["app"].render).not.toHaveBeenCalled();
  });
});
