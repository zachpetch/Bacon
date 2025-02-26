import { fetchPerson, fetchCommonProjects, fetchPersonCredits } from "@/lib/api";
import SearchBar from "@/components/SearchBar";

export default async function Search({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q;
  if (!query) return <p>No results</p>;

  const names = query.split(" and ");

  if (names.length === 1) {
    // Single person search
    const personData = await fetchPerson(names[0]);
    const person = personData.results[0]; // Get the first matching person

    if (!person) return <p>No results found.</p>;

    const credits = await fetchPersonCredits(person.id);

    return (
      <div className="max-w-3xl mx-auto p-6">
        <SearchBar />
        <h2 className="text-2xl font-bold text-center mb-4">Credits for {person.name}</h2>
        <ul className="space-y-4">
          {credits.map((p: any, index: number) => (
            <li key={index} className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
              <span className="block text-lg font-semibold">{p.character}</span>
              <span className="block text-gray-300">
                in <strong className="text-white">{p.original_title || p.name}</strong> - Released {p.release_date}
              </span>
            </li>
          ))}
        </ul>
      </div>
    );
  } else if (names.length === 2) {
    // Two-person search
    const peopleData = await Promise.all(names.map(fetchPerson));
    const [person1, person2] = peopleData.map((res) => res.results[0]); // Get the first match for both

    if (!person1 || !person2) return <p>No results found.</p>;

    const commonMovies = await fetchCommonProjects(person1.id, person2.id);

    return (
      <div className="max-w-3xl mx-auto p-6">
        <SearchBar />
        <h2 className="text-2xl font-bold text-center mb-4">
          Movies & Shows featuring {person1.name} and {person2.name}
        </h2>
        {commonMovies.length > 0 ? (
          <ul className="space-y-4">
            {commonMovies.map((movie: any, index: number) => (
              <li key={index} className="p-4 bg-gray-800 text-white rounded-lg shadow-lg">
                <span className="block text-lg font-semibold">{movie.title}</span>
                <span className="block text-gray-300">Released {movie.release_date}</span>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-500 mt-10">No common projects found.</p>
        )}
      </div>
    );
  }

  return <p>No results found.</p>;
}
