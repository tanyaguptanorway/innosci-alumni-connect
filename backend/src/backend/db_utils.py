from backend import database


def get_db_connection():

    print("DB Utils: Opening connection")

    return database.get_connection()