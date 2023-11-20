"use client";
import { Homeform } from "@/app/components/LayoutNew/Homeform";
import React from "react";
import { useRef } from "react";

const page = () => {
  const ref = useRef(null);
  return (
    <div className="privacypolicy_page">
      <div className=" bg-white py-4 ">
        <div className="my-8 mx-auto max-w-[80%]">
          <h2 className="block !font-[700] text-2xl md:text-[38px]   text-center my-[1rem] md:my-8 relative text-heading md:leading-[3rem]">
            DATA PROCESSING ADDENDUM{" "}
          </h2>

          <p className="text-base sm:text-[24px] sm:leading-8 mb-3 ">
            {" "}
            This Data Processing Addendum (“DPA”) is incorporated by reference
            into and made a part of the Terms of Service entered into between
            Deflection Labs, Inc. (“Deflection AI”) and an individual or entity that
            accepted the Terms of Service(“Customer”) (the “TOS” or
            “Agreement”). This DPA sets forth certain duties and obligations of
            the Parties with respect to the protection, security, processing,
            and privacy of Personal Data provided or made available to Deflection AI by
            Customer as part of the Service provided by Tempoto Customer under
            the Agreement. In the event of a conflict between the provisions of
            the Agreement and this DPA, the terms and conditions of the DPAshall
            take precedence with respect to the subject matter of this DPA. All
            capitalized terms used and not expressly defined in this DPA shall
            have the meanings given to them in the Agreement. Deflection AI and Customer
            are each a “Party” and together the “Parties”.
          </p>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3 ">
            {" "}
            In the course of providing the Services to Customer pursuant to the
            Agreement, Deflection AI may Process certain Personal Data provided or made
            available to Deflection AI by Customer on behalf of Customer and the Parties
            agree to comply with the following provisions with respect to any
            such Personal Data, each acting reasonably and in good faith. The
            following obligations shall only apply to the extent required by
            Data Protection Laws and Regulations (as defined below) with regard
            to the relevant Personal Data (as defined below), if applicable.
          </p>
          <h2 className="text-lg sm:text-lg md:text-lg lg:text-lg sm:leading-8 my-2 sm:my-6 font-semibold text-heading">
            1. DEFINITIONS{" "}
          </h2>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">1.1 “CCPA”</span> means
            the California Consumer Privacy Act of 2018, Cal. Civ. Code §§
            1798.100 et seq., and its implementing regulations as amended by the
            California Privacy Rights Act.
          </p>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">1.2 “Controller”</span>
            means the natural or legal person, public authority, agency, or
            entity that determines the purposes and means of the Processing of
            Customer Data.
          </p>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">
              1.3 “Customer Data”
            </span>
            is defined in the Agreement as “Customer Data”.
          </p>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">
              1.4 “Data Protection Laws and Regulations”
            </span>
            means all applicable data privacy and security laws and regulations,
            including (a) the CCPA, and (b) anyother applicable national rule
            and legislation on the protection of Personal Data in the United
            States thatisalready in force or that will come into force during
            the term of this DPA.
          </p>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">
              1.5 “Data Subject”
            </span>
            the identified or identifiable person to whom Personal Data relates.
          </p>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">1.6 “EEA”</span> means
            the European Economic Area.
          </p>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">
              1.7 “Personal Data”{" "}
            </span>{" "}
            means information that identifies, relates to, describes, is
            reasonably capable of being associated with, or could reasonably be
            linked, directly or indirectly, with a particular individual or
            household contained in Customer Data that is uploaded or submitted
            to the Services by Customer.
          </p>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">
              1.8 “Process” or “Processing”
            </span>{" "}
            means any operation or set of operations performed on behalf of
            Controller on Personal Data or on sets of Personal Data, whether or
            not by automated means, such as, but not limited to, collection,
            recording, organization, structuring, storage, adaptation or
            alteration, retrieval, consultation, use, disclosure by
            transmission, dissemination or otherwise making available, alignment
            or combination, restriction, erasure or destruction, and shall be
            meant to include any different but similar term used in the Data
            Protection Laws and Regulations.
          </p>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">1.9 “Processor”</span>{" "}
            means a natural or legal person, public authority, agency, or entity
            that Processes Customer Data on behalf of the Controller.
          </p>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">
              1.10 “Security Documentation”
            </span>{" "}
            means Deflection AI’s Data Security Safeguards Policy which isavailable at{" "}
            <span className="text-[blue]">
              https://usetempo.ai/article/security-overview
            </span>
          </p>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">
              1.11 "Sensitive Data{" "}
            </span>{" "}
            means (a) social security number, passport number, driver's license
            number, or similar identifier (or any portion thereof), (b) credit
            or debit card number (other than the truncated (last four digits) of
            a credit or debit card), (c) employment, financial, genetic,
            biometric or health information; (d) racial, ethnic, political or
            religious affiliation, trade union membership, or information about
            sexual life or sexual orientation; (e) account passwords; (f) date
            of birth; (g) criminal history; (h) mother's maiden name; and (i)
            any other information that falls within the definition of "special
            categories of data" or “sensitive data” under Data Protection Laws
            and Regulations.
          </p>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">
              1.12 “Sub-processor”
            </span>{" "}
            means any Processor engaged by Deflection AI.
          </p>
          <h2 className="block !font-[700] text-2xl md:text-[38px]   text-center my-[1rem] md:my-8 relative text-heading md:leading-[3rem]">
            2. PROCESSING OF PERSONAL DATA{" "}
          </h2>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">2.1 Roles. </span>{" "}
            Customer is the Controller and Deflection AI is the Processor with regard to
            the Processing of Personal Data under the Agreement.
          </p>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">
              2.2 Customer’s Processing of Personal Data
            </span>{" "}
            Customer shall (a) give adequate notice and make all appropriate
            disclosures to Data Subjects regarding Customer’s use and disclosure
            and Deflection AI’s Processing of Personal Data, (b) obtain all necessary
            rights, and, where applicable, all appropriate and valid consents to
            disclose such Personal Data to Deflection AI, and (c) give Deflection AI
            instructions regarding the Processing of Personal Data for Customer,
            in all cases, in accordance with all applicable laws, rules, and
            regulations, including the Data Protection Laws and Regulations.
            Customer is solely liable and responsible for the accuracy, quality,
            and legality of Personal Data. Customer shall notify Deflection AI of any
            changes in, or revocation of, the permission to use, disclose, or
            otherwise Process Personal Data that would impact Deflection AI’s ability to
            comply with the Agreement, or Data Protection Laws and Regulations.
          </p>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">
              2.3 Deflection AI’s Processing of Personal Data{" "}
            </span>{" "}
            Deflection AI shall Process Personal Data in accordance with the
            requirements of Data Protection Laws and Regulations directly
            applicable to Deflection AI’s provision of its Services. Personal Data shall
            be considered Customer’s Confidential Information under the
            Agreement. Deflection AI shall only Process Personal Data on behalf of and
            in accordance with Customer’s instructions set forth in this DPA and
            the Agreement for the following purposes: (a) Processing in
            accordance with the Agreement, including any Processing reasonably
            necessary and proportionate to achieve the business purpose outlined
            in the Agreement; (b) Processing initiated by Users in their use of
            the Services; and (c) Processing to comply with other documented
            reasonable instructions provided by Customer (e.g., via email) where
            such instructions are consistent with the terms of the Agreement.
            Deflection AI shall only retain, use, or disclose Personal Data as necessary
            for Deflection AI’s performance of its obligations under the Agreement and
            only in accordance with Customer’s instructions. Deflection AI shall not
            sell any Personal Data as the term “selling” is defined in the CCPA.
            Deflection AI shall not take any action that would cause any transfers of
            Personal Data to or from Deflection AI to qualify as “selling personal
            information” under the CCPA. The subject-matter and purpose of
            Processing of Personal Data by Deflection AI is solely so Deflection AI can provide
            the Services to Customer pursuant to the Agreement. The duration of
            the Processing shall be for the duration of the Agreement. Exhibit A
            to this DPA identifies the nature of the Processing, the types of
            Personal Data Processed, and categories of Data Subjects for which
            data is Processed under this DPA.
          </p>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">2.4 Personnel</span>{" "}
            Deflection AI shall ensure that its personnel engaged in the Processing of
            Personal Data are informed of the confidential nature of the
            Personal Data, have received appropriate training on their
            responsibilities and have executed written confidentiality
            agreements. Deflection AI shall ensure that Deflection AI’s access to Personal Data
            is limited to those personnel performing Services in accordance with
            the Agreement.
          </p>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">
              2.5 Sensitive Data.{" "}
            </span>{" "}
            Customer will not provide (or cause to be provided) any Sensitive
            Data to Deflection AI for Processing under the Agreement or this DPA, and
            Deflection AI will have no liability whatsoever for Sensitive Data, whether
            in connection with a Personal Data Incident or otherwise. For the
            avoidance of doubt, this DPA will not apply to Sensitive Data.
          </p>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">
              2.6 Third Party Materials
            </span>{" "}
            This DPA will not apply to the Customer Data collected through Third
            Party Materials.
          </p>
          <h2 className="block !font-[700] text-2xl md:text-[38px]   text-center my-[1rem] md:my-8 relative text-heading md:leading-[3rem]">
            3. RIGHTS OF DATA SUBJECTS{" "}
          </h2>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            Deflection AI shall, to the extent legally permitted, promptly notify
            Customer if Deflection AI receives a request from a Data Subject to exercise
            the Data Subject’s rights under Data Protection Laws and Regulations
            (“Data Subject Request”). Taking into account the nature of the
            Processing, Deflection AI shall assist Customer by maintaining appropriate
            technical and organizational measures, insofar as this is possible,
            for the fulfilment of Customer’s obligation to respond to a Data
            Subject Request under Data Protection Laws and Regulations. In
            addition, to the extent Customer, in its use of the Services, does
            not have the ability to address a Data Subject Request, Deflection AI shall
            upon Customer’s request provide reasonable efforts to assist
            Customer in responding to such Data Subject Request, to the extent
            Deflection AI is legally permitted to do so and the response to such Data
            Subject Request is required under Data Protection Laws and
            Regulations. To the extent legally permitted, Customer shall be
            responsible for any costs arising from Deflection AI’s provision of such
            assistance.
          </p>
          <h2 className="block !font-[700] text-2xl md:text-[38px]   text-center my-[1rem] md:my-8 relative text-heading md:leading-[3rem]">
            4. SUB-PROCESSORS{" "}
          </h2>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">
              4.1 Appointment of Sub-processors{" "}
            </span>{" "}
            Customer acknowledges and agrees that Deflection AI may engage third-party
            Sub-processors in connection with the provision of the Services.
            Deflection AI has entered into a written agreement with each Sub-processor
            containing data protection obligations not less protective than
            those in this DPA with respect to the protection of Personal Data to
            the extent applicable to the nature of the Services provided by such
            Sub-processor.
          </p>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">
              4.2 List of Current Sub-processors.
            </span>{" "}
            Deflection AI’s current list of Sub-processors for the Services is available
            in the Customer dashboard at
            <span className="text-[blue] ">
              <a href="https://usetempo.ai/list-of-subprocessors">
                &nbsp;https://usetempo.ai/list-of-subprocessors
              </a>{" "}
            </span>
            (“Sub-processor List”), which Customer hereby approves and
            authorizes. Deflection AI may engage additional Sub-processors as Deflection AI
            considers reasonably appropriate for the Processing of Personal Data
            in accordance with this DPA, provided thatTempo shall notify
            Customer of the addition or replacement of Sub-processors by making
            modifications to the Sub-processor List. Customer shall be
            responsible for periodically checking the Sub-processor List to
            remain informed of Deflection AI’s current list of Sub-processors.
          </p>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">
              4.3 Objection Right for New Sub-processors.{" "}
            </span>{" "}
            . Customer may object to Deflection AI’s use of a new Sub-processor by
            notifying Deflection AI promptly in writing within ten (10) business days
            after receipt of Deflection AI’s updating the Sub-processor List, giving
            reasons for Customer’s objection. Customer’s failure to object
            within such ten (10) business day period shall be deemed Customer’s
            waiver of its right to object to Deflection AI’s use of a new Sub-processor
            added to the Sub-processor List. In the event Customer objects to a
            new Sub-processor, Deflection AI will use reasonable efforts to make
            available to Customer a change in the Services or recommend a
            commercially reasonable change to Customer’s configuration or use of
            the Services to avoid Processing of Personal Data by the objected-to
            new Sub-processor without unreasonably burdening the Customer or
            Deflection AI. If Deflection AI is unable to make available such change within a
            reasonable period of time, which shall not exceed thirty (30) days,
            either Party may terminate the by providing written notice to the
            other Party.
          </p>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            <span className="font-semibold text-heading">4.4 Liability</span> .
            Customer may object to Deflection AI’s use of a new Sub-processor by
            notifying Deflection AI promptly in writing within ten (10) business days
            after receipt of Deflection AI’s updating the Sub-processor List, giving
            reasons for Customer’s objection. Customer’s failure to object
            within such ten (10) business day period shall be deemed Customer’s
            waiver of its right to object to Deflection AI’s use of a new Sub-processor
            added to the Sub-processor List. In the event Customer objects to a
            new Sub-processor, Deflection AI will use reasonable efforts to make
            available to Customer a change in the Services or recommend a
            commercially reasonable change to Customer’s configuration or use of
            the Services to avoid Processing of Personal Data by the objected-to
            new Sub-processor without unreasonably burdening the Customer or
            Deflection AI. If Deflection AI is unable to make available such change within a
            reasonable period of time, which shall not exceed thirty (30) days,
            either Party may terminate the by providing written notice to the
            other Party.
          </p>
          <h2 className="block !font-[700] text-2xl md:text-[38px]   text-center my-[1rem] md:my-8 relative text-heading md:leading-[3rem]">
            5. SECURITY
          </h2>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            Deflection AI shall maintain, during the term of the Agreement,appropriate
            technical and organizational security measures to protect the
            Personal Data against accidental or unlawful destruction or
            accidental loss, damage, alteration, unauthorized disclosure or
            access, as set forth inthe Security Documentation at
            <span className="text-[blue]">
              <a href="https://usetempo.ai/article/security-overview">
                {" "}
                https://usetempo.ai/article/security-overview.
              </a>
            </span>
          </p>
          <h2 className="block !font-[700] text-2xl md:text-[38px]   text-center my-[1rem] md:my-8 relative text-heading md:leading-[3rem]">
            6. CUSTOMER DATA INCIDENT MANAGEMENT AND NOTIFICATION.
          </h2>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            Deflection AI maintains security incident management policies and procedures
            specified in the Security Documentation and shall notify Customer
            without undue delay, after becoming aware of the accidental or
            unlawful destruction, loss, alteration, unauthorized disclosure of,
            or access to Personal Data transmitted, stored or otherwise
            Processed by Deflection AI (a “Personal Data Incident”). Deflection AI shall make
            reasonable efforts to identify the cause of such Personal Data
            Incident and take those steps as Deflection AI deems necessary and
            reasonable in order to remediate the cause of such a Personal Data
            Incident to the extent the remediation is within Deflection AI’s reasonable
            control. The obligations herein shall not apply to a Personal Data
            Incident that is caused by Customer or Customer’s Users.
          </p>
          <h2 className="block !font-[700] text-2xl md:text-[38px]   text-center my-[1rem] md:my-8 relative text-heading md:leading-[3rem]">
            7. RELEVANT RECORDS AND AUDIT RIGHTS
          </h2>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            Customer may audit Deflection AI’s compliance with its obligations under
            this DPA up to once per year and on such other occasions as may be
            required by Data Protection Laws and Regulations.Deflection AI will
            contribute to such audits by providing Customer with the information
            and assistance that Deflection AI considers appropriate in the circumstances
            and reasonably necessary to conduct the audit. To request an audit,
            Customer must submit a proposed audit plan to Deflection AI at least twenty
            (20) days in advance of the proposed audit date and any third-party
            auditor must sign a customary non-disclosure agreement mutually
            acceptable to the Parties (such acceptance not to be unreasonably
            withheld) providing for the confidential treatment of all
            information exchanged in connection with the audit and any reports
            regarding the results or findings thereof. The proposed audit plan
            must describe the proposed scope, duration, and start date of the
            audit. Deflection AI will review the proposed audit plan and provide
            Customer with any concerns or questions (for example, any request
            for information that could compromise Deflection AI security, privacy,
            employment or other relevant policies).{" "}
          </p>
          <p className="text-base sm:text-[24px] sm:leading-8 mb-3">
            Deflection AI will work cooperatively with Customer to agree on a final
            audit plan. Nothing in this Section 8 shall require Deflection AI to breach
            any duties of confidentiality.If the controls or measures to be
            assessed in the requested audit are addressed in an SOC 2 Type 2,
            ISO, NIST or similar audit report performed by a qualified
            third-party auditor within twelve (12) months of Customer’s audit
            request and Deflection AI has confirmed there have been no known material
            changes in the controls audited since the date of such report,
            Customer agrees to accept such report in lieu of requesting an audit
            of such controls or measures.The audit must be conducted during
            regular business hours, subject to the agreed final audit plan and
            Deflection AI’s safety, security or other relevant policies, and may not
            unreasonably interfere with Deflection AI business activities. Any audits
            are at Customer’s sole expense. Customer shall reimburse Deflection AI for
            any time expended by Deflection AI and any third parties in connection with
            any audits or inspections under this Section 8 at Deflection AI’s
            then-current professional services rates, which shall be made
            available to Customer upon request. Customer will be responsible for
            any fees charged by any auditor appointed by Customer to execute any
            such audit.
          </p>
          <h2 className="block !font-[700] text-2xl md:text-[38px]   text-center my-[1rem] md:my-8 relative text-heading md:leading-[3rem]">
            Exhibit A
          </h2>
          <h2 className="block !font-[700] text-2xl md:text-[38px]   text-left my-[1rem] md:my-8 relative text-heading md:leading-[3rem]">
            A. DETAILS OF PROCESSING{" "}
          </h2>
        </div>
        <div className="overflow-x-auto  sm:rounded-lg mt-4 sm:mt-0">
          <table className="ml-auto mr-auto w-[80%] mt-5 sm:mt-0 text-sm text-left text-gray-500 dark:text-gray-400  mx-6 sm:mx-auto m-auto ">
         
            <tbody>
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center"
                style={{ borderBottom: "1px solid rgb(220 222 225 / 55%)" }}
              >
                <th
                  scope="row"
                  className="px-6 py-4 font-medium sm:text-[18px] sm:leading-8  text-left text-gray-900 sm:whitespace-nowrap dark:text-white"
                >
                  Description of Services
                </th>

                <td className="px-6 py-4 text-justify sm:text-[18px] sm:leading-8 ">
                  Deflection AI provides automated communication technology services
                  utilizing artificial intelligence and machine learning in the
                  form of ChatBots and related tools and services to assist
                  Customers with end-user communications and interactions.{" "}
                </td>
              </tr>
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center"
                style={{ borderBottom: "1px solid rgb(220 222 225 / 55%)" }}
              >
                <th
                  scope="row"
                  className="px-6  text-left py-4 font-medium sm:text-[18px] sm:leading-8  text-gray-900 sm:whitespace-nowrap dark:text-white"
                >
                  Categories of Data Subjects whose Personal Data is transferred{" "}
                </th>

                <td className="px-6 py-4 text-justify sm:text-[18px] sm:leading-8 ">
                  Customer may submit Personal Data to the Services, the extent
                  of which is determined and controlled by Customer in its sole
                  discretion,and which may include, but is not limited to
                  Personal Data relating to the following categories of Data
                  Subjects:
                  <ul className="text-left mt-3 ">
                    <li>• Prospective Customers</li>
                    <li>• Existing Customers </li>
                    <li>• Employees</li>
                    <li>• Contractors </li>
                  </ul>
                </td>
              </tr>
              <tr
                className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center"
                style={{ borderBottom: "1px solid rgb(220 222 225 / 55%)" }}
              >
                <th
                  scope="row"
                  className="px-6 sm:text-[18px] sm:leading-8  text-left py-4 font-medium text-gray-900 sm:whitespace-nowrap dark:text-white"
                >
                  Categories of Personal Data transferred{" "}
                </th>

                <td className="px-6 py-4 text-justify sm:text-[18px] sm:leading-8 ">
                  Customer may submit Personal Data to the Services, the extent
                  of which is determined and controlled by Customer in its sole
                  discretion, and which may include, but is not limited to the
                  following categories of Personal Data:{" "}
                  <ul className="text-left mt-3 sm:text-[18px] sm:leading-8  ">
                    <li>
                      • Communication from prospective or actual Customers
                    </li>
                    <li>• Customer account information </li>
                    <li>• Customer contact information </li>
                  </ul>
                </td>
              </tr>
              <tr
                className="bg-white border-b  dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 text-center"
                style={{ borderBottom: "1px solid rgb(220 222 225 / 55%)" }}
              >
                <th
                  scope="row"
                  className="px-6 text-left py-4 sm:text-[18px] sm:leading-8  font-medium text-gray-900 sm:whitespace-nowrap dark:text-white"
                >
                  Sensitive data transferred (if applicable) and applied
                  <br />
                  restrictions or safeguards that fully take into consideration
                  <br />
                  the nature of the data and the risks involved, such as for
                  <br />
                  instance strict purpose limitation, access restrictions
                  <br />
                  (including access only for staff having followed specialized
                  <br />
                  training), keeping a record of access to the data,
                  <br />
                  restrictions for onward transfers or additional security
                  measures.{" "}
                </th>

                <td className="px-6 py-4 sm:text-[18px] sm:leading-8 ">N/A</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* <Homeform reff={ref} /> */}
    </div>
  );
};

export default page;
