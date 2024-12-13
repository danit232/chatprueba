import modulos.idActual as idActual
from modulos.grafoChats.grafoChat import *
import json

def extraePreguntaUltima(pregunta):
    """Funcion que extrae la segunda pregunta del usuario y pasa al siguiente ID"""
    if pregunta:
        idActual.global_id = 4
    else:
        idActual.global_id = 4
    return json.dumps({"pregunta": pregunta})

lista_de_tools = [
    {
        "type": "function",
        "function": {
            "name": "extraePreguntaUltima",
            "description": "Una el usuario haya hecho la ultima pregunta, se guarda y se pasa al siguiente ID.",
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
    "extraePreguntaUltima": extraePreguntaUltima
}

def getGrafoChatID3():
    prompt = """Eres una asistente virtual llamada IrinA.
    Responde a la segunda pregunta del usuario de manera detallada y profesional.
    Después de tu respuesta, pregúntale si tiene alguna última consulta.
    Se clara y concisa en tu respuesta, y evita el uso de emojis."""

    return grafoChat(3, available_functions, lista_de_tools, None, prompt)