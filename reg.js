document.getElementById('registrationForm').addEventListener('submit', function(event) {
    const fullname = document.getElementById('fullname').value.trim();
    const email = document.getElementById('email').value.trim();
    const mobile = document.getElementById('mobile').value.trim();
    const age = document.getElementById('age').value.trim();
    const username = document.getElementById('username').value.trim();
    const teamname = document.getElementById('teamname').value.trim();
    const captain = document.getElementById('captain').value.trim();
    const city = document.getElementById('city').value.trim();
    const region = document.getElementById('region').value;
    const paymentQR = document.getElementById('paymentQR').files[0];
  
    const teamMembers = document.querySelectorAll('.memberInput');
    let memberCount = 0;
    teamMembers.forEach(member => {
      if (member.value.trim() !== '') {
        memberCount++;
      }
    });
  
    if (!fullname || !email || !mobile || !age || !username || !teamname || !captain || !city || !region) {
      alert('Please fill in all fields');
      event.preventDefault();
    } else if (!validateEmail(email)) {
      alert('Please enter a valid email address');
      event.preventDefault();
    } else if (!validateMobile(mobile)) {
      alert('Please enter a valid mobile number');
      event.preventDefault();
    } else if (memberCount < 1) {
      alert('Please add at least 1 team member');
      event.preventDefault();
    } else if (memberCount > 4) {
      alert('Maximum 4 team members allowed');
      event.preventDefault();
    } else if (!paymentQR) {
      alert('Please upload a payment QR code');
      event.preventDefault();
    }
  });
  
  document.getElementById('addMemberBtn').addEventListener('click', function() {
    const memberContainer = document.getElementById('memberContainer');
    const input = document.createElement('input');
    input.setAttribute('type', 'text');
    input.setAttribute('class', 'memberInput');
    input.setAttribute('name', 'teamMember[]');
    input.setAttribute('placeholder', 'Team Member');
    memberContainer.appendChild(input);
  });
  
  document.getElementById('paymentQR').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function(e) {
        document.getElementById('qrCode').src = e.target.result;
        document.getElementById('qrCode').style.display = 'block';
      }
      reader.readAsDataURL(file);
    }
  });
  
  function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
  
  function validateMobile(mobile) {
    const re = /^[0-9]{10}$/;
    return re.test(mobile);
  }