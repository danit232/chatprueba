import modulos.idActual as idActual
from modulos.grafoChats.grafoChat import *
import json

def nextState(state):
    """Simple function to move to next state"""
    idActual.global_id = 3
    return json.dumps({"next": state})

lista_de_tools = [
    {
        "type": "function",
        "function": {
            "name": "nextState",
            "description": "Moves to next state after first response",
            "parameters": {
                "type": "object",
                "properties": {
                    "state": {
                        "type": "string",
                        "description": "Next state to move to"
                    },
                },
                "required": ["state"]
            }
        }
    }
]

available_functions = {
    "nextState": nextState
}

def getGrafoChatID2():
    prompt = """Eres una asistente virtual llamada IrinA.
    Responde a la pregunta del usuario de manera clara y detallada.
    Después de tu respuesta, anima al usuario a hacer otra pregunta si lo desea.
    Se clara y concisa en tu respuesta, y evita el uso de emojis."""

    return grafoChat(2, available_functions, lista_de_tools, None, prompt)