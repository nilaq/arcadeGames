import React from 'react';
import Title from "../../components/typography/Title";
import {useTetrisStore} from "../../stores/tetrisStore";
import {BlockFactory} from "./Blocks";

const Preview = () => {

    const {
        nextBlocks
    } = useTetrisStore((state) => state);

    return (
        <div className="flex flex-col gap-[15px] items-center justify-center">
            <Title className="text-slate-300 text-xl tracking-wider">Next</Title>
            <div className="h-[90px] flex flex-col justify-between items-start">
                {nextBlocks && nextBlocks.map((type, index) => {
                    return (
                        <div className="flex flex-row justify-center" key={index}>
                            {BlockFactory.createBlock(0, 0, type).preview.map((row, i) => {
                                return (
                                    <div key={i} className="flex flex-col">
                                        {row.map((cellValue, j) => {
                                            return <div key={j}
                                                        className={`${cellValue === 1 ? 'w-[10px] h-[10px] bg-white' : 'w-[10px] h-[10px] transparent'}`}></div>;
                                        })}
                                    </div>
                                )
                            })
                            }
                        </div>
                    )
                })}

            </div>
        </div>
    );
};

export default Preview;