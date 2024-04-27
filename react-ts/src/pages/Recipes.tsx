import { useEffect, useState } from "react";

import { RecipeCard } from "../components/RecipeCard";
import { Title } from "../components/Title";

import "./Recipes.css";

type Recipe = {
  id: string;
  name: string;
  ingredients: string[];
};

export const Recipes = () => {
  const [recipes, setRecipes] = useState<Recipe[]>([]);

  //   const recipeService = new RecipeRepositoryHttp();

  useEffect(() => {
    fetch("https://backend-login-placeholder.deno.dev/api/v2/recipes", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.status === "error") {
          throw new Error(data.code);
        }
        return data.payload;
      })
      .then((recipes) => {
        setRecipes(recipes);
      });
  }, []);

  return (
    <main className="recipes-page">
      <Title>Recipes</Title>
      <div className="recipes">
        {recipes.map((recipe) => (
          <RecipeCard key={recipe.id} {...recipe} />
        ))}
      </div>
    </main>
  );
};
