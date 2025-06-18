import React from 'react';

const Loading: React.FC = () => {
  return (
    <div className="h-screen flex items-center justify-center bg-white">
      <div className="w-24 sm:w-28 md:w-32 lg:w-40">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 100 100"
          preserveAspectRatio="xMidYMid"
          className="w-full h-auto"
        >
          <g>
            <circle r="20" fill="#96ed3c" cy="50" cx="30">
              <animate
                begin="-0.5s"
                values="30;70;30"
                keyTimes="0;0.5;1"
                dur="1s"
                repeatCount="indefinite"
                attributeName="cx"
              />
            </circle>
            <circle r="20" fill="#f4a251" cy="50" cx="70">
              <animate
                begin="0s"
                values="30;70;30"
                keyTimes="0;0.5;1"
                dur="1s"
                repeatCount="indefinite"
                attributeName="cx"
              />
            </circle>
            <circle r="20" fill="#96ed3c" cy="50" cx="30">
              <animate
                begin="-0.5s"
                values="30;70;30"
                keyTimes="0;0.5;1"
                dur="1s"
                repeatCount="indefinite"
                attributeName="cx"
              />
              <animate
                repeatCount="indefinite"
                dur="1s"
                keyTimes="0;0.499;0.5;1"
                calcMode="discrete"
                values="0;0;1;1"
                attributeName="fill-opacity"
              />
            </circle>
          </g>
        </svg>
      </div>
    </div>
  );
};

export default Loading;
