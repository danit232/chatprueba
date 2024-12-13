
class DataStorage:
    def __init__(self):
        self.data = {}
        self.clients = []
        self._last_id = 0

    def add_data(self, key, value):
        self.data[key] = value

    def get_data(self):
        return self.data

    def clear_data(self):
        self.data = {}
        
    def get_clients(self):
        return sorted(self.clients, key=lambda x: x.get('nombre', ''), reverse=True)
        
    def add_client(self, client_data):
        self._last_id += 1
        client_data['id'] = self._last_id
        self.clients.append(client_data)
        return self._last_id

data_storage_instance = DataStorage()
