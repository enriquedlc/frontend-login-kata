import { describe } from "node:test";
import { expect, it } from "vitest";

import { RecipeRepositoryHttp } from "./RecipeRepositoryHttp";

describe("RecipeRepository", () => {
  it("should get recipes", async () => {
    const recipeRepositoryHttp = new RecipeRepositoryHttp();
    recipeRepositoryHttp.getAllRecipes().then((recipes) => {
      expect(recipes).toBeDefined();
    });
  });
});
