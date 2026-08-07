import json
import logging
from typing import Dict, List, Set
from fastapi import WebSocket

logger = logging.getLogger("compliance_copilot.websockets")

class ConnectionManager:
    """
    WebSocket Connection Manager
    Broadcasts real-time AI agent execution state transitions and job events to subscribed clients.
    """

    def __init__(self):
        self.active_connections: Dict[str, Set[WebSocket]] = {}

    async def connect(self, client_id: str, websocket: WebSocket):
        await websocket.accept()
        if client_id not in self.active_connections:
            self.active_connections[client_id] = set()
        self.active_connections[client_id].add(websocket)
        logger.info(f"WebSocket client connected: {client_id}")

    def disconnect(self, client_id: str, websocket: WebSocket):
        if client_id in self.active_connections:
            self.active_connections[client_id].discard(websocket)
            if not self.active_connections[client_id]:
                del self.active_connections[client_id]
        logger.info(f"WebSocket client disconnected: {client_id}")

    async def broadcast_job_event(self, client_id: str, event_type: str, payload: dict):
        message = json.dumps({
            "event": event_type,
            "data": payload
        })

        if client_id in self.active_connections:
            dead_sockets = set()
            for ws in self.active_connections[client_id]:
                try:
                    await ws.send_text(message)
                except Exception as e:
                    logger.warning(f"Error sending WS message to {client_id}: {e}")
                    dead_sockets.add(ws)

            for ws in dead_sockets:
                self.active_connections[client_id].discard(ws)

manager = ConnectionManager()
