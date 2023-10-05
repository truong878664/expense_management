import DetailExpense from "@/components/Home/DetailExpense";
import Header from "@/components/Home/Header";

export default function Home() {
  return (
    <div className="flex h-full flex-col">
      <Header />
      <div className="flex-1 overflow-auto">
        <DetailExpense />
      </div>
    </div>
  );
}
