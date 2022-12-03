import { FiberNode } from './fiber';

export function beginWork(workProgress: FiberNode) {
	return workProgress.child;
}
