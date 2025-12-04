export const ACCESO_SQL = {
  DATOS_SESION:
    "SELECT u.id_user, u.name_user, \
    (SELECT name_rol FROM roles WHERE id_rol= u.id_rol_user) AS name_rol, a.name_acces \
    FROM acces a INNER JOIN users u ON u.id_user=a.id_user WHERE a.id_user=$1",
}
