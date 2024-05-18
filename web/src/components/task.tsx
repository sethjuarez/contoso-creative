import {
  PaperAirplaneIcon,
  ClipboardDocumentIcon
} from "@heroicons/react/24/outline";

export const Task = () => {
  return (
    <div className="p-3">
      <div className="text-start">
        <label
          htmlFor="research"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Research
        </label>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          What kinds of things should I find?
        </p>
        <div className="mt-2">
          <div className=" flex rounded-md shadow-sm ring-1 ring-inset ring-gray-300 focus-within:ring-2 focus-within:ring-inset focus-within:ring-blue-600">
            <textarea
              id="research"
              name="research"
              rows={3}
              cols={60}
              className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              defaultValue={""}
            />
          </div>
        </div>
      </div>

      <div className="text-start mt-3">
        <label
          htmlFor="products"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Products
        </label>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          What products should I look at?
        </p>
        <div className="mt-2">
          <textarea
            id="products"
            name="products"
            rows={3}
            cols={60}
            className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={""}
          />
        </div>
      </div>
      <div className="text-start mt-3">
        <label
          htmlFor="writing"
          className="block text-sm font-medium leading-6 text-gray-900"
        >
          Assignment
        </label>
        <p className="mt-1 text-sm leading-6 text-gray-400">
          What kind of writing should I do?
        </p>
        <div className="mt-2">
          <textarea
            id="writing"
            name="writing"
            rows={3}
            cols={60}
            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue={""}
          />
        </div>
      </div>
      <div className="flex justify-end gap-2 mt-12">
        <button
          type="button"
          className="flex flex-row gap-3 items-center rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <ClipboardDocumentIcon className="w-6" />
          <span>Example</span>
        </button>
        <button
          type="button"
          className="flex flex-row gap-3 items-center rounded-md bg-white px-3.5 py-2.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
        >
          <PaperAirplaneIcon className="w-6" />
          <span>Start Work</span>
        </button>
      </div>
    </div>
  );
};

export default Task;
