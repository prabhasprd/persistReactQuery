import {
  Controller,
  Get,
  Param,
  Post,
  Body,
  Query,
  Delete,
  Request,
} from "@nestjs/common";
import { BooksService } from "./books.service";
import { CreateBookDTO } from "../books/dto/create-book.dto";

@Controller("books")
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async getBooks(@Request() req) {
    console.log("Request =>", req.headers);
    const books = await this.booksService.getAllBook();
    return books;
  }
  @Get("books1")
  async getBook(@Query("bookID") bookID: Number) {
    console.log("bookID", bookID);

    const book = await this.booksService.getBookDetails(bookID);
    return book;
  }
  @Post()
  async addBook(@Body() createBookDTO: CreateBookDTO) {
    const book = await this.booksService.addBook(createBookDTO);
    return book;
  }
  @Delete()
  async deleteBook(@Query() query) {
    const books = await this.booksService.deleteBook(query.bookID);
    return books;
  }
}
