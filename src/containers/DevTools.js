/**
 * Created by 5820k on 2017/1/14.
 */
import React from 'react';
import {createDevTools} from 'redux-devtools';
import LogMonitor from 'redux-devtools-log-monitor';
import DockMonitor from 'redux-devtools-dock-monitor';

export default createDevTools(
	<DockMonitor toggleVisibilityKey='ctrl-h'
	             changePositionKey='ctrl-q'>
		<LogMonitor />
	</DockMonitor>
);