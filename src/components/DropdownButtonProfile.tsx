import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { Menu, Transition } from "@headlessui/react";
import { Fragment, JSX, SVGProps, useEffect, useRef, useState } from "react";

interface Props {
  values: string[];
  defaultValue: string;
  onDurationChange: (newDuration: string) => void;
}

const DropdownButtonProfile = ({ values, defaultValue, onDurationChange }: Props) => {
  const [selectedItemString, setSelectedItemString] = useState(defaultValue);

  const handleSelect = (valueString: string) => {
    setSelectedItemString(valueString); // Set the selected item string
    onDurationChange(valueString); // Return the selected item
  };

  return (
    <Menu as="div" className="relative inline-block text-left w-2/3">
      <div>
        <Menu.Button className="inline-flex w-full justify-center rounded-md bg-slate-200 px-6 py-2 text-sm font-medium text-black hover:bg-opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75">
          {selectedItemString || "Duration"}
          <ChevronDownIcon
            className="ml-2 -mr-1 h-5 w-5 text-black"
            aria-hidden="true"
          />
        </Menu.Button>
      </div>
      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="z-10 absolute right-0 mt-2 w-full origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
          <div className="px-1 py-1">
            {values.map((value: string, index: any) => (
              <Menu.Item key={index}>
                {({ active }) => (
                  <button
                    className={`${
                      active ? "bg-violet-500 text-white" : "text-gray-900"
                    } group flex w-full items-center rounded-md px-2 py-2 text-sm`}
                    onClick={() => handleSelect(value)}
                  >
                    {value}
                  </button>
                )}
              </Menu.Item>
            ))}
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
};

export default DropdownButtonProfile;
