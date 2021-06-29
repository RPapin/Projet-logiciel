using System.Collections.Generic;
using System.Linq;
using System.Windows;
using System.Windows.Controls;
using System.Data;
using System.Windows.Media;

namespace WpfApp1
{
    /// <summary>
    /// Interaction logic for MainWindow.xaml
    /// </summary>
    public partial class MainWindow : Window
    {

        public MainWindow()
        {
            InitializeComponent();            
            SwitchToMainPanel();
        }

        private void LoadEditForm(int id)
        {
            User user = BDD.GetUserById(id);
            TextBoxEditLastName.Text = user.LastName;
            TextBoxEditFirstName.Text = user.FirstName;
            TextBoxEditSponsorship.Text = user.Sponsorship;
            TextBoxEditRole.Text = user.Role;
            TextBoxEditPhoneNumber.Text = user.PhoneNumber;
            TextBoxEditEmail.Text = user.Email;
            PasswordBoxEditPassword.Password = user.Password;
            PasswordBoxEditConfirmPassword.Password = user.Password;
            
        }
        private void ClearAddForm()
        {
            IEnumerable<TextBox> textBoxCollection = AddGrid.Children.OfType<TextBox>();
            foreach (TextBox textBox in textBoxCollection)
            {
                textBox.Text = "";
            }
            EmailError.Visibility = Visibility.Hidden;

            IEnumerable<PasswordBox> passwordBoxCollection = AddGrid.Children.OfType<PasswordBox>();
            foreach (PasswordBox passwordBox in passwordBoxCollection)
            {
                passwordBox.Password = "";
            }
            PasswordError.Visibility = Visibility.Hidden;

            // Set backgrounds to White
            TextBoxLastName.Background = Brushes.White;
            TextBoxFirstName.Background = Brushes.White;
            TextBoxPhoneNumber.Background = Brushes.White;
            TextBoxEmail.Background = Brushes.White;
            TextBoxRole.Background = Brushes.White;
            PasswordBoxPassword.Background = Brushes.White;
        }

        private void ClearEditForm()
        {
            EditEmailError.Visibility = Visibility.Hidden;
            EditPasswordError.Visibility = Visibility.Hidden;

            // Set backgrounds to White
            TextBoxEditLastName.Background = Brushes.White;
            TextBoxEditFirstName.Background = Brushes.White;
            TextBoxEditPhoneNumber.Background = Brushes.White;
            TextBoxEditEmail.Background = Brushes.White;
            TextBoxEditRole.Background = Brushes.White;
            PasswordBoxEditPassword.Background = Brushes.White;
        }

        private void LoadUserList()
        {
            List<User> info = BDD.GetAllUsers();
            MainData.ItemsSource = info;
        }

        private void SwitchToMainPanel()
        {
            LoadUserList();
            MainPanel.Visibility = Visibility.Visible;
            AddPanel.Visibility = Visibility.Hidden;
            EditPanel.Visibility = Visibility.Hidden;
        }

        private void SwitchToAddPanel()
        {
            MainPanel.Visibility = Visibility.Hidden;
            AddPanel.Visibility = Visibility.Visible;
            EditPanel.Visibility = Visibility.Hidden;
        }

        private void SwitchToEditPanel()
        {
            MainPanel.Visibility = Visibility.Hidden;
            AddPanel.Visibility = Visibility.Hidden;
            EditPanel.Visibility = Visibility.Visible;
        }

        private void MainData_SelectionChanged(object sender, SelectionChangedEventArgs e)
        {

        }

        private void AddButton_Click(object sender, RoutedEventArgs e)
        {
            ClearAddForm();
            SwitchToAddPanel();
        }

        private void DeleteButton_Click(object sender, RoutedEventArgs e)
        {
            if (MainData.SelectedItems.Count == 0)
            {
                System.Windows.MessageBox.Show("Veuillez sélectionner une ou plusieurs lignes", "Erreur");
                return;
            }

            MessageBoxResult result = System.Windows.MessageBox.Show("Êtes-vous sûr de vouloir supprimer ce ou ces utilisateur(s)", "Confirmation", System.Windows.MessageBoxButton.YesNo);
            if (result == MessageBoxResult.No)
            {
                return;
            }

            List<User> usersToRemove = MainData.SelectedItems.Cast<User>().ToList();

            foreach (User user in usersToRemove)
            {
                BDD.DeleteUser(user);
            }

            LoadUserList();
        }

        private void EditButton_Click(object sender, RoutedEventArgs e)
        {
            if (MainData.SelectedItems.Count != 1)
            {
                System.Windows.MessageBox.Show("Veuillez sélectionner une seule ligne", "Information");
                return;
            }

            User user = (User)MainData.SelectedItem;
            LoadEditForm(user.Id);
            SwitchToEditPanel();
        }

        private void CancelButton_Click(object sender, RoutedEventArgs e)
        {
            SwitchToMainPanel();
            ClearAddForm();
        }

        private bool CheckAddForm()
        {
            bool isValid = true;
            isValid &= CheckAddFormMissingFields();
            isValid &= CheckAddFormErrors();
            return isValid;
        }

        private bool CheckAddFormMissingFields()
        {
            bool isValid = true;
            List<TextBox> requiredTextBoxFields = new List<TextBox>()
            {
                TextBoxLastName, TextBoxFirstName, TextBoxRole,
                TextBoxPhoneNumber, TextBoxEmail,
            };

            foreach (TextBox textBox in requiredTextBoxFields)
            {
                if (textBox.Text.Trim() == "")
                {
                    isValid = false;
                    textBox.Background = Brushes.Red;
                    // Show error? (outline field in red?)
                } else
                {
                    textBox.Background = Brushes.White;
                }
            }

            if (PasswordBoxPassword.Password.Trim() == "")
            {
                isValid = false;
                PasswordBoxPassword.Background = Brushes.Red;
                // Show error? (outline field in red?)
            } else
            {
                PasswordBoxPassword.Background = Brushes.White;
            }

            return isValid;
        }

        private bool CheckAddFormErrors()
        {
            bool isValid = true;
            string password = PasswordBoxPassword.Password;
            string confirmPassword = PasswordBoxConfirmPassword.Password;
            if (password != confirmPassword)
            {
                PasswordError.Visibility = Visibility.Visible;
                isValid = false;
            }
            else
            {
                PasswordError.Visibility = Visibility.Hidden;
            }

            string email = TextBoxEmail.Text;
            if (!Validations.isEmailValid(email))
            {
                EmailError.Visibility = Visibility.Visible;
                isValid = false;
            }
            else
            {
                EmailError.Visibility = Visibility.Hidden;
            }

            return isValid;
        }

        private bool CheckEditForm()
        {
            bool isValid = true;
            isValid &= CheckEditFormMissingFields();
            isValid &= CheckEditFormErrors();
            return isValid;
        }

        private bool CheckEditFormMissingFields()
        {
            bool isValid = true;
            List<TextBox> requiredTextBoxFields = new List<TextBox>()
            {
                TextBoxEditLastName, TextBoxEditFirstName, TextBoxEditRole,
                TextBoxEditPhoneNumber, TextBoxEditEmail,
            };

            foreach (TextBox textBox in requiredTextBoxFields)
            {
                if (textBox.Text.Trim() == "")
                {
                    isValid = false;
                    textBox.Background = Brushes.Red;
                    // Show error? (outline field in red?)
                } else
                {
                    textBox.Background = Brushes.White;
                }
            }

            if (PasswordBoxEditPassword.Password.Trim() == "")
            {
                isValid = false;
                PasswordBoxEditPassword.Background = Brushes.Red;
                // Show error? (outline field in red?)
            } else
            {
                PasswordBoxPassword.Background = Brushes.White;
            }

            return isValid;
        }

        private bool CheckEditFormErrors()
        {
            bool isValid = true;
            string password = PasswordBoxEditPassword.Password;
            string confirmPassword = PasswordBoxEditConfirmPassword.Password;
            if (password != confirmPassword)
            {
                EditPasswordError.Visibility = Visibility.Visible;
                isValid = false;
            }
            else
            {
                EditPasswordError.Visibility = Visibility.Hidden;
            }

            string email = TextBoxEditEmail.Text;
            if (!Validations.isEmailValid(email))
            {
                EditEmailError.Visibility = Visibility.Visible;
                isValid = false;
            }
            else
            {
                EditEmailError.Visibility = Visibility.Hidden;
            }

            return isValid;
        }

        private void ConfirmButton_Click(object sender, RoutedEventArgs e)
        {
            if (!CheckAddForm())
            {
                EmailAlreadyInUseError.Visibility = Visibility.Hidden;
                return;
            }

            Dictionary<string, string> userData = new Dictionary<string, string>();

            userData["id"] = "-1";
            userData["lastName"] = TextBoxLastName.Text;
            userData["firstName"] = TextBoxFirstName.Text;
            userData["sponsorship"] = TextBoxSponsorship.Text;
            userData["role"] = TextBoxRole.Text;
            userData["phoneNumber"] = TextBoxPhoneNumber.Text;
            userData["email"] = TextBoxEmail.Text;
            userData["password"] = PasswordBoxPassword.Password;

            User userToInsert = new User(userData);

            if (!BDD.IsUserUnique(userToInsert))
            {
                // Display error -> user is not unique
                EmailAlreadyInUseError.Visibility = Visibility.Visible;
                return;
            }

            BDD.InsertUser(userToInsert);

            SwitchToMainPanel();
        }

        private void EditConfirmButton_Click(object sender, RoutedEventArgs e)
        {
            if (!CheckEditForm())
            {
                EditEmailAlreadyInUseError.Visibility = Visibility.Hidden;
                return;
            }

            Dictionary<string, string> userData = new Dictionary<string, string>();

            userData["id"] = ((User)MainData.SelectedItem).Id.ToString();
            userData["lastName"] = TextBoxEditLastName.Text;
            userData["firstName"] = TextBoxEditFirstName.Text;
            userData["sponsorship"] = TextBoxEditSponsorship.Text;
            userData["role"] = TextBoxEditRole.Text;
            userData["phoneNumber"] = TextBoxEditPhoneNumber.Text;
            userData["email"] = TextBoxEditEmail.Text;
            userData["password"] = PasswordBoxEditPassword.Password;

            User updatedUser = new User(userData);

            if (!BDD.IsUserUnique(updatedUser))
            {
                // Display error -> user is not unique
                EditEmailAlreadyInUseError.Visibility = Visibility.Visible;
                return;
            }

            BDD.EditUser(updatedUser);

            SwitchToMainPanel();
            ClearEditForm();
        }

        private void EditCancelButton_Click(object sender, RoutedEventArgs e)
        {
            SwitchToMainPanel();
            ClearEditForm();
        }

        private void TextBoxEmail_TextChanged(object sender, TextChangedEventArgs e)
        {
            TextBoxEmail.Background = Brushes.White;
            EmailAlreadyInUseError.Visibility = Visibility.Hidden;

            string email = TextBoxEmail.Text;
            if (!Validations.isEmailValid(email))
            {
                EmailError.Visibility = Visibility.Visible;
            } else
            {
                EmailError.Visibility = Visibility.Hidden;
            }
        }

        private void TextBoxEditEmail_TextChanged(object sender, TextChangedEventArgs e)
        {
            TextBoxEditEmail.Background = Brushes.White;
            EditEmailAlreadyInUseError.Visibility = Visibility.Hidden;

            string email = TextBoxEditEmail.Text;
            if (!Validations.isEmailValid(email))
            {
                EditEmailError.Visibility = Visibility.Visible;
            }
            else
            {
                EditEmailError.Visibility = Visibility.Hidden;
            }
        }

        private void TextBoxLastName_TextChanged(object sender, TextChangedEventArgs e)
        {
            TextBoxLastName.Background = Brushes.White;
        }

        private void TextBoxFirstName_TextChanged(object sender, TextChangedEventArgs e)
        {
            TextBoxFirstName.Background = Brushes.White;
        }

        private void TextBoxPhoneNumber_TextChanged(object sender, TextChangedEventArgs e)
        {
            TextBoxPhoneNumber.Background = Brushes.White;
        }

        private void TextBoxSponsorship_TextChanged(object sender, TextChangedEventArgs e)
        {
        }

        private void TextBoxRole_TextChanged(object sender, TextChangedEventArgs e)
        {
            TextBoxRole.Background = Brushes.White;
        }

        private void PasswordBoxPassword_Changed(object sender, RoutedEventArgs e)
        {
            PasswordBoxPassword.Background = Brushes.White;
        }

        private void TextBoxEditLastName_TextChanged(object sender, TextChangedEventArgs e)
        {
            TextBoxEditLastName.Background = Brushes.White;
        }

        private void TextBoxEditFirstName_TextChanged(object sender, TextChangedEventArgs e)
        {
            TextBoxEditFirstName.Background = Brushes.White;
        }

        private void TextBoxEditPhoneNumber_TextChanged(object sender, TextChangedEventArgs e)
        {
            TextBoxEditPhoneNumber.Background = Brushes.White;
        }

        private void TextBoxEditSponsorship_TextChanged(object sender, TextChangedEventArgs e)
        {

        }

        private void TextBoxEditRole_TextChanged(object sender, TextChangedEventArgs e)
        {
            TextBoxEditRole.Background = Brushes.White;
        }

        private void PasswordBoxEditPassword_Changed(object sender, RoutedEventArgs e)
        {
            PasswordBoxEditPassword.Background = Brushes.White;
        }
    }
}