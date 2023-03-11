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
        <div className="flex flex-col items-center justify-center rounded-r-xl bg-gradient-to-br from-tetris-purple to-w-purple"
             style={{width: width, height: height}}>
            <Title className="text-white">Next up:</Title>
            <div className="h-full flex flex-col justify-center items-center">
                {block && block.shape.map((row, i) => (
                    <div key={i} className="row flex flex-row">
                        {row.map((cellValue, j) => {
                            return <div key={j} className={`${cellValue === 1 ? 'white' : 'transparent'}`} style={{
                                width: 10,
                                height: 10
                            }}></div>;
                        })}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Preview;