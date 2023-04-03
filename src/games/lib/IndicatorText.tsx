import React from 'react';
import Title from "../../components/typography/Title";

interface IndicatorProps {
    title: string;
    element: string;
    elementSize?: '2xl' | '3xl' | '4xl' | '5xl';
    top?: boolean;
}

const IndicatorText = ({title, element, elementSize = '4xl', top = true}: IndicatorProps) => {

    const titleText = <Title className="text-slate-300 text-md md:text-xl tracking-wider">{title}</Title>
    const elementText = <Title className={`text-xl md:text-3xl pt-3 p-0 font-light text-slate-100`}>{element}</Title>

    return (
            <div className="flex flex-col items-center">
                {top && titleText}
                {elementText}
                {!top && titleText}
            </div>
    );
};

export default IndicatorText;