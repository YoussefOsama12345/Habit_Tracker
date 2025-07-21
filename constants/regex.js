
REGEX_PATTERNS = {
    USERNAME_PATTERN: /^[a-zA-Z0-9]+$/,
    EMAIL_PATTERN: /^\S+@\S+\.\S+$/,
    PASSWORD_PATTERN: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/,
}

module.exports = REGEX_PATTERNS;