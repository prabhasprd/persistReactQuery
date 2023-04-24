"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BooksService = void 0;
const common_1 = require("@nestjs/common");
const books_mock_1 = require("../DataStorage/books.mock");
let BooksService = class BooksService {
    constructor() {
        this.books = books_mock_1.BOOKS;
    }
    getAllBook() {
        return new Promise((resolve) => {
            resolve(this.books);
        });
    }
    getBookDetails(bookID) {
        let id = Number(bookID);
        return new Promise((resolve) => {
            const book = this.books.find((element) => element.id === id);
            if (!book) {
                throw new common_1.HttpException("Book does not exist!", 404);
            }
            resolve(book);
        });
    }
    addBook(book) {
        return new Promise((resolve) => {
            let id = book.id;
            let data = this.books.filter((element) => element.id === id);
            if (Boolean(data.length)) {
                throw new common_1.HttpException("Book already exist !", 409);
            }
            this.books.push(book);
            resolve("New book store successfully");
        });
    }
    deleteBook(bookID) {
        return new Promise((resolve) => {
            let id = Number(bookID);
            let index = this.books.findIndex((element) => element.id === id);
            if (index === -1) {
                throw new common_1.HttpException("Book does not exist !", 404);
            }
            let removeData = this.books.filter((element) => element.id !== id);
            resolve(removeData);
        });
    }
};
BooksService = __decorate([
    (0, common_1.Injectable)()
], BooksService);
exports.BooksService = BooksService;
//# sourceMappingURL=books.service.js.map