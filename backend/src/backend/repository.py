import pymysql

from backend import db_utils


def get_all_users():

    print("Repository: Fetching approved users")

    connection = db_utils.get_db_connection()

    try:
        cursor = connection.cursor()

        cursor.execute("""
            SELECT *
            FROM users
            WHERE status = 'APPROVED'
        """)

        users = cursor.fetchall()

        return users

    finally:
        connection.close()
        print("Repository: Connection closed")


def create_user(user_data):

    print("Repository: Creating user")

    connection = db_utils.get_db_connection()

    try:
        cursor = connection.cursor()

        sql = """
        INSERT INTO users
        (
            user_id,
            email,
            full_name,
            graduation_year,
            program,
            linkedin_url,
            skills,
            bio,
            role,
            status
        )
        VALUES
        (
            %(user_id)s,
            %(email)s,
            %(full_name)s,
            %(graduation_year)s,
            %(program)s,
            %(linkedin_url)s,
            %(skills)s,
            %(bio)s,
            %(role)s,
            %(status)s
        )
        """

        try:
            cursor.execute(sql, user_data)

            connection.commit()

            print("Repository: User inserted")

        except pymysql.IntegrityError:

            print("Repository: Duplicate email")

            raise

    finally:
        connection.close()
        print("Repository: Connection closed")


def approve_user(user_id):

    print("Repository: Approving user")

    connection = db_utils.get_db_connection()

    try:
        cursor = connection.cursor()

        sql = """
        UPDATE users
        SET status = 'APPROVED'
        WHERE user_id = %(user_id)s
        """

        cursor.execute(
            sql,
            {
                "user_id": user_id
            }
        )

        connection.commit()

        rows_updated = cursor.rowcount

        print("Repository: User approved")

        return rows_updated

    finally:
        connection.close()
        print("Repository: Connection closed")