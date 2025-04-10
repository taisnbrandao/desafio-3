document.addEventListener('DOMContentLoaded', function() {
    const loginForm = document.getElementById('loginForm');
    const userIdInput = document.getElementById('userId');
    const passwordInput = document.getElementById('password');
    const userIdError = document.getElementById('userIdError');
    const passwordError = document.getElementById('passwordError');
    const registerBtn = document.querySelector('.register-btn');

    // Validação ao enviar o formulário
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        let isValid = true;
        
        // Validação do ID de usuário
        if (userIdInput.value.trim() === '') {
            userIdError.textContent = 'Por favor, insira seu ID de usuário';
            isValid = false;
        } else {
            userIdError.textContent = '';
        }
        
        // Validação da senha
        if (passwordInput.value.trim() === '') {
            passwordError.textContent = 'Por favor, insira sua senha';
            isValid = false;
        } else {
            passwordError.textContent = '';
        }
        
        if (isValid) {
            // Aqui você pode adicionar a lógica de autenticação
            alert('Login realizado com sucesso!');
            loginForm.reset();
        }
    });
    
    // Validação em tempo real para o ID de usuário
    userIdInput.addEventListener('input', function() {
        if (userIdInput.value.trim() !== '') {
            userIdError.textContent = '';
        }
    });
    
    // Validação em tempo real para a senha
    passwordInput.addEventListener('input', function() {
        if (passwordInput.value.trim() !== '') {
            passwordError.textContent = '';
        }
    });
    
    // Botão de cadastrar
    registerBtn.addEventListener('click', function() {
        window.location.href = 'cadastro.html';
    });
    
    // Efeito de hover nos botões já está no CSS
});