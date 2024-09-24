"use client";
import React, { useState } from "react";
import Header from "../(components)/Header";
import { Users } from "lucide-react";

type UserSettings = {
  label: string;
  value: string | boolean;
  type: "text" | "toggle";
};

const mockSettings: UserSettings[] = [
  { label: "Username", value: "john_doe", type: "text" },
  { label: "Email", value: "john_doe@gmail.com", type: "text" },
  { label: "Notification", value: true, type: "toggle" },
  { label: "Dark Mode", value: false, type: "toggle" },
  { label: "Language", value: "English", type: "text" },
];

const Settings = () => {
  const [userSetting, setUserSettings] = useState<UserSettings[]>(mockSettings);

  const handleToggleChange = (index: number) => {
    console.log("change");
    const settingsCopy = [...userSetting];
    settingsCopy[index].value = !settingsCopy[index].value as boolean;
    setUserSettings(settingsCopy);
  };
  return (
    <div className=" w-full">
      <Header name="User Settings" />
      <div className=" overflow-x-auto mt-5 shadow-md">
        <table className="min-w-full bg-white rounded-lg">
          <thead>
            <tr>
              <th className=" uppercase py-3 px-4 text-left text-sm font-semibold">
                Setting
              </th>
              <th className="uppercase py-3 px-4 text-left text-sm font-semibold">
                Value
              </th>
            </tr>
          </thead>
          <tbody>
            {userSetting.map((setting, index) => (
              <tr key={setting.label}>
                <td className="px-4 py-2">{setting.label}</td>
                <td className="px-4 py-2">
                  {setting.type === "toggle" ? (
                    <label className="inline-flex relative items-center cursor-pointer">
                      <input
                        type="checkbox"
                        className="sr-only peer"
                        checked={(setting.value as boolean) === true}
                        onChange={() => handleToggleChange(index)}
                      />
                      <div
                        className="relative w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4
                       peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer dark:bg-gray-700 
                       peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full 
                       peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white 
                       after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"
                      ></div>
                    </label>
                  ) : (
                    <input
                      type="text"
                      className="px-4 py-2 border rounded-xl text-gray-500 focus:outline-none focus:border-blue-500"
                      value={setting.value as string}
                      onChange={(e) => {
                        const settingsCopy = [...userSetting];
                        settingsCopy[index].value = e.target.value;
                        setUserSettings(settingsCopy);
                      }}
                    />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Settings;
