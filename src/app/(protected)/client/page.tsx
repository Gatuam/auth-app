"use client";
import { useCurrentUser } from "@/lib/useUserHook";
import { UserInfo } from "../_conponents/UserInfo";

const page = () => {
  const user = useCurrentUser();
  return (
    <div className=" bg-cyan-200/20 backdrop-blur-3xl rounded-xl">
      <UserInfo  label="Client Components" sublabel="Client data" info="Client side user info" user={user} />
    </div>
  
);
};

export default page;
