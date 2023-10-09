import authService from "@/utils/apis/auth";
import Alert from "@/utils/base/alerts";
import { toast } from "react-toastify";

export default function Home() {
  const user = authService.getSession();

  return (
    <main>
      <div>
        <h1>Toast using alert class</h1>
        <button onClick={() => Alert.error("An error message")}>Error</button>
        <button onClick={() => Alert.success("A success message")}>Success</button>
        <button onClick={() => Alert.info("An info toast")}>Info</button>
      </div>
      <div>
        <h1>Toast using toast</h1>
        <button onClick={() => toast.error("An error message")}>Error</button>
        <button onClick={() => toast.success("A success message")}>Success</button>
        <button onClick={() => toast.info("An info toast")}>Info</button>
      </div>
      <div className="mt-10">
        <button onClick={() => authService.logOut()}>Log out</button>
      </div>
    </main>
  );
}
