import {BoardDimensions, Direction} from "../lib/gameUtils";
import {Block, BlockFactory, BlockType} from "./Blocks";


export class GameState {
    private _dimensions: BoardDimensions;
    private _fields: string[][];
    // @ts-ignore
    private _currentBlock: Block;
    private readonly mid: number;

    // @ts-ignore
    private _nextBlocks: BlockType[];

    private _holdBlock: BlockType | null = null;
    private _holdUsed = false;

    private _score = 0;

    private _lines_cleared = 0;
    private _level = 1;
    private _gameOver = false;

    constructor(dim: BoardDimensions) {
        this._dimensions = dim;
        this._fields = Array.from({ length: dim.rows }, () => Array.from({ length: dim.cols }, () => ""));
        this.mid = Math.floor(dim.cols / 2) - 1;
        this.reset();
    }

    reset() {
        this._fields = Array.from({ length: this._dimensions.rows }, () => Array.from({ length: this._dimensions.cols }, () => ""));
        this._score = 0;
        this._gameOver = false;
        this._nextBlocks = [BlockFactory.getRandomBlockType(), BlockFactory.getRandomBlockType(), BlockFactory.getRandomBlockType()];
        this._holdBlock = null
        this.addBlock()
    }

    get score() {
        return this._score;
    }

    get level() {
        return this._level;
    }

    get speed() {
        return (0.75-(this._level+2)*0.0001)**((this._level+2)/3)*1000;
    }

    get gameOver() {
        return this._gameOver;
    }

    get fields() {
        // create deep copy of fields
        const fields = JSON.parse(JSON.stringify(this._fields));
        const block = this._currentBlock;
        if (block !== undefined) {
            // add ghost tile to fields
            let ghostDelta = 0;
            while (this.checkDown(ghostDelta)) {
                ghostDelta++;
            }
            block.shape.forEach((row, y) => {
                row.forEach((cell, x) => {
                    if (cell === 1) {
                        // @ts-ignore
                        fields[block.y + y + ghostDelta][block.x + x] = "bg-white/[.25]";
                    }
                });
            });
            // add current block to fields
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

    get nextBlockTypes() {
        return this._nextBlocks;
    }

    get holdBlockType() {
        return this._holdBlock;
    }

    addBlock() {
        if (this.checkGameOver()) {
            this._gameOver = true;
            return;
        }
        // @ts-ignore
        this._currentBlock = BlockFactory.createBlock(this.mid, 0, this._nextBlocks[0] ? this._nextBlocks.shift() : BlockFactory.getRandomBlockType());
        this._nextBlocks.push(BlockFactory.getRandomBlockType());
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

    checkFieldsCollision(direction: Direction | null, shapeType:  "default" | "prev" | "next" = "default", ghostDelta = 0): boolean {
        const y_delta = (direction && direction === Direction.DOWN) ? 1 + ghostDelta: 0;
        const x_delta = (direction && direction === Direction.RIGHT) ? 1 : direction === Direction.LEFT ? -1 : 0;
        const shape = shapeType === "next" ? this._currentBlock.nextShape() : shapeType === "prev" ? this._currentBlock.prevShape() : this._currentBlock.shape;
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

    checkDown(ghostDelta = 0): boolean {
        // @ts-ignore
        if (this._currentBlock.y + this._currentBlock.shape.length + ghostDelta >= this._dimensions.rows)
            return false;
        return !this.checkFieldsCollision(Direction.DOWN, 'default', ghostDelta);
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

    soft_drop() {
        this.moveDown()
        this._score += this._level
    }

    hard_drop() {
        if (!this._currentBlock)
            return
        while (this.checkDown()) {
            this._currentBlock.moveDown();
            this._score += 2 * this._level;
        }
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
        switch (fullRows) {
            case 1: this._score += 100 * this._level; break;
            case 2: this._score += 300 * this._level; break;
            case 3: this._score += 500 * this._level; break;
            case 4: this._score += 800 * this._level; break;
        }
        this._holdUsed = false;
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
        this._lines_cleared += fullRows;
        this._level = Math.min(Math.floor(this._lines_cleared / 10) + 1, 29);
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
        const collisionOnRotate = this.checkFieldsCollision(null, "next");

        if(!(overShootBottom || overShootRight || overShootLeft || collisionOnRotate))
            this._currentBlock.rotate();
    }

    rotateBack() {
        if (!this._currentBlock) return;

        // @ts-ignore
        const overShootBottom = this._currentBlock.y + this._currentBlock.prevShape().length > this._dimensions.rows;
        // @ts-ignore
        const overShootRight = this._currentBlock.x + this._currentBlock.prevShape()[0].length > this._dimensions.cols;
        // @ts-ignore
        const overShootLeft = this._currentBlock.x + this.findZeroCols(this._currentBlock.prevShape()) < 0;
        const collisionOnRotate = this.checkFieldsCollision(null, "prev");

        if(!(overShootBottom || overShootRight || overShootLeft || collisionOnRotate))
            this._currentBlock.rotateBack();
    }

    hold() {
        if (!this._holdUsed) {
            this._holdUsed = true;
            if (!this._currentBlock) return;
            if (!this._holdBlock) {
                this._holdBlock = BlockFactory.getBlockType(this._currentBlock);
                this.addBlock();
            } else {
                const temp = this._holdBlock;
                this._holdBlock = BlockFactory.getBlockType(this._currentBlock);
                this._currentBlock = BlockFactory.createBlock(this.mid, 0, temp);
            }
        }
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