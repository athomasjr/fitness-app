import { Button, Icon, SemanticCOLORS, SemanticSIZES } from 'semantic-ui-react'
import { IconSizeProp } from 'semantic-ui-react/dist/commonjs/elements/Icon/Icon'

export interface IAddWeightProps {
	onClick: any
	iconSize?: IconSizeProp | undefined
	buttonSize?: SemanticSIZES | undefined
	buttonColor?:
		| SemanticCOLORS
		| 'facebook'
		| 'google plus'
		| 'vk'
		| 'twitter'
		| 'linkedin'
		| 'instagram'
		| 'youtube'
		| undefined
}

export default function AddWeight({
	onClick,
	iconSize,
	buttonSize,
	buttonColor,
}: IAddWeightProps) {
	return (
		<>
			<Button
				animated='vertical'
				basic
				color={buttonColor}
				onClick={onClick}
				size={buttonSize}
			>
				<Button.Content hidden>Weight</Button.Content>
				<Button.Content visible>
					<Icon name='weight' size={iconSize} />
				</Button.Content>
			</Button>
		</>
	)
}
