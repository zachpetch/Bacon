const API_KEY = process.env.NEXT_PUBLIC_TMDB_API_KEY;
const BASE_URL = "https://api.themoviedb.org/3";

/**
 * Fetch a person’s details (returns an array of matching people).
 */
export const fetchPerson = async (name: string) => {
  const res = await fetch(`${BASE_URL}/search/person?api_key=${API_KEY}&query=${encodeURIComponent(name)}`);
  if (!res.ok) throw new Error("Failed to fetch person data");
  return res.json();
};

/**
 * Fetch a person’s movie/TV credits by ID, sorted by release date (newest first).
 */
export const fetchPersonCredits = async (personId: number) => {
  const res = await fetch(`${BASE_URL}/person/${personId}/combined_credits?api_key=${API_KEY}`);
  if (!res.ok) throw new Error("Failed to fetch person credits");
  const data = await res.json();

  return data.cast
    .filter(
      (credit: any) =>
        !/self/i.test(credit.character) && credit.release_date // Exclude "Self" roles and require a release date
    )
    .sort(
      (a: any, b: any) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );
};

// /**
//  * Fetch common projects between two people by their IDs, sorted by release date (newest first).
//  */
// export const fetchCommonProjects = async (id1: number, id2: number) => {
//   const [res1, res2] = await Promise.all([
//     fetch(`${BASE_URL}/person/${id1}/combined_credits?api_key=${API_KEY}`),
//     fetch(`${BASE_URL}/person/${id2}/combined_credits?api_key=${API_KEY}`),
//   ]);
//
//   if (!res1.ok || !res2.ok) throw new Error("Failed to fetch common projects");
//
//   const [data1, data2] = await Promise.all([res1.json(), res2.json()]);
//
//   return data1.cast
//     .filter((movie: any) =>
//       data2.cast.some((m: any) => m.id === movie.id && movie.release_date) // Ensure a valid release date
//     )
//     .sort(
//       (a: any, b: any) =>
//         new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
//     );
// };

import fs from "fs";
import path from "path";

/**
 * Alt: for debugging purposes. TODO: Delete this (later)
 * Fetch common projects between two people by their IDs, sorted by release date (newest first).
 */
export const fetchCommonProjects = async (id1: number, id2: number) => {
  const [res1, res2] = await Promise.all([
    fetch(`${BASE_URL}/person/${id1}/combined_credits?api_key=${API_KEY}`),
    fetch(`${BASE_URL}/person/${id2}/combined_credits?api_key=${API_KEY}`),
  ]);

  if (!res1.ok || !res2.ok) throw new Error("Failed to fetch common projects");

  const [data1, data2] = await Promise.all([res1.json(), res2.json()]);

  // Save to files for debugging
  fs.writeFileSync(
    path.join(process.cwd(), "res1.json"),
    JSON.stringify(data1, null, 2)
  );
  fs.writeFileSync(
    path.join(process.cwd(), "res2.json"),
    JSON.stringify(data2, null, 2)
  );

  return data1.cast
    .filter((movie: any) =>
      data2.cast.some((m: any) => m.id === movie.id && movie.release_date) // Ensure a valid release date
    )
    .sort(
      (a: any, b: any) =>
        new Date(b.release_date).getTime() - new Date(a.release_date).getTime()
    );
};
