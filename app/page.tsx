import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <div>
      <h1 className="font-bold text-xl">Hello world</h1>
      <Link href={`/interviews/12345`}>
        <Button>Take interview</Button>
      </Link>
    </div>
  );
}
