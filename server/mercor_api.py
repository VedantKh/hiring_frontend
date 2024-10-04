import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import List, Optional, Union
from pydantic import BaseModel, HttpUrl

class UserProfileShort(BaseModel):
    profilePic: Optional[HttpUrl] = None
    userId: str
    name: str
    yearsOfWorkExperience: int
    skills: List[str] = []
    summary: str
    fullTime: int
    fullTimeAvailability: Optional[int] = None
    fullTimePrice: Optional[int] = None
    partTime: Optional[int] = None
    partTimeAvailability: Optional[int] = None
    country: Optional[str] = None
    generativeProfilePicOptedIn: int
    finalImageUrl: Optional[HttpUrl] = None
    resumeId: str

class TranscriptEntry(BaseModel):
    timestamp: str
    dialogue: str
    speaker: str
    relative_timestamp: str

class Interview(BaseModel):
    videoRecording: HttpUrl
    interviewId: str
    interviewType: str
    interviewer: Optional[str]
    title: str
    description: str
    transcript: List[TranscriptEntry]

class WorkExperience(BaseModel):
    workExperienceId: str
    company: str
    startDate: Optional[str]
    endDate: Optional[str]
    description: str
    locationCity: Optional[str]
    locationCountry: Optional[str]
    resumeId: str
    role: str
    companyLogo: Optional[Union[HttpUrl, str]]
    linkedInUrl: Optional[Union[HttpUrl, str]]
    companyWebsite: Optional[str]
    isCompanyInWest: int
    isStartupFounder: int
    rateGrammar: Optional[int]
    yearsWorked: Optional[int]
    work_exp: Optional[int]

class Education(BaseModel):
    educationId: str
    degree: Optional[str]
    major: Optional[str]
    startDate: Optional[str]
    endDate: Optional[str]
    grade: Optional[str]
    resumeId: str
    school: str
    linkedInUrl: Optional[Union[HttpUrl, str]]
    schoolLogo: Optional[Union[HttpUrl, str]]
    isUniversityInWest: int
    rateGPA: Optional[int]
    uni: Optional[int]
    deg: Optional[int]

class Award(BaseModel):
    awardId: str
    description: str

class Project(BaseModel):
    projectId: str
    title: str
    description: str

class GithubData(BaseModel):
    total: dict
    contributions: List[dict]

class UserProfile(BaseModel):
    profilePic: Optional[HttpUrl]
    userId: str
    name: str
    resumeId: str
    yearsOfWorkExperience: int
    skills: Optional[List[str]]
    summary: str
    fullTime: Optional[int]
    fullTimeAvailability: Optional[int]
    fullTimePrice: Optional[int]
    partTime: Optional[int]
    partTimeAvailability: Optional[int]
    partTimePrice: Optional[int]
    interviews: List[Interview]
    country: Optional[str]
    generativeProfilePicOptedIn: Optional[int]
    finalImageUrl: Optional[Union[HttpUrl, str]]
    phone: Optional[str]
    email: Optional[str]
    githubUsername: Optional[str]
    linkedin: Optional[Union[HttpUrl, str]]
    awards: List[Award]
    workExperience: List[WorkExperience]
    education: List[Education]
    projects: List[Project]
    githubData: Optional[GithubData]
    githubEvalScore: Optional[float]
    tags: List[str]

class MercorAPI:
    def __init__(self, headers):
        self.headers = headers
        self.ENDPOINT = 'https://aws.api.mercor.com'

    def search(self, search_string, monthly_budget_dollars=7500, experience=0, work_type="both", work_availability=4, count=10):
        json_params = {
            'searchString': search_string,
            'budget': monthly_budget_dollars,
            'workType': work_type,
            'workAvailability': work_availability,
            'experience': experience,
            'email': 'daniel@mercor.com',
            'jobs': [],
            'customInterviewId': '',
            'searchAll': False,
            'count': count,
        }
        path = "/team/public/search"
        json_result = requests.post(self.ENDPOINT + path, headers=self.headers, json=json_params).json()
        return [UserProfileShort(**profile) for profile in json_result]

    def profile(self, user_id="48be5c0e-3239-11ef-ae42-42010a400fc4"):
        params = {
            'type': 'shortlist',
        }
        path = "/team/profile"
        json_result = requests.get(
            self.ENDPOINT + path + "/" + user_id,
            params=params,
            headers=self.headers,
        ).json()
        return UserProfile(**json_result)

    @classmethod
    def profile_pretty(cls, user_profile: UserProfile):
        # user_profile_dict = {
        #     "user_id":user_profile.userId,
        #     "name":user_profile.name,
        #     "video_recording": user_profile.interviews[0].videoRecording if user_profile.interviews else None,
        #     "years_of_work_experience": user_profile.yearsOfWorkExperience,
        #     "education": user_profile.education,
        #     "github_data": user_profile.githubData,
        #     "country": user_profile.country,
        #     "full_time_price": user_profile.fullTimePrice,
        #     "skills": user_profile.skills,
        #     "summary": user_profile.summary,
        #     "work_experience": user_profile.workExperience,
        #     "projects": user_profile.projects,
        #     "awards": user_profile.awards
        # }
        user_profile_dict = {
            "user_id": user_profile.userId,
            "name": user_profile.name,
            "video_recording": user_profile.interviews[0].videoRecording if user_profile.interviews else None,
            "years_of_work_experience": user_profile.yearsOfWorkExperience,
            "education": [education.model_dump() for education in user_profile.education],
            "github_data": user_profile.githubData,
            "country": user_profile.country,
            "full_time_price": user_profile.fullTimePrice,
            "skills": user_profile.skills,
            "summary": user_profile.summary,
            "work_experience": [work_experience.model_dump() for work_experience in user_profile.workExperience],
            "projects": [project.model_dump() for project in user_profile.projects],
            "awards": [award.model_dump() for award in user_profile.awards]
        }
        return user_profile_dict

    def search_profiles(self, parallel=True, *args, **kwargs) -> List[UserProfile]:
        short_profiles = self.search(*args, **kwargs)
        if parallel:
            with ThreadPoolExecutor() as executor:
                futures = {executor.submit(self.profile, short_profile.userId): short_profile for short_profile in short_profiles}
                results = []
                for future in as_completed(futures):
                    try:
                        results.append(future.result())
                    except Exception as e:
                        print(f"Error fetching profile: {e}")
                return results
        else:
            return [self.profile(short_profile.userId) for short_profile in short_profiles]