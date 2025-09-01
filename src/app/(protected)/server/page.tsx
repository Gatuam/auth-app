import { UserInfo } from '../_conponents/UserInfo';
import { currentUser } from '@/lib/auth';



const page = async() => {
    const user = await currentUser();
  return (
       <div className=" bg-white rounded-xl">
         <UserInfo
      label='Server Component'
      user ={user}
      sublabel="Server data" info="Server side user info"
      />
      </div>
     
    
  )
}

export default page
