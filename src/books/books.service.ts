import { HttpException, Injectable } from "@nestjs/common";
import { BOOKS } from "../DataStorage/books.mock";

@Injectable()
export class BooksService {
  books = BOOKS;

  getAllBook(): Promise<any> {
    return new Promise((resolve) => {
      resolve(this.books);
    });
  }

  getBookDetails(bookID): Promise<any> {
    let id = Number(bookID);
    return new Promise((resolve) => {
      const book = this.books.find((element) => element.id === id);
      if (!book) {
        throw new HttpException("Book does not exist!", 404);
      }
      resolve(book);
    });
  }

  addBook(book): Promise<any> {
    return new Promise((resolve) => {
      let id = book.id;
      let data = this.books.filter((element) => element.id === id);
      if (Boolean(data.length)) {
        throw new HttpException("Book already exist !", 409);
      }
      this.books.push(book)
      resolve("New book store successfully");
    });
  }

  deleteBook(bookID): Promise<any> {
    return new Promise((resolve) => {
      let id = Number(bookID);
      let index = this.books.findIndex((element) => element.id === id);
      if (index === -1) {
        throw new HttpException("Book does not exist !", 404);
      }
      let removeData = this.books.filter((element) => element.id !== id);
      resolve(removeData);
    });
  }
}
