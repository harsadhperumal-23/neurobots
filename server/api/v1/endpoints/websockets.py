from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from server.websockets.manager import manager

router = APIRouter()

@router.websocket("/ws/{client_id}")
async def websocket_endpoint(websocket: WebSocket, client_id: str):
    await manager.connect(client_id, websocket)
    try:
        while True:
            data = await websocket.receive_text()
            # Echo ping / keepalive
            await websocket.send_text(f'{{"event": "pong", "data": "{data}"}}')
    except WebSocketDisconnect:
        manager.disconnect(client_id, websocket)
