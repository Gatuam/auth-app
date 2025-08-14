import { auth, signOut } from "@/auth";
import { Button } from "@/components/ui/button";

const page = async () => {
  const session = await auth();
  return (
    <div>
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <Button className=" cursor-pointer" type="submit">
          logout
        </Button>
      </form>
      {
        JSON.stringify(session)
      }
    </div>
  );
};

export default page;
