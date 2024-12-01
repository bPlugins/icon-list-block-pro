import { getBackgroundCSS, getBorderCSS, getColorsCSS, getSeparatorCSS, getShadowCSS, getSpaceCSS, getTypoCSS } from '../../../../bpl-tools/utils/getCSS';

import { prefix } from '../../utils/data';

const Style = ({ attributes, id }) => {
	const { alignment, width, background, padding, border, shadow, headerMargin, titleTypo, titleColor, descTypo, descColor, headerSep, listIconSize, listIconColors, listTextTypo, listTextColor, descriptionColor, descriptionTypo, featureThemeStyles, badgeStyles, badgeTextTypo, theme5Styles, featureTypo, listItemsBgColor, singleIconColor, theme6Styles, themeOptions } = attributes;

	const { featureIconSize } = featureThemeStyles;
	const { iconPulsColor, iconBgBlur } = theme5Styles;
	const { animateColor } = singleIconColor;
	const { isMaxWidth } = themeOptions;

	const mainSl = `#${id}`;
	const iconListSl = `${mainSl} .${prefix}`;


	const headerSl = `${iconListSl} .header`;
	const featureHeader = `${iconListSl} .featureHeader`;

	const featureSl = `${iconListSl} ul.theme3 .list .feature-container .feature`;

	const listItemsBgSl = `${iconListSl} ul.lists li.list`;

	const featureIconSl = `${featureSl} .icon-wrapper .theme3Icon`;
	const featureImgSl = `${featureSl} .icon-wrapper`;

	const featureDesSl = `${featureSl} .featureDescription`;

	const badgeSl = `${iconListSl} ul.theme4 .badge`;

	const theme5BgElementSl1 = `${iconListSl} ul.theme5 .bg-element.bg-element-1`;
	const theme5BgElementSl2 = `${iconListSl} ul.theme5 .bg-element.bg-element-2`;
	const theme5IconCardSl = `${iconListSl} ul.theme5 .icon-card`;
	const theme5IconSl = `${iconListSl} ul.theme5 .theme5Icon`;
	const theme5IconCircle = `${iconListSl} ul.theme5 .icon-circle`;
	const theme5IconWrapper = `${iconListSl} ul.theme5 .icon-wrapper`;
	const theme5TitleSl = `${iconListSl} ul.theme5 .card-title`;
	const theme5DesSl = `${iconListSl} ul.theme5 .card-description`;
	const theme5BgBlurSl = `${iconListSl} ul.theme5 .icon-container .icon-bg-blur`;
	const theme5IconPulsSl = `${iconListSl} ul.theme5 .icon-wrapper .icon-pulse`;
	const theme6IconSl = `${iconListSl} ul.theme6 .icon-container .theme6Icon`;
	const theme6ImgSl = `${iconListSl} ul.theme6 .icon-container`;
	const theme6DesSl = `${iconListSl} ul.theme6 .theme6Des`;
	const theme6BtnSl = `${iconListSl} ul.theme6 .try-button`;

	const theme7CardSl = `${iconListSl} ul.theme7 .glass-card`;
	const theme7TitleSl = `${iconListSl} ul.theme7 .card-title`;
	const theme7DesSl = `${iconListSl} ul.theme7 .card-description`;
	const theme7IconSl = `${iconListSl} ul.theme7 .theme7Icon`;
	const theme7ImgSl = `${iconListSl} ul.theme7 .icon-satellite`;
	const theme7satelliteSl = `${iconListSl} ul.theme7 .orbit .satellite`;


	const iconSize = 30 < listIconSize ? listIconSize + listIconSize / 2 : listIconSize + listIconSize / 1.5;

	// ${['0px', '0%', '0em'].includes(width) ? 'auto' : width};

	return <style dangerouslySetInnerHTML={{
		__html: `
		${getTypoCSS('', titleTypo)?.googleFontLink}
		${getTypoCSS('', descTypo)?.googleFontLink}
		${getTypoCSS('', listTextTypo)?.googleFontLink}
		${getTypoCSS(`${headerSl} .title`, titleTypo)?.styles}
		${getTypoCSS(`${headerSl} .description`, descTypo)?.styles}
		${getTypoCSS(`${iconListSl} ul.lists .text`, listTextTypo)?.styles}
		${getTypoCSS(`${iconListSl} ul.lists .description`, descriptionTypo)?.styles}
		${getTypoCSS(`${featureHeader}`, featureTypo)?.styles}
		${getTypoCSS(`${featureDesSl}`, listTextTypo)?.styles}
		${getTypoCSS(`${badgeSl}`, badgeTextTypo)?.styles}
		${getTypoCSS(`${theme5TitleSl}`, listTextTypo)?.styles}
		${getTypoCSS(`${theme5DesSl}`, descriptionTypo)?.styles}
		${getTypoCSS(`${theme6DesSl}`, listTextTypo)?.styles}
		${getTypoCSS(`${theme6BtnSl}`, badgeTextTypo)?.styles}
		${getTypoCSS(`${theme7TitleSl}`, listTextTypo)?.styles}
		${getTypoCSS(`${theme7DesSl}`, descriptionTypo)?.styles}
	

		${featureImgSl} img{
			width: ${featureIconSize}px;
			height: ${featureIconSize}px;
		}
		${theme6ImgSl} img{
			width: ${featureIconSize}px;
			height: ${featureIconSize}px;
			max-width:initial;
		}
		${theme7ImgSl} img{
			width: ${featureIconSize}px;
			height: ${featureIconSize}px;
		}
		${mainSl}{
			text-align: ${alignment};
		}
		${iconListSl}{
			width: ${isMaxWidth ? width : '100%'};
			${getBackgroundCSS(background)}
			padding: ${getSpaceCSS(padding)};
			${getBorderCSS(border)}
			box-shadow: ${getShadowCSS(shadow)};
		}
		${listItemsBgSl}{
			${getBackgroundCSS(listItemsBgColor)}
		}
		${headerSl}{
			margin: ${getSpaceCSS(headerMargin)};
		}
		${headerSl} .title{
			color: ${titleColor};
		}
		${headerSl} .description{
			color: ${descColor};
		}
		${headerSl} .separator{
			${getSeparatorCSS(headerSep)}
		}
		${iconListSl} ul.lists .icon{
		    font-size: ${listIconSize}px;
			width: ${iconSize}px;
			height: ${iconSize}px;
			${getColorsCSS(listIconColors)}
		}
		${iconListSl} ul.lists .text{
			max-width: calc(100% - ${iconSize + 15}px);
			color: ${listTextColor};
		}
		${iconListSl} ul.lists .description{
			color: ${descriptionColor};
		}
		${featureHeader}{
			color: ${titleColor};
		}
		${featureIconSl}{
			font-size: ${featureIconSize}px;
			${getColorsCSS(listIconColors)}
			padding: 8px;
    		border-radius: 8px;
			
		}
		${featureDesSl}{
			color: ${listTextColor};
		}
		${badgeSl}{
			${getColorsCSS(badgeStyles)}
		}
		${theme5BgElementSl1}{
			${getBackgroundCSS(listItemsBgColor)}
		}
		${theme5BgElementSl2}{
			${getBackgroundCSS(listItemsBgColor)}
		}
		${theme5IconCardSl}{
			${getBackgroundCSS(listItemsBgColor)}
		}
		${theme5IconSl}{
			color: ${listIconColors};
			font-size: ${featureIconSize}px;
		}
		
		${theme5TitleSl}{
			color: ${listTextColor};
		}
		${theme5DesSl}{
			color: ${descriptionColor};
		}
		${theme5IconPulsSl}{
			background: ${iconPulsColor};
		}
		${theme5BgBlurSl}{
			background: ${iconBgBlur};
		}
		${theme5IconCircle}{
			width: calc(${featureIconSize}px  + 1.5rem);
			height: calc(${featureIconSize}px + 1.5rem);
			${getColorsCSS(listIconColors)}
		}
		${theme5IconWrapper}{
			width: calc(${featureIconSize}px/2 + 4rem);
			height: calc(${featureIconSize}px/2 + 4rem);
		}
		${theme6IconSl}{
			font-size: ${featureIconSize}px;
			${getColorsCSS(listIconColors)}
		    padding: 7px;
            border-radius: 4px;
		}
		${theme6DesSl}{
			color: ${listTextColor};
		}
		${theme6BtnSl}{
			${getColorsCSS(theme6Styles)}
		}
		${theme7CardSl}{
			${getBackgroundCSS(listItemsBgColor)}
		}
		${theme7TitleSl}{
			color: ${listTextColor};
		}
		${theme7IconSl}{
			font-size: ${featureIconSize}px;
			${getColorsCSS(listIconColors)}
		}
		${theme7satelliteSl}{
			background: ${animateColor};
		}
		${theme7DesSl}{
			color: ${descriptionColor};
		}
		`.replace(/\s+/g, ' ')
	}} />;
}
export default Style;