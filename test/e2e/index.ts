const path = (length: number): RegExp =>
    new RegExp(`[MLZ,0-9]{${length}}`);

export { path };
