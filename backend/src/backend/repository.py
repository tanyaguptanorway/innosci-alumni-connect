import pymysql

from backend import db_utils


def get_all_users(
    search=None,
    company=None,
    graduation_year=None,
    program=None,
    skill=None
):

    print("Repository: Fetching filtered users")

    connection = db_utils.get_db_connection()

    try:
        cursor = connection.cursor()

        sql = """
        SELECT *
        FROM users
        WHERE status = 'APPROVED'
        """

        params = []

        if search:
            sql += """
            AND (
                full_name LIKE %s
                OR email LIKE %s
            )
            """
            params.extend([
                f"%{search}%",
                f"%{search}%"
            ])

        if company:
            sql += """
            AND company LIKE %s
            """
            params.append(f"%{company}%")

        if graduation_year:
            sql += """
            AND graduation_year = %s
            """
            params.append(graduation_year)

        if program:
            sql += """
            AND program LIKE %s
            """
            params.append(f"%{program}%")

        if skill:
            sql += """
            AND skills LIKE %s
            """
            params.append(f"%{skill}%")

        cursor.execute(
            sql,
            params
        )

        return cursor.fetchall()

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

def get_user_by_cognito_sub(cognito_sub):

    connection = db_utils.get_db_connection()

    try:
        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT *
            FROM users
            WHERE cognito_sub = %(cognito_sub)s
            """,
            {
                "cognito_sub": cognito_sub
            }
        )

        return cursor.fetchone()

    finally:
        connection.close()

def update_user(cognito_sub, user_data):

    print("Repository: Updating user")

    connection = db_utils.get_db_connection()

    try:
        cursor = connection.cursor()

        fields = []
        values = {}

        for key, value in user_data.items():
            if value is not None:
                fields.append(f"{key} = %({key})s")
                values[key] = value

        if not fields:
            return

        values["cognito_sub"] = cognito_sub

        sql = f"""
        UPDATE users
        SET {", ".join(fields)}
        WHERE cognito_sub = %(cognito_sub)s
        """

        cursor.execute(sql, values)

        connection.commit()

    finally:
        connection.close()

def get_user_by_id(user_id):

    print("Repository: Fetching user by id")

    connection = db_utils.get_db_connection()

    try:
        cursor = connection.cursor()

        cursor.execute(
            """
            SELECT *
            FROM users
            WHERE user_id = %s
            AND status = 'APPROVED'
            """,
            (user_id,)
        )

        user = cursor.fetchone()

        return user

    finally:
        connection.close()
        print("Repository: Connection closed")

def get_pending_users():

    print("Repository: Fetching pending users")

    connection = db_utils.get_db_connection()

    try:
        cursor = connection.cursor()

        cursor.execute("""
            SELECT *
            FROM users
            WHERE status = 'PENDING'
        """)

        return cursor.fetchall()

    finally:
        connection.close()
        print("Repository: Connection closed")

def reject_user(user_id):

    print("Repository: Rejecting user")

    connection = db_utils.get_db_connection()

    try:
        cursor = connection.cursor()

        sql = """
        UPDATE users
        SET status = 'REJECTED'
        WHERE user_id = %(user_id)s
        """

        cursor.execute(
            sql,
            {
                "user_id": user_id
            }
        )

        connection.commit()

        return cursor.rowcount

    finally:
        connection.close()
        print("Repository: Connection closed")

def get_admin_stats():

    print("Repository: Getting admin stats")

    connection = db_utils.get_db_connection()

    try:
        cursor = connection.cursor()

        cursor.execute("""
            SELECT
                COUNT(*) AS total_users,
                SUM(status='APPROVED') AS approved_users,
                SUM(status='PENDING') AS pending_users,
                SUM(status='REJECTED') AS rejected_users,
                SUM(role='ADMIN') AS admins
            FROM users
        """)

        return cursor.fetchone()

    finally:
        connection.close()
        print("Repository: Connection closed")

def get_spotlights():

    print("Repository: Fetching spotlight stories")

    connection = db_utils.get_db_connection()

    try:
        cursor = connection.cursor()

        cursor.execute("""
            SELECT
                slide_id,
                title,
                alumni_name,
                summary,
                image_url,
                podcast_url
            FROM spotlight
            ORDER BY sort_order
            LIMIT 5
        """)

        return cursor.fetchall()

    finally:
        connection.close()
        print("Repository: Connection closed")


def create_spotlight(spotlight_data):

    print("Repository: Creating spotlight")

    connection = db_utils.get_db_connection()

    try:
        cursor = connection.cursor()

        sql = """
        INSERT INTO spotlight
        (
            title,
            alumni_name,
            summary,
            image_url,
            podcast_url,
            sort_order
        )
        VALUES
        (
            %(title)s,
            %(alumni_name)s,
            %(summary)s,
            %(image_url)s,
            %(podcast_url)s,
            %(sort_order)s
        )
        """

        cursor.execute(sql, spotlight_data)

        connection.commit()

        return cursor.lastrowid

    finally:
        connection.close()
        print("Repository: Connection closed")


def update_spotlight(slide_id, spotlight_data):

    print("Repository: Updating spotlight")

    connection = db_utils.get_db_connection()

    try:
        cursor = connection.cursor()

        sql = """
        UPDATE spotlight
        SET
            title = %(title)s,
            alumni_name = %(alumni_name)s,
            summary = %(summary)s,
            image_url = %(image_url)s,
            podcast_url = %(podcast_url)s,
            sort_order = %(sort_order)s
        WHERE slide_id = %(slide_id)s
        """

        spotlight_data["slide_id"] = slide_id

        cursor.execute(sql, spotlight_data)

        connection.commit()

        return cursor.rowcount

    finally:
        connection.close()
        print("Repository: Connection closed")


def delete_spotlight(slide_id):

    print("Repository: Deleting spotlight")

    connection = db_utils.get_db_connection()

    try:
        cursor = connection.cursor()

        cursor.execute(
            """
            DELETE FROM spotlight
            WHERE slide_id = %(slide_id)s
            """,
            {
                "slide_id": slide_id
            }
        )

        connection.commit()

        return cursor.rowcount

    finally:
        connection.close()
        print("Repository: Connection closed")
