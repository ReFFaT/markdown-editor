import React, {useState} from 'react';

import cloneDeep from 'lodash/cloneDeep';

import {type MarkupString, logger, wysiwygToolbarConfigs} from '../../src';
import {gptExtension} from '../../src/extensions/markdown/GPT/gptExtension/gptExtension';
import {wGptToolbarItem} from '../../src/extensions/markdown/GPT/toolbar';
import {Playground} from '../Playground';

import {gptWidgetProps} from './gptWidgetOptions';
import {initialMdContent} from './md-content';

import '../Playground.scss';

const wToolbarConfig = cloneDeep(wysiwygToolbarConfigs.wToolbarConfig);
wToolbarConfig.unshift([wGptToolbarItem]);

logger.setLogger({
    metrics: console.info,
    action: (data) => console.info(`Action: ${data.action}`, data),
    ...console,
});

export const PlaygroundGPT = React.memo(() => {
    const [yfmRaw, setYfmRaw] = React.useState<MarkupString>(initialMdContent);

    const [showedAlertGpt, setShowedAlertGpt] = useState(true);

    console.log(wGptToolbarItem);

    const wSelectionMenuConfig = [[wGptToolbarItem], ...wysiwygToolbarConfigs.wSelectionMenuConfig];
    return (
        <Playground
            settingsVisible
            initial={yfmRaw}
            extraExtensions={(builder) =>
                builder.use(
                    gptExtension,
                    gptWidgetProps(setYfmRaw, {
                        showedGptAlert: Boolean(showedAlertGpt),
                        onCloseGptAlert: () => {
                            setShowedAlertGpt(false);
                        },
                    }),
                )
            }
            extensionOptions={{selectionContext: {config: wSelectionMenuConfig}}}
            wysiwygToolbarConfig={wToolbarConfig}
        />
    );
});

PlaygroundGPT.displayName = 'PlaygroundGPT';
