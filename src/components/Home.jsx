import Header from "./Header";
import Page from "./Page";
import Sidebar from "./Sidebar";

export default function Home() {

  return (
    <div>
        <Header/>
        <div className="flex">
            <Page/>
            <Sidebar/>
        </div>
    </div>
  )
}
