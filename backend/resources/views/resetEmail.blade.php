<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Reset mail</title>
</head>
<body>
   <p>
        <h4>   Bonjour Mr/Mme  {{ $mailData['Name'] }} ,</h4>
        <h5>
            Votre Code de Confirmation est <span style="color:blue"> {{ $mailData['Token'] }} </span>.
        </h5>
   </p>

</body>
</html>
