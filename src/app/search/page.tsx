import { fetchPerson, fetchCommonProjects } from "@/lib/api";

export default async function Search({ searchParams }: { searchParams: { q: string } }) {
  const query = searchParams.q;
  if (!query) return <p>No results</p>;

  const names = query.split(" and ");
  const results = await Promise.all(names.map(fetchPerson));

  if (names.length === 1) {
    return (
      <div>
        <h2>People who worked with {names[0]}</h2>
        <ul>
          {results[0].results.map((p: any) => (
            <li key={p.id}>{p.name}</li>
          ))}
        </ul>
      </div>
    );
  } else if (names.length === 2) {
    const [person1, person2] = results.map((res) => res.results[0]);
    const commonMovies = await fetchCommonProjects(person1.id, person2.id);

    return (
      <div>
        <h2>Movies/Shows featuring {names[0]} and {names[1]}</h2>
        <ul>
          {commonMovies.map((movie: any) => (
            <li key={movie.id}>{movie.title || movie.name}</li>
          ))}
        </ul>
      </div>
    );
  }

  return <p>Invalid search format.</p>;
}
