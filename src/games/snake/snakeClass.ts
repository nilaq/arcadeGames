import {Cell, Direction, getCoordsInDirection, getOppositeDirection} from "../lib/gameUtils";


// creating a Linked List pattern to represent the snake's body
export class LinkedListNode {
    value: Cell;
    front: LinkedListNode | null;
    back: LinkedListNode | null;
    constructor(value: Cell) {
        this.value = value;
        this.front = null;
        this.back = null;
    }
}

export class LinkedList {
    head: LinkedListNode;
    tail: LinkedListNode;

    constructor(value: Cell) {
        const node = new LinkedListNode(value);
        this.head = node;
        this.tail = node;
    }
}


export class Snake {
    private direction: Direction;
    private body: LinkedList

    constructor() {
        // get random direction
        this.direction = Direction.RIGHT;
        this.body = new LinkedList({row: 2, col: 4});
    }

    setDirection(direction: Direction): void {
        if (this.direction === getOppositeDirection(direction))
            return;
        const nextHead = getCoordsInDirection(this.getHead(), direction);
        const prevHead = this.body.head.back;
        if (prevHead && nextHead.row === prevHead.value.row && nextHead.col === prevHead.value.col)
            return;
        this.direction = direction;
    }

    getDirection(): Direction {
        return this.direction;
    }

    getHead(): {row: number, col: number} {
        return this.body.head.value;
    }

    getTail(): {row: number, col: number} {
        return this.body.tail.value;
    }

    getNewHead(): {row: number, col: number} {
        // get the current head
        const head = this.getHead();
        const newHead = getCoordsInDirection({row: head.row, col: head.col}, this.direction);
        return newHead;
    }

    move(): void {
        // add new head to the snake
        const newHead = this.getNewHead();
        const newHeadNode = new LinkedListNode(newHead);
        newHeadNode.back = this.body.head;
        this.body.head.front = newHeadNode;
        this.body.head = newHeadNode;

        // remove the tail
        const newTail = this.body.tail.front
        if (newTail === null)
            throw new Error("Snake's tail is null");
        newTail.back = null;
        this.body.tail.front = null;
        this.body.tail = newTail;
    }

    getNewTail(): {row: number, col: number} {
        const tail = this.getTail();
        const tailTwo = this.body.tail.front;
        let direction: Direction;

        if (tailTwo === null) {
            // tail is equl to head
            direction = getOppositeDirection(this.direction);
        } else {
            if (tail.row === tailTwo.value.row) {
                if (tail.col > tailTwo.value.col) {
                    // tail is to the right of tailTwo
                    direction = Direction.RIGHT;
                } else {
                    // tail is to the left of tailTwo
                    direction = Direction.LEFT;
                }
            }
            else if (tail.col === tailTwo.value.col) {
                if (tail.row > tailTwo.value.row) {
                    // tail is below tailTwo
                    direction = Direction.DOWN;
                } else {
                    // tail is above tailTwo
                    direction = Direction.UP;
                }
            }
            else {
                throw new Error("Tail and tailTwo are not adjacent");
            }
        }

        const newTail = getCoordsInDirection({row: tail.row, col: tail.col}, direction);

        return newTail;
    }
    grow(): void {
        const newTail = this.getNewTail();
        const newTailNode = new LinkedListNode(newTail);
        newTailNode.front = this.body.tail;
        this.body.tail.back = newTailNode;
        this.body.tail = newTailNode;
    }

    getBody(): Cell[] {
        const body: Cell[] = [];
        let currentNode: LinkedListNode | null = this.body.head;
        while (currentNode !== null) {
            body.push(currentNode.value);
            currentNode = currentNode.back;
        }
        return body;
    }

    isRunningIntoSelf(): boolean {
        const body = this.getBody();
        const head = this.getHead();
        for (let i = 1; i < body.length; i++) {
            // @ts-ignore
            if (head.row === body[i].row && head.col === body[i].col)
                return true;
        }
        return false;
    }
}


export default Snake;