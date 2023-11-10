import Slot from "@/components/organisms/Slot";
import { cn } from "@/utils";
import { SVGProps } from "react";

const Icons = {
  PhotoGallery: (
    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="47" viewBox="0 0 47 47" fill="none">
      <path
        d="M29.375 15.6667H29.3946M5.875 11.75C5.875 10.1919 6.49397 8.69752 7.59575 7.59575C8.69752 6.49397 10.1919 5.875 11.75 5.875H35.25C36.8081 5.875 38.3025 6.49397 39.4043 7.59575C40.506 8.69752 41.125 10.1919 41.125 11.75V35.25C41.125 36.8081 40.506 38.3025 39.4043 39.4043C38.3025 40.506 36.8081 41.125 35.25 41.125H11.75C10.1919 41.125 8.69752 40.506 7.59575 39.4043C6.49397 38.3025 5.875 36.8081 5.875 35.25V11.75Z"
        stroke="#333333"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M5.875 31.3332L15.6667 21.5416C17.484 19.7928 19.7243 19.7928 21.5417 21.5416L31.3333 31.3332"
        stroke="#333333"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M27.416 27.4167L29.3743 25.4583C31.1917 23.7095 33.432 23.7095 35.2493 25.4583L41.1243 31.3333"
        stroke="#333333"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  GalleryMaskGroup: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="165"
      height="165"
      viewBox="0 0 165 165"
      fill="none"
    >
      <mask
        id="mask0_655_1852"
        style={{ maskType: "alpha" }}
        maskUnits="userSpaceOnUse"
        x="0"
        y="0"
        width="165"
        height="165"
      >
        <circle cx="82.5" cy="82.5" r="82.5" fill="#F3F3F3" />
      </mask>
      <g mask="url(#mask0_655_1852)">
        <circle cx="82.5" cy="82.5" r="82.5" fill="#F3F3F3" />
        <rect x="1" y="118" width="164" height="49" fill="#D9D9D9" />
      </g>
    </svg>
  ),
  Plus: (
    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="24" viewBox="0 0 25 24" fill="none">
      <path d="M19.5 13H13.5V19H11.5V13H5.5V11H11.5V5H13.5V11H19.5V13Z" fill="white" />
    </svg>
  ),
  HintTiny: (
    <svg xmlns="http://www.w3.org/2000/svg" width="10" height="10" viewBox="0 0 10 10" fill="none">
      <g clipPath="url(#clip0_1033_52756)">
        <path
          d="M4.99967 0.833252C2.69967 0.833252 0.833008 2.69992 0.833008 4.99992C0.833008 7.29992 2.69967 9.16658 4.99967 9.16658C7.29967 9.16658 9.16634 7.29992 9.16634 4.99992C9.16634 2.69992 7.29967 0.833252 4.99967 0.833252ZM5.41634 7.08325H4.58301V4.58325H5.41634V7.08325ZM5.41634 3.74992H4.58301V2.91659H5.41634V3.74992Z"
          fill="#959595"
        />
      </g>
      <defs>
        <clipPath id="clip0_1033_52756">
          <rect width="10" height="10" fill="white" />
        </clipPath>
      </defs>
    </svg>
  ),
  MaintenanceGreen: (
    <svg xmlns="http://www.w3.org/2000/svg" width="47" height="47" viewBox="0 0 47 47" fill="none">
      <circle cx="23.5" cy="23.5" r="23.5" fill="#D0FCE6" />
      <path
        d="M16.45 16.4026L21.7375 21.6368M16.45 16.4026H12.925L11.75 12.9132L12.925 11.75L16.45 12.9132V16.4026ZM32.0293 12.6119L28.9419 15.6682C28.4765 16.1289 28.2439 16.3592 28.1567 16.6248C28.08 16.8584 28.08 17.11 28.1567 17.3436C28.2439 17.6092 28.4765 17.8395 28.9419 18.3002L29.2206 18.5761C29.686 19.0368 29.9186 19.2671 30.1869 19.3534C30.4229 19.4293 30.6771 19.4293 30.9131 19.3534C31.1814 19.2671 31.414 19.0368 31.8794 18.5761L34.7674 15.7172C35.0785 16.4665 35.25 17.2871 35.25 18.1474C35.25 21.6805 32.3566 24.5447 28.7875 24.5447C28.3572 24.5447 27.9367 24.5031 27.53 24.4237C26.9587 24.3122 26.6731 24.2564 26.5 24.2735C26.3159 24.2916 26.2252 24.319 26.0621 24.4054C25.9087 24.4866 25.7548 24.639 25.447 24.9437L17.0375 33.2684C16.0641 34.232 14.4859 34.232 13.5125 33.2684C12.5391 32.3048 12.5391 30.7425 13.5125 29.7789L21.922 21.4542C22.2298 21.1495 22.3837 20.9972 22.4658 20.8453C22.5531 20.6838 22.5807 20.594 22.599 20.4118C22.6163 20.2404 22.5599 19.9577 22.4473 19.3922C22.3671 18.9896 22.325 18.5733 22.325 18.1474C22.325 14.6142 25.2184 11.75 28.7875 11.75C29.969 11.75 31.0764 12.0638 32.0293 12.6119ZM23.5001 26.871L29.9625 33.2683C30.9359 34.2319 32.5141 34.2319 33.4875 33.2683C34.4609 32.3047 34.4609 30.7424 33.4875 29.7788L28.171 24.516C27.7946 24.4807 27.4277 24.4135 27.0729 24.3171C26.6158 24.1929 26.1143 24.2831 25.7791 24.6149L23.5001 26.871Z"
        stroke="#3BAF75"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Camera: (
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute ml-8 mt-20"
    >
      <g id="camera-01">
        <g id="Icon">
          <path
            d="M2 8.37722C2 8.0269 2 7.85174 2.01462 7.70421C2.1556 6.28127 3.28127 5.1556 4.70421 5.01462C4.85174 5 5.03636 5 5.40558 5C5.54785 5 5.61899 5 5.67939 4.99634C6.45061 4.94963 7.12595 4.46288 7.41414 3.746C7.43671 3.68986 7.45781 3.62657 7.5 3.5C7.54219 3.37343 7.56329 3.31014 7.58586 3.254C7.87405 2.53712 8.54939 2.05037 9.32061 2.00366C9.38101 2 9.44772 2 9.58114 2H14.4189C14.5523 2 14.619 2 14.6794 2.00366C15.4506 2.05037 16.126 2.53712 16.4141 3.254C16.4367 3.31014 16.4578 3.37343 16.5 3.5C16.5422 3.62657 16.5633 3.68986 16.5859 3.746C16.874 4.46288 17.5494 4.94963 18.3206 4.99634C18.381 5 18.4521 5 18.5944 5C18.9636 5 19.1483 5 19.2958 5.01462C20.7187 5.1556 21.8444 6.28127 21.9854 7.70421C22 7.85174 22 8.0269 22 8.37722V16.2C22 17.8802 22 18.7202 21.673 19.362C21.3854 19.9265 20.9265 20.3854 20.362 20.673C19.7202 21 18.8802 21 17.2 21H6.8C5.11984 21 4.27976 21 3.63803 20.673C3.07354 20.3854 2.6146 19.9265 2.32698 19.362C2 18.7202 2 17.8802 2 16.2V8.37722Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
          <path
            d="M12 16.5C14.2091 16.5 16 14.7091 16 12.5C16 10.2909 14.2091 8.5 12 8.5C9.79086 8.5 8 10.2909 8 12.5C8 14.7091 9.79086 16.5 12 16.5Z"
            stroke="white"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </g>
      </g>
    </svg>
  ),

  XClose: (
    <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g id="x-close">
        <path
          id="Icon"
          d="M15.75 5.25L5.25 15.75M5.25 5.25L15.75 15.75"
          stroke="black"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  ),

  Refresh: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      strokeWidth={1.5}
      stroke="currentColor"
      className="h-4 w-4"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M16.023 9.348h4.992v-.001M2.985 19.644v-4.992m0 0h4.992m-4.993 0l3.181 3.183a8.25 8.25 0 0013.803-3.7M4.031 9.865a8.25 8.25 0 0113.803-3.7l3.181 3.182m0-4.991v4.99"
      />
    </svg>
  ),
};

export default Icons;

type SVGElement = SVGProps<SVGSVGElement>;
interface IconProps extends SVGElement {
  icon: keyof typeof Icons;
  size?: number;
}

export const IconSlot = ({ icon, className, size, ...props }: IconProps) => {
  const Element = Icons[icon];

  return (
    <Slot<SVGElement> width={size} height={size} {...props} className={cn(className)}>
      {Element}
    </Slot>
  );
};
