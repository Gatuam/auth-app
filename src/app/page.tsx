import { LoginButton } from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center relative ">
     
        <div className="space-y-6 text-center">
          <h1 className="text-6xl font-semibold text-neutral-800 drop-shadow-md">
            Auth
          </h1>
          <p className="text-neutral-800">
            Authentication app that secure your website
          </p>
          <LoginButton>
            <Button className=" cursor-pointer border border-[#6b6b6b55] ">
              Sign in
            </Button>
          </LoginButton>
        </div>
         <div className="absolute bottom-0 left-0 right-0 top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:84px_84px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] -z-10">
      </div>
    </div>
  );
}
