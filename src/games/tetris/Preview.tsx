import React, {useEffect, useState} from 'react';
import Title from "../../components/typography/Title";
import {useTetrisStore} from "../../stores/tetrisStore";
import {Block, BlockFactory, BlockType} from "./Blocks";

interface PreviewProps {
    width: number;
    height: number;
}

const Preview = ({width, height}: PreviewProps) => {

    const {
        nextBlock,
        setNextBlock,
        squareSize
    } = useTetrisStore((state) => state);

    const [block, setBlock] = useState<Block>();

    useEffect(() => {
        if (nextBlock)
            setBlock(BlockFactory.createBlock(0,0,nextBlock));
    }, [nextBlock])

    return (
        <div className="bg-gray-200 outline-4 outline outline-gray-700 flex flex-col p-3"
             style={{width: width, height: height}}>
            <Title className="text-xl font-light">Next up:</Title>
            <div className="h-full flex flex-col justify-center items-center">
                {block && block.shape.map((row, i) => (
                    <div key={i} className="row flex flex-row">
                        {row.map((cellValue, j) => {
                            return <div key={j} className={`${cellValue === 1 ? block.color : 'transparent'}`} style={{
                                width: squareSize,
                                height: squareSize
                            }}></div>;
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Preview;