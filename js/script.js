document.addEventListener('DOMContentLoaded', function() {
    const appointmentForm = document.getElementById('appointmentForm');
    const ticketModal = new bootstrap.Modal(document.getElementById('ticketModal'));
    const printButton = document.getElementById('printTicket');
    
    // Validar y enviar formulario
    appointmentForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Obtener valores del formulario
        const ownerName = document.getElementById('ownerName').value.trim();
        const petName = document.getElementById('petName').value.trim();
        const breed = document.getElementById('breed').value.trim();
        const petGender = document.querySelector('input[name="petGender"]:checked').value;
        const symptoms = document.getElementById('symptoms').value.trim();
        const phone = document.getElementById('phone').value.trim();
        const date = document.getElementById('date').value;
        const time = document.getElementById('time').value;
        const vet = document.getElementById('vet').value;
        
        let isValid = true;
        
        // Validar campos requeridos
        if (!ownerName) {
            document.getElementById('ownerNameError').textContent = 'Este campo es requerido.';
            document.getElementById('ownerName').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('ownerName').classList.remove('is-invalid');
        }
        
        if (!petName) {
            document.getElementById('petNameError').textContent = 'Este campo es requerido.';
            document.getElementById('petName').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('petName').classList.remove('is-invalid');
        }
        
        if (!breed) {
            document.getElementById('breedError').textContent = 'Este campo es requerido.';
            document.getElementById('breed').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('breed').classList.remove('is-invalid');
        }
        
        if (!symptoms) {
            document.getElementById('symptomsError').textContent = 'Este campo es requerido.';
            document.getElementById('symptoms').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('symptoms').classList.remove('is-invalid');
        }
        
        // Validar teléfono (solo dígitos)
        const phoneRegex = /^\d+$/;
        if (!phone || !phoneRegex.test(phone)) {
            document.getElementById('phoneError').textContent = 'Ingrese un número de teléfono válido (solo dígitos).';
            document.getElementById('phone').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('phone').classList.remove('is-invalid');
        }
        
        // Validar fecha (no puede ser en el pasado)
        const today = new Date().toISOString().split('T')[0];
        if (!date || date < today) {
            document.getElementById('dateError').textContent = 'Seleccione una fecha válida (no puede ser en el pasado).';
            document.getElementById('date').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('date').classList.remove('is-invalid');
        }
        
        if (!time) {
            document.getElementById('timeError').textContent = 'Este campo es requerido.';
            document.getElementById('time').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('time').classList.remove('is-invalid');
        }
        
        if (!vet) {
            document.getElementById('vetError').textContent = 'Seleccione un veterinario.';
            document.getElementById('vet').classList.add('is-invalid');
            isValid = false;
        } else {
            document.getElementById('vet').classList.remove('is-invalid');
        }
        
        // Si todo es válido, generar ticket
        if (isValid) {
            generateTicket({
                ownerName,
                petName,
                breed,
                petGender,
                symptoms,
                phone,
                date,
                time,
                vet
            });
            ticketModal.show();
        }
    });
    
    // Función para generar el ticket
    function generateTicket(data) {
        const ticketContent = document.getElementById('ticketContent');
        const now = new Date();
        const ticketNumber = `VET-${now.getFullYear()}${String(now.getMonth() + 1).padStart(2, '0')}${String(now.getDate()).padStart(2, '0')}-${Math.floor(1000 + Math.random() * 9000)}`;
        
        ticketContent.innerHTML = `
            <div class="ticket-header">
                <h4>Veterinaria Patitas</h4>
                <p>Cita Médica</p>
                <p>N°: ${ticketNumber}</p>
            </div>
            <div class="ticket-body">
                <div class="ticket-item">
                    <span class="ticket-item-label">Dueño:</span>
                    <span>${data.ownerName}</span>
                </div>
                <div class="ticket-item">
                    <span class="ticket-item-label">Mascota:</span>
                    <span>${data.petName}</span>
                </div>
                <div class="ticket-item">
                    <span class="ticket-item-label">Especie/Raza:</span>
                    <span>${data.breed}</span>
                </div>
                <div class="ticket-item">
                    <span class="ticket-item-label">Sexo:</span>
                    <span>${data.petGender}</span>
                </div>
                <div class="ticket-item">
                    <span class="ticket-item-label">Síntomas:</span>
                    <span>${data.symptoms}</span>
                </div>
                <div class="ticket-item">
                    <span class="ticket-item-label">Teléfono:</span>
                    <span>${data.phone}</span>
                </div>
                <div class="ticket-item">
                    <span class="ticket-item-label">Fecha:</span>
                    <span>${formatDate(data.date)}</span>
                </div>
                <div class="ticket-item">
                    <span class="ticket-item-label">Hora:</span>
                    <span>${data.time}</span>
                </div>
                <div class="ticket-item">
                    <span class="ticket-item-label">Veterinario:</span>
                    <span>${data.vet}</span>
                </div>
            </div>
            <div class="ticket-footer">
                <p>Gracias por confiar en nosotros</p>
                <p>Por favor llegue 10 minutos antes de su cita</p>
            </div>
        `;
    }
    
    // Función para formatear fecha
    function formatDate(dateString) {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString('es-ES', options);
    }
    
    // Botón para imprimir ticket
    printButton.addEventListener('click', function() {
        window.print();
    });
});