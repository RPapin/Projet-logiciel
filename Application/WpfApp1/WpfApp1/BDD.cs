using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;

namespace WpfApp1
{

    public static class SqlHelper
    {
        public static string GetValueAsString(this SqlDataReader reader, string columnName)
        {
            object val = reader[columnName];

            if (val == DBNull.Value)
            {
                return "";
            }

            return val.ToString();
        }
    }
    public class User
    {
        private int id;
        private string lastName;
        private string firstName;
        private string sponsorship;
        private string role;
        private string phoneNumber;
        private string email;
        private string password;
        public User(int id, string lastName, string firstName, string sponsorship, string role, string phoneNumber, string email, string password)
        {
            this.id = id;
            this.lastName = lastName;
            this.firstName = firstName;
            this.sponsorship = sponsorship == "" ? "NULL" : sponsorship;
            this.role = role;
            this.phoneNumber = phoneNumber;
            this.email = email;
            this.password = password;
        }

        public User(Dictionary<string, string> data)
        {
            this.id = Int32.Parse(data["id"]);
            this.lastName = data["lastName"];
            this.firstName = data["firstName"];
            this.sponsorship = data["sponsorship"] == "" ? "NULL" : data["sponsorship"];
            this.role = data["role"];
            this.phoneNumber = data["phoneNumber"];
            this.email = data["email"];
            this.password = data["password"];
        }

        public int Id { get => id; set => id = value; }
        public string LastName { get => lastName; set => lastName = value; }
        public string FirstName { get => firstName; set => firstName = value; }
        public string Sponsorship { get => sponsorship; set => sponsorship = value; }
        public string Role { get => role; set => role = value; }
        public string PhoneNumber { get => phoneNumber; set => phoneNumber = value; }
        public string Email { get => email; set => email = value; }
        public string Password { get => password; set => password = value; }
    }

    // TODO: Close?
    static class BDD
    {
        private static string connectionString = ConfigurationManager.ConnectionStrings["DefaultConnectionString"].ConnectionString;

        private static User CreateUserFromReader(SqlDataReader reader)
        {
            Dictionary<string, string> data = new Dictionary<string, string>();

            data["id"] = reader.GetValueAsString("account_id");
            data["lastName"] = reader.GetValueAsString("last_name");
            data["firstName"] = reader.GetValueAsString("first_name");
            data["sponsorship"] = reader.GetValueAsString("sponsorship");
            data["role"] = reader.GetValueAsString("role");
            data["phoneNumber"] = reader.GetValueAsString("phone_number");
            data["email"] = reader.GetValueAsString("email");
            data["password"] = reader.GetValueAsString("password");

            return new User(data);
        }

        public static bool IsUserUnique(User user)
        {
            SqlConnection con = new SqlConnection(connectionString);
            con.Open();

            SqlCommand cmd;
            SqlDataReader reader;
            string sql = "Select Count(*) from Account where email = '" + user.Email + "' AND account_id != " + user.Id;

            cmd = new SqlCommand(sql, con);
            reader = cmd.ExecuteReader();

            reader.Read();
            int userCount = Int32.Parse(reader[0].ToString());

            cmd.Dispose();
            reader.Close();
            con.Close();

            return userCount == 0;
        }

        public static User GetUserById(int id)
        {
            SqlConnection con = new SqlConnection(connectionString);
            con.Open();

            SqlCommand cmd;
            SqlDataReader reader;
            string sql = "Select account_id, last_name, first_name, sponsorship, role_id as role, phone_number, email, password from Account where account_id = " + id;

            cmd = new SqlCommand(sql, con);
            reader = cmd.ExecuteReader();

            reader.Read();
            User user = CreateUserFromReader(reader);

            cmd.Dispose();
            reader.Close();
            con.Close();

            return user;
        }


        public static List<User> GetAllUsers()
        {
            SqlConnection con = new SqlConnection(connectionString);
            con.Open();

            List<User> users = new List<User>();

            SqlCommand cmd;
            SqlDataReader reader;
            string sql = "Select account_id, last_name, first_name, sponsorship, role_name as role, phone_number, email, password from Account a Left JOIN Role r ON a.role_id = r.role_id;";

            cmd = new SqlCommand(sql, con);
            reader = cmd.ExecuteReader();

            while (reader.Read())
            {
                users.Add(CreateUserFromReader(reader));
            }

            cmd.Dispose();
            reader.Close();
            con.Close();

            return users;
        }

        public static void InsertUser(User user)
        {
            SqlConnection con = new SqlConnection(connectionString);
            con.Open();

            string values = String.Format("'{0}', '{1}', '{2}', '{3}', '{4}', {5}, {6}", user.LastName, user.FirstName, user.PhoneNumber, user.Email, user.Password, user.Sponsorship, user.Role);
            string sql = "INSERT INTO Account (last_name, first_name, phone_number, email, password, sponsorship, role_id) VALUES (" + values + ")";

            SqlDataAdapter adapter = new SqlDataAdapter();

            adapter.InsertCommand = new SqlCommand(sql, con);
            adapter.InsertCommand.ExecuteNonQuery();

            adapter.Dispose();
            con.Close();
        }

        public static void EditUser(User user)
        {
            SqlConnection con = new SqlConnection(connectionString);
            con.Open();

            string sql = "UPDATE Account SET last_name = '" + user.LastName + "', first_name = '" + user.FirstName + "', phone_number = '" + user.PhoneNumber + "', " +
                "email = '" + user.Email + "', password = '" + user.Password + "', sponsorship = " + user.Sponsorship + ", role_id = " + user.Role + " where account_id = " + user.Id;

            SqlDataAdapter adapter = new SqlDataAdapter();

            adapter.InsertCommand = new SqlCommand(sql, con);
            adapter.InsertCommand.ExecuteNonQuery();

            adapter.Dispose();
            con.Close();
        }

        public static void DeleteUser(User user)
        {
            SqlConnection con = new SqlConnection(connectionString);
            con.Open();

            string sql = "DELETE FROM Account WHERE account_id = " + user.Id;

            SqlDataAdapter adapter = new SqlDataAdapter();

            adapter.DeleteCommand = new SqlCommand(sql, con);
            adapter.DeleteCommand.ExecuteNonQuery();

            adapter.Dispose();
            con.Close();
        }
    }
}
