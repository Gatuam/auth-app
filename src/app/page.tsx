import { LoginButton } from "@/components/auth/LoginButton";
import { Button } from "@/components/ui/button";
import Image from "next/image";

export default function Home() {
  return (
    <div className="flex h-full flex-col items-center justify-center bg-gradient-to-b from-[#252525] to-[#171718] ">
      <div className="space-y-6 text-center">
        <h1 className="text-6xl font-semibold text-white drop-shadow-md">
          Auth
        </h1>
        <p className="text-white r">
          Authentication app that secure your website
        </p>
        <LoginButton>
          <Button className=" cursor-pointer border border-[#6b6b6b55] ">
            Sign in
          </Button>
        </LoginButton>
      </div>
    </div>
  );
}
