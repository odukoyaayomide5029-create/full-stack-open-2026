const mongoose=require('mongoose')

const password = process.argv[2]
const name = process.argv[3]
const number = process.argv[4]

const url = `mongodb://Ayooduks:${password}@ac-3glfnzt-shard-00-00.zu6lsbm.mongodb.net:27017,ac-3glfnzt-shard-00-01.zu6lsbm.mongodb.net:27017,ac-3glfnzt-shard-00-02.zu6lsbm.mongodb.net:27017/phonebook?ssl=true&replicaSet=atlas-ojvt2o-shard-0&authSource=admin&appName=Cluster0`

mongoose.set('strictQuery',false)

mongoose.connect(url, { family: 4 })



const personSchema = new mongoose.Schema({
  name: String,
  number: String,
})
const Person = mongoose.model('Person',personSchema)
if (process.argv.length === 3) {
 Person.find({}).then(result => {
  console.log('phonebook:')

  result.forEach(person => {
    console.log(person.name, person.number)
  })

  mongoose.connection.close()
}) 
}
else{
const person = new Person({
name:name,
number:number
}
)

person.save().then(result=>{
console.log(`added ${name} number ${number} to phonebook`)
 mongoose.connection.close()
})
}