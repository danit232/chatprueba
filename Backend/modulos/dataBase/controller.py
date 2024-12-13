import json
from modulos.dataBase.data_storage import data_storage_instance

def listarDatos():
    return data_storage_instance.get_clients()

def registrarEntrada(datos_cliente_json):
    datos_cliente = json.loads(datos_cliente_json)
    
    # Convertir empleados a entero si es posible
    empleados = datos_cliente.get('empleados', '')
    try:
        empleados = int(empleados)
    except (ValueError, TypeError):
        empleados = 0
    
    valores = {
        'nombre': datos_cliente.get('nombre', ''),
        'apellido': datos_cliente.get('apellido', ''),
        'celular': datos_cliente.get('celular', ''),
        'correo': datos_cliente.get('correo', ''),
        'empresa': datos_cliente.get('empresa', ''),
        'cargo': datos_cliente.get('cargo', ''),
        'empleados': empleados,  # Ahora es un número
    }
    
    ultimo_id = data_storage_instance.add_client(valores)
    resultado_insert = 1 if ultimo_id else 0
    
    print("Push exitoso")
    print(listarDatos())
    
    return resultado_insert, ultimo_id

def verificarExistencia(data):
    try:
        data = json.loads(data)
        
        if not data or len(data) != 1:
            print("Datos inválidos. Se requiere un diccionario con un solo par clave-valor.")
            return False
        
        column_name, value = next(iter(data.items()))
        
        # Buscar en la lista de clientes
        return any(
            client.get(column_name) == value 
            for client in data_storage_instance.get_clients()
        )
        
    except json.JSONDecodeError:
        print("Error al decodificar JSON")
        return False
    except Exception as e:
        print(f"Error: {str(e)}")
        return False

def obtener_datos_temporales():
    """
    Retorna los datos del cliente más reciente.
    """
    clients = data_storage_instance.get_clients()
    if clients:
        latest_client = clients[0]  # Obtiene el cliente más reciente
        print("Datos recuperados:", latest_client)  # Log para debugging
        return latest_client
    print("No hay datos de clientes")  # Log para debugging
    return {}