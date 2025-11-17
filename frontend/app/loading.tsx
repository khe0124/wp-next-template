export default function Loading() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
      <div className="h-12 w-12 animate-spin rounded-full border-2 border-black/20 border-t-black" />
      <div>
        <p className="text-base font-semibold text-black">
          콘텐츠를 불러오는 중입니다
        </p>
        <p className="text-sm text-zinc-500">
          Loading modules… 잠시만 기다려 주세요.
        </p>
      </div>
    </div>
  );
}

