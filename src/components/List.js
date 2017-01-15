/**
 * Created by 5820k on 2017/1/15.
 */
import React from 'react'

const List = ({list}) => {
	const using = list[0]
	const renderList = () => {
		return list.map((v, index) => {
			if (index !== 0) {
				return <li key={index}>{v}</li>
			}
		})
	}
	return (
		<div>
			{using ? <p>{using}正在使用中</p> : <p>当前无人在使用</p>}
			{list[1] && <p>排队中：</p>}
			<ol>
				{renderList()}
			</ol>
		</div>
	)
}

export default List