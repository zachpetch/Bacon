export const fetchPerson = async (query: string) => {
    const res = await fetch(
        `https://api.themoviedb.org/3/search/person?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}&query=${query}`
    );
    return res.json();
};

export const fetchCommonProjects = async (id1: number, id2: number) => {
    const res1 = await fetch(
        `https://api.themoviedb.org/3/person/${id1}/combined_credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );
    const res2 = await fetch(
        `https://api.themoviedb.org/3/person/${id2}/combined_credits?api_key=${process.env.NEXT_PUBLIC_TMDB_API_KEY}`
    );

    const data1 = await res1.json();
    const data2 = await res2.json();

    return data1.cast.filter((movie: any) =>
        data2.cast.some((m: any) => m.id === movie.id)
    );
};
