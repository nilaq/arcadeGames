import {BoardDimensions, Cell} from "../lib/gameUtils";
import {BlockFactory, BlockType, Block} from "./Blocks";

export class GameState {
    private _dimensions: BoardDimensions;
    private _fields: string[][];
    // @ts-ignore
    private _currentBlock: Block;
    private readonly mid: number;

    private _nextBlock: BlockType;

    private _score = 0;

    initialized = false;
    constructor(dim: BoardDimensions) {
        this._dimensions = dim;
        this._fields = Array.from({ length: dim.rows }, () => Array.from({ length: dim.cols }, () => ""));
        this.mid = Math.floor(dim.cols / 2);
        this._nextBlock = BlockFactory.getRandomBlockType();
        this.addBlock()
    }

    reset() {
        this._fields = Array.from({ length: this._dimensions.rows }, () => Array.from({ length: this._dimensions.cols }, () => ""));
        this._score = 0;
        this.addBlock()
    }

    get score() {
        return this._score;
    }

    get fields() {
        // create deep copy of fields
        const fields = JSON.parse(JSON.stringify(this._fields));
        const block = this._currentBlock;
        block.shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === 1) {
                    // @ts-ignore
                    fields[block.y + y][block.x + x] = block.color;
                }
            });
        });
        return fields;
    }

    get nextBlockType() {
        return this._nextBlock;
    }

    addBlock() {
        const block = BlockFactory.createBlock(this.mid, 2, this._nextBlock)
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

    checkDown(): boolean {
        // @ts-ignore
        if (this._currentBlock.y + this._currentBlock.shape.length >= this._dimensions.rows)
            return false;
        // @ts-ignore
        for (let y = 0; y < this._currentBlock.shape.length; y++) {
            // @ts-ignore
            for (let x = 0; x < this._currentBlock.shape[0].length; x++) {
                // @ts-ignore
                if (this._currentBlock.shape[y][x] === 1) {
                    // @ts-ignore
                    if (this._fields[this._currentBlock.y + y + 1][this._currentBlock.x + x] !== "") {
                        return false;
                    }
                }
            }
        }
        return true;
    }

    moveDown() {
        if (!this._currentBlock)
            return
        // @ts-ignore
        if (this.checkDown())
            this._currentBlock.moveDown();
        else
            this.handleTransitions();
    }

    handleTransitions() {
        this._currentBlock.shape.forEach((row, y) => {
            row.forEach((cell, x) => {
                if (cell === 1) {
                    // @ts-ignore
                    this._fields[this._currentBlock.y + y][this._currentBlock.x + x] = this._currentBlock.color;
                }
            });
        });
        const fullRows = this.handleFullRows();
        this._score += fullRows * 100;
        this.addBlock();
    }

    handleFullRows() {
        let fullRows = 0;
        this._fields.forEach((row, y) => {
            if (row.every(cell => cell !== "")) {
                fullRows++;
                this._fields.splice(y, 1);
                this._fields.unshift(Array.from({ length: this._dimensions.cols }, () => ""));
            }
        });
        return fullRows;
    }

    rotate() {
        // @ts-ignore
        if (this._currentBlock && this._currentBlock.y + this._currentBlock.nextShape().length <= this._dimensions.rows && this._currentBlock.x + this._currentBlock.nextShape()[0].length <= this._dimensions.cols)
                    this._currentBlock.rotate();
    }

}