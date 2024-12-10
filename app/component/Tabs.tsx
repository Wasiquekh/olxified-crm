'use client'
// components/Tabs.tsx
import { useState } from 'react';

interface TabProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

const Tab: React.FC<TabProps> = ({ label, isActive, onClick }) => (
  <button
    className={`py-2 px-2 text-base font-medium mx-3 leading-normal transition-colors duration-200 ${
      isActive
        ? ' text-customBlue border-b-[3px] border-customBlue '
        : ' text-[#718EBF]'
    }`}
    onClick={onClick}
  >
    {label}
  </button>
);

interface TabPanelProps {
  children: React.ReactNode;
  isActive: boolean;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, isActive }) => (
  <div className={`p-4 ${isActive ? 'block' : 'hidden'}`}>
    {children}
  </div>
);

interface TabsProps {
  tabs: {
    label: string;
    content: React.ReactNode;
  }[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState<string>(tabs[0].label);

  return (
    <div>
      <div className="flex border-b border-[#F4F5F7]">
        {tabs.map((tab) => (
          <Tab
            key={tab.label}
            label={tab.label}
            isActive={tab.label === activeTab}
            onClick={() => setActiveTab(tab.label)}
          />
        ))}
      </div>
      <div>
        {tabs.map((tab) => (
          <TabPanel key={tab.label} isActive={tab.label === activeTab}>
            {tab.content}
          </TabPanel>
        ))}
      </div>
    </div>
  );
};

export default Tabs;
