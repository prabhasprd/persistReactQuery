import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  Delete,
  Request,
  UseGuards,
} from "@nestjs/common";
import { BooksService } from "./books.service";
import { CreateBookDTO } from "../books/dto/create-book.dto";
import { TokenAuthGuard } from "src/authGuard/token.guard";

@Controller("book")
export class BooksController {
  constructor(private booksService: BooksService) { }

  @Get()
  @UseGuards(TokenAuthGuard)
  async getBooks() {
    const books = await this.booksService.getAllBook();
    return books;
  }
  @Get("booksById")
  @UseGuards(TokenAuthGuard)
  async getBook(@Query("bookID") bookID: Number) {
    const book = await this.booksService.getBookDetails(bookID);
    return book;
  }
  @Post('addBook')
  @UseGuards(TokenAuthGuard)
  async addBook(@Body() createBookDTO: CreateBookDTO) {
    const book = await this.booksService.addBook(createBookDTO);
    return book;
  }
  @Delete('deleteBook')
  @UseGuards(TokenAuthGuard)
  async deleteBook(@Query() query) {
    const books = await this.booksService.deleteBook(query.bookID);
    return books;
  }
}
