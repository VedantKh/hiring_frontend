import { useState } from "react";
import { Badge } from "./ui/badge";

interface ExpertiseChipsProps {
  skills: string[];
}

export function ExpertiseChips({ skills }: ExpertiseChipsProps) {
  const [showAll, setShowAll] = useState(false);

  const displayedSkills = showAll ? skills : skills.slice(0, 3);

  return (
    <div className="flex gap-2 flex-wrap mt-2">
      {displayedSkills.map((skill, index) => (
        <Badge key={index}>{skill}</Badge>
      ))}
      {skills.length > 3 && (
        <Badge
          variant="outline"
          className="cursor-pointer"
          onClick={() => setShowAll(!showAll)}
        >
          {showAll ? "Show less" : `+${skills.length - 3} more`}
        </Badge>
      )}
    </div>
  );
}
