import { LoginButton } from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center relative ">
      <div className="absolute inset-0 h-full w-full bg-[#ffffff] bg-[radial-gradient(#3de2ff_1px,transparent_1px)] [background-size:16px_16px] flex justify-center items-center">
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
      </div>
    </div>
  );
}
