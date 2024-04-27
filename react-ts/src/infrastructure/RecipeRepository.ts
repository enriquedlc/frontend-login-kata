import { Recipe } from "./Recipe";

export interface RecipeRepository {
  getAllRecipes(): Promise<Recipe[]>;
  findRecipeById(id: string): Promise<Recipe>;
  createRecipe(
    recipe: Recipe,
  ): Promise<{ status: "success" | "error"; payload: { recipe: Recipe } }>;
}
