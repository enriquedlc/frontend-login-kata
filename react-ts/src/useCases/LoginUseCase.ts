import { AuthService } from "../infrastructure/AuthService";
import { Router } from "../infrastructure/Router";
import { TokenRepository } from "../infrastructure/TokenRepository";

interface LoginUseCaseParams {
  authService: AuthService;
  tokenRepository: TokenRepository;
  router: Router;
}

export class LoginUseCase {
  private readonly authService: AuthService;
  private readonly tokenRepository: TokenRepository;
  private readonly router: Router;

  constructor({ authService, tokenRepository, router }: LoginUseCaseParams) {
    this.authService = authService;
    this.tokenRepository = tokenRepository;
    this.router = router;
  }

  async execute(params: LoginParams) {
    const token = await this.authService.execute(params);
    this.tokenRepository.save(token);
    this.router.goToRecipes();
  }
}
