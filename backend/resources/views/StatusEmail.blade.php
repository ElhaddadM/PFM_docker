<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <title>Status de Confirmation RDV</title>
</head>
<body>



    <p>

        <h4>   Bonjour Mr/Mme {{ $mailData['Name'] }} ,</h4>
        Votre rendez-vous est le  <span  style="color:blue"> {{ $mailData['Date'] }} </span> à  <span  style="color:blue" > {{ $mailData['Heure'] }} </span>.
        Code Confirmation <span style="color:blue"> {{ $mailData['Token'] }} </span>.

    </p>


</body>
</html>
