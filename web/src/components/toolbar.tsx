import { BugAntIcon, DocumentTextIcon } from "@heroicons/react/24/outline";
import Task from "./task";
import Tool from "./tool";
import Debug from "./debug";

export const Toolbar = () => {
  return (
    <div className="fixed right-0 bottom-0 mr-12 mb-10 flex gap-3">
      <Tool
        icon={<DocumentTextIcon className="w-6" />}
        panelClassName=""
      >
        <Task />
      </Tool>
      <Tool
        icon={<BugAntIcon className="w-6" />}
        panelClassName=" h-[calc(100vh-7rem)]  w-[350px]"
      >
        <Debug />
      </Tool>
    </div>
  );
};

export default Toolbar;
