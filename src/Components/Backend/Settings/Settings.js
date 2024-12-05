import { __ } from '@wordpress/i18n';
import { InspectorControls, BlockControls, AlignmentToolbar } from '@wordpress/block-editor';
import { PanelBody, PanelRow, TabPanel, RangeControl, TextControl, ToggleControl, __experimentalUnitControl as UnitControl, Button, Dashicon } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { useState } from "react";

// Settings Components
import { Label, Background, ColorControl, ColorsControl, HelpPanel, IconControl, SeparatorControl, Typography, InlineMediaUpload, Device } from '../../../../../bpl-tools/Components';
import { BorderControl, ShadowControl, SpaceControl } from '../../../../../bpl-tools/Components/Deprecated';
import { gearIcon } from '../../../../../bpl-tools/utils/icons';
import { pxUnit, perUnit, emUnit } from '../../../../../bpl-tools/utils/options';
import { AboutProModal, BControlPro, BtnGroupPro, SelectControlPro } from '../../../../../bpl-tools/ProControls';

import { generalStyleTabs } from '../../../utils/options';
import { produce } from 'immer';

const Settings = ({ attributes, setAttributes, updateList, activeIndex, setActiveIndex, isPremium, device }) => {
	const { isTitle, isDesc, lists, isListLinkInNewTab, alignment, width, background, padding, border, shadow, position, headerMargin, titleColor, descTypo, descColor, isHeaderSep, headerSep, listIconSize, listIconColors, listTextTypo, listTextColor, themes, descriptionTypo, descriptionColor, themeOptions, featureThemeStyles, badgeStyles, badgeTextTypo, theme5Styles, featureTypo, listItemsBgColor, singleIconColor, theme6Styles, iconUploadButton, columns, columnGap, rowGap, } = attributes;

	const { rightIconColor, isBadge, isUrlIcon, isButton } = themeOptions;
	const { featureIconSize } = featureThemeStyles;
	const { iconPulsColor, iconBgBlur } = theme5Styles;
	const { animateColor } = singleIconColor;
	const { setIconUpload } = iconUploadButton;

	const [isProModalOpen, setIsProModalOpen] = useState(false);

	const premiumProps = { isPremium, setIsProModalOpen };

	const { theme } = themes;

	const addList = () => {
		setAttributes({
			lists: [...lists, {
				icon: {
					class: 'fas fa-check-square'
				},
				text: 'List item with square check',
				des: "Type your description here",
				featureDes: "Feature with star",
				link: "",
				badgeTitle: "Popular",
				theme6BtnTitle: "action",
				uploadIconUrl: "https://static.vecteezy.com/system/resources/previews/016/716/467/non_2x/twitter-icon-free-png.png"

			}]
		});
		setActiveIndex(lists.length);
	}

	const uploadUrl = "https://static.vecteezy.com/system/resources/previews/016/716/467/non_2x/twitter-icon-free-png.png";

	const duplicateList = e => {
		e.preventDefault();

		setAttributes({ lists: [...lists.slice(0, activeIndex), { ...lists[activeIndex] }, ...lists.slice(activeIndex)] });

		setActiveIndex(activeIndex + 1);
	}

	const removeList = e => {
		e.preventDefault();

		setAttributes({ lists: [...lists.slice(0, activeIndex), ...lists.slice(activeIndex + 1)] });

		setActiveIndex(0 === activeIndex ? 0 : activeIndex - 1);
	}

	const { icon = {}, link = '', badgeTitle = "Popular", theme6BtnTitle = "action", uploadIconUrl = uploadUrl } = lists[activeIndex] || {};


	return <>
		<InspectorControls>
			<div className='ilbInspectorInfo'>
				Need more block like this? Checkout the bundle ➡ <a href='https://wordpress.org/plugins/b-blocks' target='_blank' rel='noopener noreferrer'>B Blocks</a>
			</div>

			<TabPanel className='bPlTabPanel' activeClass='activeTab' tabs={generalStyleTabs}>{tab => <>
				{'general' === tab.name && <>
					<HelpPanel slug='icon-list-block' docsLink='https://bblockswp.com/docs/icon-list-block' />


					<PanelBody className='bPlPanelBody addRemoveItems editItem' title={__('Add or Remove Lists', 'icon-list')}>
						{null !== activeIndex && <>
							<h3 className='bplItemTitle'>{__(`List item ${activeIndex + 1}:`, 'icon-list')}</h3>

							<Label>{__('Icon Type')}</Label>
							<BtnGroupPro
								className="iconType"
								value={setIconUpload}
								onChange={val => setAttributes({ iconUploadButton: { ...iconUploadButton, setIconUpload: val } })}
								options={[
									{ label: 'Select Icon', value: 'select' },
									{ label: 'Upload Icon', value: 'upload' }
								]}
								proValues={['upload']}
								{...premiumProps}
							/>

							{
								"upload" === setIconUpload && <>
									<InlineMediaUpload
										label={__("Upload Image URL", "icon-list")}
										value={uploadIconUrl}
										onChange={val => {
											const newUploadIcon = produce(lists, draft => {
												draft[activeIndex].uploadIconUrl = val
											})
											setAttributes({ lists: newUploadIcon })
										}}
									/>
								</>
							}

							{
								"select" === setIconUpload && <>
									<IconControl value={icon} onChange={val => updateList('icon', val)} defaults={{ class: 'fas fa-check-square' }} isSize={false} isColor={false} />
								</>
							}




							<Label>{__('Link:', 'icon-list')}</Label>
							<TextControl value={link} onChange={val => updateList('link', val)} />
							<small>{__('If you want to link the list, enter the link here. Otherwise, leave as blank.', 'icon-list')}</small>


							{/* Premium TextControl for Badge Title */}
							{
								"theme4" === theme &&
								<>
									<Label>{__(`Badge Title ${activeIndex + 1}:`, 'icon-list')}</Label>
									<BControlPro
										value={badgeTitle}
										onChange={val => updateList('badgeTitle', val)}
										placeholder={__("Type your badge", "icon-list")}
										Component={TextControl}
										{...premiumProps}
									/>
								</>

							}

							{
								"theme6" === theme && <>
									<Label>{__('Button Title:', 'icon-list')}</Label>
									<TextControl value={theme6BtnTitle} onChange={val => updateList('theme6BtnTitle', val)} />
								</>
							}

							<PanelRow className='itemAction mt20 mb15'>
								{1 < lists?.length && <Button className='removeItem' label={__('Remove', 'icon-list')} onClick={removeList} ><Dashicon icon='no' />{__('Remove', 'icon-list')}</Button>}

								<Button className='duplicateItem' label={__('Duplicate', 'icon-list')} onClick={duplicateList} >{gearIcon}{__('Duplicate', 'icon-list')}</Button>
							</PanelRow>
						</>}

						<div className='addItem'>
							<Button label={__('Add New List', 'icon-list')} onClick={addList}><Dashicon icon='plus' />{__('Add New List', 'icon-list')}</Button>
						</div>
					</PanelBody>

					<PanelBody className='bplPanelBody' title={__('Themes', 'icon-list')} initialOpen={false}>
						<SelectControlPro
							label={__("Select Theme:", "icon-list")}
							labelPosition='left'
							value={themes.theme} // This sets the initial value
							options={[
								{ label: 'Default', value: 'default' },
								{ label: 'Theme 2', value: 'theme2' },
								{ label: 'Theme 3', value: 'theme3' },
								{ label: 'Theme 4', value: 'theme4' },
								{ label: 'Theme 5', value: 'theme5' },
								{ label: 'Theme 6', value: 'theme6' },
								{ label: 'Theme 7', value: 'theme7' }
							]}
							onChange={(val) => setAttributes({ themes: { ...themes, theme: val } })}
							{...premiumProps}
							proValues={['theme2', 'theme3', 'theme4', 'theme5', 'theme6', 'theme7']}
						/>
					</PanelBody>


					<PanelBody className='bPlPanelBody' title={__('List Settings', 'icon-list')} initialOpen={false}>
						<ToggleControl label={__('Open list link in new tab', 'icon-list')} checked={isListLinkInNewTab} onChange={val => setAttributes({ isListLinkInNewTab: val })} />


						{/* Premium toggleControl for Show Badge */}
						{
							"theme4" === theme && <>
								<BControlPro
									className='mt10'
									label={__('Show List Badge', 'icon-list')}
									checked={isBadge}
									onChange={(val) => {
										const newVale = produce(themeOptions, draft => {
											draft.isBadge = val
										})
										setAttributes({ themeOptions: newVale })
									}}
									Component={ToggleControl}
									{...premiumProps}
								/>
							</>
						}

						{/* Premium toggleControl for Show URL */}
						{
							("theme4" === theme || "theme2" === theme) && <>
								<BControlPro
									className='mt10'
									label={__('Show URL Icon', 'icon-list')}
									checked={isUrlIcon}
									onChange={val => {
										const newIcon = produce(themeOptions, draft => {
											draft.isUrlIcon = val
										})
										setAttributes({ themeOptions: newIcon })
									}}
									Component={ToggleControl}
									{...premiumProps}
								/>
							</>
						}

						{
							"theme6" === theme &&
							<ToggleControl
								className='mt10'
								label={__('Show Action Button', 'icon-list')}
								checked={isButton}
								onChange={val => {
									const newButton = produce(themeOptions, draft => {
										draft.isButton = val
									})
									setAttributes({ themeOptions: newButton })
								}}
							/>
						}
					</PanelBody>
				</>}

				{'style' === tab.name && <>
					<PanelBody className='bPlPanelBody' title={__('Card', 'icon-list')}>

						<UnitControl label={__('Width:', 'icon-list')} labelPosition='left' value={width} onChange={val => setAttributes({ width: val })} units={[pxUnit(), perUnit(), emUnit()]} />
						<small>{__('Keep width set your align wide', 'icon-list')}</small>

						<Background className='mt20' label={__('Background:', 'icon-list')} value={background} onChange={val => setAttributes({ background: val })} defaults={{ color: '#0000' }} />

						<SpaceControl className='mt20' label={__('Padding:', 'icon-list')} value={padding} onChange={val => setAttributes({ padding: val })} defaults={{ vertical: '30px', horizontal: '25px' }} />

						<BorderControl label={__('Border:', 'icon-list')} value={border} onChange={val => setAttributes({ border: val })} />

						<ShadowControl label={__('Shadow:', 'icon-list')} value={shadow} onChange={val => setAttributes({ shadow: val })} defaults={{ blur: '10px', color: '#4527a480' }} />
					</PanelBody>

					<PanelBody className='bPlPanelBody' title={__('Header', 'icon-list')} initialOpen={false}>
						<SpaceControl className='mt20' label={__('Margin:', 'icon-list')} value={headerMargin} onChange={val => setAttributes({ headerMargin: val })} defaults={{ side: 4, bottom: '30px' }} />

						<ToggleControl className='mt20' label={__('Show Title', 'icon-list')} checked={isTitle} onChange={val => setAttributes({ isTitle: val })} />

						{isTitle && <>
							<Typography label={__('Title Typography:', 'icon-list')} value={featureTypo} onChange={val => setAttributes({ titleTypo: val })} defaults={{ fontSize: { desktop: 30, tablet: 26, mobile: 22 }, fontWeight: 700, textTransform: 'uppercase' }} />

							<ColorControl label={__('Title Color:', 'icon-list')} value={titleColor} onChange={val => setAttributes({ titleColor: val })} defaultColor='#4527a4' />
						</>}

						<ToggleControl className='mt20' label={__('Show Description', 'icon-list')} checked={isDesc} onChange={val => setAttributes({ isDesc: val })} />

						{isDesc && <>
							<Typography label={__('Description Typography:', 'icon-list')} value={descTypo} onChange={val => setAttributes({ descTypo: val })} defaults={{ fontSize: { desktop: 18, tablet: 17, mobile: 16 } }} />

							<ColorControl label={__('Description Color:', 'icon-list')} value={descColor} onChange={val => setAttributes({ descColor: val })} defaultColor='#828282' />
						</>}

						<ToggleControl className='mt20' label={__('Show Separator', 'icon-list')} checked={isHeaderSep} onChange={val => setAttributes({ isHeaderSep: val })} />

						{isHeaderSep && <SeparatorControl value={headerSep} onChange={val => setAttributes({ headerSep: val })} defaults={{ width: '20%', height: '2px', style: 'solid', color: '#828282' }} />}
					</PanelBody>

					<PanelBody className='bPlPanelBody' title={__('List', 'icon-list')} initialOpen={false}>

						{/* Grid template Column styles setting */}
						{
							("theme3" === theme || "theme5" === theme || "theme7" === theme) && <>
								<PanelRow className='mt20'>
									<Label className='mb5'>{__('Columns:', 'icon-list')}</Label>
									<Device />
								</PanelRow>
								<BControlPro
									value={columns[device]}
									onChange={val => { setAttributes({ columns: { ...columns, [device]: val } }) }}
									min={1}
									max={6}
									step={1}
									beforeIcon='grid-view'
									Component={RangeControl}
									{...premiumProps}
								/>

								<Label>{__('column Gap:', 'icon-list')}</Label>
								<BControlPro
									value={columnGap}
									onChange={val => setAttributes({ columnGap: val })}
									min={0}
									max={100}
									step={1}
									beforeIcon='arrow-right-alt'
									Component={RangeControl}
									{...premiumProps}
								/>

								<Label>{__('Row Gap:', 'advanced-post-block')}</Label>
								<BControlPro
									value={rowGap}
									onChange={val => setAttributes({ rowGap: val })}
									min={0}
									max={150}
									step={1}
									beforeIcon='arrow-down-alt'
									Component={RangeControl}
									{...premiumProps}
								/>
							</>
						}



						{/* Premium Background for All List item Background */}
						<BControlPro
							className='mt10'
							label={__('List Items Background:', 'icon-list')}
							value={listItemsBgColor}
							onChange={val => setAttributes({ listItemsBgColor: val })}
							defaults={{ color: '#0000' }}
							Component={Background}
							{...premiumProps}
						/>


						{
							("default" === theme || "theme2" === theme || "theme4" === theme) && <>
								<Label>{__('Icon Size:', 'icon-list')}</Label>
								<RangeControl value={listIconSize} onChange={val => setAttributes({ listIconSize: val })} min={0} max={120} step={1} allowReset={true} resetFallbackValue={20} initialPosition={20} />

								{
									"select" === setIconUpload && <>
										<ColorsControl label={__('Icon Colors', 'icon-list')} value={listIconColors} onChange={val => setAttributes({ listIconColors: val })} defaults={{ color: '#fff', bg: '#4527A4' }} />
									</>
								}
							</>
						}


						{
							"default" === theme && <Typography label={__('Text Typography:', 'icon-list')} value={listTextTypo} onChange={val => setAttributes({ listTextTypo: val })} defaults={{ fontSize: { desktop: 18, tablet: 15, mobile: 15 }, fontWeight: 500 }} />
						}

						{
							("theme2" === theme || "theme4" === theme) && <Typography label={__('Title Typography:', 'icon-list')} value={listTextTypo} onChange={val => setAttributes({ listTextTypo: val })} defaults={{ fontSize: { desktop: 18, tablet: 15, mobile: 15 }, fontWeight: 500 }} />
						}

						{
							"default" === theme && <ColorControl label={__('Text Color:', 'icon-list')} value={listTextColor} onChange={val => setAttributes({ listTextColor: val })} defaultColor='#828282' />
						}

						{
							("theme2" === theme || "theme4" === theme) && <ColorControl label={__('Title Color:', 'icon-list')} value={listTextColor} onChange={val => setAttributes({ listTextColor: val })} defaultColor='#828282' />
						}

						{
							("theme2" === theme || "theme4" === theme) && <Typography label={__('Description Typography:', 'icon-list')} value={descriptionTypo} onChange={val => setAttributes({ descriptionTypo: val })} defaults={{ fontSize: { desktop: 15, tablet: 15, mobile: 15 }, fontWeight: 500 }} />
						}

						{
							("theme2" === theme || "theme4" === theme) && <ColorControl label={__('Description Color:', 'icon-list')} value={descriptionColor} onChange={val => setAttributes({ descriptionColor: val })} defaultColor='#828282' />
						}


						{/* Premium ColorControl & Typography Control for Badge */}
						{
							("theme4" === theme && isBadge) && <>
								<BControlPro
									label={__('Badge Typography:', 'icon-list')}
									value={badgeTextTypo}
									onChange={val => setAttributes({ badgeTextTypo: val })}
									defaults={{ fontSize: { desktop: 14, tablet: 12, mobile: 10 }, fontWeight: 500 }}
									Component={Typography}
									{...premiumProps}
								/>

								<BControlPro
									label={__('Badge Colors', 'icon-list')}
									value={badgeStyles}
									onChange={val => setAttributes({ badgeStyles: val })}
									defaults={{ color: '#fff', bg: '#4527A4' }}
									Component={ColorsControl}
									{...premiumProps}
								/>
							</>
						}


						{
							("theme2" === theme || "theme4" === theme) &&
							<ColorControl label={__('URL Icon Color:', 'icon-list')} value={rightIconColor} onChange={(val) => {
								const newVal = produce(themeOptions, draft => {
									draft.rightIconColor = val
								})
								setAttributes({ themeOptions: newVal })
							}} defaultColor='#4527A4' />

						}

						{/* Theme 3 style setting here */}
						{
							("theme3" === theme || "theme6" === theme) && <>
								<Label>{__('Icon Size:', 'icon-list')}</Label>
								<RangeControl value={featureIconSize} onChange={val => {
									const newSize = produce(featureThemeStyles, draft => {
										draft.featureIconSize = val;
									})
									setAttributes({ featureThemeStyles: newSize })
								}} min={0} max={120} step={1} allowReset={true} resetFallbackValue={28} initialPosition={28} />

								{
									"select" === setIconUpload && <>
										<ColorsControl label={__('Icon Colors', 'icon-list')} value={listIconColors} onChange={val => setAttributes({ listIconColors: val })} defaults={{ color: '#fff', bg: '#4527A4' }} />
									</>
								}

								<Typography label={__('Description Typography:', 'icon-list')} value={listTextTypo} onChange={val => setAttributes({ listTextTypo: val })} defaults={{ fontSize: { desktop: 18, tablet: 15, mobile: 15 }, fontWeight: 500 }} />

								<ColorControl label={__('Description Color:', 'icon-list')} value={listTextColor} onChange={val => setAttributes({ listTextColor: val })} defaultColor='#828282' />

							</>
						}

						{/* Theme: 5 setting here */}

						{
							("theme5" === theme || "theme7" === theme) && <>
								<Label>{__('Icon Size:', 'icon-list')}</Label>
								<RangeControl value={featureIconSize} onChange={val => {
									const newSize = produce(featureThemeStyles, draft => {
										draft.featureIconSize = val;
									})
									setAttributes({ featureThemeStyles: newSize })
								}} min={0} max={120} step={1} allowReset={true} resetFallbackValue={28} initialPosition={28} />

								{
									"theme7" === theme && <ColorControl
										label={__('Animate Circle Color:', 'icon-list')}
										value={animateColor} onChange={val => {
											const newColor = produce(singleIconColor, draft => {
												draft.animateColor = val;
											})
											setAttributes({ singleIconColor: newColor })
										}}
										defaultColor='linear-gradient(135deg, #3b82f6, #8b5cf6)'
									/>
								}

								{
									"select" === setIconUpload && <>
										<ColorsControl label={__('Icon Colors', 'icon-list')} value={listIconColors} onChange={val => setAttributes({ listIconColors: val })} defaults={{ color: '#fff', bg: '#4527A4' }} />
									</>
								}


								<Typography label={__('Title Typography:', 'icon-list')} value={listTextTypo} onChange={val => setAttributes({ listTextTypo: val })} defaults={{ fontSize: { desktop: 18, tablet: 15, mobile: 15 }, fontWeight: 500 }} />

								<ColorControl label={__('Title Color:', 'icon-list')} value={listTextColor} onChange={val => setAttributes({ listTextColor: val })} defaultColor='#828282' />

								<Typography label={__('Description Typography:', 'icon-list')} value={descriptionTypo} onChange={val => setAttributes({ descriptionTypo: val })} defaults={{ fontSize: { desktop: 15, tablet: 15, mobile: 15 }, fontWeight: 500 }} />

								<ColorControl label={__('Description Color:', 'icon-list')} value={descriptionColor} onChange={val => setAttributes({ descriptionColor: val })} defaultColor='#828282' />
							</>
						}


						{/* Theme: 5 general settings */}
						{
							"theme5" === theme && <>
								{/* Premium ColorControl for Theme 5 Icon Puls animate Color */}
								<BControlPro
									label={__('Icon Pulse Color:', 'icon-list')}
									value={iconPulsColor}
									onChange={val => {
										const newPulse = produce(theme5Styles, draft => {
											draft.iconPulsColor = val;
										})
										setAttributes({ theme5Styles: newPulse })
									}}
									defaultColor='linear-gradient(135deg, #3b82f6, #8b5cf6)'
									Component={ColorControl}
									{...premiumProps}
								/>

								{/* Premium ColorControl for theme 5 Icon Blur Background Color */}
								<BControlPro
									label={__('Icon Blur Background:', 'icon-list')}
									value={iconBgBlur}
									onChange={val => {
										const newBlur = produce(theme5Styles, draft => {
											draft.iconBgBlur = val;
										})
										setAttributes({ theme5Styles: newBlur })
									}}
									defaultColor='linear-gradient(135deg, #3b82f6, #8b5cf6)'
									Component={ColorControl}
									{...premiumProps}
								/>
							</>
						}


						{/* Theme: 6 General setting */}
						{
							"theme6" === theme && <>
								<ColorsControl label={__('Button Colors', 'icon-list')} value={theme6Styles} onChange={val => setAttributes({ theme6Styles: val })} defaults={{ color: '#fff', bg: '#059669' }} />

								{
									"select" === setIconUpload && <>
										<ColorsControl label={__('Icon Colors', 'icon-list')} value={listIconColors} onChange={val => setAttributes({ listIconColors: val })} defaults={{ color: '#fff', bg: '#0000' }} />
									</>
								}

								<Typography
									label={__('ButtonTypography:', 'icon-list')}
									value={badgeTextTypo}
									onChange={val => setAttributes({ badgeTextTypo: val })}
									defaults={{ fontSize: { desktop: 14, tablet: 12, mobile: 10 }, fontWeight: 500 }}
								/>
							</>
						}

					</PanelBody>
				</>}
			</>}</TabPanel>
		</InspectorControls>


		<BlockControls>
			<AlignmentToolbar value={alignment} onChange={val => setAttributes({ alignment: val })} describedBy={__('Icon List Alignment')} alignmentControls={[
				{ title: __('Icon List in left', 'icon-list'), align: 'left', icon: 'align-left' },
				{ title: __('Icon List in center', 'icon-list'), align: 'center', icon: 'align-center' },
				{ title: __('Icon List in right', 'icon-list'), align: 'right', icon: 'align-right' }
			]} />

			<AlignmentToolbar value={position} onChange={val => setAttributes({ position: val })} describedBy={__('Content Position')} />
		</BlockControls>

		<AboutProModal isProModalOpen={isProModalOpen} setIsProModalOpen={setIsProModalOpen} link='https://bplugins.com/products/icon-list-block/#pricing'>
			<li>&emsp;<strong>{__('Choose Your Preferred Theme: ', 'icon-list')}</strong>{__('Select the theme of your choice to personalize your experience and give your website the look and feel that suits your style.', 'icon-list')}</li>
			<li>&emsp;<strong>{__('Background On Your List Item: ', 'icon-list')}</strong>{__('Customize the background of your list items to enhance their appearance and match your design preferences.', 'icon-list')}</li>
			<li>&emsp;<strong>{__('Hide/Show List Item URL Icon: ', 'icon-list')}</strong>{__('Toggle the visibility of URL icons for list items, allowing you to show or hide them based on your design needs.', 'icon-list')}</li>
			<li>&emsp;<strong>{__('Hide/Show List Item Badge: ', 'icon-list')}</strong>{__('Enable or disable badges for list items to highlight specific content or keep the design clean and simple.', 'icon-list')}</li>
			<li>&emsp;<strong>{__('Badge Title Input Field: ', 'icon-list')}</strong>{__('Provide a title for the badge to display descriptive or relevant text alongside your list items.', 'icon-list')}</li>
			<li>&emsp;<strong>{__('Badge Text Styles: ', 'icon-list')}</strong>{__('Customize the typography of badge text, including font style, size, weight, and spacing, to match your design aesthetics.', 'icon-list')}</li>
			<li>&emsp;<strong>{__('Badge Text Color & Background: ', 'icon-list')}</strong>{__('Set the color and background for the badge text to ensure it stands out and complements your design.', 'icon-list')}</li>
			<li>&emsp;<strong>{__('Icon Animated Puls Color: ', 'icon-list')}</strong>{__('Choose a color for the animated pulse effect to draw attention and enhance visual engagement.', 'icon-list')}</li>
			<li>&emsp;<strong>{__('Icon Puls Blur Background: ', 'icon-list')}</strong>{__('Adjust the blur effect of the pulse background to create a soft, visually appealing design.', 'icon-list')}</li>
			<li>&emsp;<strong>{__('Custom Upload images: ', 'icon-list')}</strong>{__('Upload and use custom images to personalize your list items and make your content stand out.', 'icon-list')}</li>
			<li>&emsp;<strong>{__('Custom Set Grid for themes: ', 'icon-list')}</strong>{__('Customize grid layouts for themes to organize and display your list items with precision and style.', 'icon-list')}</li>
			<li>&emsp;<strong>{__('Add Grid Styles: ', 'icon-list')}</strong>{__('Choose from a variety of grid styles to create visually appealing and organized layouts for your list items.', 'icon-list')}</li>
		</AboutProModal>
	</>;
};



export default withSelect((select) => {
	const { getDeviceType } = select('core/editor');

	return {
		device: getDeviceType()?.toLowerCase(),
	}
})(Settings);