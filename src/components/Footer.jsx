import React from "react";
import { ScrollDirectionIcon } from "./Icons/ScrollDirectionIcon";

export const Footer = () => {
    return (
        <>
            <footer className="fixed footer   bottom-0 left-0 z-50 items-center p-7  text-neutral-content">
                <div className="items-center grid-flow-col">
                    <ScrollDirectionIcon />
                    <span className={'font-medium text-md'}> Scroll to navigate </span>
                </div>
            </footer>
        </>
    );
}