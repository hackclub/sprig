export const style = `
  .color-picker-outer {
    background: var(--bg-floating);
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    gap: 16px;
  }

  h3 {
    color: #ffffff;
    text-align: center;
    margin: 0;
  }

  .color-picker-inner {
    width: 380px;
    height: 300px;
    background: transparent;
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    padding: 10px;
  }

  .color-picker-inner div {
    border: 2px solid transparent;
    border-radius: 4px;
    cursor: pointer;
  }

  .color-picker-inner div.active {
    border: 2px solid var(--switch-fg-high);
  }
`;