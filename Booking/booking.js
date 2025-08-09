const modalBackdrop = document.getElementById('modalBackdrop');
const modalTitle = document.getElementById('modalTitle');
const modalMessage = document.getElementById('modalMessage');
const modalCloseBtn = document.getElementById('modalCloseBtn');

function showModal(title, message) {
  modalTitle.textContent = title;
  modalMessage.textContent = message;
  modalBackdrop.classList.add('active');
}
function closeModal() {
  modalBackdrop.classList.remove('active');
}
modalCloseBtn.addEventListener('click', closeModal);
modalBackdrop.addEventListener('click', e => {
  if (e.target === modalBackdrop) closeModal();
});

const eventForm = document.getElementById('eventBookingForm');
eventForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const fullnameEl = this.fullname;
  const phoneEl = this.phone;
  const ticketTypeEl = this.ticketType;
  const ticketCountEl = this.ticketCount;
  document.getElementById('fullnameError').textContent = '';
  document.getElementById('phoneError').textContent = '';
  document.getElementById('ticketTypeError').textContent = '';
  document.getElementById('ticketCountError').textContent = '';

  let valid = true;

  const fullnameTrimmed = fullnameEl.value.trim();
  const fullnameWords = fullnameTrimmed.split(/\s+/);
  if(fullnameWords.length < 2){
    document.getElementById('fullnameError').textContent = 'กรุณากรอกชื่อ-นามสกุลอย่างน้อย 2 คำ';
    valid = false;
  }

  const phonePattern = /^0\d{9}$/;
  if(!phonePattern.test(phoneEl.value.trim())){
    document.getElementById('phoneError').textContent = 'กรุณากรอกเบอร์โทร 10 หลักขึ้นต้นด้วย 0';
    valid = false;
  }

  if(ticketTypeEl.value === ''){
    document.getElementById('ticketTypeError').textContent = 'กรุณาเลือกประเภทตั๋ว';
    valid = false;
  }

  const ticketCount = Number(ticketCountEl.value);
  if(isNaN(ticketCount) || ticketCount < 1 || ticketCount > 5){
    document.getElementById('ticketCountError').textContent = 'กรุณากรอกจำนวนตั๋ว 1 - 5';
    valid = false;
  } else if((ticketTypeEl.value === 'VIP' || ticketTypeEl.value === 'Premium') && ticketCount > 2){
    document.getElementById('ticketCountError').textContent = `สำหรับประเภท ${ticketTypeEl.value} จำนวนตั๋วไม่เกิน 2 ใบ`;
    valid = false;
  }

  if(valid){
    showModal('สำเร็จ 🎉', `จองตั๋วสำเร็จ จำนวน: ${ticketCount} ประเภท: ${ticketTypeEl.value}`);
    eventForm.reset();
  }
});
