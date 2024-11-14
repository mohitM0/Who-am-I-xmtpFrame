// import { fetchMetadata } from "frames.js/next";
 
// export async function generateMetadata() {
//   return {
//     title: "My Page",
//     // provide a full URL to your /frames endpoint
//     other: await fetchMetadata(
//       new URL(
//         "/frames",
//         process.env.VERCEL_URL
//           ? `https://${process.env.VERCEL_URL}`
//           : "http://localhost:3000"
//       )
//     ),
//   };
// }
 
// export default function Page() {
//   return <span>My existing page</span>;
// }

// import { createExampleURL } from "../../utils";
import type { Metadata } from "next";
import { fetchMetadata } from "frames.js/next";
import { Frame } from "./components/Frame";

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Basic Frames.js example",
    other: {
      ...(await fetchMetadata(new URL(
        "/frames",
        process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000"
      ))),
    },
  };
}

export default async function Home() {
  const metadata = await generateMetadata();

  return (
    <Frame
      metadata={metadata}
      url={(new URL(
        "/frames",
        process.env.VERCEL_URL
          ? `https://${process.env.VERCEL_URL}`
          : "http://localhost:3000"
      ).toString())}
    />
  );
}
