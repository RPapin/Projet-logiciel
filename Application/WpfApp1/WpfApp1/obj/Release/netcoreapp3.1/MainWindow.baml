   M S B A M L   `   `   `  ���� C  ?OrderEAT, Version=1.0.0.0, Culture=neutral, PublicKeyToken=null!clr-namespace:WpfApp1WpfApp1      WpfApp1.MainWindow   \ XPresentationFramework, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35^ ZWindowsFormsIntegration, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35e aSystem.Windows.Controls.Ribbon, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089W SPresentationCore, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35R NWindowsBase, Version=4.0.0.0, Culture=neutral, PublicKeyToken=31bf3856ad364e35H 9http://schemas.microsoft.com/winfx/2006/xaml/presentation      R NSystem.Xaml, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089:x,http://schemas.microsoft.com/winfx/2006/xaml     @d2http://schemas.microsoft.com/expression/blend/2008     Jmc;http://schemas.openxmlformats.org/markup-compatibility/2006     'localclr-namespace:WpfApp1       � Title$  
MainWindow��$	��800��$	��900�� � 
ResizeMode$ NoResize=� � 	Resources    CenterGridHeaderStyle �� 
TargetType=  7System.Windows.Controls.Primitives.DataGridColumnHeader �� Property �� Value��%1   &	        �� "  .���  � ��$ Center=�.���  � ColumnDefinitions �� $
��171* ��� $
��629* �.+��� -    ��Name$ Titre��$��1��$
��Left=�$��
173,10,0,0q�$
��Wrap=�$	��Top=�$��30��$	��112��$��Global Serif)�$��24(���  � Language$ fr-fr�$�OrderEAT���� -   	 ��Name$	 	MainPanel��$��Center=�$
��Auto��$��0,60,0,0q�$	��Top=�$	��744��$��2��$y�Visible=�.+�&   System.Windows.Controls.DataGrid  -   
  Name$
 MainData��$
��Auto��   AutoGenerateColumns$ False��   
IsReadOnly$
 True��   ColumnWidth5  /System.Windows.Controls.DataGridLengthConverter$ SizeToCells    Columns 0  *System.Windows.Controls.DataGridTextColumn  ,  &System.Windows.Controls.DataGridColumn   Width$ 0.25*    Header$ Id��   HeaderStyle# [  1  +System.Windows.Controls.DataGridBoundColumn   Binding �� *Id+  $
 0.7* $	 Nom��# [   �� *
LastName+  $
 0.7* $ Prénom��# [   �� *	FirstName+  $
 0.6* $ Rôle��# [   �� *Role+  $
 0.9* $ Téléphone��# [   �� *PhoneNumber+  $ * $ Email��# [   �� *Email+�� $��Center=�$��Stretch=� �� Orientation$ 
Horizontal=�$��0,5,0,0q� ��%a   '��       �� " ��.���  � ��$ 	0,20,50,0q���  � ��$	 120����  � ��$ 40��.+��� -    ��Name$ 	AddButton��$��Ajouter���� -   $ DeleteButton��$��	Supprimer���� -   $ 
EditButton��$��Modifier���� -   $	 AddPanel��$��2��$
��Left=�$	��384��$��	29,40,0,0q�$	��Top=�$	��744��$y�Hidden=�.+�� -    �Name$ AddGrid��$	��328��$��Center=�$��Center=� �� $
��Auto ��� $
��Auto ��� $
��Auto � � RowDefinitions �� $
��Auto ��� $
��Auto ��� $
��Auto ��� $
��Auto ��� $
��Auto ��� $
��Auto ��� $
��Auto ��� $
��Auto ��� $
��Auto ��� $��* �.+��� -	    ��Name$ LabelFirstName��$
��Nom:��$��0 10 0 0q��� -
   $ LabelLastName��$��Prénom:��$��1��$
��Left=�$��Center=��� -   $ LabelPhoneNumber��$��Téléphone:��$��2���� -   $ 
LabelEmail��$��Email:��$��3���� -   $ LabelPassword��$��Mot de passe:��$��4���� -   $ LabelConfirmPassword��$!��Validation du mot de passe:��$��5���� -   $ LabelSponsorship��$��Partenariat:��$��6���� -   $ 	LabelRole��$��Rôle:��$��7���� -    ��Name$ TextBoxLastName��$��20��$	��150��$��0 10 0 0q�$��1���� -   $ TextBoxFirstName��$��20��$	��150��$��1��$��1��$	��Top=�$
��Left=��� -   $ TextBoxPhoneNumber��$��20��$	��150��$��1��$��2���� -   $ TextBoxEmail��$��20��$	��150��$��1��$��3��G� -    G�Name$ PasswordBoxPassword��$��20��$	��150��$��1��$��4��G� -   $  PasswordBoxConfirmPassword��$��20��$	��150��$��1��$��5���� -   $ TextBoxSponsorship��$��20��$	��150��$��1��$��6���� -   $ TextBoxRole��$��20��$	��150��$��1��$��7���� -   $ ConfirmButton��$��Valider��$	��140��$��25��$��0��$��8���� -   $ CancelButton��$��Annuler��$	��140��$��25��$��1��$��8���� -   $ RoleInfo��$��2��$��Center=�$��7��$S��M1: Admin, 2: Restaurateur, 3: Client, 4: Livreur, 5: Commercial, 6: Technique��$
��Wrap=�$��Center=�$��8,0,0,0q�$��Italic$����	#FF8F7676�� -   $ PasswordError��$��2��$
��Left=�$��4��$��Mot de passe différents��$
��Wrap=�$��Center=�$��10,0,0,0q�$��Normal$����	#FFFB2727$y�Hidden=��� -   $ 
EmailError��$��2��$
��Left=�$��3��$��Email invalide��$
��Wrap=�$��Center=�$��10,0,0,0q�$��Normal$����	#FFFB2727$y�Hidden=��� -   $	 	EditPanel��$��2��$
��Left=�$	��384��$��	29,40,0,0q�$	��Top=�$	��744��$y�Hidden=�.+�� -   $ EditGrid��$	��328��$��Center=�$��Center=� �� $
��Auto ��� $
��Auto ��� $
��Auto � �� $
��Auto ��� $
��Auto ��� $
��Auto ��� $
��Auto ��� $
��Auto ��� $
��Auto ��� $
��Auto ��� $
��Auto ��� $
��Auto ��� $
��Auto ��� $��* �.+��� -    $ LabelEditFirstName��$
��Nom:��$��0 10 0 0q��� -!   $ LabelEditLastName��$��Prénom:��$��1��$
��Left=�$��Center=��� -"   $ LabelEditPhoneNumber��$��Téléphone:��$��2���� -#   $ LabelEditEmail��$��Email:��$��3���� -$   $ LabelEditPassword��$��Mot de passe:��$��4���� -%   $ LabelEditConfirmPassword��$!��Validation du mot de passe:��$��5���� -&   $ LabelEditSponsorship��$��Partenariat:��$��6���� -'   $ LabelEditRole��$��Rôle:��$��7���� -(   $ TextBoxEditLastName��$��20��$	��150��$��0 10 0 0q�$��1���� -)   $ TextBoxEditFirstName��$��20��$	��150��$��1��$��1��$	��Top=�$
��Left=��� -*   $ TextBoxEditPhoneNumber��$��20��$	��150��$��1��$��2���� -+   $ TextBoxEditEmail��$��20��$	��150��$��3��$��2��$��	156,3,0,0q�$	��Top=�G� -,   $ PasswordBoxEditPassword��$��20��$	��150��$��1��$��4��G� --   $$ PasswordBoxEditConfirmPassword��$��20��$	��150��$��1��$��5���� -.   $ TextBoxEditSponsorship��$��20��$	��150��$��1��$��6���� -/   $ TextBoxEditRole��$��20��$	��150��$��1��$��7���� -0   $ EditConfirmButton��$��Modifier��$	��140��$��25��$��0��$��8��$��8,0,8,0q�$��2��$	��Top=��� -1   $ EditCancelButton��$��Annuler��$	��140��$��25��$��1��$��8��$��5,0,5,0q�$��2��$	��Top=��� -2   $ EditRoleInfo��$��2��$��Center=�$��7��$S��M1: Admin, 2: Restaurateur, 3: Client, 4: Livreur, 5: Commercial, 6: Technique��$
��Wrap=�$��Center=�$��8,0,0,0q�$��Italic$����	#FF8F7676�� -3   $ EditPasswordError��$��2��$
��Left=�$��4��$��Mot de passe différents��$
��Wrap=�$��Center=�$��10,0,0,0q�$��Normal$����	#FFFB2727$y�Hidden=��� -4   $ EditEmailError��$��2��$
��Left=�$��3��$��Email invalide��$
��Wrap=�$��Center=�$��10,0,0,0q�$��Normal$����	#FFFB2727$y�Hidden=�