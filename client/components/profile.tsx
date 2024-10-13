import { Contact, Info, WandSparkles } from "lucide-react";
import { AskForIntro } from "./ask-for-intro";
import { ExpertiseChips } from "./expertise-chips";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

export function Profile({ profile }: any) {
  return (
    <>
      <header className="border-b p-6">
        <div className="flex gap-6 items-center">
          <Avatar className="w-24 h-24">
            <AvatarImage src={profile.finalImageUrl} />
            <AvatarFallback>
              {profile?.name?.replaceAll(".", "").replaceAll(" ", "")}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="text-2xl font-bold">{profile.name}</h3>
          </div>
        </div>
        <div className="mt-8">
          <div className="flex items-start">
            <div className="flex items-center w-36">
              <Contact className="mr-1 w-4 h-4" />
              <p className="text-sm">Commitment</p>
            </div>
            <div className="flex space-x-2">
              {profile.fullTime === 1 && (
                <p className="text-sm">
                  <Badge variant="outline">Full-time</Badge>
                  {/* {profile.fullTimePrice} / month */}
                </p>
              )}
              {profile.partTime === 1 && (
                <p className="text-sm">
                  <Badge variant="outline">Part-time</Badge>
                  {/* {profile.partTimePrice} / month */}
                </p>
              )}
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button>
                      <Badge variant="outline" className="flex items-center">
                        {profile.fullTime === 1
                          ? Array(
                              Math.min(
                                4,
                                Math.ceil(profile.fullTimePrice / 3000)
                              )
                            )
                              .fill("$")
                              .join("")
                          : Array(
                              Math.min(
                                4,
                                Math.ceil(profile.partTimePrice / 3000)
                              )
                            )
                              .fill("$")
                              .join("")}
                        <Info className="w-4 h-4 ml-1" />
                      </Badge>
                    </button>
                  </TooltipTrigger>
                  <TooltipContent className="p-2 space-y-1">
                    <div className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">$</Badge>
                        <span className="text-sm">&lt;$3k/mo</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">$$</Badge>
                        <span className="text-sm">$3k-$6k/mo</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">$$$</Badge>
                        <span className="text-sm">$6k-$10k/mo</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Badge variant="outline">$$$$</Badge>
                        <span className="text-sm">&gt;$10k/mo</span>
                      </div>
                    </div>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div className="flex items-center mt-6">
            <div className="flex items-center w-36 flex-shrink-0">
              <WandSparkles className="mr-1 w-4 h-4" />
              <p className="text-sm">Expertise</p>
            </div>
            <ExpertiseChips skills={profile.skills} />
          </div>
          <div className="mt-8 space-x-2">
            <AskForIntro profile={profile} />
          </div>
        </div>
      </header>
      <div className="p-6 border-b">
        <h1 className="text-2xl font-bold mb-4">Video Recording</h1>
        <video src={profile.interviews[0].videoRecording} controls />
      </div>
      <div className="p-6 pb-0 border-b">
        <h1 className="text-2xl font-bold mb-4">Work Experience</h1>
        {profile.workExperience.map((experience: any, index: number) => (
          <div key={index}>
            <div className="relative flex items-start space-x-4">
              <div className="absolute left-[35px] bg-border h-full w-[1px]"></div>
              <Avatar>
                <AvatarImage src={experience.companyLogo} />
                <AvatarFallback>{experience.company[0]}</AvatarFallback>
              </Avatar>
              <div className="pb-8">
                <h2 className="text-lg font-bold">{experience.role}</h2>
                <p className="mt-1">{experience.company}</p>
                <p className="text-sm mt-1">
                  {experience.startDate || "Unspecified"} –{" "}
                  {experience.endDate || "Present"}
                </p>
                <p className="text-sm mt-4">{experience.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="p-6 pb-0 border-b">
        <h1 className="text-2xl font-bold mb-4">Education</h1>
        {profile.education.map((education: any, index: number) => (
          <div key={index}>
            <div className="relative flex items-start space-x-4">
              <div className="absolute left-[35px] bg-border h-full w-[1px]"></div>
              <Avatar>
                <AvatarImage src={education.schoolLogo} />
                <AvatarFallback>{education.school[0]}</AvatarFallback>
              </Avatar>
              <div className="pb-8">
                <h2 className="text-lg font-bold">{education.major}</h2>
                <p className="mt-1">{education.school}</p>
                <p className="text-sm mt-1">
                  {education.startDate || "Unspecified"} –{" "}
                  {education.endDate || "Present"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
}
