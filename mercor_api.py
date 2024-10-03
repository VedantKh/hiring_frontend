import requests
from concurrent.futures import ThreadPoolExecutor, as_completed
from typing import List, Optional, Union
from pydantic import BaseModel, HttpUrl
from pprint import pprint

# Headers with the provided details
HEADERS = {
    'accept': '*/*',
    'accept-language': 'en-US,en;q=0.9',
    'authorization': 'Bearer',
    'content-type': 'application/json',
    'origin': 'https://team.mercor.com',
    'priority': 'u=1, i',
    'referer': 'https://team.mercor.com/',
    'sec-ch-ua': '"Google Chrome";v="129", "Not=A?Brand";v="8", "Chromium";v="129"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-site',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/129.0.0.0 Safari/537.36',
    'x-company-id': '',
}

# short version of the user profile containing basic information
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

# Transcript of the interview with the candidate
class TranscriptEntry(BaseModel):
    timestamp: str
    dialogue: str
    speaker: str
    relative_timestamp: str

# Interview recording with the candidate + transcript
class Interview(BaseModel):
    videoRecording: HttpUrl
    interviewId: str
    interviewType: str
    interviewer: Optional[str]
    title: str
    description: str
    transcript: List[TranscriptEntry]

# World experience details
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

# Education details
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

# Awards received by the candidate
class Award(BaseModel):
    awardId: str
    description: str

# Project details
class Project(BaseModel):
    projectId: str
    title: str
    description: str

# Github data for the candidate
class GithubData(BaseModel):
    total: dict
    contributions: List[dict]

# Full version of the user profile containing detailed information
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

# main class that handles interactions with the Mercor API
class MercorAPI:

    def __init__(self, headers):
        self.headers = headers
        self.ENDPOINT = 'https://aws.api.mercor.com'

    # Method to search for profiles based on a search string and other parameters
    def search(self, search_string, monthly_budget_dollars=7500, experience=0, work_type="both", work_availability=4, count=10):

        # define the payload to be sent in the POST request for searching profiles
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

        # Changed search path
        path = "/team/public/search"

        # Send the POST request to the API endpoint and return a list of short profiles
        json_result = requests.post(self.ENDPOINT + path, headers=self.headers, json=json_params).json()
        return [UserProfileShort(**profile) for profile in json_result]

    # Method to fetch the full profile of a user based on the user_id
    def profile(self, user_id="48be5c0e-3239-11ef-ae42-42010a400fc4"):

        # define the parameters to be sent in the GET request for fetching the profile
        params = {
            'type': 'shortlist',
        }

        # path for profile endpoint
        path = "/team/profile"

        # Send the GET request to the API endpoint and return the full profile
        json_result = requests.get(
            self.ENDPOINT + path + "/" + user_id,
            params=params,
            headers=self.headers,
        ).json()

        return UserProfile(**json_result)

    # class method to pretty print the profile details
    @classmethod
    def profile_pretty(cls, user_profile: UserProfile):

        # create a dictionary with key user profile details
        user_profile_dict = {
            "user_id":user_profile.userId,
            "name":user_profile.name,
            "video_recording": user_profile.interviews[0].videoRecording if user_profile.interviews else None,
            "years_of_work_experience": user_profile.yearsOfWorkExperience,
            "education": user_profile.education,
            "github_data": user_profile.githubData,
            "country": user_profile.country,
            "full_time_price": user_profile.fullTimePrice,
            "skills": user_profile.skills,
            "summary": user_profile.summary,
            "work_experience": user_profile.workExperience,
            "projects": user_profile.projects,
            "awards": user_profile.awards
        }
       
        return user_profile_dict

    # Method to search for profiles and fetch their full details in parallel or sequentially
    def search_profiles(self, parallel=True, *args, **kwargs) -> List[UserProfile]:
        # Perform the search operation to get a list of short profiles
        short_profiles = self.search(*args, **kwargs)
       
        if parallel:
            # Using ThreadPoolExecutor for parallel execution
            with ThreadPoolExecutor() as executor:
                # Submitting the profile tasks to the executor
                futures = {executor.submit(self.profile, short_profile.userId): short_profile for short_profile in short_profiles}
               
                # Collecting the results as they complete
                results = []
                for future in as_completed(futures):
                    try:
                        results.append(future.result())
                    except Exception as e:
                        # Handle any exceptions raised during profile fetching
                        print(f"Error fetching profile: {e}")
               
                return results
        else:
            # Sequential execution if parallel is set to False
            return [self.profile(short_profile.userId) for short_profile in short_profiles]


# api = MercorAPI(headers=HEADERS)

# profiles = api.search_profiles(search_string="python developer", count=1)

# for profile in profiles:
#     pprint(MercorAPI.profile_pretty(profile))

