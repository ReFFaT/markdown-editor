import type Token from 'markdown-it/lib/token';

import type {ParserToken} from '../../../../core';

import {TabsNode} from './const';

const attrsFromEntries = (token: Token) => (token.attrs ? Object.fromEntries(token.attrs) : {});

export const parserTokens: Record<TabsNode, ParserToken> = {
    [TabsNode.TabPanel]: {
        name: TabsNode.TabPanel,
        type: 'block',
        getAttrs: attrsFromEntries,
    },

    [TabsNode.Tab]: {
        name: TabsNode.Tab,
        type: 'block',
        getAttrs: attrsFromEntries,
    },
    [TabsNode.Tabs]: {
        name: TabsNode.Tabs,
        type: 'block',
        getAttrs: attrsFromEntries,
    },
    [TabsNode.TabsList]: {
        name: TabsNode.TabsList,
        type: 'block',
        getAttrs: attrsFromEntries,
    },

    [TabsNode.VTabs]: {
        name: TabsNode.VTabs,
        type: 'block',
        getAttrs: attrsFromEntries,
    },
    [TabsNode.VTab]: {
        name: TabsNode.VTab,
        type: 'block',
        getAttrs: attrsFromEntries,
    },
    [TabsNode.VTabInput]: {
        name: TabsNode.VTabInput,
        type: 'node',
        getAttrs: attrsFromEntries,
    },
    [TabsNode.VTabLabel]: {
        name: TabsNode.VTabLabel,
        type: 'block',
        getAttrs: attrsFromEntries,
    },
};
