/**
 * Created by 5820k on 2017/1/15.
 */
import React from 'react'

const List = ({list}) => {
	const renderList = () => {
		return list.map((v, index) => (<li key={index}>{v}</li>))
	}
	return (
		<ol>
			{renderList()}
		</ol>
	)
}

export default List