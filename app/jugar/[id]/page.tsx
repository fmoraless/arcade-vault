import { Suspense } from "react";
import GameDetailClient from "./GameDetailClient";

export default function GameDetailPage({ params }: { params: Promise<{ id: string }> }) {
  return (
    <Suspense fallback={<div className="av-main av-detail" />}>
      <GameDetailPageInner params={params} />
    </Suspense>
  );
}

async function GameDetailPageInner({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  return <GameDetailClient id={id} />;
}