export const Persons =({personsToShow,remove})=>{
return(
  <>
  {personsToShow.map((person)=><p key={person.id}>{person.name}  {person.number}  <button onClick={()=>{remove(person.id)}}>DELETE</button></p>)}
  </>
)
}