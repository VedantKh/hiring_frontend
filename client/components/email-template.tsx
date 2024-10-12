import * as React from "react";
import { FormSchema } from "./ask-for-intro";
import { z } from "zod";

export interface EmailTemplateProps extends z.infer<typeof FormSchema> {
  candidateName: string;
  candidateUserId: string;
  candidateSkills: string[];
}

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  email,
  phone,
  companyName,
  companyWebsite,
  commitment,
  jobSummary,
  schedulingInstructions,
  termsAgreement,
  candidateName,
  candidateUserId,
  candidateSkills,
}) => (
  <div>
    <h1>Introduction Request Report for {candidateName}</h1>
    <p>
      A new introduction request has been submitted. Please review the details
      below:
    </p>

    <h2>Requester Information:</h2>
    <ul>
      <li>
        <strong>Name:</strong> {firstName} {lastName}
      </li>
      <li>
        <strong>Email:</strong> {email}
      </li>
      <li>
        <strong>Phone:</strong> {phone}
      </li>
    </ul>

    <h2>Company Details:</h2>
    <ul>
      <li>
        <strong>Company Name:</strong> {companyName}
      </li>
      <li>
        <strong>Company Website:</strong>{" "}
        <a href={companyWebsite}>{companyWebsite}</a>
      </li>
    </ul>

    <h2>Job Information:</h2>
    <ul>
      <li>
        <strong>Preferred Commitment:</strong> {commitment}
      </li>
      <li>
        <strong>Job Summary:</strong> {jobSummary}
      </li>
    </ul>

    <h2>Candidate Information:</h2>
    <ul>
      <li>
        <strong>Candidate Name:</strong> {candidateName}
      </li>
      <li>
        <strong>Candidate User ID:</strong> {candidateUserId}
      </li>
      <li>
        <strong>Candidate Skills:</strong> {candidateSkills.join(", ")}
      </li>
    </ul>

    <h2>Additional Information:</h2>
    <p>
      <strong>Scheduling Instructions:</strong> {schedulingInstructions}
    </p>
    <p>
      <strong>Terms Agreement:</strong>{" "}
      {termsAgreement ? "Accepted" : "Not Accepted"}
    </p>
  </div>
);
