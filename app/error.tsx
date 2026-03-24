"use client"; // Error boundaries must be Client Components

export default function GlobalError({
  error,
  unstable_retry,
}: {
  error: Error & { digest?: string };
  unstable_retry: () => void;
}) {
  return (
    <html>
      <body className="h-screen bg-gray-500 text-black felx justify-center items-center">
        <div className="flex flex-col items-center gap-1.5">
          <h2 className="text-3xl">Something went wrong! {error.name}</h2>
          <button
            className="p-1.5 border rounded-md cursor-pointer bg-red-500 hover:bg-red-600"
            onClick={() => unstable_retry()}
          >
            Try again
          </button>
        </div>
      </body>
    </html>
  );
}
