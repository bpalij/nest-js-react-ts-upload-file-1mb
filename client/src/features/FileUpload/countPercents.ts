export default ({ loaded, total }: ProgressEvent<XMLHttpRequestEventTarget> | {loaded: number, total: number}):number => Math.round((loaded/total) * 100);