export declare class BooksService {
    books: {
        id: number;
        title: string;
        description: string;
        author: string;
    }[];
    getAllBook(): Promise<any>;
    getBookDetails(bookID: any): Promise<any>;
    addBook(book: any): Promise<any>;
    deleteBook(bookID: any): Promise<any>;
}
