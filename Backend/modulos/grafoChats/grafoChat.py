# grafoChat.py
from openai import OpenAI
import json
import modulos.idActual as idActual

grafoChats = {}

class grafoChat:
    def __init__(self, id, available_functions, lista_de_tools, lista_de_mensajes, prompt):
        global grafoChats 
        self.id = id
        self.available_functions = available_functions
        self.lista_de_tools = lista_de_tools
        self.lista_de_mensajes = lista_de_mensajes
        self.prompt = prompt
        grafoChats[id] = self

    def update_lista_de_mensajes(self):
        lista_de_mensajes = idActual.global_msgs
        lista_de_mensajes_filtrada = []
        validRoles = ["system", "user", "assistant"]
        for mensaje in lista_de_mensajes:
            try:
                if mensaje["role"] in validRoles:
                    lista_de_mensajes_filtrada.append(mensaje)
            except:
                pass
        self.lista_de_mensajes = lista_de_mensajes_filtrada
        self.lista_de_mensajes[0] = {"role":"system", "content":self.prompt}

    def run_conversation(self):
        if idActual.global_id != self.id:
            print(f"DISONANCIA entre {idActual.global_id} y {self.id}")
            grafoChats[idActual.global_id].update_lista_de_mensajes()
            return grafoChats[idActual.global_id].run_conversation()
        
        client = OpenAI()
        print(f"En el BOT {self.id}")
        self.update_lista_de_mensajes()
        messages = self.lista_de_mensajes
        response = client.chat.completions.create(
            model="gpt-3.5-turbo",  # Cambiado a un modelo disponible
            messages=messages,
            tools=self.lista_de_tools,
            tool_choice="auto"
        )
        response_message = response.choices[0].message
        tool_calls = response_message.tool_calls
        
        if tool_calls:
            messages.append(response_message)
            for tool_call in tool_calls:
                function_name = tool_call.function.name
                function_to_call = self.available_functions[function_name]
                function_args = json.loads(tool_call.function.arguments)
                function_response = function_to_call(
                    function_args.get("state", "next")
                )
                messages.append(
                    {
                        "tool_call_id": tool_call.id,
                        "role": "tool",
                        "name": function_name,
                        "content": function_response,
                    }
                )
            second_response = client.chat.completions.create(
                model="gpt-3.5-turbo",  # Cambiado aquí también
                messages=messages,
            )
            return second_response.choices[0].message.content
        
        return response_message.content