export interface ITargetScroll {
  index: number;
  target: HTMLElement;
}

export class TargetScroll implements ITargetScroll {
  constructor(public index: number, public target: HTMLElement) {}
}
