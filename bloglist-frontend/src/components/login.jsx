export const LoginForm =({username,password,changeUser,changePassword,handleLogin,errormsg})=>{
return(
<div>
  {errormsg && <h1>{errormsg}</h1>}
   <form onSubmit={handleLogin}>
  <div>
   <label>
          username: 
          <input
            type="text"
            value={username}
            onChange={changeUser}
          />
        </label>
        </div>
  <div>
        <label>
          Password: 
          <input
            type="text"
            value={password}
            onChange={changePassword}
          />
        </label>
  </div>
  <button>Login</button>
  </form>
</div>
)
}