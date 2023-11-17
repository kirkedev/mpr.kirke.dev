function click(this: HTMLElement, event: KeyboardEvent): void {
    switch (event.code) {
        case "Space":
        case "Enter":
        case "NumpadEnter": {
            this.click();
        }
    }
}

export { click };
