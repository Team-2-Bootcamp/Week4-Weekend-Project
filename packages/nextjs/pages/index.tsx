import Link from "next/link";
import type { NextPage } from "next";
import { ArchiveBoxArrowDownIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { MetaHeader } from "~~/components/MetaHeader";

const Home: NextPage = () => {
  return (
    <>
      <MetaHeader />
      <div className="flex flex-col flex-grow items-center pt-10">
        <div className="px-5">
          <h1 className="mb-8 text-center">
            <span className="block mb-2 text-2xl">Welcome to</span>
            <span className="block text-4xl font-bold">Decentralized Voting System</span>
          </h1>
        </div>

        <div className="flex-grow px-8 py-12 mt-16 w-full bg-base-300">
          <div className="flex flex-col gap-12 justify-center items-center sm:flex-row">
            <div className="flex flex-col items-center px-10 py-10 max-w-xs text-center rounded-3xl bg-base-100">
              <ArchiveBoxArrowDownIcon className="w-8 h-8 fill-secondary" />
              <p>
                Check the voting system in{" "}
                <Link href="/debug" passHref className="link">
                  Ballot
                </Link>{" "}
                tab.
              </p>
            </div>
            <div className="flex flex-col items-center px-10 py-10 max-w-xs text-center rounded-3xl bg-base-100">
              <MagnifyingGlassIcon className="w-8 h-8 fill-secondary" />
              <p>
                Explore your local transactions with the{" "}
                <Link href="/blockexplorer" passHref className="link">
                  Block Explorer
                </Link>{" "}
                tab.
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Home;
