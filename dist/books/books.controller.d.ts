import { BooksService } from "./books.service";
import { CreateBookDTO } from "../books/dto/create-book.dto";
export declare class BooksController {
    private booksService;
    constructor(booksService: BooksService);
    getBooks(req: any): Promise<any>;
    getBook(bookID: Number): Promise<any>;
    addBook(createBookDTO: CreateBookDTO): Promise<any>;
    deleteBook(query: any): Promise<any>;
}
