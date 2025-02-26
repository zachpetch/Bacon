import Image from "next/image";
import SearchBar from "@/components/SearchBar";

export default function Home() {
  return (
      <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
          <div className="items-center">
              <h1 className="text-2xl font-bold">Bacon</h1>
          </div>
        <main className="p-8">
          <h1 className="text-2xl font-bold">Bacon</h1>
          <p className="text-gray-600">
            Find connections between actors and shows.
          </p>
          <SearchBar/>
        </main>
        <footer className="row-start-3 flex gap-6 flex-wrap items-center justify-center">
          <p>
            This page uses <a href="https://developer.themoviedb.org/docs/getting-started" target="_blank">TMDB and the TMDB APIs</a> but is not endorsed, certified, or otherwise approved by TMDB. It is
            simply a personal demo.
          </p>
        </footer>
      </div>
  )
}
