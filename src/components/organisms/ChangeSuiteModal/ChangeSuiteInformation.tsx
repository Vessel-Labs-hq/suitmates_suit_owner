import SuiteInfoInputRow from "@/components/molecules/SuiteInfoInputRow";
import { InferSchema } from "@/utils/schema/helpers";
import { SuiteInfoSchema } from "@/utils/schema/details";
import { Button, Text, Title } from "@the_human_cipher/components-library";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import Icons from "@/assets/icons";
import Alert from "@/utils/base/alerts";
import onBoardingService from "@/utils/apis/onboarding";
import { onFormError } from "@/utils/functions/react-hook-form";
// import ChangeSuiteInfoRow from "./ChangeSuiteInfoRow";
import SuiteOccupied from "./SuiteOccupied";
import NewSuiteInformation from "./NewSuiteInformation";
import { useQuery } from "react-query";
import authService from "@/utils/apis/auth";
import { useGetSpace } from "@/utils/hooks/api/useGetSpace";
import userProfileApi from "@/utils/hooks/api/userprofile";

/**
 * guide on how to do multiple fields
 *
 * https://www.cluemediator.com/dynamic-form-with-react-hook-form-using-usefieldarray
 */

const ChangeSuiteInformation = () => {
  const user = authService.getSession();
  const profileId = user!.id;

  const { data } = useQuery({
    queryKey: ["get-user-profile", profileId],
    queryFn: () => userProfileApi.getUserProfile(profileId),
    staleTime: 15 * (60 * 1000),
    cacheTime: 20 * (60 * 1000),
  });

  const userSuite = data?.data;

  return (
    <div className="mx-auto w-full rounded-xl bg-[#F3F3F3]">
      <div className="">{/* <SuiteOccupied  /> */}</div>

      {/* second form */}
      <div>
        <NewSuiteInformation />
      </div>
    </div>
  );
};

export default ChangeSuiteInformation;
