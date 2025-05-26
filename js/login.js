document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const showPasswordCheckbox = document.getElementById('showPassword');
    const passwordInput = document.getElementById('password');
    const usernameInput = document.getElementById('username');
    
    // Credenciales predefinidas (corregidas para coincidir exactamente)
    const validCredentials = [
        { username: 'admin', password: 'Admin12!' },
    ];
    
    // Mostrar/ocultar contraseña
    showPasswordCheckbox.addEventListener('change', function() {
        passwordInput.type = this.checked ? 'text' : 'password';
    });
    
    // Validar formulario
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = usernameInput.value.trim();
        const password = passwordInput.value.trim();
        let isValid = true;
        
        // Resetear errores
        usernameInput.classList.remove('is-invalid');
        passwordInput.classList.remove('is-invalid');
        
        // Validar usuario
        const usernameRegex = /^[a-z0-9_]{4,15}$/;
        if (!usernameRegex.test(username)) {
            document.getElementById('usernameError').textContent = 
                'Usuario inválido. Solo letras minúsculas, números y _. De 4 a 15 caracteres.';
            usernameInput.classList.add('is-invalid');
            isValid = false;
        }
        
        // Validar contraseña
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+={}|[\]:"';<>.,?/]).{8}$/;
        if (!passwordRegex.test(password)) {
            document.getElementById('passwordError').textContent = 
                'La contraseña debe tener exactamente 8 caracteres, incluyendo al menos una mayúscula, un número y un símbolo.';
            passwordInput.classList.add('is-invalid');
            isValid = false;
        }
        
        // Verificar credenciales solo si las validaciones anteriores son correctas
        if (isValid) {
            const foundUser = validCredentials.find(
                cred => cred.username === username && cred.password === password
            );
            
            if (foundUser) {
                // Redirigir a la página principal
                window.location.href = 'index.html';
            } else {
                document.getElementById('passwordError').textContent = 'Usuario o contraseña incorrectos.';
                passwordInput.classList.add('is-invalid');
            }
        }
    });
});