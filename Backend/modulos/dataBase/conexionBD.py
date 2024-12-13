
#Importando Libreria mysql.connector para conectar Python con MySQL
#0Kh6wZtpBSbguvnPf4zUELc@@@
import mysql.connector
import os

def connectionBD():
    mydb = mysql.connector.connect(
        host ='localhost', #os.getenv('DB_HOST_AGENDADOR'),
        user ='root',#os.getenv('DB_USER'),
        passwd ='', #os.getenv('DB_PASSWORD_AGENDADOR'),
        database ='crud_clientes',#os.getenv('DB_NAME_AGENDADOR')
        )
    if mydb:
        print ("Conexion exitosa a BD")
        return mydb
    else:
        print("Error en la conexion a BD")
    

    
connectionBD()

