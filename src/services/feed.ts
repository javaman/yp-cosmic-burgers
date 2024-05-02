import { createSlice, createAction, createListenerMiddleware } from '@reduxjs/toolkit';
import { isAnyOf } from '@reduxjs/toolkit';
import { v4 as uuidv4 } from 'uuid';
import { TOrderList, TOrder } from './types';



export const WS_CONNECT: 'WS_CONNECT' = 'WS_CONNECT';
export const WS_DISCONNECT: 'WS_DISCONNECT' = 'WS_DISCONNECT';

const connectFeedAction = createAction<string>(WS_CONNECT);
const disconnectFeedAction = createAction<undefined>(WS_DISCONNECT);

type TWsHolder = { socket: WebSocket | null };
const socketHolder: TWsHolder = {
    socket: null
}


const feedWsSocketActions = isAnyOf(connectFeedAction, disconnectFeedAction);
export const wsSockedMiddleware = createListenerMiddleware({ extra: socketHolder });
wsSockedMiddleware.startListening({
    matcher: feedWsSocketActions,
    effect: (action, { getState, dispatch, extra }) => {
        switch (action.type) {
            case WS_CONNECT:
                if (extra.socket?.readyState === WebSocket.CONNECTING) {
                    return;
                }
                if (extra.socket?.readyState === WebSocket.OPEN) {
                    return;
                }
                if (action.payload) {
                    extra.socket = new WebSocket(action.payload);
                    extra.socket.onopen = event => {
                        dispatch(feedSlice.actions.setSuccess())
                    }
                    extra.socket.onmessage = event => {
                        const parsed: TOrderList = JSON.parse(event.data);
                        dispatch(feedSlice.actions.setOrderList(parsed));
                    }
                }
                break;
            case WS_DISCONNECT:
                if (extra.socket?.readyState === WebSocket.OPEN) {
                    extra.socket?.close();
                    extra.socket = null;
                    dispatch(feedSlice.actions.clearConnectionState());
                }
                break;
        }
    }
});

interface IFeedState {
    wsConnected: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
    error?: Event;
}

const initialState: IFeedState = {
    wsConnected: false,
    orders: [],
    total: 0,
    totalToday: 0
}

const feedSlice = createSlice({
    name: 'feed',
    initialState,
    reducers: {
        setSuccess(state) {
            state.wsConnected = true;
        },
        setOrderList(state, { payload }: { payload: TOrderList }) {
            state.total = payload.total;
            state.totalToday = payload.totalToday;
            const orders: TOrder[] = [...state.orders];
            for (const el of payload.orders) {
                const i = orders.findIndex(e => e._id === el._id);
                if (i >= 0) {
                    orders[i] = { ...el, uid: orders[i].uid };
                } else {
                    orders.push({ ...el, uid: uuidv4() });
                }
            }
            state.orders = [...orders];
        },
        clearConnectionState(state) {
            state.orders = [];
            state.total = 0;
            state.totalToday = 0;
            state.wsConnected = false;
        }
    }
});

export { connectFeedAction, disconnectFeedAction };
export default feedSlice.reducer;

