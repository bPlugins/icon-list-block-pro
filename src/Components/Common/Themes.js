import { FaExternalLinkAlt } from '../../utils/icons';


const Themes = ({ attributes, list, textEl, desEl, featureDesEl, badgeTitle, link, theme5TextSl, theme5DesSl, theme6BtnTitle, theme6DesSl }) => {


	const { themes, themeOptions, iconUploadButton } = attributes;
	const { rightIconColor, isBadge, isUrlIcon, isButton } = themeOptions;
	const { setIconUpload } = iconUploadButton;
	const { theme } = themes;

	const { icon, uploadIconUrl } = list;

	const iconEl = icon?.class && <i className={`icon ${icon?.class}`} />

	const theme3IconEl = icon?.class && <i className={`theme3Icon ${icon?.class}`} />
	const theme5IconEl = icon?.class && <i className={`theme5Icon ${icon?.class}`} />
	const theme6IconEl = icon?.class && <i className={`theme6Icon ${icon?.class}`} />
	const theme7IconEl = icon?.class && <i className={`theme7Icon ${icon?.class}`} />


	switch (theme) {
		case 'theme2':
			return <>
				<div className="icon red">

					{
						"select" === setIconUpload && <>{iconEl}</>
					}

					{
						"upload" === setIconUpload && <>
							<img src={uploadIconUrl} alt="" />
						</>
					}
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
							{
								"select" === setIconUpload && <>{theme3IconEl}</>
							}
							{
								"upload" === setIconUpload && <>
									<img src={uploadIconUrl} alt="" />
								</>
							}
						</div>
						{featureDesEl}
					</div>
				</div>
			</>

		case 'theme4':
			return <>
				<div className="icon red">
					{
						"select" === setIconUpload && <>{iconEl}</>
					}
					{
						"upload" === setIconUpload && <>
							<img src={uploadIconUrl} alt="" />
						</>
					}
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
									{
										"select" === setIconUpload && <>{theme5IconEl}</>
									}
									{
										"upload" === setIconUpload && <>
											<img src={uploadIconUrl} alt="" />
										</>
									}
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

		case 'theme6':
			return <>
				<div className="icon-list-container">
					<table className="icon-table">
						<tbody>
							<tr>
								<td>
									<div className="icon-container">
										{
											"select" === setIconUpload && <>{theme6IconEl}</>
										}
										{
											"upload" === setIconUpload && <>
												<img src={uploadIconUrl} alt="" />
											</>
										}
									</div>
								</td>
								<td>
									{theme6DesSl}
								</td>
								<td>
									{
										isButton && <button className="try-button">{theme6BtnTitle}</button>
									}
								</td>
							</tr>
						</tbody>
					</table>
				</div>

			</>

		case 'theme7':
			return <>
				<div className="glass-card">
					<div className="glass-content">
						<div className="icon-sphere">
							<div className="icon-satellite">
								{
									"select" === setIconUpload && <>{theme7IconEl}</>
								}
								{
									"upload" === setIconUpload && <>
										<img src={uploadIconUrl} alt="" />
									</>
								}
							</div>
							<div className="orbit">
								<div className="satellite"></div>
								<div className="satellite"></div>
								<div className="satellite"></div>
							</div>
						</div>
						<div className="text-content">
							{theme5TextSl}
							{theme5DesSl}
						</div>
						<div className="hover-line"></div>
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