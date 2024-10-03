"""Welcome to Reflex! This file outlines the steps to create a basic app."""

import reflex as rx

from rxconfig import config

from mercor_api import MercorAPI
from mercor_api import HEADERS
from mercor_api import UserProfile

api = MercorAPI(headers=HEADERS)


def format_profile(profile: UserProfile) -> rx.Component:
    """
    Format a single profile using Reflex components.
    """
    return rx.box(
        rx.hstack(
            rx.avatar(
                name=profile.name,
                src=str(profile.profilePic),
                size="xl",
            ),
            rx.vstack(
                rx.heading(profile.name, size="lg"),
                rx.text(f"{profile.yearsOfWorkExperience} years of experience"),
                rx.text(f"Country: {profile.country or 'Not specified'}"),
                align_items="start",
            ),
            width="100%",
            spacing="4",
        ),
        rx.divider(),
        rx.text(profile.summary, font_style="italic"),
        rx.divider(),
        rx.heading("Skills", size="md"),
        rx.box(
            *[rx.badge(skill, variant="solid", color_scheme="blue") for skill in (profile.skills or [])],
            display="flex",
            flex_wrap="wrap",
            gap="2",
        ),
        rx.divider(),
        rx.heading("Video Recording", size="md"),
        # Conditionally render the video component if videoRecording exists
        rx.video(
            url=str(profile.interviews[0].videoRecording) if profile.interviews else None,
            width="100%",
            height="400px",
        ),
        rx.divider(),
        rx.heading("Work Experience", size="md"),
        rx.vstack(
            *[
                rx.box(
                    rx.heading(exp.role, size="sm"),
                    rx.text(f"{exp.company} • {exp.startDate} - {exp.endDate or 'Present'}"),
                    rx.text(exp.description),
                    margin_bottom="2",
                )
                for exp in profile.workExperience
            ],
            align_items="start",
        ),
        rx.divider(),
        rx.heading("Education", size="md"),
        rx.vstack(
            *[
                rx.box(
                    rx.heading(f"{edu.degree} in {edu.major}", size="sm"),
                    rx.text(f"{edu.school} • {edu.startDate} - {edu.endDate or 'Present'}"),
                    margin_bottom="2",
                )
                for edu in profile.education
            ],
            align_items="start",
        ),
        rx.divider(),
        rx.heading("Additional Information", size="md"),
        rx.text(f"Full Time Price: {profile.fullTimePrice or None}"),
        rx.text(f"Part Time Price: {profile.partTimePrice or 'Not specified'}"),
        border_width="1px",
        border_radius="md",
        border_color="gray.200",
    )


class State(rx.State):
    """The app state."""

    search_query: str = "front end designer"

    def handle_search(self, value: str):
        self.search_query = value



def index() -> rx.Component:
    # Welcome Page (Index)
    """
    The main function to render all candidate profiles.
    """
    return rx.container(
        rx.input(
            placeholder="Search for a candidate...",
            on_change=State.handle_search,
        ),
        rx.vstack(
            *[format_profile(profile) for profile in api.search_profiles(search_string=State.search_query)],
            spacing="20px",
            align_items="start"
        ),
        width="80%",
        padding="20px"
    )
    # return rx.container(
    #     rx.color_mode.button(position="top-right"),
    #     rx.vstack(
    #         rx.heading("Welcome to Reflex!", size="9"),
    #         rx.text(
    #             "Get started by editing ",
    #             rx.code(f"{config.app_name}/{config.app_name}.py"),
    #             size="5",
    #         ),
    #         rx.link(
    #             rx.button("Check out our docs!"),
    #             href="https://reflex.dev/docs/getting-started/introduction/",
    #             is_external=True,
    #         ),
    #         spacing="5",
    #         justify="center",
    #         min_height="85vh",
    #     ),
    #     rx.logo(),
    # )


app = rx.App()
app.add_page(index)
