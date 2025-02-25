"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar() {
    const [query, setQuery] = useState("");
    const router = useRouter();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        router.push(`/search?q=${encodeURIComponent(query)}`);
    };

    return (
        <form onSubmit={handleSearch} className="flex gap-2 p-4">
            <input
                type="text"
                className="border rounded p-2 w-full"
                placeholder="Search for an actor, or 'Actor1 and Actor2'"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
            />
            <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">
                Search
            </button>
        </form>
    );
}
