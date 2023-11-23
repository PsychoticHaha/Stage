<!DOCTYPE html>
<html lang="en">

  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="stylesheets/register.css">
    <title>Register | Private account </title>
  </head>

  <body>
    <h2>CREATE A PRIVATE ACCOUNT</h2>
    <form action="" method="post">
      <label for="email">Email</label>
      <input type="text" id="email" name="email">
      <label for="password">Password</label>
      <div class="password">
        <input type="password" name="password" id="password">
        <span class="show"></span>
      </div>
      <label for="confirm-password">Confirm Password</label>
      <div class="password">
        <input type="password" name="password" id="confirm-password">
        <span class="show"></span>
      </div>

      <input type="submit" value="Register" id="register">
    </form>
    <script>
      const eyeIcon = document.querySelectorAll('.password span');
    eyeIcon.forEach(eye =>{
      eye.addEventListener('click', ()=>{
        if (!eye.classList.contains('hide')) {
          eye.classList.add('hide');
          eye.previousElementSibling.setAttribute('type','text');
        } else {
          eye.classList.remove('hide');
          eye.previousElementSibling.setAttribute('type','password');
        }
      })
    })
    </script>
  </body>

</html>