import content from "../content/support.json";

const CancellationPolicyPage = () => {
  const cancellationPolicy = content.cancellationPolicy;

  return (
    <div>
      <h1 className='text-4xl my-6'>Cancellation Policy</h1>
      <p>Version: {cancellationPolicy.version}</p>
      <p>Last Updated: {cancellationPolicy.lastUpdated}</p>
      <p>Effective Date: {cancellationPolicy.effectiveDate}</p>

      <p className='max-w-lg mx-auto'>{cancellationPolicy.policyText}</p>

      <h2>Contact Information</h2>
      <p>Email: {cancellationPolicy.contactInformation.email}</p>
      <p>Address: {cancellationPolicy.contactInformation.address}</p>
    </div>
  );
};

export default CancellationPolicyPage;
