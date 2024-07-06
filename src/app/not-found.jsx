import Link from 'next/link'

async function getSiteData(domain) {
  // Mock data for example purposes
  if (domain === "example.com") {
    return { name: "Example Site" };
  }
  return { name: "Unknown Site" }; // Return a fallback object if data is not found
}

export async function getServerSideProps(context) {
  const { req } = context;
  const domain = req.headers.host;

  let data = null;
  try {
    data = await getSiteData(domain);
  } catch (error) {
    console.error("Error fetching site data:", error);
    data = { name: "Error Site" }; // Provide a fallback value in case of an error
  }

  return {
    props: {
      data,
    },
  };
}

const NotFound = ({ data }) => {
  if (!data || !data.name) {
    data = { name: "Unknown Site" }; // Ensure data is always defined
  }

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-[#fff9ea]">
      <div className="text-center">
        <h2 className="text-9xl font-bold text-[#440129] animate-bounce">404</h2>
        <p className="text-2xl text-[#440129] mt-4">
          Not Found: {data.name}
        </p>
        <p className="text-lg text-[#440129] mt-2">
          Could not find the requested resource.
        </p>
        
      </div>
    </div>
  )
}

export default NotFound;
