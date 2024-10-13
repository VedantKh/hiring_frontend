"use client";

import Logo from "@/app/logo.png";
import Image from "next/image";

import { useParams } from "next/navigation";
import { Profile } from "../../../components/profile";

import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

export default function ProfilePage() {
  const { id } = useParams();

  const fetchProfile = async (id: string) => {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/${id}`
    );
    if (!response.ok) {
      throw new Error("Failed to fetch profile");
    }
    return response.json();
  };

  const { data: profileData } = useQuery({
    queryKey: ["profile", id],
    queryFn: () => fetchProfile(id as string),
    enabled: !!id,
  });

  if (profileData) {
    return (
      <div className="max-w-4xl mx-auto py-10">
        <div className="p-6">
          <Link href="/">
            <Image src={Logo} alt="logo" width={1136 / 12} height={416 / 12} />
          </Link>
        </div>
        <Profile profile={profileData} />
      </div>
    );
  }
}
