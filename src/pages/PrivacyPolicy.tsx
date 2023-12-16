import content from "../content/support.json";

const PrivacyPolicyPage = () => {
  const privacyPolicy = content.privacyPolicy;

  return (
    <div>
      <h1 className='text-4xl my-6'>Privacy Policy</h1>
      <p>Version: {privacyPolicy.version}</p>
      <p>Last Updated: {privacyPolicy.lastUpdated}</p>
      <p>Effective Date: {privacyPolicy.effectiveDate}</p>

      <p className='max-w-lg mx-auto'>{privacyPolicy.intro}</p>

      {privacyPolicy.sections.map((section, index) => (
        <div key={index}>
          <h2>{section.sectionTitle}</h2>
          <p>{section.content}</p>
        </div>
      ))}

      <p>{privacyPolicy.consentText}</p>

      <h2>Contact Information</h2>
      <p>Email: {privacyPolicy.contactInformation.email}</p>
      <p>Address: {privacyPolicy.contactInformation.address}</p>
    </div>
  );
};

export default PrivacyPolicyPage;
