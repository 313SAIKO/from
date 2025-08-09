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

const transferForm = document.getElementById('transferRequestForm');
transferForm.addEventListener('submit', function(e) {
  e.preventDefault();

  const studentName = this.studentName.value.trim();
  const studentID = this.studentID.value.trim();
  const facultyFrom = this.facultyFrom.value.trim();
  const facultyTo = this.facultyTo.value.trim();
  const reason = this.reason.value.trim();

  document.getElementById('studentNameError').textContent = '';
  document.getElementById('studentIDError').textContent = '';
  document.getElementById('facultyFromError').textContent = '';
  document.getElementById('facultyToError').textContent = '';
  document.getElementById('reasonError').textContent = '';

  let valid = true;

  if(studentName.length < 3){
    document.getElementById('studentNameError').textContent = 'กรุณากรอกชื่อ-นามสกุล';
    valid = false;
  }
  if(!/^\d{8,}$/.test(studentID)){
    document.getElementById('studentIDError').textContent = 'กรุณากรอกรหัสนักศึกษาที่มีอย่างน้อย 8 ตัวเลข';
    valid = false;
  }
  if(facultyFrom.length < 3){
    document.getElementById('facultyFromError').textContent = 'กรุณากรอกชื่อคณะที่ต้องการย้ายออก';
    valid = false;
  }
  if(facultyTo.length < 3){
    document.getElementById('facultyToError').textContent = 'กรุณากรอกชื่อคณะที่ต้องการย้ายเข้า';
    valid = false;
  }
  if(reason.length < 10){
    document.getElementById('reasonError').textContent = 'กรุณากรอกเหตุผลอย่างน้อย 10 ตัวอักษร';
    valid = false;
  }

  if(valid){
    showModal('ส่งคำร้องสำเร็จ 📋', `ระบบได้รับคำร้องขอโอนย้ายสาขาวิชาต่างคณะจากคุณ ${studentName} เรียบร้อยแล้ว`);
    transferForm.reset();
  }
});
