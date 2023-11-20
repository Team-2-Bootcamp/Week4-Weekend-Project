import React from "react";
import Link from "next/link";
import { hardhat } from "viem/chains";
import { CurrencyDollarIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { SwitchTheme } from "~~/components/SwitchTheme";
import { Faucet } from "~~/components/scaffold-eth";
import { useGlobalState } from "~~/services/store/store";
import { getTargetNetwork } from "~~/utils/scaffold-eth";

/**
 * Site footer
 */
export const Footer = () => {
  const nativeCurrencyPrice = useGlobalState(state => state.nativeCurrencyPrice);
  const isLocalNetwork = getTargetNetwork().id === hardhat.id;

  return (
    <div className="px-1 py-5 mb-11 min-h-0 lg:mb-0">
      <div>
        <div className="flex fixed bottom-0 left-0 z-10 justify-between items-center p-4 w-full pointer-events-none">
          <div className="flex flex-col gap-2 pointer-events-auto md:flex-row">
            {nativeCurrencyPrice > 0 && (
              <div>
                <div className="gap-1 font-normal normal-case cursor-auto btn btn-primary btn-sm">
                  <CurrencyDollarIcon className="w-4 h-4" />
                  <span>{nativeCurrencyPrice}</span>
                </div>
              </div>
            )}
            {isLocalNetwork && (
              <>
                <Faucet />
                <Link href="/blockexplorer" passHref className="gap-1 font-normal normal-case btn btn-primary btn-sm">
                  <MagnifyingGlassIcon className="w-4 h-4" />
                  <span>Block Explorer</span>
                </Link>
              </>
            )}
          </div>
          <SwitchTheme className={`pointer-events-auto ${isLocalNetwork ? "self-end md:self-auto" : ""}`} />
        </div>
      </div>
      <div className="w-full">
        <ul className="w-full menu menu-horizontal"></ul>
      </div>
    </div>
  );
};
