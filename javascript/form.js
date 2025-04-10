document.addEventListener('DOMContentLoaded', function() {
    // Selecionar elementos do formulário
    const form = document.getElementById('registrationForm');
    const cancelBtn = document.querySelector('.cancel-btn');
    
    // Máscaras para os campos
    const birthDate = document.getElementById('birthDate');
    const cpf = document.getElementById('cpf');
    const phone = document.getElementById('phone');
    const cep = document.getElementById('cep');
    
    // Aplicar máscaras
    if (birthDate) {
        birthDate.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 2) {
                value = value.substring(0, 2) + '/' + value.substring(2);
            }
            if (value.length > 5) {
                value = value.substring(0, 5) + '/' + value.substring(5, 9);
            }
            
            e.target.value = value;
        });
    }
    
    if (cpf) {
        cpf.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 3) {
                value = value.substring(0, 3) + '.' + value.substring(3);
            }
            if (value.length > 7) {
                value = value.substring(0, 7) + '.' + value.substring(7);
            }
            if (value.length > 11) {
                value = value.substring(0, 11) + '-' + value.substring(11, 13);
            }
            
            e.target.value = value.substring(0, 14);
        });
    }
    
    if (phone) {
        phone.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 0) {
                value = '(' + value.substring(0, 2) + ') ' + value.substring(2);
            }
            if (value.length > 10) {
                value = value.substring(0, 10) + '-' + value.substring(10, 15);
            }
            
            e.target.value = value.substring(0, 15);
        });
    }
    
    if (cep) {
        cep.addEventListener('input', function(e) {
            let value = e.target.value.replace(/\D/g, '');
            
            if (value.length > 5) {
                value = value.substring(0, 5) + '-' + value.substring(5, 8);
            }
            
            e.target.value = value.substring(0, 9);
        });
    }
    
    // Botão cancelar
    cancelBtn.addEventListener('click', function() {
        window.history.back();
    });
    
    // Validação do formulário
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Limpar mensagens de erro
        clearErrorMessages();
        
        // Validar campos
        let isValid = validateForm();
        
        if (isValid) {
            // Salvar dados no localStorage
            saveFormData();
            
            // Mostrar mensagem de sucesso
            alert('Inscrição realizada com sucesso!');
            
            // Limpar formulário (opcional)
            form.reset();
        }
    });
    
    // Função para limpar mensagens de erro
    function clearErrorMessages() {
        const errorMessages = document.querySelectorAll('.error-message');
        errorMessages.forEach(function(element) {
            element.textContent = '';
        });
    }
    
    // Função para validar o formulário
    function validateForm() {
        let isValid = true;
        
        // Validar nome completo
        const fullName = document.getElementById('fullName').value.trim();
        if (fullName === '') {
            document.getElementById('fullNameError').textContent = 'Por favor, insira seu nome completo';
            isValid = false;
        }
        
        // Validar data de nascimento
        const birthDateValue = birthDate.value.trim();
        if (birthDateValue === '') {
            document.getElementById('birthDateError').textContent = 'Por favor, insira sua data de nascimento';
            isValid = false;
        } else if (!/^\d{2}\/\d{2}\/\d{4}$/.test(birthDateValue)) {
            document.getElementById('birthDateError').textContent = 'Formato inválido (dd/mm/aaaa)';
            isValid = false;
        }
        
        // Validar CPF
        const cpfValue = cpf.value.trim();
        if (cpfValue === '') {
            document.getElementById('cpfError').textContent = 'Por favor, insira seu CPF';
            isValid = false;
        } else if (!/^\d{3}\.\d{3}\.\d{3}-\d{2}$/.test(cpfValue)) {
            document.getElementById('cpfError').textContent = 'CPF inválido';
            isValid = false;
        }
        
        // Validar sexo
        const gender = document.getElementById('gender').value;
        if (gender === '') {
            document.getElementById('genderError').textContent = 'Por favor, selecione uma opção';
            isValid = false;
        }
        
        // Validar e-mail
        const email = document.getElementById('email').value.trim();
        if (email === '') {
            document.getElementById('emailError').textContent = 'Por favor, insira seu e-mail';
            isValid = false;
        } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
            document.getElementById('emailError').textContent = 'E-mail inválido';
            isValid = false;
        }
        
        // Validar telefone
        const phoneValue = phone.value.trim();
        if (phoneValue === '') {
            document.getElementById('phoneError').textContent = 'Por favor, insira seu telefone';
            isValid = false;
        } else if (phoneValue.replace(/\D/g, '').length < 11) {
            document.getElementById('phoneError').textContent = 'Telefone inválido';
            isValid = false;
        }
        
        // Validar documento de identidade
        const identityDoc = document.getElementById('identityDoc').files[0];
        if (!identityDoc) {
            document.getElementById('identityDocError').textContent = 'Por favor, envie seu documento';
            isValid = false;
        }
        
        // Validar CEP
        const cepValue = cep.value.trim();
        if (cepValue === '') {
            document.getElementById('cepError').textContent = 'Por favor, insira seu CEP';
            isValid = false;
        } else if (cepValue.replace(/\D/g, '').length < 8) {
            document.getElementById('cepError').textContent = 'CEP inválido';
            isValid = false;
        }
        
        // Validar rua
        const street = document.getElementById('street').value.trim();
        if (street === '') {
            document.getElementById('streetError').textContent = 'Por favor, insira o nome da rua';
            isValid = false;
        }
        
        // Validar número
        const number = document.getElementById('number').value.trim();
        if (number === '') {
            document.getElementById('numberError').textContent = 'Por favor, insira o número';
            isValid = false;
        }
        
        // Validar cidade
        const city = document.getElementById('city').value.trim();
        if (city === '') {
            document.getElementById('cityError').textContent = 'Por favor, insira a cidade';
            isValid = false;
        }
        
        // Validar estado
        const state = document.getElementById('state').value;
        if (state === '') {
            document.getElementById('stateError').textContent = 'Por favor, selecione o estado';
            isValid = false;
        }
        
        // Validar comprovante de residência
        const residenceProof = document.getElementById('residenceProof').files[0];
        if (!residenceProof) {
            document.getElementById('residenceProofError').textContent = 'Por favor, envie o comprovante';
            isValid = false;
        }
        
        // Validar trilha
        const selectedTrilha = document.querySelector('input[name="trilha"]:checked');
        if (!selectedTrilha) {
            document.getElementById('trilhaError').textContent = 'Por favor, selecione uma trilha';
            isValid = false;
        }
        
        // Validar ID de usuário
        const userId = document.getElementById('userId').value.trim();
        if (userId === '') {
            document.getElementById('userIdError').textContent = 'Por favor, crie um ID de usuário';
            isValid = false;
        }
        
        // Validar senha
        const password = document.getElementById('password').value;
        if (password === '') {
            document.getElementById('passwordError').textContent = 'Por favor, crie uma senha';
            isValid = false;
        } else if (password.length < 6) {
            document.getElementById('passwordError').textContent = 'A senha deve ter pelo menos 6 caracteres';
            isValid = false;
        }
        
        // Validar confirmação de senha
        const confirmPassword = document.getElementById('confirmPassword').value;
        if (confirmPassword === '') {
            document.getElementById('confirmPasswordError').textContent = 'Por favor, confirme sua senha';
            isValid = false;
        } else if (confirmPassword !== password) {
            document.getElementById('confirmPasswordError').textContent = 'As senhas não coincidem';
            isValid = false;
        }
        
        // Validar termos
        const terms = document.getElementById('terms').checked;
        if (!terms) {
            document.getElementById('termsError').textContent = 'Por favor, aceite os termos e condições';
            isValid = false;
        }
        
        return isValid;
    }
    
    // Função para salvar dados no localStorage
    function saveFormData() {
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            birthDate: birthDate.value.trim(),
            cpf: cpf.value.trim(),
            gender: document.getElementById('gender').value,
            email: document.getElementById('email').value.trim(),
            phone: phone.value.trim(),
            cep: cep.value.trim(),
            street: document.getElementById('street').value.trim(),
            number: document.getElementById('number').value.trim(),
            city: document.getElementById('city').value.trim(),
            state: document.getElementById('state').value,
            userId: document.getElementById('userId').value.trim(),
            trilha: document.querySelector('input[name="trilha"]:checked')?.value
        };
        
        localStorage.setItem('formData', JSON.stringify(formData));
    }
    
    // Carregar dados salvos (se existirem)
    function loadFormData() {
        const savedData = localStorage.getItem('formData');
        if (savedData) {
            const formData = JSON.parse(savedData);
            
            if (formData.fullName) document.getElementById('fullName').value = formData.fullName;
            if (formData.birthDate) birthDate.value = formData.birthDate;
            if (formData.cpf) cpf.value = formData.cpf;
            if (formData.gender) document.getElementById('gender').value = formData.gender;
            if (formData.email) document.getElementById('email').value = formData.email;
            if (formData.phone) phone.value = formData.phone;
            if (formData.cep) cep.value = formData.cep;
            if (formData.street) document.getElementById('street').value = formData.street;
            if (formData.number) document.getElementById('number').value = formData.number;
            if (formData.city) document.getElementById('city').value = formData.city;
            if (formData.state) document.getElementById('state').value = formData.state;
            if (formData.userId) document.getElementById('userId').value = formData.userId;
            if (formData.trilha) document.querySelector(`input[name="trilha"][value="${formData.trilha}"]`).checked = true;
        }
    }
    
    // Carregar dados ao iniciar
    loadFormData();
});