const otpUserStore = new Map();

function generateOTP() {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

function saveOTP(phone, otp) {
  const expiresAt = Date.now() + 5 * 60 * 1000; // 5 minutes
  otpUserStore.set(phone, { otp, expiresAt });
}

function verifyOTP(phone, enteredOTP) {
  const record = otpUserStore.get(phone);
  if (!record) return false;

  const isValid = record.otp === enteredOTP && Date.now() < record.expiresAt;
  if (isValid) otpUserStore.delete(phone); // One-time use
  return isValid;
}

module.exports = { generateOTP, saveOTP, verifyOTP };