import modulos.idActual as idActual
from modulos.grafoChats.grafoChat import *
import json

def nextState(state):
    """Simple function to move to next state"""
    idActual.global_id = 1
    return json.dumps({"next": state})

lista_de_tools = [
    {
        "type": "function",
        "function": {
            "name": "nextState",
            "description": "Moves back to initial state",
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

def getGrafoChatID4():
    prompt = """Eres una asistente virtual llamada IrinA.
    Es momento de despedirse. Agradece al usuario por la conversación,
    despídete cordialmente y hazle saber que siempre estás disponible para futuras consultas.
    Se clara y concisa en tu respuesta, y evita el uso de emojis."""

    return grafoChat(4, available_functions, lista_de_tools, None, prompt)