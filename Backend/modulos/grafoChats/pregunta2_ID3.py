import modulos.idActual as idActual
from modulos.grafoChats.grafoChat import *
import json

def nextState(state):
    """Simple function to move to next state"""
    idActual.global_id = 4
    return json.dumps({"next": state})

lista_de_tools = [
    {
        "type": "function",
        "function": {
            "name": "nextState",
            "description": "Moves to next state after second response",
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

def getGrafoChatID3():
    prompt = """Eres una asistente virtual llamada IrinA.
    Responde a la segunda pregunta del usuario de manera detallada y profesional.
    Después de tu respuesta, pregúntale si tiene alguna última consulta.
    Se clara y concisa en tu respuesta, y evita el uso de emojis."""

    return grafoChat(3, available_functions, lista_de_tools, None, prompt)