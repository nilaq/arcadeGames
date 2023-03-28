
export enum BlockType {
    I = 'I',
    J = 'J',
    L = 'L',
    O = 'O',
    S = 'S',
    T = 'T',
    Z = 'Z',
}


export abstract class Block {
    protected _x: number;
    protected _y: number;
    protected _color: string;
    protected _shapes: number[][][] = [];

    protected _shape: number[][];

    protected _preview: number[][];

    protected constructor(x: number, y: number, color: string, shapes: number[][][], preview: number[][]) {
        this._x = x;
        this._y = y;
        this._color = color;
        this._shapes = shapes;
        // @ts-ignore
        this._shape = this._shapes[0];
        this._preview = preview;
    }

    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    get color() {
        return this._color;
    }

    get shape() {
        return this._shape;
    }

    get preview() {
        return this._preview;
    }

    moveLeft() {
        this._x--;
    }

    moveRight() {
        this._x++;
    }

    moveDown() {
        this._y++;
    }

    nextShape() {
        // @ts-ignore
        return this._shapes[(this._shapes.indexOf(this._shape) + 1) % this._shapes.length];
    }

    rotate() {
        // @ts-ignore
        this._shape = this.nextShape();
    }

    rotateBack() {
        // @ts-ignore
        this._shape = this._shapes[(this._shapes.indexOf(this._shape) - 1) % this._shapes.length];
    }
}

export class LBlock extends Block {
    constructor(x: number, y: number) {
        const preview = [[0,1],[0,1],[1,1]];
        const shapes = [
            [[0, 1, 1], [0, 1, 0], [0, 1, 0]],
            [[0, 0, 0], [1, 1, 1], [0, 0, 1]],
            [[0, 1], [0, 1], [1, 1]],
            [[1, 0, 0], [1, 1, 1]],

        ];
        super(x, y, 'bg-w-blue', shapes, preview);
    }

}

export class JBlock extends Block {

    constructor(x: number, y: number) {
        const preview = [[1,1],[0,1],[0,1]];
        const shapes = [
            [[0, 1, 0], [0, 1, 0], [0, 1, 1]],
            [[0, 0, 1], [1, 1, 1]],
            [[0, 0, 0], [1, 1, 1], [1, 0, 0]],
            [[1, 1], [0, 1], [0, 1]],
        ];
        super(x, y, 'bg-w-orange', shapes, preview);
    }
}

export class OBlock extends Block {
    constructor(x: number, y: number) {
        const shapes = [
            [[1, 1], [1, 1]],
        ];
        super(x, y, 'bg-w-yellow', shapes, shapes[0] as number[][]);
    }
}

export class TBlock extends Block {
    constructor(x: number, y: number) {
        const preview = [[0,1],[1,1],[0,1]];
        const shapes = [
            [[0, 1, 0], [1, 1, 1]],
            [[0, 1, 0], [0, 1, 1], [0, 1, 0]],
            [[0, 0, 0], [1, 1, 1], [0, 1, 0]],
            [[0, 1], [1, 1], [0, 1]]
        ];
        super(x, y, 'bg-w-purple', shapes, preview);
    }
}

export class SBlock extends Block {
    constructor(x: number, y: number) {
        const preview = [[0,1],[1,1], [1,0]];
        const shapes = [
            [[0, 1, 1], [1, 1, 0]],
            [[0, 1, 0], [0, 1, 1], [0, 0, 1]],
            [[0, 0, 0],[0, 1, 1], [1, 1, 0]],
            [[1, 0], [1, 1], [0, 1]],
        ];
        super(x, y, 'bg-w-green', shapes, preview);
    }
}

export class ZBlock extends Block {
    constructor(x: number, y: number) {
        const preview = [[1,0],[1,1], [0,1]];
        const shapes = [
            [[1, 1, 0], [0, 1, 1]],
            [[0, 0, 1], [0, 1, 1], [0, 1, 0]],
            [[0, 0, 0],[1, 1, 0], [0, 1, 1]],
            [[0, 1], [1, 1], [1, 0]],
        ];
        super(x, y, 'bg-w-red', shapes, preview);
    }
}

export class IBlock extends Block {
    constructor(x: number, y: number) {
        const preview = [[1],[1],[1],[1]];
        const shapes = [
            [[0,1], [0,1], [0,1], [0,1]],
            [[0,0,0,0],[1, 1, 1, 1]],
            [[0,0,1], [0,0,1], [0,0,1], [0,0,1]],
            [[0,0,0,0],[0,0,0,0], [1,1,1,1]],
        ];
        super(x, y, 'bg-w-aqua', shapes, preview);
    }
}

export class BlockFactory {
    static createBlock(x: number, y: number, type: BlockType): Block {
        switch (type) {
            case BlockType.I:
                return new IBlock(x, y);
            case BlockType.J:
                return new JBlock(x, y);
            case BlockType.L:
                return new LBlock(x, y);
            case BlockType.O:
                return new OBlock(x, y);
            case BlockType.S:
                return new SBlock(x, y);
            case BlockType.T:
                return new TBlock(x, y);
            case BlockType.Z:
                return new ZBlock(x, y);
        }
    }

    static createRandomBlock(x: number, y: number): Block {
        return BlockFactory.createBlock(x, y, this.getRandomBlockType());
    }

    static getRandomBlockType(): BlockType {
        return Object.values(BlockType)[Math.floor(Math.random() * Object.values(BlockType).length)] as BlockType;
    }
}