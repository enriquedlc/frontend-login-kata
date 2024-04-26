import { Recipe } from "./Recipe";
import { RecipeRepository } from "./RecipeRepository";

export class RecipeRepositoryHttp implements RecipeRepository {
  async getAllRecipes(): Promise<Recipe[]> {
    const response = await fetch(
      "https://backend-recipe-placeholder.deno.dev/api/recipes",
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          api_token: `26df07b5b7318455b8ca09f923eaae6de6eb95530743eddcfdb541df9487df9d`,
        },
      }
    );
    const data = await response.json();

    if (data.status === "error") {
      throw new Error(data.code);
    }
    return data.payload.recipes;
  }

  async findRecipeById(id: string): Promise<Recipe> {
    const response = await fetch(
      `https://backend-recipe-placeholder.deno.dev/api/recipes/${id}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          api_token: `26df07b5b7318455b8ca09f923eaae6de6eb95530743eddcfdb541df9487df9d`,
        },
      }
    );
    const data = await response.json();

    if (data.status === "error") {
      throw new Error(data.code);
    }
    return data.payload.recipe;
  }

  createRecipe(recipe: Recipe): Promise<{
    status: "error" | "success";
    payload: {
      recipe: Recipe;
    };
  }> {
    throw new Error("Method not implemented.");
  }
}
