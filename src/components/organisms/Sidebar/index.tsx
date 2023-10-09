import Image from "next/image";
import Logo from "public/logoDark.png";

const Sidebar = () => {
  return (
    <aside className="sticky top-0 flex h-screen w-full max-w-sm bg-light-gray md:pr-5 lg:pr-10 xxl:max-w-[400px]">
      <div className="ml-auto w-full max-w-[80%]">
        <Image priority src={Logo} alt="Suitemates" width={197} height={30} />
      </div>
    </aside>
  );
};

export default Sidebar;
