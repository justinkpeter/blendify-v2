import React from "react";

export const SectionIcon = ({Icon, gradient}) => {

    const iconStyle = `relative grid grid-cols-1 col-[3_/_span_1] row-[3_/_span_1] rounded-2xl ${gradient}`

    return (
        <>
            <div className={iconStyle}>
                <Icon className={'w-10 h-10 text-white absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'}/>
            </div>
        </>
    );
}