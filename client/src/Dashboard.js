import useAuth from "./useAuth"

function Dashboard( { code }) {
    const accessToken = useAuth(code);
    console.log(accessToken)
    return (
        <div>
            hello
        </div>
    )
  }
  
  export default Dashboard;