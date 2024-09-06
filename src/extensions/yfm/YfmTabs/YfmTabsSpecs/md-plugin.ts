import type MarkdownIt from 'markdown-it';

// TODO: improve tabs-extension with this changes
export const tabsPostPlugin: MarkdownIt.PluginSimple = (md) => {
    md.core.ruler.push('me_tabs_after', (state) => {
        const stack: {vertical?: boolean}[] = [];
        const tabCloseIndexes: number[] = [];

        for (const token of state.tokens) {
            switch (token.type) {
                case 'tabs_open': {
                    const vertical = token.attrGet('class')?.includes('yfm-tabs-vertical');
                    stack.push({vertical});
                    if (vertical) token.type = 'v-' + token.type;

                    break;
                }
                case 'tabs_close': {
                    const item = stack.pop();
                    if (item?.vertical) token.type = 'v-' + token.type;

                    break;
                }

                case 'tab_open': {
                    const item = stack.at(-1);
                    if (item?.vertical) {
                        const isInput = token.tag === 'input';
                        if (isInput) token.type = 'tab-input';
                        token.type = 'v-' + token.type;
                    }
                    break;
                }
                case 'tab_close': {
                    const item = stack.at(-1);
                    if (item?.vertical) {
                        token.type = 'v-' + token.type;
                        tabCloseIndexes.push(state.tokens.indexOf(token));
                    }
                    break;
                }

                case 'label_open': {
                    const tokenIndex = state.tokens.indexOf(token);
                    const prevToken = tokenIndex > 0 && state.tokens.at(tokenIndex - 1);
                    if (prevToken && prevToken.type === 'v-tab-input') {
                        token.type = 'v-tab-' + token.type;
                    }
                    break;
                }
            }
        }

        for (const index of tabCloseIndexes.reverse()) {
            if (index === -1) continue;

            const labelCloseToken = new state.Token('v-tab-label_close', 'label', -1);
            state.tokens.splice(index, 0, labelCloseToken);
        }
    });
};
