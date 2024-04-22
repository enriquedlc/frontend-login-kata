import { NavigateFunction } from "react-router-dom";
import { Router } from "./Router";

export class RouterReactRouter implements Router {
  constructor(private navigate: NavigateFunction) {}

  goToRecipes() {
    this.navigate("/recipes");
  }
}
