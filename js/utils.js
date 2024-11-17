const formValues = {}  // Сюда пишутся значения формы (Object как в Java, или dict из Python)
const formValidation = {}  // Сюда пишутся статусы валидации каждого поля. Если поле ни разу не валидировалось,
// то при обращении к Object вернётся undefined, который при логическом сравнении обрабатывается как false

export const refreshSignUpFormValidationValues = () => {
    clearForms()
    const fields = ["password", "password_repeat", "password_match", "email"];
    fields.forEach(field => formValidation[field] = undefined);
}

export const refreshSignInFormValidationValues = () => {
    clearForms()
    const fields = ["password_sign_in", "email_sign_in"];
    fields.forEach(field => formValidation[field] = undefined);
}

export const clearForms = () => {
    Object.keys(formValidation).forEach(key => delete formValidation[key]);
    Object.keys(formValues).forEach(key => delete formValues[key]);
}

// Объявляется и инициализируется константная переменная
// Инициализация функцией, заданной в стрелочном виде
export const validatePassword = (password) => {
    const regExpr = /(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[\W])/;
    return regExpr.test(password);
}


export const validateEmail = (email) => {
    // Создадим шаблон регулярного выражения. В нём применяются шаблонные строки
    // Гуглить по тегам: "шаблонные строки js", "регулярные выражения"
    const regExp = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

    return String(email)
        .toLowerCase()
        .match(regExp);
}

// Функция возвращающая true если все валидации пройдены, и false если хотя бы одна не пройдена
export const getValidationStatus = () => {
    // Происходит функциональная магия, читай строчку кода ниже как:
    // Получить значения (не ключи) из объекта, затем применить к каждому значению функцию двойного логического отрицания
    // (преобразование к булевому типу) и результаты всех применений это true, то вернуть true, иначе - false
    return Object.values(formValidation).every((validationStatus) => !!validationStatus)
}


// Функция, которая ставит значение поля в форме по ключу
export const setFormValue = (valueKey, newValue, validator) => {
    formValues[valueKey] = newValue;
    if (validator !== undefined) formValidation[valueKey] = validator(newValue);
}

export const comparePasswords = () => {
    formValidation.password_match = formValues.password === formValues.password_repeat
}

// Функция для обработки отправки формы регистрации
// В этой функции должен быть http запрос на сервер для регистрации пользователя (сейчас просто демонстрация)
export const submitSignUpForm = () => {
    if (!getValidationStatus()) {
        console.log("FORM IS INCORRECT")
        console.log(formValues)
        return false
    }
    console.log("FORM IS FINE")
    console.log(formValues)
    return true
}

export const submitSignInForm = () => {
    if (!getValidationStatus()) {
        console.log("FORM IS INCORRECT")
        console.log(formValues)
        return false
    }
    console.log("FORM IS FINE")
    console.log(formValues)
    return true
}