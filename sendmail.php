<?php
    use PHPMailer\PHPMailer\PHPMailer;
    use PHPMailer\PHPMailer\Exception;

    require 'phpmailer/src/Exception.php';
    require 'phpmailer/src/PHPMailer.php';

    $mail = new PHPMailer(true);
    $mail->CharSet = 'UTF-8';
    $mail->setLanguage('ru', 'phpmailer/language/');
    $mail->IsHtml(true);

    $mail->setFrom('dmitry9989@gmail.com', 'dimas');
    $mail->addAddress('dmitry9989@gmail.com');
    $mail->Subject = 'Адрес: Каскелен';

    ///name adress district phone pay
    $body = '<h1>Суперзаказ!!!!!!!!</h1>';

        $body.='<p><strong>Имя:</strong> '.$_POST['name'].' </p>';

        $body.='<p><strong>Адрес:</strong> '.$_POST['adress'].' </p>';

        $body.='<p><strong>Имя:</strong> '.$_POST['district'].' </p>';

        $body.='<p><strong>Телефон:</strong> '.$_POST['phone'].' </p>';

        $body.='<p><strong>Оплата:</strong> '.$_POST['pay'].' </p>';
		
		$body.='<p><strong>Сообщение:</strong> '.$_POST['message'].' </p>';


		$mail->Body = $body;
    /////////////////////// отправляем

    if (!$mail->send()) {
        $message = 'error';
    } else {
        $message = 'send';
    }

    $response = ['message' => $message];
    header('Content-type: application/json');
    echo json_encode($response);
?>
    
