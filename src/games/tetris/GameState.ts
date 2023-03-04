import {BoardDimensions, Cell} from "../lib/gameUtils";
import {BlockFactory, BlockType, Block} from "./Blocks";

export class GameState {
    private _dimensions: BoardDimensions;
    private _fields: string[][];
    private readonly _blocks: Block[];

    private _currentBlock: Block | undefined;
    private readonly mid: number;

    private _nextBlock: BlockType;

    initialized = false;
    constructor(dim: BoardDimensions) {
        this._dimensions = dim;
        this._fields = Array.from({ length: dim.rows }, () => Array.from({ length: dim.cols }, () => ""));
        this._blocks = [];
        this.mid = Math.floor(dim.cols / 2);
        this._nextBlock = BlockFactory.getRandomBlockType();
    }

    get fields() {
        this.updateFields()
        return this._fields;
    }

    get blocks() {
        return this._blocks;
    }

    get nextBlockType() {
        return this._nextBlock;
    }

    addBlock() {
        const block = BlockFactory.createBlock(this.mid, 2, this._nextBlock)
        this._blocks.push(block);
        this._currentBlock = block;
        this._nextBlock = BlockFactory.getRandomBlockType();
        if (!this.initialized)
            this.initialized = true;
    }

    moveRight() {
        // @ts-ignore
        if (this._currentBlock && this._currentBlock.x + this._currentBlock.shape[0].length < this._dimensions.cols)
            this._currentBlock.moveRight();
    }

    moveLeft() {
        // @ts-ignore
        if (this._currentBlock && this._currentBlock.x > 0)
            this._currentBlock.moveLeft();
    }

    moveDown() {
        // @ts-ignore
        if (this._currentBlock && this._currentBlock.y + this._currentBlock.shape.length < this._dimensions.rows)
            this._currentBlock.moveDown();
    }

    rotate() {
        // @ts-ignore
        if (this._currentBlock && this._currentBlock.y + this._currentBlock.nextShape().length <= this._dimensions.rows && this._currentBlock.x + this._currentBlock.nextShape()[0].length <= this._dimensions.cols)
                    this._currentBlock.rotate();
    }

   updateFields() {
       this._fields = this._fields.map(row => row.map(field => ""));
       this._blocks.forEach(block => {
           block.shape.forEach((row, y) => {
               row.forEach((cell, x) => {
                   if (cell === 1) {
                       // @ts-ignore
                       this._fields[block.y + y][block.x + x] = block.color;
                   }
               });
           });
       });
   }
}