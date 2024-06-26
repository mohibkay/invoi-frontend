import content from "../content/support.json";

const SupportPage = () => {
  const supportContent = content.supportPage;

  return (
    <div>
      <h1 className='text-4xl my-6'>{supportContent.title}</h1>
      <p className='max-w-lg mx-auto'>{supportContent.content}</p>
      <h2>Contact Information:</h2>
      <p>Company Address: {supportContent.contactInformation.companyAddress}</p>
      <p>Working Hours: {supportContent.workingHours}</p>
      <h2>Contact Channels:</h2>
      <p>Email: {supportContent.contactChannels.email}</p>
    </div>
  );
};

export default SupportPage;
