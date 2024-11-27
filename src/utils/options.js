import { __ } from '@wordpress/i18n';

export const themes = [
	{ label: __('Default', 'icon-list'), value: 'default' },
	{ label: __('Theme 1', 'icon-list'), value: 'theme1' },
	{ label: __('Theme 2', 'icon-list'), value: 'theme2' }
];

export const aligns = [
	{ label: __('Left', 'icon-list'), value: 'start', icon: 'editor-alignleft' },
	{ label: __('Center', 'icon-list'), value: 'center', icon: 'editor-aligncenter' },
	{ label: __('Right', 'icon-list'), value: 'end', icon: 'editor-alignright' }
];

export const generalStyleTabs = [
	{ name: 'general', title: __('General', 'icon-list') },
	{ name: 'style', title: __('Style', 'icon-list') }
];



export const proFeatures = [
	{
		name: "Choose Your Preferred Theme",
		description:
			"Select the theme of your choice to personalize your experience and give your website the look and feel that suits your style."
	},
	{
		name: "Background On Your List Item",
		description:
			"Customize the background of your list items to enhance their appearance and match your design preferences."
	},
	{
		name: "Hide/Show List Item URL Icon",
		description:
			"Toggle the visibility of URL icons for list items, allowing you to show or hide them based on your design needs."
	},
	{
		name: "Hide/Show List Item Badge",
		description:
			"Enable or disable badges for list items to highlight specific content or keep the design clean and simple."
	},
	{
		name: "Badge Title Input Field",
		description:
			"Provide a title for the badge to display descriptive or relevant text alongside your list items."
	},
	{
		name: "Badge Text Styles",
		description:
			"Customize the typography of badge text, including font style, size, weight, and spacing, to match your design aesthetics."
	},
	{
		name: "Badge Text Color & Background",
		description:
			"Set the color and background for the badge text to ensure it stands out and complements your design."
	},
	{
		name: "Icon Animated Puls Color",
		description:
			"Choose a color for the animated pulse effect to draw attention and enhance visual engagement."
	},
	{
		name: "Icon Puls Blur Background",
		description:
			"Adjust the blur effect of the pulse background to create a soft, visually appealing design."
	}
];

export const helpfulLinks = [
	{
		title: 'Need any Assistance?',
		description: 'Our Expert Support Team is always ready to help you out promptly.',
		iconClass: 'fa fa-life-ring',
		link: 'https://bplugins.com/support',
		linkText: 'Contact Support'
	},
	{
		title: 'Looking for Documentation?',
		description: 'We have detailed documentation on every aspects of the plugin.',
		iconClass: 'fa fa-file-text',
		link: 'https://ctb.bplugins.com/docs',
		linkText: 'Documentation'
	},
	{
		title: 'Liked This Plugin?',
		description: 'Glad to know that, you can support us by leaving a 5 &#11088; rating.',
		iconClass: 'fa fa-thumbs-up',
		link: 'https://wordpress.org/support/plugin/icon-list-block/reviews/',
		linkText: 'Rate the Plugin'
	}
];