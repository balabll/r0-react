import { beginWork } from './beginWork';
import { completeWork } from './completeWork';
import { FiberNode } from './fiber';

let workInProgress: FiberNode | null = null;

function prepareFreshStack(fiber: FiberNode) {
	workInProgress = fiber;
}

function renderRoot(root: FiberNode) {
	prepareFreshStack(root);

	do {
		try {
			workLoop();
			break;
		} catch (e) {
			workInProgress = null;
			console.warn('workLoop发生错误', e);
		}
	} while (true);
}

function workLoop() {
	while (workInProgress !== null) {
		proformUnitOfWork(workInProgress);
	}
}

function proformUnitOfWork(fiber: FiberNode) {
	// beginWork返回filber.child
	const next = beginWork(fiber);
	fiber.memoizedProps = fiber.pendingProps;
	if (next === null) {
		completeUnitOfWork(fiber);
	} else {
		workInProgress = next;
	}
}

function completeUnitOfWork(fiber: FiberNode) {
	let node: FiberNode | null = fiber;
	do {
		completeWork(node);
		const sibilng = node.sibling;
		if (sibilng !== null) {
			workInProgress = sibilng;
			return;
		} else {
			node = node.return;
			workInProgress = node;
		}
	} while (node !== null);
}
