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

const healthForm = document.getElementById('healthSurveyForm');
const chronicCheck = document.getElementById('chronicDiseaseCheck');
const chronicDetailsLabel = document.getElementById('chronicDiseaseLabel');
const chronicDetails = document.getElementById('chronicDiseaseDetails');

healthForm.addEventListener('submit', function(e) {
  e.preventDefault();

  document.getElementById('ageError').textContent = '';
  document.getElementById('genderError').textContent = '';
  document.getElementById('weightError').textContent = '';
  document.getElementById('heightError').textContent = '';
  document.getElementById('chronicDiseaseError').textContent = '';

  let valid = true;

  const age = Number(this.age.value);
  if(isNaN(age) || age < 15 || age > 60){
    document.getElementById('ageError').textContent = 'กรุณากรอกอายุระหว่าง 15 ถึง 60 ปี';
    valid = false;
  }

  const genderSelected = this.gender.value;
  if(!genderSelected){
    document.getElementById('genderError').textContent = 'กรุณาเลือกเพศ';
    valid = false;
  }

  const weight = Number(this.weight.value);
  if(isNaN(weight) || weight <= 0){
    document.getElementById('weightError').textContent = 'กรุณากรอกน้ำหนักเป็นตัวเลขบวก';
    valid = false;
  }

  const height = Number(this.height.value);
  if(isNaN(height) || height <= 0){
    document.getElementById('heightError').textContent = 'กรุณากรอกส่วนสูงเป็นตัวเลขบวก';
    valid = false;
  }

  if(chronicCheck.checked){
    const chronicText = chronicDetails.value.trim();
    if(chronicText.length === 0){
      document.getElementById('chronicDiseaseError').textContent = 'กรุณาระบุโรคประจำตัว';
      valid = false;
    }
  }

  if(valid){
    const bmi = weight / ((height/100) ** 2);
    let category = '';
    if(bmi < 18.5) category = 'น้ำหนักน้อย';
    else if (bmi < 25) category = 'ปกติ';
    else if (bmi < 30) category = 'น้ำหนักเกิน';
    else category = 'อ้วน';

    showModal('ผลสำรวจสุขภาพ 🌿', `ค่าดัชนีมวลกาย (BMI): ${bmi.toFixed(2)} (${category})`);
    healthForm.reset();
    chronicDetails.style.display = 'none';
    chronicDetailsLabel.style.display = 'none';
  }
});

chronicCheck.addEventListener('change', function(){
  if(this.checked){
    chronicDetails.style.display = 'block';
    chronicDetailsLabel.style.display = 'block';
    chronicDetails.setAttribute('required', '');
  } else {
    chronicDetails.style.display = 'none';
    chronicDetails.value = '';
    chronicDetailsLabel.style.display = 'none';
    chronicDetails.removeAttribute('required');
    document.getElementById('chronicDiseaseError').textContent = '';
  }
});
