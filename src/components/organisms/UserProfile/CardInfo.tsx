import React from "react";

const CardInfo = () => {
  return (
    <div>
      <div className="ml-40 max-w-[1280px]">
        <div className="mt-4 flex h-48 w-2/5 rounded-xl bg-[#E8E8E8]">
          <div className="space-y-7 px-10 py-8">
            <p className="text-base font-normal">
              Billed to: <span>5676*******754</span>
            </p>
            <p className="text-base font-normal">
              Suitemate subscription: <span>USD $25/month</span>
            </p>
            <p className="text-base font-normal">
              Next payment: <span className="text-[#3BAF75]">April 10, 2023</span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardInfo;
