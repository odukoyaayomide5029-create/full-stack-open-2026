export const Filter =({filtering,setFiltering})=>{
return(
<>
<div>filter shown with <input value={filtering} onChange={(event)=>{
setFiltering(event.target.value)
}}  /></div> <br/>
</>
)
}