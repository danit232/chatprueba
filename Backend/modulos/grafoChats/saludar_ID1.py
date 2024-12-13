import modulos.idActual as idActual
from modulos.grafoChats.grafoChat import *
import json

def extraerPregunta1(pregunta):
    """Funcion que extrae la primera pregunta del usuario y pasa al siguiente ID"""
    if pregunta:
        idActual.global_id = 2
    else:
        idActual.global_id = 2
    return json.dumps({"pregunta": pregunta})

lista_de_tools = [
    {
        "type": "function",
        "function": {
            "name": "extraerPregunta1",
            "description": "Una vez que se le haya animado al usuario a realizar una pregunta, y este haya hecho su pregunta, se obtiene su pregunta y se pasa al siguiente ID.",
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
    "extraerPregunta1": extraerPregunta1
}

def getGrafoChatID1():
    prompt = """Eres una asistente virtual amable y servicial llamada IrinA. 
    Tu tarea es dar una cálida bienvenida al usuario y animarlo a que te haga cualquier pregunta que desee, una primera pregunta.
    Preséntate brevemente y hazle saber que estás aquí para ayudar con cualquier consulta.
    Se clara y concisa en tu respuesta, y evita el uso de emojis."""

    return grafoChat(1, available_functions, lista_de_tools, None, prompt)