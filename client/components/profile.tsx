import { Contact, WandSparkles } from "lucide-react";
import { AskForIntro } from "./ask-for-intro";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { ExpertiseChips } from "./expertise-chips";

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
