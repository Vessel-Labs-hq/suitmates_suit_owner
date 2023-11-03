import React from "react";

const CardInfo = () => {
  return (
    <div>
      <div className="grid max-w-[1180px] md:grid-cols-2 lg:mx-auto">
        <div className="mt-4 h-48 rounded-xl bg-[#E8E8E8]">
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
