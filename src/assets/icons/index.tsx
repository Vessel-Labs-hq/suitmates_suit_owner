import Slot from "@/components/organisms/Slot";
import { cn } from "@/utils";
import { SVGProps } from "react";

const Icons = {
  PhotoGallery: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="47"
      height="47"
      viewBox="0 0 47 47"
      fill="none"
    >
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="24"
      viewBox="0 0 25 24"
      fill="none"
    >
      <path d="M19.5 13H13.5V19H11.5V13H5.5V11H11.5V5H13.5V11H19.5V13Z" fill="white" />
    </svg>
  ),
  HintTiny: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="10"
      height="10"
      viewBox="0 0 10 10"
      fill="none"
    >
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
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="47"
      height="47"
      viewBox="0 0 47 47"
      fill="none"
    >
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
    <svg
      width="21"
      height="21"
      viewBox="0 0 21 21"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
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
  Tool02Green: (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="54"
      height="54"
      viewBox="0 0 54 54"
      fill="none"
    >
      <path
        d="M13.5 13.5L23.625 23.625M13.5 13.5H6.75L4.5 6.75L6.75 4.5L13.5 6.75V13.5ZM43.3327 6.16728L37.4206 12.0794C36.5295 12.9705 36.084 13.416 35.9171 13.9297C35.7703 14.3816 35.7703 14.8684 35.9171 15.3203C36.084 15.834 36.5295 16.2795 37.4206 17.1706L37.9544 17.7044C38.8455 18.5955 39.291 19.041 39.8047 19.2079C40.2566 19.3547 40.7434 19.3547 41.1953 19.2079C41.709 19.041 42.1545 18.5955 43.0456 17.7044L48.5759 12.1741C49.1715 13.6235 49.5 15.2109 49.5 16.875C49.5 23.7095 43.9595 29.25 37.125 29.25C36.301 29.25 35.4959 29.1695 34.717 29.0159C33.6231 28.8001 33.0762 28.6923 32.7447 28.7253C32.3922 28.7604 32.2185 28.8133 31.9061 28.9804C31.6124 29.1376 31.3177 29.4323 30.7283 30.0217L14.625 46.125C12.761 47.9889 9.73896 47.9889 7.875 46.125C6.01104 44.261 6.01104 41.2389 7.875 39.375L23.9783 23.2717C24.5677 22.6823 24.8624 22.3876 25.0196 22.0938C25.1867 21.7815 25.2396 21.6078 25.2747 21.2553C25.3077 20.9238 25.1999 20.3769 24.9841 19.283C24.8305 18.5041 24.75 17.699 24.75 16.875C24.75 10.0405 30.2905 4.5 37.125 4.5C39.3874 4.5 41.508 5.1071 43.3327 6.16728ZM27.0001 33.7499L39.375 46.1248C41.2389 47.9887 44.261 47.9887 46.125 46.1248C47.9889 44.2608 47.9889 41.2387 46.1249 39.3747L35.9445 29.1944C35.2238 29.1262 34.5211 28.9962 33.8418 28.8097C32.9664 28.5695 32.0061 28.7439 31.3642 29.3858L27.0001 33.7499Z"
        stroke="#3BAF75"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  UsersPlus: (
    <svg
      width="190"
      height="189"
      viewBox="0 0 190 189"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M149.903 164.709V117.649M126.373 141.179H173.433M95 117.649H63.6266C49.0085 117.649 41.6994 117.649 35.9339 120.037C28.2466 123.222 22.139 129.329 18.9548 137.017C16.5667 142.782 16.5667 150.091 16.5667 164.709M122.452 25.8098C133.949 30.4639 142.06 41.7361 142.06 54.9026C142.06 68.0691 133.949 79.3413 122.452 83.9954M106.765 54.9026C106.765 72.2296 92.7187 86.276 75.3916 86.276C58.0646 86.276 44.0183 72.2296 44.0183 54.9026C44.0183 37.5756 58.0646 23.5293 75.3916 23.5293C92.7187 23.5293 106.765 37.5756 106.765 54.9026Z"
        stroke="#E5E5E5"
        strokeWidth="5.43"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  ),
  Inbox: (
    <svg
      fill="none"
      height="24"
      shape-rendering="geometricPrecision"
      stroke="currentColor"
      stroke-linecap="round"
      stroke-linejoin="round"
      stroke-width="1.5"
      viewBox="0 0 24 24"
      width="24"
      aria-label="Empty inbox"
    >
      <path d="M22 12h-6l-2 3h-4l-2-3H2"></path>
      <path d="M5.45 5.11L2 12v6a2 2 0 002 2h16a2 2 0 002-2v-6l-3.45-6.89A2 2 0 0016.76 4H7.24a2 2 0 00-1.79 1.11z"></path>
    </svg>
  ),
  Ellipse: (
    <svg
      width="7"
      height="7"
      viewBox="0 0 7 7"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle id="Ellipse 200" cx="3.80005" cy="3.1582" r="3" fill="#333333" />
    </svg>
  ),
  FileAttachment: (
    <svg
      width="42"
      height="42"
      viewBox="0 0 42 42"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <g id="file-attachment-01">
        <path
          id="Icon"
          d="M10.5 17.5V7.875C10.5 6.42525 11.6753 5.25 13.125 5.25C14.5747 5.25 15.75 6.42525 15.75 7.875V17.5C15.75 20.3995 13.3995 22.75 10.5 22.75C7.60051 22.75 5.25 20.3995 5.25 17.5V10.5M21.875 3.5H26.6C29.5403 3.5 31.0104 3.5 32.1335 4.07222C33.1213 4.57555 33.9244 5.3787 34.4278 6.36655C35 7.48959 35 8.95972 35 11.9V30.1C35 33.0403 35 34.5104 34.4278 35.6334C33.9244 36.6213 33.1213 37.4244 32.1335 37.9278C31.0104 38.5 29.5403 38.5 26.6 38.5H15.4C12.4597 38.5 10.9896 38.5 9.86655 37.9278C8.8787 37.4244 8.07555 36.6213 7.57222 35.6334C7 34.5104 7 33.0403 7 30.1V28.875"
          stroke="#333333"
          stroke-width="2"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>
    </svg>
  ),
  HelpAndSupport: (
    <svg
      width="63"
      height="63"
      viewBox="0 0 63 63"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M23.8613 23.625C24.4784 21.8706 25.6965 20.3913 27.2999 19.449C28.9032 18.5067 30.7884 18.1622 32.6213 18.4766C34.4543 18.791 36.1169 19.744 37.3146 21.1668C38.5123 22.5895 39.1678 24.3902 39.165 26.25C39.165 31.5 31.29 34.125 31.29 34.125M31.5 44.625H31.5263M57.75 31.5C57.75 45.9975 45.9975 57.75 31.5 57.75C17.0025 57.75 5.25 45.9975 5.25 31.5C5.25 17.0025 17.0025 5.25 31.5 5.25C45.9975 5.25 57.75 17.0025 57.75 31.5Z"
        stroke="#333333"
        stroke-width="3"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  PhoneIcon: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M11.7081 4.99984C12.5221 5.15864 13.2701 5.55672 13.8565 6.14312C14.4429 6.72952 14.841 7.47756 14.9998 8.2915M11.7081 1.6665C13.3992 1.85437 14.9761 2.61165 16.18 3.81401C17.3839 5.01637 18.1431 6.59235 18.3331 8.28317M8.52228 11.5524C7.52097 10.5511 6.73031 9.41888 6.15031 8.21086C6.10042 8.10695 6.07548 8.055 6.05631 7.98926C5.98821 7.75563 6.03713 7.46875 6.17881 7.27089C6.21867 7.21521 6.2663 7.16758 6.36156 7.07232C6.6529 6.78098 6.79857 6.63531 6.89381 6.48883C7.25297 5.93642 7.25297 5.22427 6.89381 4.67186C6.79857 4.52538 6.6529 4.37971 6.36156 4.08837L6.19917 3.92598C5.7563 3.48311 5.53487 3.26168 5.29705 3.14139C4.82408 2.90217 4.26553 2.90217 3.79256 3.14139C3.55474 3.26168 3.33331 3.48311 2.89044 3.92598L2.75908 4.05735C2.31773 4.4987 2.09705 4.71937 1.92851 5.0194C1.74149 5.35232 1.60703 5.8694 1.60816 6.25125C1.60918 6.59537 1.67594 6.83056 1.80944 7.30093C2.52692 9.82876 3.88065 12.2141 5.87063 14.204C7.86061 16.194 10.2459 17.5478 12.7737 18.2652C13.2441 18.3987 13.4793 18.4655 13.8234 18.4665C14.2053 18.4677 14.7224 18.3332 15.0553 18.1462C15.3553 17.9776 15.576 17.7569 16.0173 17.3156L16.1487 17.1842C16.5916 16.7414 16.813 16.5199 16.9333 16.2821C17.1725 15.8091 17.1725 15.2506 16.9333 14.7776C16.813 14.5398 16.5916 14.3184 16.1487 13.8755L15.9863 13.7131C15.695 13.4218 15.5493 13.2761 15.4028 13.1809C14.8504 12.8217 14.1383 12.8217 13.5858 13.1809C13.4394 13.2761 13.2937 13.4218 13.0024 13.7131C12.9071 13.8084 12.8595 13.856 12.8038 13.8959C12.6059 14.0375 12.319 14.0865 12.0854 14.0184C12.0197 13.9992 11.9677 13.9743 11.8638 13.9244C10.6558 13.3444 9.5236 12.5537 8.52228 11.5524Z"
        stroke="#333333"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  ),
  Mail: (
    <svg
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M17.9167 15.0002L12.381 10.0002M7.61913 10.0002L2.08344 15.0002M1.66675 5.8335L8.47085 10.5964C9.02182 10.982 9.29731 11.1749 9.59697 11.2496C9.86166 11.3156 10.1385 11.3156 10.4032 11.2496C10.7029 11.1749 10.9783 10.982 11.5293 10.5964L18.3334 5.8335M5.66675 16.6668H14.3334C15.7335 16.6668 16.4336 16.6668 16.9684 16.3943C17.4388 16.1547 17.8212 15.7722 18.0609 15.3018C18.3334 14.767 18.3334 14.067 18.3334 12.6668V7.3335C18.3334 5.93336 18.3334 5.2333 18.0609 4.69852C17.8212 4.22811 17.4388 3.84566 16.9684 3.60598C16.4336 3.3335 15.7335 3.3335 14.3334 3.3335H5.66675C4.26662 3.3335 3.56655 3.3335 3.03177 3.60598C2.56137 3.84566 2.17892 4.22811 1.93923 4.69852C1.66675 5.2333 1.66675 5.93336 1.66675 7.3335V12.6668C1.66675 14.067 1.66675 14.767 1.93923 15.3018C2.17892 15.7722 2.56137 16.1547 3.03177 16.3943C3.56655 16.6668 4.26662 16.6668 5.66675 16.6668Z"
        stroke="#333333"
        stroke-width="1.5"
        stroke-linecap="round"
        stroke-linejoin="round"
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
