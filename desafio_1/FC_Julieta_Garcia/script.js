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


function User ( name, lastName, books, pets ) {

    this.name = name;
    this.lastName = lastName;
    this.books = books;
    this.pets = pets;

    this.getFullName = function (){
        return `${this.name} ${this.lastName}`
    }

    this.addMascota = function (pet){
        this.pets.push(pet)
    }

    this.getMascotas = function(){
        return this.pets.length
    }

    this.addBook = function(book){
        this.books.push(book)
    }

    this.getBooks = function (){

        const booksByName = []

        this.books.map((book)=>{
            booksByName.push(book.title)
        })

        return booksByName;
    }
}


const sampleUserFC = new User (userName, lastName, sampleBooks, samplePets)


console.log("")
console.log("%c 1- Funciones constructoras ", styleTitle)
console.log("")

console.log(`%c Full name  `, styleSubTitle)
console.log(sampleUserFC.getFullName())

sampleUserFC.addMascota("Gromit")
console.log("%c Pets ++ ", styleSubTitle)
console.log(sampleUserFC.pets)

console.log("%c Pets'length ", styleSubTitle)
console.log(sampleUserFC.getMascotas())

sampleUserFC.addBook({
    title: "Stories of Your Life and Others",
    author : "Ted Chiang"
})
console.log(`%c Books ++ `, styleSubTitle)
console.log(sampleUserFC.books)

console.log(`%c Books by Title `,styleSubTitle)
console.log(sampleUserFC.getBooks())




