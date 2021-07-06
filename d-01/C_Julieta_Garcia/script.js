const styleSubTitle = "color:#293249;text-transform: uppercase;font-weight:bold";
const styleTitle = "color:#293249;background-color:#DDE6E3;text-transform: uppercase; font-weight:bold;letter-spacing: 10px;";
const userName = "Max";
const lastName = "Power";
const sampleBooks = [
    {
        title:"The Fellowship of the Ring",
        author : "J. R. R. Tolkien"
    },
    {
        title:"At the Mountains of Madness",
        author : "H. P. Lovecraft",
    },
    {
        title:"The Twits",
        author : "Roald Dahl",
    }
];
const samplePets = ["Grumpy Cat", "Laika", "Wheely Willy", "Pauline Wayne"];


class User {
    constructor(name, lastName, books, pets){
        this.name = name;
        this.lastName = lastName;
        this.books = books;
        this.pets = pets;
    }

    getFullName (){
        return `${this.name} ${this.lastName}`
    }

    addMascota (pet){
        this.pets.push(pet)
    }

    getMascotas (){
        return this.pets.length
    }

    addBook (book){
        this.books.push(book)
    }

    getBooks (){

        const booksByName = []

        this.books.map((book)=>{
            booksByName.push(book.title)
        })

        return booksByName;
    }
}

console.log("")
console.log("%c 2- Clases ", styleTitle)
console.log("")

const sampleUserC = new User (userName, lastName, sampleBooks, samplePets)

console.log(`%c Full name `, styleSubTitle)
console.log(sampleUserC.getFullName())

sampleUserC.addMascota("Fido")
console.log("%c Pets ++ ", styleSubTitle)
console.log(sampleUserC.pets)

console.log("%c Pets'length ", styleSubTitle)
console.log(sampleUserC.getMascotas())

sampleUserC.addBook({
    title: "Necronomicon",
    author : "Abdul Alhazred"
})
console.log(`%c Books ++ `, styleSubTitle)
console.log(sampleUserC.books)

console.log(`%c Books by Title `,styleSubTitle)
console.log(sampleUserC.getBooks())


