const tick = (): Promise<void> =>
    new Promise(resolve => setTimeout(resolve, 0));

export { tick };
