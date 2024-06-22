<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Document</title>
</head>
<body>
    <form action="{{url('/register')}}" method="post">
        @csrf

        <input type="text" name="firstName" >
        <input type="text" name="lastName" >
        <br>
        <input type="email" name="email" >
        <br>
        <input type="password" name="password" >
        <br>
        <input type="password" name="password_confirmation" >
        <br>
        <input type="number" name="phone_number" >
        <br>
        <input type="number" name="zip" >
        <br>
        <input type="submit" value="register" >

    </form>
</body>
</html>