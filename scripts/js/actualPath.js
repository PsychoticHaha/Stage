
// Get the full path of the current folder from backend
async function actualPath() {
  try {
    const response = await fetch('return_session_directory.php');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error:', error);
  }
}

