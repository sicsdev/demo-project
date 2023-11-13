import React from "react";

const Security = () => {
  return (
    <div className="bg-white pt-10 ">
      <div className="text-center  ">
        <h1 className=" font-bold  text-2xl   md:text-h2 lg:text-h1 sm:text-h2 sm:leading-none mb-3 ">
          Security
        </h1>
        <p className="text-xl">
          Customer trust and data security are critical to everything we do at
          Intercom.
        </p>
      </div>
      <div className="p-8">
        <h2 className="font-bold  text-2xl   md:text-h2 lg:text-h4 sm:text-h4 sm:leading-none mt-2 ">
          Product Security
        </h2>
        <p className="font-bold  text-2xl   md:text-h2 lg:text-h6 sm:text-h4 sm:leading-none mt-8">
          SSO & 2FA
        </p>
        <p className="mt-4">
          SAML Single Sign-on (SSO) allows you to authenticate users in your own
          systems without requiring them to enter additional login credentials.
          If you’re using password-based authentication, you can turn on
          2-factor authentication (2FA). More details on our docs.
        </p>
        <p className="font-bold  text-2xl   md:text-h2 lg:text-h6 sm:text-h4 sm:leading-none mt-8">
          Permissions
        </p>
        <p className="mt-4">
          We enable permission levels within the app to be set for your
          teammates. Permissions can be set to include app settings, billing,
          user data or the ability to send or edit messages.
        </p>
        <p className="font-bold  text-2xl   md:text-h2 lg:text-h6 sm:text-h4 sm:leading-none mt-8">
          Password and Credential Storage
        </p>
        <p className="mt-4">
          Intercom enforces a password complexity standard and credentials are
          stored using a PBKDF function (bcrypt).
        </p>
        <p className="font-bold  text-2xl   md:text-h2 lg:text-h6 sm:text-h4 sm:leading-none mt-8">
          Uptime
        </p>
        <p className="mt-4">
          We have uptime of 99.9% or higher. You can check our past month stats
          at https://www.intercomstatus.com.
        </p>
        <p className="font-bold  text-2xl   md:text-h2 lg:text-h6 sm:text-h4 sm:leading-none mt-8">
          Customer Best Practices
        </p>
        <p className="mt-4">
          There are simple steps you can take to increase the security of your
          app. Check out the Staying Secure section on our docs site.
        </p>
        <h2 className="font-bold  text-2xl   md:text-h2 lg:text-h4 sm:text-h4 sm:leading-none mt-8 ">
          Network and application security
        </h2>
        <p className="font-bold  text-2xl   md:text-h2 lg:text-h6 sm:text-h4 sm:leading-none mt-8">
          Regional Data Hosting and Storage
        </p>
        <p className="mt-4">
          Intercom services and data are hosted in Amazon Web Services (AWS)
          facilities in the USA (us-east-1), Dublin, Ireland (eu-west-1), and
          Sydney, Australia
        </p>
        <p className="font-bold  text-2xl   md:text-h2 lg:text-h6 sm:text-h4 sm:leading-none mt-8">
          Failover and DR
        </p>
        <p className="mt-4">
          Intercom was built with disaster recovery in mind. All of our
          infrastructure and data are spread across 3 AWS availability zones and
          will continue to work should any one of those data centers fail.
        </p>
        <p className="font-bold  text-2xl   md:text-h2 lg:text-h6 sm:text-h4 sm:leading-none mt-8">
          Virtual Private Cloud
        </p>
        <p className="mt-4">
          All of our servers are within our own virtual private cloud (VPC) with
          network access control lists (ACLs) that prevent unauthorized requests
          getting to our internal network.
        </p>
        <p className="font-bold  text-2xl   md:text-h2 lg:text-h6 sm:text-h4 sm:leading-none mt-8">
          Back Ups and Monitoring
        </p>
        <p className="mt-4">
          On an application level, we produce audit logs for all activity, ship
          logs to Graylog for analysis and use S3 for archival purposes. All
          actions taken on production consoles or in the Intercom application
          are logged.
        </p>
        <p className="font-bold  text-2xl   md:text-h2 lg:text-h6 sm:text-h4 sm:leading-none mt-8">
          Permissions and Authentication
        </p>
        <p className="mt-4">
          Access to customer data is limited to authorized employees who require
          it for their job. Intercom is served 100% over https. Intercom runs a
          zero-trust corporate network. There are no corporate resources or
          additional privileges from being on Intercom’s network. We have SAML
          Single Sign-on (SSO), 2-factor authentication (2FA), and strong
          password policies on GitHub, Google, AWS, and Intercom to ensure
          access to cloud services is protected.
        </p>
        <p className="font-bold  text-2xl   md:text-h2 lg:text-h6 sm:text-h4 sm:leading-none mt-8">
          Encryption
        </p>
        <p className="mt-4">
          All data sent to or from Intercom is encrypted in transit using 256
          bit encryption. Our API and application endpoints are TLS/SSL only and
          score an “A+” rating on Qualys SSL Labs‘ tests. This means we only use
          strong cipher suites and have features such as HSTS and Perfect
          Forward Secrecy fully enabled. We also encrypt data at rest using an
          industry-standard AES-256 encryption algorithm.
        </p>
        <p className="font-bold  text-2xl   md:text-h2 lg:text-h6 sm:text-h4 sm:leading-none mt-8">
          Pentests, Vulnerability Scanning and Bug Bounty Program
        </p>
        <p className="mt-4">
          Intercom uses third party security tools to continuously scan for
          vulnerabilities. Our dedicated security team responds to issues
          raised. Twice yearly we engage third-party security experts to perform
          detailed penetration tests on the Intercom application and
          infrastructure. Intercom also runs a ‘bug bounty’ program with
          Bugcrowd, which gives security researchers a platform for testing and
          submitting vulnerability reports.
        </p>
        <p className="font-bold  text-2xl   md:text-h2 lg:text-h6 sm:text-h4 sm:leading-none mt-8">
          Incident Response
        </p>
        <p className="mt-4">
          Intercom implements a protocol for handling security events which
          includes escalation procedures, rapid mitigation and post mortem. All
          employees are informed of our policies.
        </p>
        <h2 className="font-bold  text-2xl   md:text-h2 lg:text-h4 sm:text-h4 sm:leading-none mt-8 ">
          Additional Security features
        </h2>
        <p className="font-bold  text-2xl   md:text-h2 lg:text-h6 sm:text-h4 sm:leading-none mt-8">
          Training
        </p>
        <p className="mt-4">
          All employees complete Security and Awareness training annually.
        </p>
        <p className="font-bold  text-2xl   md:text-h2 lg:text-h6 sm:text-h4 sm:leading-none mt-8">
          Policies
        </p>
        <p className="mt-4">
          Intercom has developed a comprehensive set of security policies
          covering a range of topics. These policies are updated frequently and
          shared with all employees.
        </p>
        <p className="font-bold  text-2xl   md:text-h2 lg:text-h6 sm:text-h4 sm:leading-none mt-8">
          Employee Vetting
        </p>
        <p className="mt-4">
          Intercom performs background checks on all new employees in accordance
          with local laws. The background check includes employment verification
          and criminal checks for US employees.
        </p>
        <p className="font-bold  text-2xl   md:text-h2 lg:text-h6 sm:text-h4 sm:leading-none mt-8">
          Confidentiality
        </p>
        <p className="mt-4">
          All employee contracts include a confidentiality agreement.
        </p>
        <p className="font-bold  text-2xl   md:text-h2 lg:text-h6 sm:text-h4 sm:leading-none mt-8">
          PCI Obligations
        </p>
        <p className="mt-4">
          All payments made to Intercom go through our partner, Stripe. Details
          about their security setup and PCI compliance can be found at Stripe’s
          security page.
        </p>
      </div>

      <div
        className={
          "bg-[black] p-5 sm:flex sm:flex-wrap md:flex md:flex-row lg:flex lg:flex-row justify-between shadow-2xl py-8 px-8 sm:py-20 md:py-20 lg:py-20  sm:px-12 lg:px-12 md:px-12   items-center relative"
        }
      >
        <div className="flex items-center justify-center">
        <div className=" sm:w-[100%] md:w-[50%] lg:w-[50%]">
          {" "}
          <h2 className="mb-5 md:mb-0 font-bold  text-2xl  md:text-h2 lg:text-h3 sm:text-h2 sm:leading-none   text-white  ">
            Security questions?
          </h2>
          <p className="mt-4 text-white text-sm
          ">
           If you think you may have found a security vulnerability, please get in touch with our security team at security@intercom.com.
          </p>
          <p className="mt-4 text-white">
           <u>You can find all of our policies here</u>
          </p>
        </div>
        <div className="block gap-4">
          <button
            type={"submit"}
            className={
              "py-2 px-8 w-full sm:px-20 md:px-20 lg:px-8 sm:py-4 md:py-4 lg:py-4 first-letter:w-full focus:ring-yellow-300 text-lg font-semibold text-white bg-primary hover:bg-black dark:focus:ring-yellow-900 rounded-full relative ml-8"
            }
          >
            <div
              dangerouslySetInnerHTML={{
                __html: `
       <a href="mailto:security@usetempo.ai">
       <span className="underline cursor-pointer text-white">Contact our security team &#8594;
       </span>
       </a>
      `,
              }}
            />
          </button>
        </div>
        </div>
      </div>
    </div>
  );
};

export default Security;
