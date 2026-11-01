import { Suspense } from "react";
import GamePlayerClient from "./GamePlayerClient";

export default function GamePlayerPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="av-main fade-in" />}>
      <GamePlayerClientInner params={params} />
    </Suspense>
  );
}

async function GamePlayerClientInner({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <GamePlayerClient id={id} />;
}