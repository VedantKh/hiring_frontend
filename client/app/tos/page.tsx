import Image from "next/image";
import Link from "next/link";
import Logo from "@/app/logo.png";

export default function TermsOfService() {
  return (
    <div className="max-w-4xl mx-auto py-10">
      <div className="p-6">
        <Link href="/">
          <Image src={Logo} alt="logo" width={1136 / 12} height={416 / 12} />
        </Link>
      </div>
      <div className="p-6">
        <h1 className="text-3xl font-bold mb-6">
          Algoro Client Terms of Service
        </h1>
        <p className="mb-6">
          This Agreement is made between the entity or individual receiving
          services ("Client") and Algoro.ai Corporation ("Algoro"). Algoro will
          provide recruitment services for the Client, which include
          identifying, evaluating, and presenting potential candidates
          ("Candidates") for work to the Client.
        </p>
        <ol className="text-xl list-decimal list-outside pl-6 space-y-6">
          <li>
            <h2 className="font-semibold mb-2">Non-circumvention</h2>
            <p className="text-base">
              The Client acknowledges that Algoro has a proprietary interest in
              the relationships it forms with the candidates it identifies and
              presents to the Client. The Client agrees that it will not, under
              any circumstances, directly or indirectly hire, solicit, entice
              away, or establish direct compensation structures with any
              candidate presented by Algoro without obtaining the express
              written permission of Algoro. Any violation of this provision
              shall be considered a material breach of this Agreement and will
              result in immediate termination and liability for damages.
            </p>
          </li>
          <li className="text-xl">
            <h2 className="font-semibold mb-2">No Data Extraction</h2>
            <p className="text-base">
              The Client agrees that it will not extract any data from the
              Algoro platform, including but not limited to, scraping user data,
              resumes, or interview information. The Client may only view
              information on the platform and may not copy, download, or
              otherwise remove any data from the Algoro system. Unauthorized
              data extraction constitutes theft of Algoro's proprietary
              information and will be prosecuted to the fullest extent of the
              law.
            </p>
          </li>
          <li className="text-xl">
            <h2 className="font-semibold mb-2">Salary Negotiations</h2>
            <p className="text-base">
              The Client agrees that it will not negotiate salaries directly
              with candidates. If the Client would like an adjustment to a
              candidate's salary, the Client must discuss this with Algoro.
              Algoro will handle all salary negotiations with candidates to
              ensure fairness and consistency.
            </p>
          </li>
          <li className="text-xl">
            <h2 className="font-semibold mb-2">Recruiting Fee</h2>
            <p className="text-base">
              If the Client chooses to pay any candidate directly through a
              direct relationship instead of paying the candidate through
              Algoro, for any candidate that they have sourced from Algoro or
              the Algoro platform in any way, the Client agrees to pay a
              recruiting fee. The recruiting fee is typically equal to 30
              percent of the annual subscription amount, as determined by
              Algoro. However, Algoro reserves the right to adjust this
              percentage at its sole discretion, based on factors including but
              not limited to, industry norms, geographic location, and the
              candidate's skills, experience, and education. The Client
              acknowledges that Algoro's determination of the recruiting fee
              amount is final and binding.
            </p>
          </li>
          <li className="text-xl">
            <h2 className="font-semibold mb-2">Payment</h2>
            <p className="text-base">
              Upon hiring a candidate presented by Algoro, the Client shall pay
              the recruiting fee within 30 days of the candidate's start date.
              If the Client fails to make payment within this period, interest
              will accrue on the unpaid amount at the rate of 1.5% per month or
              the maximum allowed by law, whichever is less.
            </p>
          </li>
          <li className="text-xl">
            <h2 className="font-semibold mb-2">Removal from Platform</h2>
            <p className="text-base">
              Algoro reserves the right to remove the Client from the Algoro
              platform at any time, at Algoro's sole discretion. Reasons for
              removal may include, but are not limited to, failure to make
              payments, late payments, mistreatment of contractors, violation of
              these terms of service, or any other reason as determined by
              Algoro. If the Client is removed from the platform, the Client
              will still be responsible for any outstanding fees owed to Algoro.
            </p>
          </li>
          <li className="text-xl">
            <h2 className="font-semibold mb-2">Indemnity</h2>
            <p className="text-base">
              Each party agrees to indemnify and hold harmless the other party,
              its employees, officers, directors, and agents from any and all
              claims, liabilities, damages, and expenses arising out of or
              relating to its respective performance of this Agreement.
            </p>
          </li>
          <li className="text-xl">
            <h2 className="font-semibold mb-2">Modification of Terms</h2>
            <p className="text-base">
              Algoro reserves the right to modify these terms of service at any
              time, at Algoro's sole discretion. The Client agrees to review
              these terms periodically and remain informed of any changes.
              Continued use of the Algoro platform constitutes acceptance of any
              updated terms.
            </p>
          </li>
        </ol>
      </div>
    </div>
  );
}
