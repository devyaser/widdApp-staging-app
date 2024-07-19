import Button from "../../../../../components/common/Button";
import React from "react";

const walletData = {
  balance: 12000,
  transactions: 12000,
  purchased: 20000,
  donationAndUpvote: 20000,
  serviceFee: 10000,
};

const formatNumber = (amount: number): string => {
  return amount.toLocaleString("en-US");
};

const Wallet = () => {
  return (
    <div>
      <div className="pb-2 font-semibold">Btix balance on Platform</div>
      <div className="flex shadow-lg justify-between items-center p-5 bg-custom-lightgrayone rounded-md mb-4">
        <div className="text-sm font-semibold">
          {formatNumber(walletData.balance)} BTX
        </div>
        <Button variant="dark">Connect Wallet</Button>
      </div>
      <div className="pb-2 font-semibold">Btix balance on Platform</div>
      <div className="flex shadow-lg justify-between items-center p-5 bg-custom-lightgrayone rounded-md mb-4">
        <div className="text-sm font-semibold">
          {formatNumber(walletData.transactions)} BTX
        </div>
        <Button variant="dark">View History</Button>
      </div>
      <div className="pb-2 font-semibold">Btix balance on Platform</div>
      <div className="flex shadow-lg justify-between items-center p-5 bg-custom-lightgrayone rounded-md mb-4">
        <div className="text-sm font-semibold">
          {formatNumber(walletData.purchased)} BTX
        </div>
        <Button variant="dark">View History</Button>
      </div>
      <div className="pb-2 font-semibold">Btix balance on Platform</div>
      <div className="flex shadow-lg justify-between items-center p-5 bg-custom-lightgrayone rounded-md mb-4">
        <div className="text-sm font-semibold">
          {formatNumber(walletData.donationAndUpvote)} BTX
        </div>
        <Button variant="dark">View History</Button>
      </div>
      <div className="pb-2 font-semibold">Btix balance on Platform</div>
      <div className="flex shadow-lg justify-between items-center p-5 bg-custom-lightgrayone rounded-md mb-4">
        <div className="text-sm font-semibold">
          {formatNumber(walletData.serviceFee)} BTX
        </div>
        <Button variant="dark">View History</Button>
      </div>
    </div>
  );
};

export default Wallet;
