import { Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { JwtService } from "@nestjs/jwt";
import { TokenAuthGuard } from "src/authGuard/token.guard";
import { IsDataValidGuard } from "src/authGuard/isDataValid.guard";

@Controller("auth")
export class AuthController {
  constructor(
    private authService: AuthService,
    private jwtService: JwtService
  ) { }

  @Get("getallusers")
  @UseGuards(TokenAuthGuard)
  async getAllUsers() {
    let user = await this.authService.getAllUsers();
    return user;
  }
  @HttpCode(HttpStatus.OK)
  @UseGuards(IsDataValidGuard)
  @Post("login")
  async login(@Request() req) {
    console.log('HttpStatus.OK', HttpStatus.OK);

    return this.authService.loginWithCredentials(
      req.body,
      this.jwtService.sign(req.body)
    );
  }
}
