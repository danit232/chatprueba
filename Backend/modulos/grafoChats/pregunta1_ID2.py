import modulos.idActual as idActual
from modulos.grafoChats.grafoChat import *
import json

def extraePregunta2(pregunta):
    """Funcion que extrae la segunda pregunta del usuario y pasa al siguiente ID"""
    if pregunta:
        idActual.global_id = 3
    else:
        idActual.global_id = 3
    return json.dumps({"pregunta": pregunta})

lista_de_tools = [
    {
        "type": "function",
        "function": {
            "name": "extraePregunta2",
            "description": "Una el usuario haya hecho la segunda pregunta, se guarda y se pasa al siguiente ID.",
            "parameters": {
                "type": "object",
                "properties": {
                    "pregunta": {
                        "type": "string",
                        "description": "Pregunta del usuario"
                    },
                },
                "required": ["pregunta"]
            }
        }
    }
]

available_functions = {
    "extraePregunta2": extraePregunta2
}

def getGrafoChatID2():
    prompt = """Eres una asistente virtual llamada IrinA.
    Responde a la primera pregunta del usuario de manera clara y detallada.
    Después de tu respuesta, anima al usuario a hacer otra segunda pregunta si lo desea.
    Se clara y concisa en tu respuesta, y evita el uso de emojis."""

    return grafoChat(2, available_functions, lista_de_tools, None, prompt)