export class Post {
    name: string; 
    body: string; 
    date: Date; 

    constructor(name: string, body: string, date: Date) {
        this.name = name; 
        this.body = body; 
        this.date = date; 
    }
}