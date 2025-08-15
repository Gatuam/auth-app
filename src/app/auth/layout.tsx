const layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="relative h-full w-full">
      <div className="absolute inset-0 h-full w-full bg-[#ffffff] bg-[radial-gradient(#3de2ff_1px,transparent_1px)] [background-size:16px_16px] flex justify-center items-center">
        {children}
      </div>
    </div>
  );
};

export default layout;
