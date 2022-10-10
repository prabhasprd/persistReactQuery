import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { AuthService } from "../authModules/auth.service";

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private authService: AuthService
  ) {}
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    let token = request.headers.authorization.slice(7);
    let checkId = this.authService.authTokenValidate(
      this.jwtService.decode(token)
    );
    if (checkId === undefined) {
      throw new UnauthorizedException("UNAUTHORIZED");
      return false;
    }
    return true;
  }
}
