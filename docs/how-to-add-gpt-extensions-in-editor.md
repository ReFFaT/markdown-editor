## How to add GPT extensions to editor

### Add extension usage to ExtensionBuilder 

    gptExtension - import from current library.
    gptWidgetProps - list of props that the extension accepts

```ts
    builder.use(
        gptExtension,
        gptWidgetProps,
    )          
```
#### Example of implementation.

    setYfmRaw - a setter to change the text in the editor

    gptRequestHandler - your function to implement GPT response
```ts

    const gptRequestHandler = async ({
        markup,
        customPrompt,
        promptData,
    }: {
        markup: string;
        customPrompt?: string;
        promptData: unknown;
    }) => {

        await new Promise((resolve) => setTimeout(resolve, 1000));

        let gptResponseMarkup = markup;
        
        if (customPrompt) {
            gptResponseMarkup = markup + ` \`enhanced with ${customPrompt}\``;
        } else if (promptData === 'do-uno-reverse') {
            gptResponseMarkup = gptResponseMarkup.replace(/[\wа-яА-ЯёЁ]+/g, (match) =>
                match.split('').reverse().join(''),
            );
        } else if (promptData === 'do-shout-out') {
            gptResponseMarkup = gptResponseMarkup.toLocaleUpperCase();
        }

        return {
            rawText: gptResponseMarkup,
        };
    };


    builder.use(
        gptExtension,
        {
            answerRender: (data) => <div>{data.rawText}</div>,
            customPromptPlaceholder: 'Ask Yandex GPT to edit the text highlighted text',
            disabledPromptPlaceholder: 'Ask Yandex GPT to generate the text',
            gptAlertProps: {
                showedGptAlert: boolean;
                onCloseGptAlert?: () => void;
                message?: string;
                theme?: AlertProps["theme"];
                className?: string;
            },
            promptPresets: [
                {
                    hotKey: 'control+3',
                    data: 'do-uno-reverse',
                    display: 'Use the uno card',
                    key: 'do-uno-reverse',
                },
                {
                    hotKey: 'control+4',
                    data: 'do-shout-out',
                    display: 'Make the text flashy',
                    key: 'do-shout-out',
                },
            ],
            onCustomPromptApply: async ({markup, customPrompt, promptData}) => {
                return gptRequestHandler({markup, customPrompt, promptData});
            },
            onPromptPresetClick: async ({markup, customPrompt, promptData}) => {
                return gptRequestHandler({markup, customPrompt, promptData});
            },
            onTryAgain: async ({markup, customPrompt, promptData}) => {
                return gptRequestHandler({markup, customPrompt, promptData});
            },
            onLike: async () => {
                console.log('Like');
            },
            onDislike: async () => {
                console.log('Disike');
            },
            onApplyResult: (markup) => {
                setYfmRaw(markup);
            },
            onUpdate: (event) => {
                if (event?.rawText) {
                    setYfmRaw(event.rawText);
                }
            },
        },
    )                
```

### Add extension to menubar and toolbar for editor

    wGptToolbarItem,wysiwygToolbarConfig - imported from the library

```ts
    wysiwygToolbarConfig.unshift([wGptToolbarItem]);

    const wSelectionMenuConfig = [[wGptToolbarItem], ...wysiwygToolbarConfigs.wSelectionMenuConfig];

    const mdEditor = useMarkdownEditor({
        ...
        extensionOptions: {
            commandMenu: {actions: wCommandMenuConfig},
            ...{selectionContext: {config: wSelectionMenuConfig}},
        },
        ...
    })


    <MarkdownEditorView
        ...
        wysiwygToolbarConfig={wysiwygToolbarConfig ?? wToolbarConfig}
        editor={mdEditor}
        ...
    />

```

### Done, You can use the extension!
