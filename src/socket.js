/**
 * Author：Yky
 * Create Date：2017/3/2
 * Modified By：Yky
 * Why & What is modified  <修改原因描述>
 * <文件描述>
 */
import io from 'socket.io-client'
import {URL, PORT} from './constants'

export const socket = io(`ws;//${URL}:${PORT}`)