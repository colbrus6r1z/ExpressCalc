document.getElementById('calc-form').addEventListener('submit', async (e) => {
  e.preventDefault();
  
  const formData = new FormData(e.target);
  const nums = formData.get('nums');
  const operation = formData.get('operation');
  
  const resultDiv = document.getElementById('result');
  resultDiv.className = 'result';
  resultDiv.textContent = 'Calculating...';
  
  try {
    const response = await fetch(`/${operation}?nums=${encodeURIComponent(nums)}`);
    const data = await response.json();
    
    if (response.ok) {
      resultDiv.className = 'result success';
      resultDiv.textContent = `${operation.charAt(0).toUpperCase() + operation.slice(1)}: ${data.value}`;
    } else {
      resultDiv.className = 'result error';
      resultDiv.textContent = `Error: ${data.error}`;
    }
  } catch (error) {
    resultDiv.className = 'result error';
    resultDiv.textContent = `Error: ${error.message}`;
  }
});
