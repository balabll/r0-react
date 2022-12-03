export type WorkTag =
	| typeof FunctionComponent
	| typeof HostRoot
	| typeof HostComponent
	| typeof HostText;

export const FunctionComponent = 0;
export const HostRoot = 3; //挂载的根节点
export const HostComponent = 5; // div, span...
export const HostText = 6;
