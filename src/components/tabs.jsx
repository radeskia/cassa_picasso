import { useEffect } from "react";
import { cn } from "../lib/utils";

const Tabs = ({ tabs, activeTabId, handleTabSelection }) => {
    const handleActiveTabSelection = (tab) => {
        // Prevent callback function from being called if item is disabled
        if (tab.disabled) return;

        // Call the callback function passed as a prop
        handleTabSelection(tab);
    };

    useEffect(() => {
        if (!activeTabId) {
            handleActiveTabSelection(tabs[0]);
        }
    }, [activeTabId, tabs]);

    return (
        <>
            <div className="mt-2 flex w-full cursor-pointer justify-between border-b border-primary/60 text-lg">
                {tabs.map((tab, index) => {
                    return (
                        <div
                            key={tab.id}
                            className={cn(
                                `flex w-full justify-center transition-all duration-200 hover:bg-base-200/60 `,
                                index === 0 && "rounded-ss-sm",
                                index === tabs.length - 1 && "rounded-se-sm"
                            )}
                            onClick={() => handleActiveTabSelection(tab)}
                        >
                            <div
                                className={cn(
                                    "mx-2 w-fit border-b-[3px] border-transparent pb-2 pt-3 text-slate-400 transition-colors",
                                    activeTabId === tab.id &&
                                        "border-b-[4px] border-primary text-slate-200"
                                )}
                            >
                                {tab.text}
                            </div>
                        </div>
                    );
                })}
            </div>
        </>
    );
};

export default Tabs;
