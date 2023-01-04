const mongoose = require('mongoose')
mongoose.set('strictQuery', false)


if (process.argv.length < 3 || process.argv.length === 4) {
  console.log('Please provide the password as an argument: node mongo.js <password> <name> <number>')
  process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://nazar:${password}@cluster0.xnz8s8l.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url)

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})

const Person = mongoose.model('Person', personSchema)

if (process.argv.length === 3) {
    console.log('phonebook:');
    Person.find({}).then(result => {
        result.forEach(person => {
            console.log(person)
        })
        mongoose.connection.close()
    })
} else {
    const person = new Person({
        name: process.argv[3], 
        number: process.argv[4],
      })

    person.save()
    .then(person => {
        console.log(`added ${person.name} number ${person.number} to phonebook`)
        return mongoose.connection.close()
    })
    .catch((err) => console.log(err))
}
