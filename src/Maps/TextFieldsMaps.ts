const RegisterField = 
[
    {name:"email", type:"email", label:"Email:"},
    {name:"username", type:"text", label:"Username:"},
    {name:"password", type:"password", label:"Password:"},
    {name:"birthDay", type:"date", label:"Date Of Birth:"}
]

const LoginField = 
[
    { name: "email", type: "email", label: "Email" },
    { name: "password", type: "password", label: "Password" }
];

const ViewProfileField = 
[
    {name: "email", label: "Email:", type: "email", disable: true}, 
    {name: "gender", label: "Gender:", type: "text", disable: true},
    {name: "username", label: "Username:", type: "text", disable: true}, 
    {name: "newName", label: "New Name:", type: "text"},
    {name: "role", label: "Role:",  type: "text", disable: true}, 
    {name: "newPassword", label: "New Password:", type: "password"}
]

const BookMainSearchField = 
[
    {name:"language", label:"Book Name", syntax:{ width: '60%' } ,select: false},
    {name:"language", label:"Language", syntax:{ width: '10%', marginLeft: '10px' } ,select: true}
]

const BookSearchField = 
[
    {name: "genre", label: "Genre", type: "text", select: true},
    {name: "publisher", label: "Publisher Name", type: "text", select: true},
    {name: "author", label: "Author Name", type: "text", select: true},
    {name: "pages", label: "Pages", type: "number", slotProps: {htmlInput:{min: 0}}}
]

const UserSearchField = 
[
    {name: "email", label: "Email", type: "email"},
    {name: "role", label: "Role", type: "text", select: true},
    {name: "status", label: "Status", type: "text", select: true},
    {name: "gender", label: "Gender", type: "text", select: true}
]

const CreateBookInputField = 
[
    {name: "bookname", label: "Book Name", type:"text", select:false, slotProps: {}},
    {name: "language", label: "Language", type:"text", select:false, slotProps: {}},
    ...BookSearchField,
    {name: "amount", label: "Book Amount", type:"number", slotProps: {htmlInput:{min: 0}}}
]

const CreateUserInputField = 
[
    {name: "username", label: "Username", type:"text", select:false, slotProps: {}},
    {name: "password", label: "Password", type:"password"},
    ...UserSearchField
]

const EditUserInputField =
[
    {name: "username", label: "Username", type:"text", select:false, slotProps: {}},
    ...UserSearchField
]

export {RegisterField, LoginField, ViewProfileField, BookMainSearchField, BookSearchField, UserSearchField, CreateBookInputField, CreateUserInputField, EditUserInputField}