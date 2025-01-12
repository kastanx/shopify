import Header from "./Header";

export default function Container({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
    </>
  );
}
