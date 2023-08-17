import Sidebar from "../components/Sidebar";
import Page from "../components/Page";

export default function Single() {
  return (
    <div className="flex">
      <Page />
      <Sidebar />
    </div>
  );
}