import { BasicScene } from "./types";
import { GameCore } from "../core";

class MockScene extends BasicScene {
  public name = "MockScene";
  public onMount() { }
  public onUnmount() { }
}

describe("SceneManager", () => {
  let mockScene: MockScene;
  let gameCore: GameCore

  beforeEach(() => {
    gameCore = new GameCore();
    mockScene = new MockScene();
  });

  test("should add a scene", () => {
    gameCore.renderer.scenes.addScene(mockScene);
    expect(gameCore.renderer.scenes.activeScene()).toBe(null);
    gameCore.renderer.scenes.changeScene("MockScene");
    expect(gameCore.renderer.scenes.activeScene()).toBe(mockScene);
  });

  test("should remove a scene", () => {
    gameCore.renderer.scenes.addScene(mockScene);
    gameCore.renderer.scenes.removeScene("MockScene");
    expect(() => gameCore.renderer.scenes.changeScene("MockScene")).toThrow();
  });

  test("should change the scene", () => {
    gameCore.renderer.scenes.addScene(mockScene);
    gameCore.renderer.scenes.changeScene("MockScene");
    expect(gameCore.renderer.scenes.activeScene()).toBe(mockScene);
  });

  test("should return the active scene", () => {
    expect(gameCore.renderer.scenes.activeScene()).toBe(null);
    gameCore.renderer.scenes.addScene(mockScene);
    gameCore.renderer.scenes.changeScene("MockScene");
    expect(gameCore.renderer.scenes.activeScene()).toBe(mockScene);
  });
});
