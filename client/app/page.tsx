"use client";

import { QueryFunctionContext, useMutation } from "@tanstack/react-query";
import { Loader2, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { SearchResultCard } from "../components/search-result";
import { Profile } from "../components/profile";
import Image from "next/image";
import Logo from "./logo.png";

// const queryFn = async ({ queryKey }: QueryFunctionContext) => {
//   const [url] = queryKey;
//   const response = await fetch(url as string);
//   return response.json();
// };

export default function Home() {
  const [search_string, set_search_string] = useState("ai developers");
  const [selected_profile, set_selected_profile] = useState<number>(-1);

  const mutation = useMutation({
    mutationFn: async (query: string) => {
      let response = await fetch("http://127.0.0.1:5000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ search_string: query, count: 25 }),
      });
      let data = await response.json();
      return data.map(JSON.parse);
    },
  });

  useEffect(() => {
    mutation.mutate("ai developers");
  }, []);

  return (
    <div className="flex min-h-screen">
      <aside className="p-6 max-w-sm w-full border-r">
        <Image src={Logo} alt="logo" width={1136 / 12} height={416 / 12} />
        <form
          className="flex w-full items-center space-x-2 mt-4"
          onSubmit={(e) => {
            e.preventDefault();
            mutation.mutate(search_string);
          }}
        >
          <Input
            placeholder="Search people..."
            value={search_string}
            onChange={(e) => set_search_string(e.target.value)}
            disabled={mutation.isPending}
          />
          <Button
            size="icon"
            className="flex-shrink-0"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Search className="w-4 h-4" />
            )}
          </Button>
        </form>
        <ul className="mt-6 flex flex-col gap-6">
          {mutation.data?.map((result: any, index: number) => (
            <SearchResultCard
              onClick={() => {
                set_selected_profile(index);
              }}
              key={index}
              profile={result}
            />
          ))}
          <SearchResultCard />
        </ul>
      </aside>
      <main className="w-full">
        {selected_profile !== -1 && mutation.isSuccess && (
          <Profile profile={mutation.data?.at(selected_profile)} />
        )}
      </main>
    </div>
  );
}
