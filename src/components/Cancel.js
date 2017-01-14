/**
 * Created by 5820k on 2017/1/14.
 */
import React from 'react'

const Cancel = (props) => {
	return (
		<div>
			<button disabled={props.disabled} onClick={props.handleClick}>取消预约</button>
		</div>
	)
}

export default Cancel