export const PersonForm =({newName,setNewName,newNumber,setNewNumber,updateClick})=>{
return(
 <>
  <form>
        <div>
          name: <input value={newName} onChange={(event)=>{
setNewName(event.target.value)
          }} />
        </div>
         <div>
          number: <input value={newNumber} onChange={(event)=>{
setNewNumber(event.target.value)
          }} />
        </div>
        <div>
          <button type="submit" onClick={updateClick}>add</button>
        </div>
      </form>
 </> 
)
}