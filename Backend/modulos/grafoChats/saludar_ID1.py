import modulos.idActual as idActual
from modulos.grafoChats.grafoChat import *
import json

def nextState(state):
    """Simple function to move to next state"""
    idActual.global_id = 2
    return json.dumps({"next": state})

lista_de_tools = [
    {
        "type": "function",
        "function": {
            "name": "nextState",
            "description": "Moves to next state after greeting",
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

def getGrafoChatID1():
    prompt = """Eres una asistente virtual amable y servicial llamada IrinA. 
    Tu tarea es dar una cálida bienvenida al usuario y animarlo a que te haga cualquier pregunta que desee.
    Preséntate brevemente y hazle saber que estás aquí para ayudar con cualquier consulta.
    Se clara y concisa en tu respuesta, y evita el uso de emojis."""

    return grafoChat(1, available_functions, lista_de_tools, None, prompt)