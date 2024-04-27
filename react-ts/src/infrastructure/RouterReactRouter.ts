import { Router } from "./Router";

export class RouterReactRouter implements Router {
  constructor(private navigate: () => void) {}

  goToRecipes() {
    this.navigate();
  }
}
