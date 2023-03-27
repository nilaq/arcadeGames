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
        nextBlocks,
        setNextBlocks,
        squareSize
    } = useTetrisStore((state) => state);

    const [blocks, setBlocks] = useState<Block[]>();

    useEffect(() => {
        if (nextBlocks.length > 0) {
            setBlocks(nextBlocks.map((blockType) => BlockFactory.createBlock(0, 0, blockType)));
        }
    }, [nextBlocks])

    return (
        <div className="flex flex-col items-center justify-center rounded-r-xl bg-gradient-to-br from-tetris-purple to-w-purple"
             style={{width: width, height: height}}>
            <Title className="text-white">Next up:</Title>
            <div className="h-full flex flex-col justify-center items-center">
                {blocks && blocks.map((block, index) => {
                    return (
                        <div className="flex flex-row justify-center items-center" key={index}>
                            {block.shape.map((row, i) => {
                                <div key={i} className="row flex flex-row">
                                    {row.map((cellValue, j) => {
                                        return <div key={j} className={`${cellValue === 1 ? 'w-[10px] h-[10px] bg-white' : 'transparent'}`}></div>;
                                    })}
                                </div>
                            })}
                        </div>
                    )
                })}

            </div>
        </div>
    );
};

export default Preview;
