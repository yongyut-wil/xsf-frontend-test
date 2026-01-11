import Image from "next/image";
import Link from "next/link";
import {
  Contact,
  mergeDuplicateContacts,
  CustomerInput,
  mapContactsWithCustomerInfo,
  Person,
  expectedName,
  correctlyOutputsFromQuestionC,
} from "./utils/contact";

export default function Home() {
  // Pt.1 A
  const inputA: Contact[] = [
    { name: "Alex", tel: "0991112222", code: "xsf0001" },
    { name: "Jane", tel: "0812221234", code: "xsf0002" },
    { name: "Alex", tel: "0832214433", code: "xsf0001" },
    { name: "Alex", tel: "0991113122", code: "xsf0003" },
  ];

  const resultA = mergeDuplicateContacts(inputA);
  console.table(resultA);

  // Pt.1 B
  const inputB: CustomerInput = {
    customer: "Xsurface",
    contact: [{ name: "Max" }, { name: "Mike" }, { name: "Adam" }],
    address: "Sukhumvit 62",
  };

  const resultB = mapContactsWithCustomerInfo(inputB);
  console.table(resultB);

  // Pt.1 C
  const inputC: Person[] = [
    { name: "A", age: "30" },
    { name: "B", age: "9" },
    { name: "C", age: "20" },
    { name: "D", age: "18" },
    { name: "E", age: "11" },
    { name: "F", age: "60" },
    { name: "G", age: "27" },
    { name: "H", age: "90" },
    { name: "I", age: "21" },
    { name: "J", age: "12" },
  ];

  const resultC = expectedName(inputC);
  console.log(resultC);

  // Pt.1 D
  const resultD = correctlyOutputsFromQuestionC(inputC);
  console.log(resultD);

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans">
      <main className="flex min-h-screen w-full max-w-4xl flex-col items-center py-16 px-8 sm:px-16">
        {/* Header */}
        <div className="flex flex-col items-center gap-6 text-center mb-12">
          <Image
            src="/next.svg"
            alt="Next.js logo"
            width={120}
            height={24}
            priority
          />
          <h1 className="text-3xl font-bold tracking-tight text-zinc-900">
            XSF Frontend Test
          </h1>
          <p className="max-w-md text-lg text-zinc-600">
            Explore the application features below
          </p>
        </div>

        {/* Navigation Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full max-w-2xl mb-12">
          {/* Upload Product Card */}
          <Link
            href="/upload"
            className="group relative flex flex-col items-center p-8 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:shadow-lg hover:border-red-300 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-50 group-hover:bg-red-100 transition-colors">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 mb-2">
              Upload Product
            </h2>
            <p className="text-sm text-zinc-500 text-center">
              Add new products with images, name, code and price
            </p>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>

          {/* Product List Card */}
          <Link
            href="/products"
            className="group relative flex flex-col items-center p-8 rounded-2xl bg-white border border-zinc-200 shadow-sm hover:shadow-lg hover:border-red-300 transition-all duration-300"
          >
            <div className="flex items-center justify-center w-16 h-16 mb-4 rounded-full bg-red-50 group-hover:bg-red-100 transition-colors">
              <svg
                className="w-8 h-8 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                />
              </svg>
            </div>
            <h2 className="text-xl font-semibold text-zinc-900 mb-2">
              Product List
            </h2>
            <p className="text-sm text-zinc-500 text-center">
              Browse and search all products in the catalog
            </p>
            <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
              <svg
                className="w-5 h-5 text-red-500"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5l7 7-7 7"
                />
              </svg>
            </div>
          </Link>
        </div>

        {/* Footer Links */}
        {/* <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
          <a
            className="flex h-12 w-full items-center justify-center gap-2 rounded-full bg-zinc-900 px-5 text-white transition-colors hover:bg-zinc-700 md:w-[158px]"
            href="https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Image
              src="/vercel.svg"
              alt="Vercel logomark"
              width={16}
              height={16}
            />
            Deploy Now
          </a>
          <a
            className="flex h-12 w-full items-center justify-center rounded-full border border-solid border-zinc-200 px-5 transition-colors hover:bg-zinc-100 md:w-[158px]"
            href="https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app"
            target="_blank"
            rel="noopener noreferrer"
          >
            Documentation
          </a>
        </div> */}
      </main>
    </div>
  );
}
