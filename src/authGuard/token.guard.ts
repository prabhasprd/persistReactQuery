import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";

import { Observable } from "rxjs";
import { JwtService } from "@nestjs/jwt";
import { JwtStrategy } from '../validation-check/jwt.strategy'

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private jwtStrategy: JwtStrategy
  ) { }
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    if (!Boolean(request.headers.authorization)) {
      return false
    } else if (Boolean(request.headers.authorization)) {
      let token = request.headers.authorization.slice(7);
      let tokenUserData = this.jwtService.decode(token)
      if (tokenUserData === null) {
        return false
      } else {
        let checkId = this.jwtStrategy.validate(
          tokenUserData
        );
        if (!checkId) {
          throw new UnauthorizedException("UNAUTHORIZED");
        }
        return true
      }
    }
  }
}
