/**
 * External dependencies
 */
import type { Meta, StoryFn } from '@storybook/react';

/**
 * WordPress dependencies
 */
import { isRTL } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import { Composite, useCompositeStore } from '..';
import { UseCompositeStorePlaceholder, transform } from './utils';

const meta: Meta< typeof UseCompositeStorePlaceholder > = {
	title: 'Components/Composite (V2)',
	component: UseCompositeStorePlaceholder,
	subcomponents: {
		// @ts-expect-error - See https://github.com/storybookjs/storybook/issues/23170
		Composite,
		// @ts-expect-error - See https://github.com/storybookjs/storybook/issues/23170
		'Composite.Group': Composite.Group,
		// @ts-expect-error - See https://github.com/storybookjs/storybook/issues/23170
		'Composite.GroupLabel': Composite.GroupLabel,
		// @ts-expect-error - See https://github.com/storybookjs/storybook/issues/23170
		'Composite.Row': Composite.Row,
		// @ts-expect-error - See https://github.com/storybookjs/storybook/issues/23170
		'Composite.Item': Composite.Item,
		// @ts-expect-error - See https://github.com/storybookjs/storybook/issues/23170
		'Composite.Hover': Composite.Hover,
		// @ts-expect-error - See https://github.com/storybookjs/storybook/issues/23170
		'Composite.Typeahead': Composite.Typeahead,
	},
	argTypes: {
		activeId: { control: 'text' },
		defaultActiveId: { control: 'text' },
		setActiveId: { control: { type: null } },
		focusLoop: {
			control: 'select',
			options: [ true, false, 'horizontal', 'vertical', 'both' ],
		},
		focusShift: { control: 'boolean' },
		focusWrap: { control: 'boolean' },
		virtualFocus: { control: 'boolean' },
		rtl: { control: 'boolean' },
		orientation: {
			control: 'select',
			options: [ 'horizontal', 'vertical', 'both' ],
		},
	},
	tags: [ 'status-private' ],
	parameters: {
		controls: { expanded: true },
		docs: {
			canvas: { sourceState: 'shown' },
			source: { transform },
			extractArgTypes: ( component: React.FunctionComponent ) => {
				const commonArgTypes = {
					render: {
						name: 'render',
						description:
							'Allows the component to be rendered as a different HTML element or React component. The value can be a React element or a function that takes in the original component props and gives back a React element with the props merged.',
						table: {
							type: {
								summary:
									'RenderProp<React.HTMLAttributes<any> & { ref?: React.Ref<any> | undefined; }> | React.ReactElement<any, string | React.JSXElementConstructor<any>>',
							},
						},
					},
					children: {
						name: 'children',
						description: 'The contents of the component.',
						table: { type: { summary: 'React.ReactNode' } },
					},
				};
				const accessibleWhenDisabled = {
					name: 'accessibleWhenDisabled',
					description: `Indicates whether the element should be focusable even when it is
\`disabled\`.

This is important when discoverability is a concern. For example:

> A toolbar in an editor contains a set of special smart paste functions
> that are disabled when the clipboard is empty or when the function is not
> applicable to the current content of the clipboard. It could be helpful to
> keep the disabled buttons focusable if the ability to discover their
> functionality is primarily via their presence on the toolbar.

Learn more on [Focusability of disabled
controls](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#focusabilityofdisabledcontrols).`,
					table: {
						type: {
							summary: 'boolean',
						},
					},
				};

				const argTypes = {
					useCompositeStore: {
						activeId: {
							name: 'activeId',
							description: `The current active item \`id\`. The active item is the element within the composite widget that has either DOM or virtual focus (in case the \`virtualFocus\` prop is enabled).
- \`null\` represents the base composite element (the one with a [composite role](https://w3c.github.io/aria/#composite)). Users will be able to navigate out of it using arrow keys.
- If \`activeId\` is initially set to \`null\`, the base composite element itself will have focus and users will be able to navigate to it using arrow keys.`,
							table: { type: { summary: 'string | null' } },
						},
						defaultActiveId: {
							name: 'defaultActiveId',
							description:
								'The composite item id that should be active by default when the composite widget is rendered. If `null`, the composite element itself will have focus and users will be able to navigate to it using arrow keys. If `undefined`, the first enabled item will be focused.',
							table: { type: { summary: 'string | null' } },
						},
						setActiveId: {
							name: 'setActiveId',
							description:
								'A callback that gets called when the `activeId` state changes.',
							table: {
								type: {
									summary:
										'((activeId: string | null | undefined) => void)',
								},
							},
						},
						focusLoop: {
							name: 'focusLoop',
							description: `On one-dimensional composite widgets:

- \`true\` loops from the last item to the first item and vice-versa.
- \`horizontal\` loops only if \`orientation\` is \`horizontal\` or not set.
- \`vertical\` loops only if \`orientation\` is \`vertical\` or not set.
- If \`activeId\` is initially set to \`null\`, the composite element will be focused in between the last and first items.

On two-dimensional composite widgets (ie. when using \`CompositeRow\`):

- \`true\` loops from the last row/column item to the first item in the same row/column and vice-versa. If it's the last item in the last row, it moves to the first item in the first row and vice-versa.
- \`horizontal\` loops only from the last row item to the first item in the same row.
- \`vertical\` loops only from the last column item to the first item in the column row.
- If \`activeId\` is initially set to \`null\`, vertical loop will have no effect as moving down from the last row or up from the first row will focus on the composite element.
- If \`focusWrap\` matches the value of \`focusLoop\`, it'll wrap between the last item in the last row or column and the first item in the first row or column and vice-versa.`,
							table: {
								defaultValue: {
									summary: 'false',
								},
								type: {
									summary:
										"boolean | 'horizontal' | 'vertical' | 'both'",
								},
							},
						},
						focusShift: {
							name: 'focusShift',
							description: `**Works only on two-dimensional composite widgets**.

If enabled, moving up or down when there's no next item or when the next item is disabled will shift to the item right before it.`,
							table: {
								defaultValue: {
									summary: 'false',
								},
								type: {
									summary: 'boolean',
								},
							},
						},
						focusWrap: {
							name: 'focusWrap',
							description: `**Works only on two-dimensional composite widgets**.

If enabled, moving to the next item from the last one in a row or column
will focus on the first item in the next row or column and vice-versa.

- \`true\` wraps between rows and columns.
- \`horizontal\` wraps only between rows.
- \`vertical\` wraps only between columns.
- If \`focusLoop\` matches the value of \`focusWrap\`, it'll wrap between the
    last item in the last row or column and the first item in the first row or
    column and vice-versa.`,
							table: {
								defaultValue: {
									summary: 'false',
								},
								type: {
									summary: 'boolean',
								},
							},
						},
						virtualFocus: {
							name: 'virtualFocus',
							description: `If enabled, the composite element will act as an [\`aria-activedescendant\`](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_focus_activedescendant)
container instead of [roving tabindex](https://www.w3.org/WAI/ARIA/apg/practices/keyboard-interface/#kbd_roving_tabindex). DOM focus will remain on the composite element while its items receive
virtual focus.

In both scenarios, the item in focus will carry the \`data-active-item\` attribute.`,
							table: {
								defaultValue: {
									summary: 'false',
								},
								type: {
									summary: 'boolean',
								},
							},
						},
						orientation: {
							name: 'orientation',
							description: `Defines the orientation of the composite widget. If the composite has a single row or column (one-dimensional), the \`orientation\` value determines which arrow keys can be used to move focus:

- \`both\`: all arrow keys work.
- \`horizontal\`: only left and right arrow keys work.
- \`vertical\`: only up and down arrow keys work.

It doesn't have any effect on two-dimensional composites.`,
							table: {
								defaultValue: {
									summary: "'both'",
								},
								type: {
									summary:
										"'horizontal' | 'vertical' | 'both'",
								},
							},
						},
						rtl: {
							name: 'rtl',
							description: `Determines how the \`store\`'s \`next\` and \`previous\` functions will behave. If \`rtl\` is set to \`true\`, they will be inverted.

This only affects the composite widget behavior. You still need to set \`dir="rtl"\` on HTML/CSS.`,
							table: {
								defaultValue: {
									summary: 'false',
								},
								type: {
									summary: 'boolean',
								},
							},
						},
					},
					Composite: {
						...commonArgTypes,
						store: {
							name: 'store',
							description:
								'Object returned by the `useCompositeStore` hook.',
							table: {
								type: {
									summary:
										'CompositeStore<CompositeStoreItem>',
								},
							},
							type: { required: true },
						},
						focusable: {
							name: 'focusable',
							description: `Makes the component a focusable element. When this element gains keyboard focus, it gets a \`data-focus-visible\` attribute and triggers the \`onFocusVisible\` prop.

The component supports the \`disabled\` prop even for those elements not supporting the native \`disabled\` attribute. Disabled elements may be still accessible via keyboard by using the the \`accessibleWhenDisabled\` prop.

Non-native focusable elements will lose their focusability entirely. However, native focusable elements will retain their inherent focusability.`,
							table: {
								type: {
									summary: 'boolean',
								},
							},
						},
						disabled: {
							name: 'disabled',
							description: `Determines if the element is disabled. This sets the \`aria-disabled\` attribute accordingly, enabling support for all elements, including those that don't support the native \`disabled\` attribute.

This feature can be combined with the \`accessibleWhenDisabled\` prop to
make disabled elements still accessible via keyboard.

**Note**: For this prop to work, the \`focusable\` prop must be set to
\`true\`, if it's not set by default.`,
							table: {
								defaultValue: {
									summary: 'false',
								},
								type: {
									summary: 'boolean',
								},
							},
						},
						accessibleWhenDisabled,
						onFocusVisible: {
							name: 'onFocusVisible',
							description: `Custom event handler invoked when the element gains focus through keyboard interaction or a key press occurs while the element is in focus. This is the programmatic equivalent of the \`data-focus-visible\` attribute.

**Note**: For this prop to work, the \`focusable\` prop must be set to \`true\` if it's not set by default.`,
							table: {
								type: {
									summary:
										'(event: SyntheticEvent<HTMLElement>) => void',
								},
							},
						},
					},
					'Composite.Group': commonArgTypes,
					'Composite.GroupLabel': commonArgTypes,
					'Composite.Row': commonArgTypes,
					'Composite.Item': {
						...commonArgTypes,
						accessibleWhenDisabled,
					},
					'Composite.Hover': commonArgTypes,
					'Composite.Typeahead': commonArgTypes,
				};

				const name = component.displayName ?? '';

				return name in argTypes
					? argTypes[ name as keyof typeof argTypes ]
					: {};
			},
		},
	},
	decorators: [
		( Story ) => {
			return (
				<>
					{ /* Visually style the active composite item  */ }
					<style>{ `
						[data-active-item] {
							background-color: #ffc0b5;
						}
					` }</style>
					<Story />
					<div
						style={ {
							marginTop: '2em',
							fontSize: '12px',
							fontStyle: 'italic',
						} }
					>
						{ /* eslint-disable-next-line no-restricted-syntax */ }
						<p id="list-title">Notes</p>
						<ul aria-labelledby="list-title">
							<li>
								The active composite item is highlighted with a
								different background color;
							</li>
							<li>
								A composite item can be the active item even
								when it doesn&apos;t have keyboard focus.
							</li>
						</ul>
					</div>
				</>
			);
		},
	],
};
export default meta;

export const Default: StoryFn< typeof UseCompositeStorePlaceholder > = (
	storeProps
) => {
	const rtl = isRTL();
	const store = useCompositeStore( { rtl, ...storeProps } );

	return (
		<Composite store={ store }>
			<Composite.Item>Item one</Composite.Item>
			<Composite.Item>Item two</Composite.Item>
			<Composite.Item>Item three</Composite.Item>
		</Composite>
	);
};

export const Groups: StoryFn< typeof UseCompositeStorePlaceholder > = (
	storeProps
) => {
	const rtl = isRTL();
	const store = useCompositeStore( { rtl, ...storeProps } );

	return (
		<Composite store={ store }>
			<Composite.Group>
				<Composite.GroupLabel>Group one</Composite.GroupLabel>
				<Composite.Item>Item 1.1</Composite.Item>
				<Composite.Item>Item 1.2</Composite.Item>
			</Composite.Group>
			<Composite.Group>
				<Composite.GroupLabel>Group two</Composite.GroupLabel>
				<Composite.Item>Item 2.1</Composite.Item>
				<Composite.Item>Item 2.1</Composite.Item>
			</Composite.Group>
		</Composite>
	);
};

export const Grid: StoryFn< typeof UseCompositeStorePlaceholder > = (
	storeProps
) => {
	const rtl = isRTL();
	const store = useCompositeStore( { rtl, ...storeProps } );

	return (
		<Composite role="grid" store={ store } aria-label="Composite">
			<Composite.Row role="row">
				<Composite.Item role="gridcell">Item A1</Composite.Item>
				<Composite.Item role="gridcell">Item A2</Composite.Item>
				<Composite.Item role="gridcell">Item A3</Composite.Item>
			</Composite.Row>
			<Composite.Row role="row">
				<Composite.Item role="gridcell">Item B1</Composite.Item>
				<Composite.Item role="gridcell">Item B2</Composite.Item>
				<Composite.Item role="gridcell">Item B3</Composite.Item>
			</Composite.Row>
			<Composite.Row role="row">
				<Composite.Item role="gridcell">Item C1</Composite.Item>
				<Composite.Item role="gridcell">Item C2</Composite.Item>
				<Composite.Item role="gridcell">Item C3</Composite.Item>
			</Composite.Row>
		</Composite>
	);
};

export const Hover: StoryFn< typeof UseCompositeStorePlaceholder > = (
	storeProps
) => {
	const rtl = isRTL();
	const store = useCompositeStore( { rtl, ...storeProps } );

	return (
		<Composite store={ store }>
			<Composite.Hover render={ <Composite.Item /> }>
				Hover item one
			</Composite.Hover>
			<Composite.Hover render={ <Composite.Item /> }>
				Hover item two
			</Composite.Hover>
			<Composite.Hover render={ <Composite.Item /> }>
				Hover item three
			</Composite.Hover>
		</Composite>
	);
};
Hover.parameters = {
	docs: {
		description: {
			story: 'Elements in the composite widget will receive focus on mouse move and lose focus to the composite base element on mouse leave.',
		},
	},
};

export const Typeahead: StoryFn< typeof UseCompositeStorePlaceholder > = (
	storeProps
) => {
	const rtl = isRTL();
	const store = useCompositeStore( { rtl, ...storeProps } );

	return (
		<Composite store={ store } render={ <Composite.Typeahead /> }>
			<Composite.Item>Apple</Composite.Item>
			<Composite.Item>Banana</Composite.Item>
			<Composite.Item>Peach</Composite.Item>
		</Composite>
	);
};
Typeahead.parameters = {
	docs: {
		description: {
			story: 'When focus in on the composite widget, hitting printable character keys will move focus to the next composite item that begins with the input characters.',
		},
	},
};
