import { Module } from '@nestjs/common';
import { BooksController } from './books.controller';
import { BooksService } from './books.service';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from '../validation-check/jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: "jwtConstants.secret",
      signOptions: { expiresIn: "60s" },
    }),
  ],
  controllers: [BooksController],
  providers: [BooksService, JwtStrategy]
})
export class BooksModule { }
