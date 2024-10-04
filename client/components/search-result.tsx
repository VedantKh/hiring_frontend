import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "./ui/badge";

export function SearchResultCard({ profile, onClick }: any) {
  if (profile)
    return (
      <button
        onClick={onClick}
        className="text-left border rounded transition focus:ring-2 focus:ring-ring focus:ring-offset-2 ring-offset-background"
      >
        <div className="p-4">
          <div className="flex gap-2 items-center">
            <Avatar>
              <AvatarImage src={profile.finalImageUrl} />
              <AvatarFallback>
                {profile?.name?.replaceAll(".", "").replaceAll(" ", "")}
              </AvatarFallback>
            </Avatar>
            <div>
              <h3 className="font-bold">{profile.name}</h3>
              <p className="text-sm">
                {profile.yearsOfWorkExperience} years of experience ‧{" "}
                {profile.country}
              </p>
            </div>
          </div>
          <p className="text-sm mt-4">{profile.summary}</p>
        </div>
        <div className="p-4 border-t">
          <div className="mb-4">
            <h4 className="text-sm">Expertise</h4>
            <div className="flex gap-2 flex-wrap mt-2">
              {profile.skills?.map((skill: string, index: number) => (
                <Badge key={index}>{skill}</Badge>
              ))}
            </div>
          </div>
          <div>
            <h4 className="text-sm">Commitment</h4>
            <div className="flex gap-2 flex-wrap mt-2">
              {profile.fullTime === 1 && (
                <Badge variant="secondary">Full-time</Badge>
              )}
              {profile.partTime === 1 && (
                <Badge variant="secondary">Part-time</Badge>
              )}
            </div>
          </div>
        </div>
      </button>
    );
}
