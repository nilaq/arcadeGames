import {BoardDimensions, Direction} from "../lib/gameUtils";
import {Block, BlockFactory, BlockType} from "./Blocks";


export class GameState {
    private _dimensions: BoardDimensions;
    private _fields: string[][];
    // @ts-ignore
    private _currentBlock: Block;
    private readonly mid: number;

    private _nextBlock: BlockType | undefined;

    private _score = 0;
    private _gameOver = false;

    constructor(dim: BoardDimensions) {
        this._dimensions = dim;
        this._fields = Array.from({ length: dim.rows }, () => Array.from({ length: dim.cols }, () => ""));
        this.mid = Math.floor(dim.cols / 2);
    }

    reset() {
        this._fields = Array.from({ length: this._dimensions.rows }, () => Array.from({ length: this._dimensions.cols }, () => ""));
        this._score = 0;
        this._gameOver = false;
        this._nextBlock = BlockFactory.getRandomBlockType();
        this.addBlock()
    }

    get score() {
        return this._score;
    }

    get gameOver() {
        return this._gameOver;
    }

    get fields() {
        // create deep copy of fields
        const fields = JSON.parse(JSON.stringify(this._fields));
        const block = this._currentBlock;
        if (block !== undefined) {
            block.shape.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell === 1) {
                        // @ts-ignore
                        fields[block.y + y][block.x + x] = block.color;
                    }
                });
            });
        }
        return fields;
    }

    get nextBlockType() {
        return this._nextBlock;
    }

    addBlock() {
        if (this.checkGameOver()) {
            this._gameOver = true;
            return;
        }
        this._currentBlock = BlockFactory.createBlock(this.mid, 0, this._nextBlock ? this._nextBlock : BlockFactory.getRandomBlockType());
        this._nextBlock = BlockFactory.getRandomBlockType();
    }

    checkGameOver(): boolean {
        for (let x = 0; x < this._dimensions.cols; x++) {
            // @ts-ignore
            if (this._fields[0][x] !== "")
                return true;
        }
        return false;
    }

    moveRight() {
        // @ts-ignore
        if (this._currentBlock && this._currentBlock.x + this._currentBlock.shape[0].length < this._dimensions.cols
            && !this.checkFieldsCollision(Direction.RIGHT))
            this._currentBlock.moveRight();
    }

    moveLeft() {
        // @ts-ignore
        if (this._currentBlock && this._currentBlock.x + this.findZeroCols(this._currentBlock.shape) > 0 && !this.checkFieldsCollision(Direction.LEFT))
            this._currentBlock.moveLeft();
    }

    checkFieldsCollision(direction: Direction | null, nextShape = false): boolean {
        const y_delta = (direction && direction === Direction.DOWN) ? 1 : 0;
        const x_delta = (direction && direction === Direction.RIGHT) ? 1 : direction === Direction.LEFT ? -1 : 0;
        const shape = nextShape ? this._currentBlock.nextShape() : this._currentBlock.shape;
        // @ts-ignore
        for (let y = 0; y < shape.length; y++) {
            // @ts-ignore
            for (let x = 0; x < shape[0].length; x++) {
                // @ts-ignore
                if (shape[y][x] === 1) {
                    // @ts-ignore
                    if (this._fields[this._currentBlock.y + y + y_delta][this._currentBlock.x + x + x_delta] !== "") {
                        return true;
                    }
                }
            }
        }
        return false;
    }

    checkDown(): boolean {
        // @ts-ignore
        if (this._currentBlock.y + this._currentBlock.shape.length >= this._dimensions.rows)
            return false;
        if (this.checkFieldsCollision(Direction.DOWN))
            return false;
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
        if (!this._currentBlock) return;

        // @ts-ignore
        const overShootBottom = this._currentBlock.y + this._currentBlock.nextShape().length > this._dimensions.rows;
        // @ts-ignore
        const overShootRight = this._currentBlock.x + this._currentBlock.nextShape()[0].length > this._dimensions.cols;
        // @ts-ignore
        const overShootLeft = this._currentBlock.x + this.findZeroCols(this._currentBlock.nextShape()) < 0;
        const collisionOnRotate = this.checkFieldsCollision(null, true);

        if(!(overShootBottom || overShootRight || overShootLeft || collisionOnRotate))
            this._currentBlock.rotate();
    }

    findZeroCols(shape: number[][]): number {
        let emptyCols = 0;
        // @ts-ignore
        for (let i = 0; i < shape[0].length; i++) {
            for (let j = 0; j < shape.length; j++) {
                // @ts-ignore
                if (shape[j][i] === 1) {
                    return emptyCols;
                }
            }
            emptyCols++;
        }
        return emptyCols;
    }

}