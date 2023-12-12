import content from "../content/support.json";

const TermsOfServicePage = () => {
  const termsOfService = content.termsOfService;

  return (
    <div>
      <h1 className='text-4xl my-6'>Terms of Service</h1>
      <p>Version: {termsOfService.version}</p>
      <p>Last Updated: {termsOfService.lastUpdated}</p>
      <p>Effective Date: {termsOfService.effectiveDate}</p>

      {termsOfService.sections.map((section, index) => (
        <div key={index}>
          <h2>{section.title}</h2>
          <p>{section.content}</p>
        </div>
      ))}

      <h2>Contact Information</h2>
      <p>Email: {termsOfService.contactInformation.email}</p>
      <p>Address: {termsOfService.contactInformation.address}</p>
    </div>
  );
};

export default TermsOfServicePage;
