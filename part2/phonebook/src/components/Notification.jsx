export const Notification = ({ message,isError }) => {
 


  if (message === null) {
    return null
  }

  return (
    <>
     {message && (<div className={isError?'error':'success'}>
      {message}
    </div>)}
    </>
  
  )
}