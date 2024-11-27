import { FaExternalLinkAlt } from '../../utils/icons';
// import { Award } from 'lucide-react';

const Themes = ({ attributes, list, textEl, desEl, featureDesEl, badgeTitle, link, theme5TextSl, theme5DesSl }) => {
	const { themes, themeOptions } = attributes;
	const { theme } = themes;
	const { rightIconColor, isBadge, isUrlIcon } = themeOptions;

	const { icon } = list;

	const iconEl = icon?.class && <i className={`icon ${icon?.class}`} />

	const theme3IconEl = icon?.class && <i className={`theme3Icon ${icon?.class}`} />
	const theme5IconEl = icon?.class && <i className={`theme5Icon ${icon?.class}`} />

	switch (theme) {
		case 'theme2':
			return <>
				<div className="icon red">
					{iconEl}
				</div>

				<div className="content">
					{textEl}
					{desEl}
				</div>

				{
					isUrlIcon && link ? <FaExternalLinkAlt color={rightIconColor} /> : null
				}
			</>

		case 'theme3':
			return <>
				<div className="feature-container">
					<div className='feature'>
						<div className="icon-wrapper">
							{theme3IconEl}
						</div>
						{featureDesEl}
					</div>
				</div>
			</>

		case 'theme4':
			return <>
				<div className="icon red">
					{iconEl}
				</div>

				<div className="content">
					{textEl}
					{desEl}
				</div>
				{
					isBadge && <p className={`badge ${!badgeTitle ? 'hidden-badge' : ''}`}>{badgeTitle}</p>
				}
				{
					link && <FaExternalLinkAlt color={rightIconColor} />
				}
			</>

		case 'theme5':
			return <>
				<div className="icon-card-wrapper">
					{/* Decorative background elements */}
					<div className="bg-element bg-element-1"></div>
					<div className="bg-element bg-element-2"></div>

					{/* Main content container */}
					<div className="icon-card">
						{/* Icon container with animated background */}
						<div className="icon-container">
							<div className="icon-bg-blur"></div>
							<div className="icon-wrapper">
								<div className="icon-pulse"></div>
								<div className="icon-circle">
									{theme5IconEl}
								</div>
							</div>
						</div>

						{/* Text content */}
						<div className="card-content">
							{theme5TextSl}
							{theme5DesSl}
						</div>

						{/* Animated border line */}
						<div className="animated-border"></div>
					</div>
				</div>
			</>

		default:
			return <>
				{iconEl}

				{textEl}
			</>
	}
}

export default Themes;