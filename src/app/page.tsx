import Link from "next/link";

export default function Home() {
  return (
    <main className="m-20">
      Click <Link href="/documents/345656">here</Link> to go to document id
    </main>
  );
}
