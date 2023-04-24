import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { userData } from '../DataStorage/user.mock'

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  userDetails = userData;
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: "jwtConstants.secret",
    });
  }

  async validate(payload: any) {
    let filterData = this.userDetails[0].users.filter(
      (ele) =>
        ele.userId === Number(payload.userId) &&
        ele.emailAddress === payload.emailAddress
    );
    return filterData.length >= 1 ? true : false;
  }
}