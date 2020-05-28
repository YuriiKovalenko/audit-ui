export interface Statistics {
  createdAt: Date;
  start: number;
  checked: number;
  covered: number;
  inspected: number;
  dried: number;
  type: string;
  startFailed: number;
  midFailed: number;
  endFailed: number;
}
