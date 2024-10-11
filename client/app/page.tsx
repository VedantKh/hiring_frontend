"use client";

import { create } from "zustand";
import { CandidateSearch } from "../components/candidate-search";
import { useMutation } from "@tanstack/react-query";
import { useEffect } from "react";
import { Profile } from "../components/profile";

interface ProfileStore {
  selectedProfile: number;
  setSelectedProfile: (index: number) => void;
}

export const useProfileStore = create<ProfileStore>((set) => ({
  selectedProfile: -1,
  setSelectedProfile: (index) => set({ selectedProfile: index }),
}));

export default function Home() {
  const selected_profile = useProfileStore((state) => state.selectedProfile);

  const mutation = useMutation({
    mutationFn: async (data: any) => {
      let response = await fetch("http://127.0.0.1:5000/search", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data }),
      });
      let res = await response.json();
      return res.map(JSON.parse);
    },
  });

  useEffect(() => {
    mutation.mutate("ai developers");
  }, []);

  return (
    <div className="flex min-h-screen min-w-screen">
      <aside className="p-6 max-w-sm w-full border-r">
        <CandidateSearch mutation={mutation} />
      </aside>
      <main className="w-full">
        {selected_profile !== -1 && mutation.isSuccess && (
          <Profile profile={mutation.data?.at(selected_profile)} />
        )}
      </main>
    </div>
  );
}
